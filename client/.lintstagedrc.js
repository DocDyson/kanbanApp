const path = require('path')

const lint = (filenames) =>
    `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

const runPrettier = (filenames) => `yarn prettier --write ${filenames.join(' ')}`

module.exports = {
    '*.{js,jsx,ts,tsx}': [lint, runPrettier],
    '*.(md|json)': [runPrettier],
}
