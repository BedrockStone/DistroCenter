"use strict";
const expect = require( 'chai' ).expect;
const should = require('chai').should();
const requireLib = require('app-root-path').require;
const LambdaTester = require('lambda-tester');
const sinon = require('sinon');
const AWS = require('aws-sdk-mock');

const myHandler =  requireLib('src/orderReceived').handler;
//const config = requireLib('src/config');
const testEvent = require('./testorderReceivedEvent');

const putRecordSpy = sinon.spy((params, callback )=> {
    callback(null,{})
});

const getRecordSpy = sinon.spy((params, callback ) => {
    callback(null, {})
});

AWS.mock('DynamoDB.DocumentClient','put', putRecordSpy);

describe('The dynamo db handler', () => {
    let testBody = JSON.parse(testEvent.body);
    // ToDo: fix this. It looks like we can't mock DocumentClient.put... ???
    xit('will execute a dynamo put put http requests', ()=>{
          return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                putRecordSpy.called.should.be.true;
            });
    });
    xit('sets the dynamo db table properly', ()=> {
          return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                let dynamoParams = putRecordSpy.args[0][0];
                dynamoParams.TableName.should.equal("QuickbooksReceipt");
            });
    });
    xit('will map properties correctly', ()=>{
        return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                let dynamoParams = putRecordSpy.args[0][0];
                var item = dynamoParams.Item;
                Object.keys(testBody).forEach(key => {
                    // we do not send null or undefined in payloads
                    console.log(`${key}: ${testBody[key]}`);
                    if(testBody[key] === null || testBody[key] === undefined) {
                        item.should.not.include({key:testBody[key]});
                    } else {
                        expect(item[key]).to.deep.equal(testBody[key]);
                    }
                });
            });
    });

});
