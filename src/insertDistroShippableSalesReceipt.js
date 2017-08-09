'use strict';

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const AWS = require('aws-sdk');
    const dynamoDb = new AWS.DynamoDB();
    
    let TableName = "DistroShippableSalesReceipt";
    let params = {
        TableName
    };
    event.Records.forEach((record) => {
        
        if(record.eventName === "INSERT"){
            // if the item has a shipping charge, we need to ship it
            let salesReceipt = record.dynamodb.NewImage;
            let lines = salesReceipt.Lines.M;
            let foundItem = false;
            Object.keys(lines).forEach((lineNumber) => {
                // the key is the line number, the value is the actual item
                if (lines[lineNumber].M.SalesReceiptItemDesc1.S.match(/^D\d+[A-Z]$/)){
                    console.log('found shipping line item. Copying to DistroShippableSalesReceipt table');
                    foundItem = true;
                }
            });
            if (foundItem){
                params.Item = salesReceipt;
                dynamoDb.putItem(params, (err, data)=>{
                if(err){
                    console.error(JSON.stringify(err))
                    callback(err, null);
                    
                }else{
                    console.log('Dynamo Response: ' + JSON.stringify(data))
                    callback(null, data);
                }
                });
            } else {
                console.log('Not a shippable order. Skipping.')
            }
        }
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};