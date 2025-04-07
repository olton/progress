import ActivityOptions from '../options/activity.js'
import repeat from '../helpers/repeat.js'
import { dots, moon, clock, earth } from '../helpers/frames.js'
import { term, Cursor, Screen } from '@olton/terminal'

const terminal = process.stdout

const FRAMES = {
    dots,
    clock,
    moon,
    earth
}

/**
 * Activity class for displaying a loading animation in the terminal.
 */
export default class Activity {
    constructor (options = {}) {
        this.options = Object.assign({}, ActivityOptions, options)
        this.#setup()
    }

    /**
     * Sets up the initial state of the Activity instance.
     */
    #setup () {
        this.start = Date.now()
        this.index = 0
        this.interval = null
        if (this.options.cursor === false) {
            Cursor.hide()
        }
    }

    /**
     * Resets the Activity instance with new options.
     * @param options
     */
    reset (options = {}) {
        this.options = Object.assign({}, this.options, options)
        this.#setup()
    }

    /**
     * Initializes the Activity instance, displaying the loading animation and save cursor position.
     * @param msg
     * @returns {Promise<void>}
     */
    async init (msg = '') {
        const o = this.options
        if (msg) { o.message = msg }
        if (o.spaceBefore) { terminal.write(repeat('\n', this.options.spaceBefore)) }
        const cur = await Cursor.getPos()
        this.position = { ...cur }
        this.#render()
        if (this.options.spaceAfter) {
            terminal.write(repeat('\n', this.options.spaceAfter + 1))
        } else {
            terminal.write('\n')
        }
    }

    /**
     * Processes the loading animation, updating the message if provided.
     * @param msg
     */
    process (msg = '') {
        if (msg) {
            this.options.message = msg
        }
        this.#render()
    }

    /**
     * Renders the loading animation in the terminal.
     */
    #render () {
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

        terminal.write("\r")
        terminal.write(term(`${frame} ${term(message, {color: messageColor})}`, {color}))
        Screen.clearRight()
    }

    /**
     * Starts the loading animation with an optional message and timeout.
     * @param msg
     * @param timeout
     */
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

    /**
     * Stops the loading animation and clears the message.
     * @param msg
     */
    stop (msg) {
        clearInterval(this.interval)
        this.interval = null
        Cursor.show()
        this.#completeMessage(msg)
    }

    /**
     * Displays the completion message after stopping the loading animation.
     * @param msg
     */
    #completeMessage (msg) {
        let { completeMessageColor, completeMessage } = this.options

        if (msg) { completeMessage = msg }        
        if (!completeMessage) { return }

        const elapsed = ((Date.now() - this.start) / 1000).toFixed(2)
        const message = completeMessage
          .replace(/{{elapsed}}/g, elapsed)

        terminal.write('\r')

        Screen.clearLine()
        terminal.write(term(message, {color: completeMessageColor}))
    }
}