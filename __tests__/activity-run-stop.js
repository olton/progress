import { Activity } from '../src/index.js'
import { termx } from '@olton/terminal'

const activity = new Activity({
  color: '#fff',
  messageColor: 'blue',
  type: 'dots',
  completeMessage: '√ Process completed in {{elapsed}}s',
})

await activity.init()
activity.run("Processing...")
console.log('Processing...2')

setTimeout(() => {
  activity.stop()
}, 5000)
