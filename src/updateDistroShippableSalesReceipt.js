'use strict';
const lambdaProxy = require('lambda-proxy-response');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const AWS = require('aws-sdk');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    let TableName = "DistroShippableSalesReceipt";
    let Item = JSON.parse(event.body);
    
    let params = {
        TableName,
        Item
    };
    dynamoDb.put(params, (err, data) => { 
        let response;
        if(err){
            response = lambdaProxy.response(500, 
                    {
                        "Content-Type":"application/json",
                        "Access-Control-Allow-Origin":"*"
                    },
                    err);
        } else {
            response = lambdaProxy.response(200, 
                    {
                        "Content-Type":"application/json",
                        "Access-Control-Allow-Origin":"*"
                    },
                    data);
        }
        callback(null, response);
    });
};
