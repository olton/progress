declare module '@olton/progress' {
    /**
     * Dots types for activity and progress
     */
    export enum DotsType {
        DOTS = 'dots',
        CLOCK = 'clock',
        EARTH = 'earth',
        MOON = 'moon',
        LINE = 'line',
    }

    /**
     * ProgressBar modes
     */
    export enum ProgressMode {
        DEFAULT = 'default',
        DOTS = 'dots',
        BAR = 'bar',
    }
    
    /**
     * Complete message position
     */
    export enum CompleteMessagePosition {
        DEFAULT = 'default',
        NEWLINE = 'newline',
    }
    
    /**
     * Activity options
     */
    export interface ActivityOptionsInterface {
        /**
         * Activity type
         */
        type?: DotsType,
        /**
         * Show/hide cursor
         */
        cursor?: boolean,
        /**
         * Spaces before activity
         */
        spaceBefore?: number,
        /**
         * Spaces after activity
         */
        spaceAfter?: number,
        /**
         * Activity symbol color
         */
        color?: string,
        /**
         * Process message
         */
        message?: string,
        /**
         * Process message color
         */
        messageColor?: string,
        /**
         * Complete message
         */
        completeMessage?: string,
        /**
         * Complete message color
         */
        completeMessageColor?: string,
        /**
         * Complete message position
         */
        completeMessagePosition?: CompleteMessagePosition
    }

    /**
     * Activity class for creating activity indicators
     */
    export class Activity {
        constructor(options: ActivityOptionsInterface);

        /**
         * Initialize Activity on terminal in position
         * @param msg - message to display
         */
        init(msg?: string): Promise<void>;
        /**
         * Run Activity
         * @param msg - message to display
         * @param timeout - timeout in milliseconds to stop activity
         */
        run(msg?: string, timeout?: number): void;
        /**
         * Stop Activity
         * @param msg - message to display
         */
        stop(msg?: string): void;
        /**
         * Reset Activity with options
         * @param options - options to reset
         */
        reset(options: ActivityOptionsInterface): void;
        /**
         * Process Activity
         * @param msg
         */
        process(msg?: string): void;
        /**
         * Put Progress bar to position
         */
        here(x: number, y: number): void;
    }

    /**
     * Progress options
     */
    export interface ProgressOptionsInterface {
        /**
         * Total steps
         */
        total?: number,
        /**
         * Completed steps
         */
        completed?: number,
        /**
         * Progress bar width in symbols count
         */
        width?: number,
        /**
         * Progress bar mode
         */
        mode: ProgressMode
        /**
         * Complete message color
         */
        completeMessageColor?: string,
        /**
         * Complete message
         */
        completeMessage?: string,
        /**
         * Complete message position
         */
        completeMessagePosition?: CompleteMessagePosition
        /**
         * Progress bar color
         */
        barColor?: string,
        /**
         * Progress bar empty color
         */
        backColor?: string,
        /**
         * Progress bar process message
         */
        message?: string,
        /**
         * Progress bar process message color
         */
        messageColor?: string,
        /**
         * Progress bar dots type when mode is dots
         */
        dotsType?: DotsType,
        /**
         * Last word in progress message when mode is default
         */
        unitName?: string,
        /**
         * Show/hide cursor
         */
        cursor?: boolean,
        /**
         * Spaces before progress bar
         */
        spaceBefore?: number,
        /**
         * Spaces after progress bar
         */
        spaceAfter?: number,
        /**
         * Progress bar symbols
         */
        bar?: string,
        /**
         * Progress bar empty symbols
         */        
        empty?: string,
    }

    /**
     * Progress class for creating progress bars
     */
    export class Progress {
        constructor(options?: ProgressOptionsInterface);
        
        /**
         * Reset Progress bar options
         */
        reset(options?: ProgressOptionsInterface): void;
        /**
         * Initialize Progress bar on terminal in position
         */
        init(msg?: string): Promise<void>;
        /**
         * Process step Progress bar
         */
        process(step?: number, msg?: string): void;
        /**
         * Put Progress bar to position
         */
        here(x: number, y: number): void;
    }
}