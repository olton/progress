import {build,  context} from 'esbuild'
import progress from "@olton/esbuild-plugin-progress"
import { replace } from "esbuild-plugin-replace";
import pkg from "./package.json" with {type: "json"};
import process from 'node:process'

const production = process.env.MODE === "production"
const version = pkg.version
const banner = `
/*!
 * Progress v${version}
 * Create progress bars and activities in terminal
 * Build: ${new Date().toLocaleString()}
 * Copyright 2025 by Serhii Pimenov
 * Licensed under MIT
 */
`

const options = {
  entryPoints: ['./src/index.js'],
  outfile: './dist/progress.js',
  bundle: true,
  minify: false,
  sourcemap: false,
  format: 'esm',
  banner: {
    js: banner
  },
  plugins: [
    progress({
      text: 'Building Progress...',
      succeedText: `Progress built successfully in %s ms!`
    }),
    replace({
      '__BUILD_TIME__': new Date().toLocaleString(),
      '__VERSION__': version,
    })
  ],
}

if (production) {
  await build(options)
} else {
  const ctx = await context(options)
  await Promise.all([
    ctx.watch(),
  ])
}