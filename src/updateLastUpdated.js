'use strict';

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const AWS = require('aws-sdk');
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    let TableName = "DistroLastUploaded";
    let params = {
        TableName
    };
    event.Records.forEach((record) => {
        //console.log(record.eventID);
        //console.log(record.eventName);
        //console.log('DynamoDB Record: %j', record.dynamodb);
        
        if(record.eventName === "INSERT"){
            let store = record.dynamodb.NewImage.StoreNumber.N
            let lastUpdated = record.dynamodb.NewImage.TimeCreated.S
            
            console.log(`Will update Store: ${store} to ${lastUpdated}`)
            params.Item = {
                    "StoreNumber" : parseInt(store),
                    "LastUpdated" : lastUpdated
                };
            dynamoDb.put(params, (err, data)=>{
                if(err){
                    console.error(JSON.stringify(err))
                    callback(err, null);
                    
                }else{
                    console.log('Dynamo Response: ' + JSON.stringify(data))
                    callback(null, data);
                }
            });
        }
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};
