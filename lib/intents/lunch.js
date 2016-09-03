"use strict";
const Promise = require('bluebird'),
  calendars = require('sau-lunch-calendar');

module.exports.lunch = function(intent, session) {
  return new Promise((resolve, reject) => {
    //const firstName = intent.slots.FirstName.value;
    //console.log(`find(firstName=${firstName})`);

    // default response
    let sessionAttributes = {};
    let cardTitle = 'SAU Lunch';
    let speechOutput = "Sorry, I don't know what's for lunch.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    let repromptText = "Try again";
    let shouldEndSession = true;

    speechOutput = "Lunch today is Hamburgers";

    console.log(speechOutput);
    return resolve({
      sessionAttributes: sessionAttributes,
      cardTitle: cardTitle,
      speechOutput: speechOutput,
      repromptText: repromptText,
      shouldEndSession: shouldEndSession
    });
  });
}
