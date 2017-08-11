"use strict";
exports.handler = (event, context, callback) => {
    console.log('Received event', JSON.stringify(event, null, 2));
    const AWS = require('aws-sdk');
    const lambdaProxy = require('lambda-proxy-response');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    let TableName = "DistroShippableSalesReceipt";
    let params = {
        TableName
    };
    console.log(JSON.stringify(params));
    dynamoDb.scan(params, (err, data)=>{
        if(err){
            console.log('DynamoDb error: ', JSON.stringify(err, null, 2));
            let response = lambdaProxy.response(500, {"Content-Type":"application/json"}, err);
            callback(err, null);
            return;
            
        }else{
            console.log('DynamoDb response:', JSON.stringify(data, null, 2));
            let response = lambdaProxy.response(200, 
                    {"Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"*"
                },data);
            callback(null, response);
        }
    });
};


