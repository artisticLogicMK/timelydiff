# TimelyDiff

TimelyDiff is a JavaScript package that converts Unix timestamps into human-readable time differences. It allows you to easily display the time difference between two points in time in a user-friendly manner.

[Installation](#installation) | [Usage](#usage) | [API](#API) | [Contribution](#Contribution)

### Installation
To install TimelyDiff, you can use NPM:
```shell
npm i timelydiff
```

### Usage
To use TimelyDiff, you need to import it in your JavaScript file:
```javascript
import { timelydiff } from 'timelydiff';
```
Once you've imported the function, you can use it to convert a Unix timestamp into a human-readable time difference:
```javascript
const timestamp = 1708868951000; // February 25th, 2024 08:24:36 AM UTC
const timeDiff = timelydiff(timestamp);
console.log(timeDiff); // "in 1 year"

const timestamp2 = 1667499433271;
console.log(timelydiff(timestamp2)); // "4 months ago"
```

> To generate a timestamp at the current moment and store it for later use, you can use the built-in JavaScript function **Date.now()**, which returns the number of milliseconds since January 1, 1970, 00:00:00 UTC (Unix timestamp).
<br>

Optionally, you can pass a second parameter to the function to specify the length of the output string. By default, the function will return a string in the format of x [unit] ago/in [x] [unit], but you can choose to return a shorter string by setting the length parameter to "short" or "shorter".

```javascript
const timestamp = 1667499433271;
const timeDiffShort = timelydiff(timestamp, "short");
console.log(timeDiffShort); // "4mo ago"

//timelydiff(timestamp, "shorter") -> 4mo
```

### API
**`timelydiff(timestamp, length)`**
Converts a Unix timestamp into a human-readable time difference.

Parameters
- **`timestamp (number)`** - The Unix timestamp to convert.
- **`length (string)`** - Optional. The length of the output string. Can be set to **`"short"`** or **`"shorter"`** to return a shorter string. Defaults to **`null`**.

Returns
A string representing the time difference between the current time and the given timestamp.
<br>

### Contribution
Contributions are welcome and appreciated! If you have an idea for an improvement or a bug fix, please feel free to open an issue or submit a pull request. Before submitting a pull request, please ensure that your code follows the existing code style and has been thoroughly tested. Thank you for helping to make TimelyDiff even better!
<br>

### License
TimelyDiff is released under the **[MIT License](https://opensource.org/license/mit/)**.
