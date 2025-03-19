import chalk from 'chalk';
import { RenderOptions} from "../options.js";
import process from 'node:process';
import colorDef from '../color.js';

export default function (state = {}) {
    const { 
        percent, 
        filledWidth, 
        emptyWidth, 
        elapsed, 
        rate, 
        completed, 
        total, 
        color = "green",
        processMessage,
        processMessageColor = "gray",
    } = Object.assign({}, RenderOptions, state);

    const message = processMessage
        .replace(/{{percent}}/g, percent)
        .replace(/{{completed}}/g, completed)
        .replace(/{{total}}/g, total)
        .replace(/{{elapsed}}/g, elapsed)
        .replace(/{{rate}}/g, rate);

    const colors = colorDef({bar: color, process: processMessageColor});
    
    process.stdout.write('\r');
    process.stdout.write(colors.process(`${colors.bar("[")}${colors.bar('◼'.repeat(filledWidth))}${' '.repeat(emptyWidth > 0 ? emptyWidth : 0)}${colors.bar("]")} ${message}`));
}