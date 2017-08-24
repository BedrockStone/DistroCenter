"use strict";
const AWS = require('aws-sdk');
const lambdaProxy = require('lambda-proxy-response');
const utilities = require('./utilities');


exports.handler = (event, context, callback) => {
    console.log('Received event', JSON.stringify(event, null, 2));
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    let TableName = "DistroShippedSalesReceipt";
    let params = {
        TableName
    };
    let body = JSON.parse(event.body);
    body = utilities.removeEmptyValues(body);
    params.Item = body;
    console.log('putting item: ' + JSON.stringify(params));
    dynamoDb.put(params, (err, data)=>{
        if(err){
            console.log('DynamoDb error: ', JSON.stringify(err, null, 2));
            let response = lambdaProxy.response(500, {"Content-Type":"application/json"}, err);
            callback(err, null);
            return;
            
        }else{
            console.log('DynamoDb response:', JSON.stringify(data, null, 2));
            let response = lambdaProxy.response(200, 
                    {
                        "Content-Type":"application/json",
                        "Access-Control-Allow-Origin":"*"
                    },
                    data);
            callback(null, response);
        }
    });
};



