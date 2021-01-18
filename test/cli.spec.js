var assert = require('assert');

const utils = require('../src/utils');

var assert = require('assert');
describe('Utils Function', function() {
  describe('#isNumber', function() {
    it('should return false when the value is not a number', function() {
      assert.strictEqual(false, utils.isNumber("abc"));
    });
  });

  describe('#checkValideElement', function() {
    var element = { payer: 'Beatrice', creditor: 'Carl', amount: '28.76' }
    it('should return undefined when all properties is OK', function() {
      assert.strictEqual(undefined, utils.checkValidElement(element));
    });
  });

  describe('#checkPayerNotValid', function() {
    var element = { payer: '', creditor: 'Carl', amount: '28.76' }
    it('should return false when the properties in element is not a null or undefined', function() {
      assert.strictEqual(true, utils.checkValidElement(element));
    });
  });

  describe('#checkCreditorNotValid', function() {
    var element = { payer: 'Beatrice', creditor: '', amount: '28.76' }
    it('should return false when the properties in element is not a null or undefined', function() {
      assert.strictEqual(true, utils.checkValidElement(element));
    });
  });

  describe('#checkAmountNotNumber', function() {
    var element = { payer: 'Beatrice', creditor: 'Carl', amount: 'xxxx' }
    it('should return true when the property amount in element is not a number', function() {
      assert.strictEqual(true, utils.checkValidElement(element));
    });
  });
});