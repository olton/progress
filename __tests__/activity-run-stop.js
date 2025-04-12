import { Activity } from '../src/index.js'
import { termx } from '@olton/terminal'

const activity = new Activity({
  color: '#fff',
  messageColor: 'blue',
  type: 'dots',
  completeMessage: '√ Process completed in {{elapsed}}s',
})

console.log('Processing...1')
console.log('Processing...2')
console.log('Processing...3')

activity.init()

console.log('Processing...1')
console.log('Processing...2')
console.log('Processing...3')

activity.run("Processing...")

setTimeout(() => {
  activity.stop()
}, 5000)
