function timelydiff(timestamp, length = null) {
  const now = Date.now();
  const timeDifference = Math.abs((now - timestamp) / 1000);
  const timeDirection = now < timestamp ? "future" : "past";
  const timeUnits = [
    { short: "s", def: "second", max: 60 },
    { short: "m", def: "minute", max: 60 },
    { short: "h", def: "hour", max: 24 },
    { short: "d", def: "day", max: 7 },
    { short: "w", def: "week", max: 4 },
    { short: "mo", def: "month", max: 12 },
    { short: "y", def: "year", max: 10 },
    { short: "dcd", def: "decade", max: Infinity },
  ];

  for (const unit of timeUnits) {
    const { short, def, max } = unit;
    const value = Math.round(timeDifference / (length === "short" ? 1 : max));
    if (value < max) {
      const pluralize = value > 1 ? "s" : "";
      const timeString =
        length === "shorter"
          ? `${value}${short}`
          : `${value} ${def}${pluralize}`;
      return `${timeDirection === "future" ? "in " : ""}${timeString}${
        length === "shorter" ? "" : " ago"
      }`;
    }
  }
}

module.exports.timelydiff = timelydiff;
