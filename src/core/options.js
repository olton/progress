const ProgressOptions = {
    showStartMessage: false,
    startMessageColor: "gray",
    startMessage: 'Starting {{total}} operations',
    total: 1,
    completed: 0,
    width: 30,
    mode: 'default', // default, dots, bar
    showCompleteMessage: false,
    completeMessageColor: "green",
    completeMessage: 'Completed {{total}} operations in {{elapsed}}s',
    barColor: "green",
    processMessage: '',
    processMessageColor: "gray",
    dotsType: 'dots', // dots, clock
}

const RenderOptions = {
    percent: 0,
    filledWidth: 0,
    emptyWidth: 0,
    elapsed: 0,
    rate: 0,
    completed: 0,
    total: 1,
}

export {
    ProgressOptions,
    RenderOptions,
}