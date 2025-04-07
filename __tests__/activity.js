import { Activity } from '../src/index.js'

const activity = new Activity({
  color: '#fff',
  messageColor: 'yellow',
  type: 'windows',
  completeMessage: '√ Process completed in {{elapsed}}s',
})

// for (let i = 0; i < 100; i++) {
//   setTimeout(() => {
//     progress.process(`Step ${i + 1}`)
//   }, i * 100)
// }
//
// activity.run("Processing...", 5000)

await activity.init()
activity.run("Processing...")
console.log('Processing...2')

setTimeout(() => {
  activity.stop()
}, 5000)
