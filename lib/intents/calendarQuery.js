// Functions to query a calendar for food and events that fall within a date range.
//
// For reference:
//
// Our Calendar object's hashmap of dates are keyed off ISO-8601 formatted Date strings
// relative to UTC time zone.
// For example, 2016-01-31 means January 31, 2016 in the UTC time zone.
"use strict";
const weekDates = require(__dirname + '/weekDates.js');

// Return the date part of an ISO-8601 formatted date-time string
const stripTimeFromISOString = function(isoString) {
  return isoString.substring(0, isoString.indexOf('T'));
}

module.exports.queryByDate = function(calendar, dateObj) {
  let dateKey = dateObj.toISOString();
  dateKey = stripTimeFromISOString(dateKey);
  return calendar[dateKey];
}

module.exports.queryByToday = function(calendar) {
  let today = new Date();
  let dateKey = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  dateKey = stripTimeFromISOString(dateKey);
  return calendar[dateKey];
}

module.exports.queryByTomorrow = function(calendar) {
  let today = new Date();
  let tomorrow = weekDates.dayAfter(today);
  let dateKey = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()).toISOString();
  dateKey = stripTimeFromISOString(dateKey);
  return calendar[dateKey];
}

// Return array of all remaining calendar days' entries for the current week.
module.exports.queryByThisWeek = function(calendar) {
  let today = new Date();
  return _queryByWeek(calendar, today);
}

// Return array of all calendar items next week (Monday through Friday)
module.exports.queryByNextWeek = function(calendar) {
  let today = new Date();
  let nextSunday = weekDates.nextSunday(today);
  return _queryByWeek(calendar, nextSunday);
}

var _queryByWeek = function(calendar, dateObj) {
  let dates = weekDates.remainingWeekDates(dateObj);
  let entries = [];
  dates.forEach(date => {
    let dateKey = stripTimeFromISOString(date.toISOString());
    let entry = calendar[dateKey];
    if (entry !== undefined) {
      entries.push(entry);
    }
  });
  return entries;
}
