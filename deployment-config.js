"use strict";
//TODO: consider some naming convention here to DRY this up
exports.orderReceived = {
  "profile": "bedrock",
  "region": "us-east-1",
  "handler": "orderReceived.handler",
  "role": "arn:aws:iam::652113781882:role/service-role/write_to_dynamo",
  "functionName": "OrderReceived",
  "timeout": 300,
  "memorySize": 128,
  "publish": true, 
  "runtime": "nodejs6.10",
  "name":"OrderReceived2"
};

exports.queryOrders = {
  "profile": "bedrock",
  "region": "us-east-1",
  "handler": "queryOrders.handler",
  "role": "arn:aws:iam::652113781882:role/service-role/write_to_dynamo",
  "functionName": "QueryOrders",
  "timeout": 300,
  "memorySize": 128,
  "publish": true, 
  "runtime": "nodejs6.10",
  "name":"QueryOrders"
};

exports.justLog = {
  "profile": "bedrock",
  "region": "us-east-1",
  "handler": "justLog.handler",
  "role": "arn:aws:iam::652113781882:role/service-role/write_to_dynamo",
  "functionName": "JustLog",
  "timeout": 300,
  "memorySize": 128,
  "publish": true, 
  "runtime": "nodejs6.10",
  "name":"JustLog"
};

exports.insertDistroShippableSalesReceipt = {
  "profile": "bedrock",
  "region": "us-east-1",
  "handler": "insertDistroShippableSalesReceipt.handler",
  "role": "arn:aws:iam::652113781882:role/service-role/write_to_dynamo",
  "functionName": "insertDistroShippableSalesReceipt",
  "timeout": 300,
  "memorySize": 128,
  "publish": true, 
  "runtime": "nodejs6.10",
  "name":"insertDistroShippableSalesReceipt"
};

exports.updateDistroShippableSalesReceipt = {
  "profile": "bedrock",
  "region": "us-east-1",
  "handler": "updateDistroShippableSalesReceipt.handler",
  "role": "arn:aws:iam::652113781882:role/service-role/write_to_dynamo",
  "functionName": "updateDistroShippableSalesReceipt",
  "timeout": 300,
  "memorySize": 128,
  "publish": true, 
  "runtime": "nodejs6.10",
  "name":"updateDistroShippableSalesReceipt"
};