import { Progress } from "../src/index.js";

const progress = new Progress({
    total: 100,
    width: 20,
    mode: 'dots',
    showStartMessage: false,
    startMessageColor: 'whiteBright',
    completeMessage: 'Process completed in {{elapsed}}s',
    barColor: "blue",
    // processMessage: '',
    dotsType: 'arc',
});

for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        progress.process(1);
    }, i * 100);
}