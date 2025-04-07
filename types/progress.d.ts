export enum ProgressMode {
    DEFAULT = 'default',
    DOTS = 'dots',
    BAR = 'bar',
}

export enum ProgressDotsType {
    DOTS = 'dots',
    CLOCK = 'clock',
    EARTH = 'earth',
    MOON = 'moon',
    LINE = 'line',
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
    mode?: 'default' | 'dots' | 'bar';
    dotsType?: string;
    unitName?: string;
    bar?: any;
    completeMessage?: string;
    completeMessageColor?: string;
    completeMessagePosition?: 'default' | 'inline' | string;
}

declare class Progress {
    options: ProgressOptionsInterface;

    constructor(options?: ProgressOptionsInterface);

    reset(options?: ProgressOptionsInterface): void;
    init(msg?: string): Promise<void>;
    process(step?: number, msg?: string): void;
}

export default Progress;