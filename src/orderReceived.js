"use strict";
const AWS = require('aws-sdk');
const lambdaProxy = require('lambda-proxy-response');
//const config = require('./config');


exports.handler = (event, context, callback) => {
    console.log('Received event', JSON.stringify(event, null, 2));
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    let TableName = "QuickbooksReceipt";
    let params = {
        TableName
    };
    params.Item = {};
    let body = JSON.parse(event.body);
    Object.keys(body).forEach(key => {
        //console.log(`Setting Item[${key}] = ${body[key]}`);
        if ( body[key] !== null) {
            params.Item[key] = body[key];
        }
        
    });
    dynamoDb.put(params, (err, data)=>{
        if(err){
            console.log('DynamoDb error: ', JSON.stringify(err, null, 2));
            let response = lambdaProxy.response(500, {"Content-Type":"application/json"}, err);
            callback(err, null);
            return;
            
        }else{
            console.log('DynamoDb response:', JSON.stringify(data, null, 2));
            let response = lambdaProxy.response(200, {"Content-Type":"application/json"},data);
            callback(null, response);
        }
    });
};



