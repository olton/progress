import { Progress } from '../src/index.js'

const progress = new Progress({
  total: 20,
  width: 20,
  mode: 'dots',
  completeMessage: 'Process completed in {{elapsed}}s',
  showCompleteMessage: true,
  completeMessagePosition: 'newline',
  barColor: 'blue',
  processMessage: 'Lorem ipsum dollor sit amet, consectetur adipiscing elit. {{percent}}% completed',
  dotsType: 'star',
  cursor: true,
  spaceBefore: 1,
  spaceAfter: 1,
})

await progress.init()

for (let i = 0; i < 20; i++) {
  setTimeout(() => {
    progress.process(1, `Processing item ${i + 1}`)
  }, i * 100)
}

