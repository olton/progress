export enum ActivityTypes {
    DOTS = 'dots',
    CLOCK = 'clock',
    EARTH = 'earth',
    MOON = 'moon',
    LINE = 'line',
}

export interface ActivityOptionsInterface {
    type?: string, // dots, clock, earth, moon
    cursor?: boolean,
    spaceBefore?: number,
    spaceAfter?: number,
    color?: string,
    messageColor?: string,
    completeMessage?: string,
    completeMessageColor?: string,
}

declare class Activity {
    constructor(options: ActivityOptionsInterface);
    init(msg?: string): Promise<void>;
    run(msg?: string, timeout?: number): void;
    stop(msg?: string): void;
    reset(options: ActivityOptionsInterface): void;
    process(msg?: string): void;
}

export default Activity;