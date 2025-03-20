import { Progress } from "../src/index.js";

const progress = new Progress({
    total: 100,
    width: 20,
    mode: 'bar',
    barColor: "#fff",
    processMessage: 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
    processMessageColor: "yellow",
});

for (let i = 0; i < 100; i++) {
    setTimeout(() => {
        progress.process(1, `Step ${i + 1}`);
    }, i * 100);
}