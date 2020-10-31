const { exit_on_error } = require('../../lib/exit_on_error')
const { promisify } = require('../../lib')

const { writeFile, existsSync } = require('fs')
/**
 * Writes readme to disk.
 * @param readme {string} - the readme file content
 * @param location {string} - the directory path where the readme needs to be saved
 * NOTE: If readme already exists it writes to stderr and exits
 */
const write_readme = async ({ readme, location }) => {
  const new_readme_path = location + '/README.g.md'
  if(existsSync(new_readme_path)){
    exit_on_error('No can do. sorry file already exists. You should update it instead\n')
  }
  const pWriteFile = await promisify(writeFile)
  await pWriteFile(new_readme_path, readme)
  process.stdout.write(`done. README.g.md created in ${new_readme_path}\n`)
}


module.exports = {
  write_readme
}