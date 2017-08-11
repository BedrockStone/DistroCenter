"use strict";
const expect = require( 'chai' ).expect;
const should = require('chai').should();
const requireLib = require('app-root-path').require;
const LambdaTester = require('lambda-tester');
const sinon = require('sinon');
const AWS = require('aws-sdk-mock');
const myHandler =  requireLib('src/queryOrders').handler;
//const config = requireLib('src/config');
const testEvent = require('./testQueryOrdersEvent');


const putRecordSpy = sinon.spy((params, callback )=> {
    callback(null,{})
});

let queryResults = {};
const getRecordSpy = sinon.spy((params, callback ) => {
    callback(null, queryResults)
});



AWS.mock('DynamoDB.DocumentClient','scan', getRecordSpy);
// These work in prod, let's get the tests working too
describe('The QueryOrders handler', () => {
    //let testBody = JSON.parse(testEvent.body);
    it('will execute a dynamo query', ()=>{
          return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                getRecordSpy.called.should.be.true;
            });
    });
    it('sets the dynamo db table properly', ()=> {
          return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                let dynamoParams = getRecordSpy.args[0][0];
                dynamoParams.TableName.should.equal("DistroShippableSalesReceipt");
            });
    });
    it('sends CORS headers in response', () => {
        return LambdaTester( myHandler )
            .event( testEvent )
            .expectResult(result => {
                let dynamoParams = getRecordSpy.args[0][0];
                result.headers['Access-Control-Allow-Origin'].should.equal("*");
            });
    });
    
});
