"use strict";
const should = require('chai').should(),
  lunch = require('../lib/intents/lunch').lunch;

describe('sau lunch skill', function() {
  it('should find lunch', function(done) {
    let intent = {
      "name": "Lunch",
      "slots": {
        "dateQuery": {
          "name": "dateQuery",
          "value": "2016-09-30"
        }
      }
    };
    let session = {};
    return lunch(intent, session)
      .then(response => {
        response.speechOutput.should.equal("Lunch today is Macaroni & Cheese, Carrot Sticks, Celery Sticks, Pears in Light Syrup, Variety of Milk, ");
        done();
      });
  });
});
