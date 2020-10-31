const { promisify } = require('../promisify')
const { exec } = require("child_process")


const run_command = async (command) => {
  const pExec = promisify(exec)
  return await pExec(command)
}

/**
 * Runs git ls-files in directory path provided and returns result in array form
 *
 * Example:
 * --------
 * Directory "/yo" contains:
 * foo.js
 * bar/jazz.js
 *
 * then ...
 * get_git_ls_files_output("/yo") = ['foo.js', 'bar/jazz.js']
 */
const get_git_ls_files_output = async (directory_path) => {
  const command =  `cd ${directory_path} \n git ls-files`
  const res = await run_command(command)
  return res.split('\n')
}

module.exports = {
  get_git_ls_files_output
}

