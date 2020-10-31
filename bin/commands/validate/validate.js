const R = require('ramda')
const { readFile } = require('fs')
const { get_git_ls_files_output } = require('../../lib/git_ls_files/get_git_ls_files_output')
const { create_readable_message, issues_with_readme } = require('./issues_with_readme')
const { parse_git_list_files_output } = require('../../lib/git_ls_files/parse_git_list_files_output')
const { parse_readme } = require('./parse_readme')
const { promisify } = require('../../lib')

/**
 * Validates that the README.g.md is consistent with content of the directory
 */
const validate = async () => {
  const dir_path = process.cwd()
  const git_command_output = await get_git_ls_files_output(dir_path)
  const readme_file_to_validate = dir_path + '/README.g.md'
  const pReadFile = promisify(readFile)
  const readme = await pReadFile(readme_file_to_validate, 'utf8')
  const readme_elements = parse_readme(readme)
  const actual_elements = R.compose(
    parse_git_list_files_output
  )(git_command_output)
  const issues = issues_with_readme({
    actual_elements: actual_elements,
    elements_in_readme: readme_elements.map(([type, {name}]) => ([type, name]))
  })
  if(issues.length === 0){
    process.stdout.write('No issues. Good to go!')
  } else {
    process.stderr.write(create_readable_message(issues))
  }
}

module.exports = {
  validate
}
