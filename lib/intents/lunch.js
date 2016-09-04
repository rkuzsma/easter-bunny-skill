"use strict";
const Promise = require('bluebird'),
  calendars = require('sau-lunch-calendar')(),
  calendarQuery = require(__dirname + '/calendarQuery.js');

module.exports.lunch = function(intent, session) {
  return new Promise((resolve, reject) => {
    // dateQuery is of type AMAZON.DATE
    // See https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference#slot-types
    const dateQuery = intent.slots.dateQuery.value;
    console.log(`dateQuery = ${dateQuery}`);

    // default response
    let sessionAttributes = {};
    let cardTitle = 'SAU Lunch';
    let speechOutput = "Sorry, I don't know what's for lunch.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    let repromptText = "Try again";
    let shouldEndSession = true;

    //let dateObj = new Date(dateQuery);
    let calEntry = calendars[dateQuery]; //calendarQuery.queryByDate(calendars, dateObj);
    console.log("Cal entry: ");
    console.log(calEntry);
    if (!calEntry) {
      speechOutput = "Sorry, I don't have lunch information available on that day.";
    }
    else {
      if (calEntry.food.length == 0) {
        speechOutput = "There is no lunch.";
      }
      else {
        speechOutput = "Lunch is ";
        calEntry.food.forEach(foodEntry => {
          speechOutput += foodEntry.text + ", ";
        });
      }
      if (calEntry.events && calEntry.events.length > 0) {
        speechOutput += " Also, there is a special event. "
        calEntry.events.forEach(event => {
          speechOutput += event.text + " ";
        });
      }
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
