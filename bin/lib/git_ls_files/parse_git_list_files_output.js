const { tag } = require('../index')
/**
 * converts the output from git list-files into an array of files and directories.
 * "git list-files" returns array of files in git repo. They are represented with their path from the git root.
 * @param git_list_files_output. The output of running "git list-files"
 * returns Array<['file', file_name] or ['dir', directory_name]>
 * @example
 * Input
 * [
 *   yo.js
 *   foo/bar.js
 *   foo/zar.js
 * ]
 * Output
 * [
 *  [ 'file', 'yo.js']
 *  [ 'dir', 'foo']
 * ]
 */
const parse_git_list_files_output = (git_list_files_output) => {
  const set_to_array = set => [...set]

  const file_names = (() => {
    const is_file = file => !file.includes('/')
    const _files = new Set(git_list_files_output.filter(is_file).map(str => str.trim()))
    _files.delete('')
    return set_to_array(_files)
  })()

  const directory_names = (() => {
    const file_is_in_directory = file => file.split('/').length > 1
    const get_root_directory = file => file.split('/')[0]
    const set = new Set(git_list_files_output.filter(file_is_in_directory).map(get_root_directory))
    set.delete('') // edge case. Not sure why '' is in the set. Simple fix is just removing it
    return set_to_array(set)
  })()

  const create_file_element = tag('file')
  const create_dir_element = tag('dir')

  return [
    ...file_names.map(create_file_element),
    ...directory_names.map(create_dir_element),
  ]
}

module.exports = {
  parse_git_list_files_output
}
