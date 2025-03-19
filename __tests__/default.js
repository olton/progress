import { Progress } from "../src/index.js";

const progress = new Progress({
    total: 100,
    width: 20,
    mode: 'default',
    startMessageColor: 'whiteBright',
    completeMessage: 'Completed {{total}} tests in {{elapsed}}s',
    barColor: "blue"
});

for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        progress.process();
    }, i * 100);
}