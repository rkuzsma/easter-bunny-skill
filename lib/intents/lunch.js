"use strict";
const Promise = require('bluebird'),
  calendars = require('sau-lunch-calendar')();

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

    let today = new Date();
    let dateKey = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
    let calEntry = calendars[dateKey];
    console.log("Date specified: " + dateKey);
    console.log("Cal entry: ");
    console.log(calEntry);
    if (!calEntry) {
      speechOutput = "Sorry, I don't have lunch information available today.";
    }
    else {
      if (calEntry.food.length == 0) {
        speechOutput = "There is no lunch today.";
      }
      else {
        speechOutput = "Lunch today is ";
        calEntry.food.forEach(foodEntry => {
          speechOutput += foodEntry.text + ", ";
        });
      }
    }
    if (calEntry.events && calEntry.events.length >= 0) {
      speechOutput += " Also, there is a special event today. "
      calEntry.events.forEach(event => {
        speechOutput += event.text + " ";
      });
    }

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
