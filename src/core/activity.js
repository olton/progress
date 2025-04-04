import { cursor, getCursorPos } from '../helpers/console.js'
import ActivityOptions from '../options/activity.js'
import process from 'node:process'
import repeat from '../helpers/repeat.js'
import { dots, moon, clock, earth } from '../helpers/frames.js'
import colorDef from '../helpers/color.js'

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
        cursor( this.options.cursor )
    }
    
    reset (options = {}) {
        this.options = Object.assign({}, this.options, options)
        this.setup()
    }

    async init (msg = '') {
        const o = this.options
        if (msg) { o.message = msg }
        if (o.spaceBefore) { process.stdout.write(repeat('\n', this.options.spaceBefore)) }
        const cur = await getCursorPos()
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
            process.stdout.cursorTo(+this.position.x - 1, +this.position.y - 1)
        }

        const frames = FRAMES[type] || FRAMES.dots

        this.index++
        if (this.index >= frames.length) {
            this.index = 0
        }

        const frame = frames[this.index]

        const colors = colorDef({ bar: color, process: messageColor })

        process.stdout.write("\r")
        process.stdout.write(colors.bar(`${frame} ${colors.process(message)}`))
        process.stdout.clearLine(1)
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
    
    stop () {
        clearInterval(this.interval)
        this.interval = null
        cursor(true)
    }
}