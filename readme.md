# Progress

Progress is a simple command line tool to track your progress on various tasks. 

<div align="center">

![Demo](progress.gif)

</div>

## Installation

```bash
npm install -g @olton/progress
```

## Usage

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

## Options

```js
const ProgressOptions = {
    showStartMessage: true,
    startMessageColor: "gray",
    startMessage: 'Starting {{total}} operations',
    total: 1,
    completed: 0,
    width: 30,
    mode: 'default', // default, dots
    showCompleteMessage: true,
    completeMessageColor: "green",
    completeMessage: 'Completed {{total}} operations in {{elapsed}}s',
    barColor: "green",
    processMessage: '',
    processMessageColor: "gray",
    dotsType: 'dots', // dots, clock
}
```
