declare module '@olton/progress' {
    export enum DotsType {
        DOTS = 'dots',
        CLOCK = 'clock',
        EARTH = 'earth',
        MOON = 'moon',
        LINE = 'line',
    }

    export enum ProgressMode {
        DEFAULT = 'default',
        DOTS = 'dots',
        BAR = 'bar',
    }
    
    export interface ActivityOptionsInterface {
        type?: DotsType, // dots, clock, earth, moon
        cursor?: boolean,
        spaceBefore?: number,
        spaceAfter?: number,
        color?: string,
        messageColor?: string,
        completeMessage?: string,
        completeMessageColor?: string,
    }

    export class Activity {
        constructor(options: ActivityOptionsInterface);
        init(msg?: string): Promise<void>;
        run(msg?: string, timeout?: number): void;
        stop(msg?: string): void;
        reset(options: ActivityOptionsInterface): void;
        process(msg?: string): void;
    }

    export interface ProgressOptionsInterface {
        total?: number;
        cursor?: boolean;
        spaceBefore?: number;
        spaceAfter?: number;
        processMessage?: string;
        processMessageColor?: string;
        width?: number;
        barColor?: string;
        mode?: ProgressMode;
        dotsType?: DotsType;
        unitName?: string;
        bar?: any;
        completeMessage?: string;
        completeMessageColor?: string;
        completeMessagePosition?: 'default' | 'inline' | string;
    }

    export class Progress {
        options: ProgressOptionsInterface;

        constructor(options?: ProgressOptionsInterface);
        reset(options?: ProgressOptionsInterface): void;
        init(msg?: string): Promise<void>;
        process(step?: number, msg?: string): void;
    }
}