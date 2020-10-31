const R = require('ramda')
const { write_readme } = require('./write_readme')
const { get_git_ls_files_output } = require('../../lib/git_ls_files/get_git_ls_files_output')
const { parse_git_list_files_output } = require('../../lib/git_ls_files/parse_git_list_files_output')
const { is_dir, get_element, is_file } = require('../../lib')
const { generate_new_readme } = require('./generate_new_readme')

/**
 * Generates a new readme file based on the content of the current working directory (i.e. the directory you run this command from).
 * Note: this should be run if there is no README.g.md file yet in the directory
 */
const generate = async () => {
  const dir_path = process.cwd()
  const git_command_output = await get_git_ls_files_output(dir_path)
  const readme = R.compose(
    generate_new_readme,
    elements => {
      const files =  elements.filter(is_file).map(get_element)
      const directories = elements.filter(is_dir).map(get_element)
      return {
        files,
        directories
      }
    },
    parse_git_list_files_output
  )(git_command_output)
  await write_readme({readme, location: dir_path})
}

module.exports = {
  generate
}