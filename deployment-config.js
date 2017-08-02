exports.orderReceived = {
  "profile": "bedrock",
  "region": "us-east-1",
  "handler": "orderReceived.dynamoPut",
  "role": "arn:aws:iam::652113781882:role/service-role/write_to_dynamo",
  "functionName": "OrderReceived2",
  "timeout": 300,
  "memorySize": 128,
  "publish": true, 
  "runtime": "nodejs6.10",
  "name":"OrderReceived2"
};

