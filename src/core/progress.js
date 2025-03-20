import process from 'node:process';
import {ProgressOptions, RenderOptions} from "./options.js";
import {color} from './color.js';
import {clear, cursor} from './console.js';
import defaultRender from "./renders/default.js";
import dotsRender from "./renders/dots.js";
import barRender from "./renders/bar.js";

const RENDERS = {
    default: defaultRender,
    dots: dotsRender,
    bar: barRender,
}

export default class Progress {
    constructor(options = {}) {
        this.options = Object.assign({}, ProgressOptions, options);
        this.total = this.options.total || 1;
        this.completed = 0;
        this.start = Date.now();
        cursor.hide();
        this.render();
    }
    
    process(step = 1, processMessage = '') {
        this.completed += step;
        if (processMessage) {
            this.options.processMessage = processMessage;
        } 
        this.render();
    }
    
    completeMessage(){
        const { completeMessageColor, completeMessage, showCompleteMessage } = this.options;
        if (!showCompleteMessage) {
            return;
        }
        
        const elapsed = ((Date.now() - this.start) / 1000).toFixed(2);
        const message = completeMessage
            .replace(/{{total}}/g, this.total)
            .replace(/{{elapsed}}/g, elapsed)
        
        process.stdout.write(["default", "inline"].includes(this.options.completeMessagePosition) ? '\r' : '\n');
        clear(0, 1);
        process.stdout.write(color(completeMessageColor)(message));
        process.stdout.write('\n');
    }
    
    calculate(){
        const percent = Math.round((this.completed / this.total) * 100);
        const filledWidth = Math.round((this.completed / this.total) * this.options.width);
        const emptyWidth = this.options.width - filledWidth;

        const elapsed = ((Date.now() - this.start) / 1000).toFixed(1);
        const rate = this.completed > 0 ? (elapsed / this.completed).toFixed(2) : '0.00';

        return Object.assign({}, RenderOptions, {
            percent,
            filledWidth,
            emptyWidth,
            elapsed,
            rate,
            completed: this.completed,
            total: this.options.total,
            color: this.options.barColor,
            processMessage: this.options.processMessage,
            processMessageColor: this.options.processMessageColor,
            type: this.options.dotsType,
        })
    }
    
    render(){
        const state = this.calculate();
        const render = RENDERS[this.options.mode] || defaultRender;
 
        render(state);
        
        if (this.completed >= this.options.total) {
            cursor.show();
            this.completeMessage();
        }
    }
}