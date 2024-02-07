//This function takes a Unix timestamp and an optional length parameter,
//and returns a human-readable time difference in the past or future.
function timelydiff(timestamp, length = null, unit = null) {
  // handliing check if the timestamp type provided is a number
  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    throw new Error("Invalid timestamp provided.");
  }
  // handliing check if the length type provided is a string
  if (length !== null && typeof length !== "string") {
    throw new Error("Invalid length parameter.");
  }

  //Calculate the time difference between the current time and the timestamp, in seconds.
  let timeDifference = (Date.now() - timestamp) / 1000;
  let timeDirection = null;

  //Determine whether the time difference is in the past or future (is negative)
  //and sets the timeDirection variable accordingly.
  //It also takes the absolute value of timeDifference in case it's negative.
  if (timeDifference < 0) {
    timeDifference = Math.abs(timeDifference);
    timeDirection = "future";
  } else {
    timeDirection = "past";
  }

  //This is an array of arrays, each containing three elements:
  //a unit of time (short and default),
  //the calculated value of that unit based on the timeDifference,
  //and the maximum value that unit can have
  //(i.e. 60 seconds in a minute, 24 hours in a day, etc.).
  const timeUnits = [
    [{ short: "s", def: "second" }, timeDifference, 60],
    [{ short: "m", def: "minute" }, Math.round(timeDifference / 60), 60],
    [{ short: "h", def: "hour" }, Math.round(timeDifference / 3600), 24],
    [{ short: "d", def: "day" }, Math.round(timeDifference / 86400), 7],
    [{ short: "w", def: "week" }, Math.round(timeDifference / 604800), 4],
    [{ short: "mo", def: "month" }, Math.round(timeDifference / 2592000), 12],
    [{ short: "y", def: "year" }, Math.round(timeDifference / 29030400), 10],
    [
      { short: "dcd", def: "decade" },
      Math.round(timeDifference / 290304000),
      Infinity,
    ],
  ];

  //this helper function returns the time string with "in" or "ago" depending on the time direction.
  function positionTime(timeString) {
    if (timeDirection === "future") {
      return `in ${timeString}`;
    } else {
      return `${timeString}${length === "shorter" ? "" : " ago"}`;
    }
  }

  // if the user picks a unit the value may become large and we should add commas
  function addCommas(num) {
    num = num.toString()
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function formatString(name, value) {
    let trunc = Math.trunc(value)

    //if value > 1, pluralize by adding 's'
    let pluralize = (trunc > 1 || trunc === 0) ? "s" : "";

    const numWithCommas = addCommas(trunc);

    if (length === null) {
        return positionTime(`${numWithCommas} ${name.def}${pluralize}`);
    }

    if (length === "short" || length === "shorter") {
      return positionTime(`${numWithCommas}${name.short}`);
    }
  }

  // for when the user selects a specific unit of time to be returned
  const unitMapping = {
    'seconds': 0,
    'minutes': 1,
    'hours': 2,
    'days': 3,
    'weeks': 4,
    'months': 5,
    'years': 6,
    'decades': 7,
  };

  if (unit !== null) {
    const unitIndex = unitMapping[unit];
    if (unitIndex !== undefined) {
      const [name, value, _] = timeUnits[unitIndex];
      return formatString(name, value);
    }
    else {
      return 'Could not recognize unit type';
    }
  }

  //This is a for loop that iterates over each element in the timeUnits array.
  //It checks if the calculated value for that unit is less than the maximum value for that unit.
  //If so, it formats the output string using the positionTime helper function and the length parameter.
  //If the length parameter is null or longer, it returns the default format (e.g. "2 hours ago"),
  //and if the length parameter is "short" or "shorter",
  //it returns a shorter format (e.g. "2h" or "2 hours").
  for (const [name, value, range] of timeUnits) {
    if (value < range) {
      return formatString(name, value);
    }
  }
}

module.exports.timelydiff = timelydiff;
