import { Progress } from '../src/index.js'

const progress = new Progress({
  total: 100,
  width: 20,
  mode: 'dots',
  completeMessage: 'Process completed in {{elapsed}}s',
  showCompleteMessage: true,
  barColor: 'blue',
  processMessage: 'Lorem ipsum dollor sit amet, consectetur adipiscing elit. {{percent}}% completed',
  dotsType: 'dots',
  cursor: true,
  spaceBefore: 1,
  spaceAfter: 1,
})

console.log('Processing...')
console.log('Processing...')

await progress.init()

console.log('Processing...')
console.log('Processing...')
console.log('Processing...')
console.log('Processing...')

for (let i = 0; i < 20; i++) {
  setTimeout(() => {
    progress.process(1, `Processing item ${i + 1}`)
  }, i * 100)
}

