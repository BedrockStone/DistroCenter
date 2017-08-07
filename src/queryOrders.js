"use strict";
const AWS = require('aws-sdk');
const lambdaProxy = require('lambda-proxy-response');
//const config = require('./config');


exports.handler = (event, context, callback) => {
    console.log('Received event', JSON.stringify(event, null, 2));
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    let TableName = "QuickbooksReceipt";
    let params = {
        TableName,
        "IndexName": "StoreNumber-ShipDate-index-copy",
        "KeyConditionExpression" : "StoreNumber = :val",
        "ExpressionAttributeValues": { ":val": parseInt(event.pathParameters.storeNumber)}
    };
    console.log(JSON.stringify(params));
    dynamoDb.query(params, (err, data)=>{
        if(err){
            console.log('DynamoDb error: ', JSON.stringify(err, null, 2));
            let response = lambdaProxy.response(500, {"Content-Type":"application/json"}, err);
            callback(err, null);
            return;
            
        }else{
            console.log('DynamoDb response:', JSON.stringify(data, null, 2));
            let response = lambdaProxy.response(200, 
                    {"Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"'*'"
                },data);
            callback(null, response);
        }
    });
};

