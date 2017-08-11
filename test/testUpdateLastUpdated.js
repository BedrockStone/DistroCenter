"use strict";
const expect = require( 'chai' ).expect;
const should = require('chai').should();
const requireLib = require('app-root-path').require;
const LambdaTester = require('lambda-tester');
const sinon = require('sinon');
const AWS = require('aws-sdk-mock');

const myHandler =  requireLib('src/updateLastUpdated').handler;
//const config = requireLib('src/config');
const testEvent = require('./testUpdateLastUpdatedEvent');

const putRecordSpy = sinon.spy((params, callback )=> {
    callback(null,{})
});

AWS.mock('DynamoDB.DocumentClient','put', putRecordSpy);
// These work in prod, let's get the tests working too
describe('The LastUpdated handler', () => {
    //let testBody = JSON.parse(testEvent.body);
    /*
    xit('will execute a dynamo put put http requests', ()=>{
          return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                putRecordSpy.called.should.be.true;
            });
    });
    */
    xit('sets the dynamo db table properly', ()=> {
          return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                let dynamoParams = putRecordSpy.args[0][0];
                dynamoParams.TableName.should.equal("DistroLastUploaded");
            });
    });
    

});
