<div align="center">

# Progress

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![NPM Version](https://img.shields.io/npm/v/%40olton%2Fprogress)
![Static Badge](https://img.shields.io/badge/dependencies-none-green)



Progress is a simple command line tool to track your progress on various tasks. You can use `ProgressBar` or `Activity` to show the progress of your tasks in the terminal.

</div>

<div align="center">

![Demo](progress.gif)

</div>

## Installation

```bash
npm install @olton/progress
```

## ProgressBar Usage 

```js
import { Progress } from "@olton/progress";

const options = {}
const progress = new Progress(options);

for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        progress.process();
    }, i * 100);
}
```

### process()

The `process(processMessage, increment)` method updates the progress bar. You can call it multiple times to update the progress.

```js
progress.process();
```

Default values for `increment` is `1` and for `processMessage` is `''`.

### reset()
The `reset()` method resets the progress bar to the initial state. You can call it multiple times to reset the progress.

```js
progress.reset();
```

### Options

```js
const ProgressOptions = {
  total: 0,
  completed: 0,
  width: 30,
  mode: 'default', // default, dots, bar
  completeMessageColor: 'green',
  completeMessage: '',
  completeMessagePosition: 'default', // default, newline
  barColor: 'green',
  backColor: 'gray',
  processMessage: '',
  processMessageColor: 'gray',
  dotsType: 'dots', // dots, clock, earth, moon
  unitName: 'unit',
  cursor: true,
  spaceBefore: 0,
  spaceAfter: 0,
  bar: '█',
  empty: '░',
}
```

#### Options Description
- `total`: Total number of operations. Default is `0`.
- `completed`: Number of completed operations. Default is `0`.
- `width`: Width of the progress bar. Default is `30`.
- `mode`: Mode of the progress bar: `default`, `dots`, or `bar`.
- `completeMessageColor`: Color of the complete message. Default is `green`.
- `completeMessage`: Message shown when the progress is completed. Default is `''`.
- `completeMessagePosition`: Position of the complete message: `default` or `newline`.
- `barColor`: Color of the progress bar. Default is `green`.
- `backColor`: Color of the empty part of the progress bar. Default is `gray`.
- `processMessage`: Message shown when the progress is updated. Default is `''`.
- `processMessageColor`: Color of the process message. Default is `gray`.
- `dotsType`: Type of the dots. See `Dots Types` below. Default is `dots`.
- `unitName`: Name of the unit. Default is `unit`.
- `cursor`: Show cursor. Default is `true`.
- `spaceBefore`: Space before the progress bar. Default is `0`.
- `spaceAfter`: Space after the progress bar. Default is `0`.
- `bar`: Character used for the progress bar. Default is `█`.
- `empty`: Character used for the empty part of the progress bar. Default is `░`.

### completeMessage
The message shown when the progress is completed. You can use the following replacers:
- `{{elapsed}}`: Elapsed time in seconds.

For example: `Completed {{total}} operations in {{elapsed}}s`.

### processMessage
The message shown when the progress is updated. You can use the following replacers:
- `{{total}}`: Total number of operations.
- `{{completed}}`: Number of completed operations.
- `{{elapsed}}`: Elapsed time in seconds.
- `{{percent}}`: Percentage of completion.
- `{{rate}}`: Rate of completion.

For example: `Completed {{completed}} of {{total}} in {{elapsed}}s ({{percent}}%)`.

> [!NOTE]
> You can use the `processMessage` for `bar`, and `dots` modes. For `default` mode, the `processMessage` is not used.

### Progress Modes

- `default`: Shows a progress bar with the percentage of completion.
- `dots`: Shows a series of dots to indicate progress.
- `bar`: Shows a progress bar with the percentage of completion.


### Colors
For `bar`, `processMessage`, `startMessage`, and `completeMessage` you can use different colors.

You can use named colors - `black`, `red`, `green`, `yellow`, `blue`,
`magenta`, `cyan`, `white`, `blackBright`, `gray`, `redBright`, `greenBright`,
`yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`.

Also, you can use hex colors. For example: `#ff0000`.

### Dots Types
`dots`: Shows a series of dots to indicate progress.
```js
["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
```
`clock`: Shows a clock to indicate progress.
```js
["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"]
```
`moon`: Shows a moon to indicate progress.
```js
["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"]
```
`earth`: Shows an earth to indicate progress.
```js
["🌍", "🌍", "🌍", "🌎", "🌎", "🌎", "🌏", "🌏", "🌏"]
```
`line`: Shows a line to indicate progress.
```js
['|', '/', '─', '\\', '|', '/', '─', '\\', '|']
```
`windows`: Shows a series of dots to indicate progress.
```js
['⢿', '⣻', '⣽', '⣾', '⣷', '⣯', '⣟', '⡿']
```

## Activity

Use activity to show the progress of a task that is not a linear process. For example, you can use it to show the progress of a file upload or download.

### Options

```js
export default {
  type: 'dots',
  cursor: true,
  spaceBefore: 0,
  spaceAfter: 0,
  color: 'green',
  message: '',
  messageColor: 'white',
  completeMessage: '',
  completeMessageColor: 'whiteBright',
}
```

#### Options Description
- `type`: Type of the activity. See `Dots Types` above. Default is `dots`.
- `cursor`: Show cursor. Default is `true`.
- `spaceBefore`: Space before the activity. Default is `0`.
- `spaceAfter`: Space after the activity. Default is `0`.
- `color`: Color of the activity. Default is `green`.
- `message`: The process message. Default is `''`.
- `messageColor`: Color of the message. Default is `white`.
- `completeMessage`: Message shown when the activity is completed. Default is `''`.
- `completeMessageColor`: Color of the complete message. Default is `whiteBright`.

### Usage 

#### Create activity

```js
import { Activity } from "@olton/progress";

const activity = new Activity({
  color: '#fff',
  message: '',
  messageColor: 'yellow',
  type: 'dots',
})
```

#### process()

You can use the `process()` method to update the activity.

```js
const activity = new Activity({...})

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    activity.process(`Step ${i + 1}`)
  }, i * 100)
}
```

#### run()

The `run(msg, timeout)` method starts the activity. This method runs an interval to update the activity.
You can use the `msg` parameter to show a message. The `timeout` parameter is used to stop the activity after a specified time.

```js
const activity = new Activity({...})

// Run activity and stop after 5 seconds
activity.run("Processing...", 5000)
```

#### stop()

The `stop(msg)` method stops the activity. You can use the `msg` parameter to show a message when the activity is stopped.

```js
const activity = new Activity({...})

activity.run("Processing...")

setTimeout(() => {
  activity.stop("Done!")
}, 5000)
```

## Method save()
The `save()` method save the position of progress or activity. 
The saved position will be restored when you call `process()` method.

```js
const progress = new Progress({...});
progress.save()
```

## Method here()
The `here()` method save the position of progress or activity using async function `Cursor.getPos()`.
This function returns a promise with the position object `{ x, y }`. 
You can use this value to output additional information to the terminal when the progress or activity is processed.

```js
const progress = new Progress({...});
await progress.here()
```

---
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
## Code Standards

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

--- 
## Support

If you like this project, please consider supporting it by:

+ Star this repository on GitHub
+ Sponsor this project on GitHub Sponsors
+ **PayPal** to `serhii@pimenov.com.ua`.
+ [**Patreon**](https://www.patreon.com/metroui)
+ [**Buy me a coffee**](https://buymeacoffee.com/pimenov)

---

Copyright (c) 2025 by [Serhii Pimenov](https://pimenov.com.ua)