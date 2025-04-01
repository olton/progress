const ProgressOptions = {
  total: 1,
  completed: 0,
  width: 30,
  mode: 'default', // default, dots, bar
  showCompleteMessage: false,
  completeMessageColor: 'green',
  completeMessage: '',
  completeMessagePosition: 'default', // default, newline
  barColor: 'green',
  processMessage: '',
  processMessageColor: 'gray',
  dotsType: 'dots', // dots, clock,
  unitName: 'unit',
  cursor: true,
  spaceBefore: 0,
  spaceAfter: 0,
}

const RenderOptions = {
  percent: 0,
  filledWidth: 0,
  emptyWidth: 0,
  elapsed: 0,
  rate: 0,
  completed: 0,
  total: 1,
  unitName: 'unit',
}

export {
  ProgressOptions,
  RenderOptions
}
