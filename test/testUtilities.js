const expect = require( 'chai' ).expect;
const should = require('chai').should();
const requireLib = require('app-root-path').require;
//const sinon = require('sinon');
const removeEmptyValues = requireLib('src/utilities').removeEmptyValues;

describe("The removeEmpties method", () => {
    let testObject = {
        'NullKey': null,
        'UndefinedKey': null,
        'NumberKey':1,
        'StringKey':'string',
        'FunctionKey': () => {return 'I am a function call'},
        'ObjectKey': {
            'NullKey': null,
            'UndefinedKey': null,
            'NumberKey':1,
            'StringKey':'string',
            'FunctionKey': () => {return 'I am a function call'},
            'ObjectKey': {
                'Prop':'Val'
            }
        }
    }
    let result = removeEmptyValues(testObject);
    it('Will remove keys with null values', () => {
        expect(Object.keys(result)).to.not.contain('NullKey', 'Null Key Not removed');
    });
    it('Will remove keys with Undefined values', () => {
        expect(Object.keys(result)).to.not.contain('UndefinedKey', 'Null Key Not removed');
    });
    it('Will not remove populated values', () => {
        expect(Object.keys(result)).to.contain('NumberKey', 'Number Key Removed');
        expect(Object.keys(result)).to.contain('StringKey', 'String Key Removed');
        expect(Object.keys(result)).to.contain('FunctionKey', 'Function Key Removed');
        expect(Object.keys(result)).to.contain('ObjectKey', 'ObjectKey Key Removed');
    });
    it('Will remove nested empty keys', () => {
        expect(Object.keys(result.ObjectKey)).to.not.contain('NullKey', 'Null Key Not removed on nested object');
        expect(Object.keys(result.ObjectKey)).to.not.contain('UndefinedKey', 'Undefined Key Not removed on nested object');
    });
     it('Will not remove populated values on nested objects', () => {
        expect(Object.keys(result.ObjectKey)).to.contain('NumberKey', 'Number Key Removed');
        expect(Object.keys(result.ObjectKey)).to.contain('StringKey', 'String Key Removed');
        expect(Object.keys(result.ObjectKey)).to.contain('FunctionKey', 'Function Key Removed');
        expect(Object.keys(result.ObjectKey)).to.contain('ObjectKey', 'ObjectKey Key Removed');
    });
});