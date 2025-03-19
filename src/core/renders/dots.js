import { RenderOptions} from "../options.js";
import process from 'node:process';
import colorDef from '../color.js';

const dots  = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
const clock = ["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"]

const FRAMES = {
    dots,
    clock,
}

let index = 0;

export default function (state = {}) {
    const { 
        percent, 
        elapsed, 
        rate, 
        completed, 
        total, 
        color = "green",
        processMessage,
        processMessageColor = "gray",
        type = 'dots',
    } = Object.assign({}, RenderOptions, state);

    const frames = FRAMES[type] || FRAMES.dots;
    
    index++
    if (index >= frames.length) {
        index = 0;
    }

    const frame = frames[index];
    const message = processMessage
        .replace(/{{percent}}/g, percent)
        .replace(/{{completed}}/g, completed)
        .replace(/{{total}}/g, total)
        .replace(/{{elapsed}}/g, elapsed)
        .replace(/{{rate}}/g, rate);
    
    const colors = colorDef({bar: color, process: processMessageColor});
    
    process.stdout.write('\r');
    process.stdout.write(colors.bar(`${completed === total ? colors.complete('√') : frame} ${colors.process(message)} `));
}