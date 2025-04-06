import ActivityOptions from '../options/activity.js'
import process from 'node:process'
import repeat from '../helpers/repeat.js'
import { dots, moon, clock, earth } from '../helpers/frames.js'
import { term, Cursor, Screen } from '@olton/terminal'

const FRAMES = {
    dots,
    clock,
    moon,
    earth
}

export default class Activity {
    constructor (options = {}) {
        this.options = Object.assign({}, ActivityOptions, options)
        this.setup()
    }
    
    setup () {
        this.start = Date.now()
        this.index = 0
        this.interval = null
        if (this.options.cursor === false) {
            Cursor.hide()
        }
    }
    
    reset (options = {}) {
        this.options = Object.assign({}, this.options, options)
        this.setup()
    }

    async init (msg = '') {
        const o = this.options
        if (msg) { o.message = msg }
        if (o.spaceBefore) { process.stdout.write(repeat('\n', this.options.spaceBefore)) }
        const cur = await Cursor.getPos()
        this.position = { ...cur }
        this.render()
        if (this.options.spaceAfter) {
            process.stdout.write(repeat('\n', this.options.spaceAfter + 1))
        } else {
            process.stdout.write('\n')
        }
    }
    
    process (msg = '') {
        if (msg) {
            this.options.message = msg
        }
        this.render()
    }
    
    render () {
        const { 
            message = 'Processing...', 
            color = 'green', 
            messageColor = 'white',
            type = 'dots',
        } = this.options
        
        if (this.position) {
            Cursor.to(+this.position.x - 1, +this.position.y - 1)
        }

        const frames = FRAMES[type] || FRAMES.dots

        this.index++
        if (this.index >= frames.length) {
            this.index = 0
        }

        const frame = frames[this.index]

        process.stdout.write("\r")
        process.stdout.write(term(`${frame} ${term(message, {color: messageColor})}`, {color}))
        Screen.clearRight()
    }
    
    run (msg = '', timeout = 0) {
        this.interval = setInterval(() => {
            this.process(msg)
        }, 100)
        if (timeout) {
            setTimeout(() => {
                this.stop()
            }, timeout)
        }
    }
    
    stop (msg) {
        clearInterval(this.interval)
        this.interval = null
        Cursor.show()
        this.completeMessage(msg)
    }

    completeMessage (msg) {
        let { completeMessageColor, completeMessage } = this.options

        if (msg) { completeMessage = msg }        
        if (!completeMessage) { return }

        const elapsed = ((Date.now() - this.start) / 1000).toFixed(2)
        const message = completeMessage
          .replace(/{{elapsed}}/g, elapsed)

        process.stdout.write('\r')

        Screen.clearLine()
        process.stdout.write(term(message, {color: completeMessageColor}))
    }
}