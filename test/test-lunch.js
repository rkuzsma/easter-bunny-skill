"use strict";
const should = require('chai').should(),
  lunch = require('../lib/intents/lunch').lunch;

describe('sau lunch skill', function() {
  it('should find lunch', function(done) {
    let intent = {};
    let session = {};
    return lunch(intent, session)
      .then(response => {
        response.speechOutput.should.equal("Lunch today is Hamburgers");
        done();
      });
  });
});
