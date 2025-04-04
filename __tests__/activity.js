import { Activity } from '../src/index.js'

const activity = new Activity({
  color: '#fff',
  message: '',
  messageColor: 'yellow',
  type: 'dots',
})

// for (let i = 0; i < 100; i++) {
//   setTimeout(() => {
//     progress.process(`Step ${i + 1}`)
//   }, i * 100)
// }

activity.run("Processing...", 5000)