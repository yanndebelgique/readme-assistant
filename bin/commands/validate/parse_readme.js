const parse_readme_line = line => {
  const [file_name ='', description = ''] = line.split('\n')
  return {
    name: file_name.trim(),
    description: description.trim()
  }
}

const create_element = ({ name, description, type }) => [type, { name, description}]
const create_element_of_type = type => input => create_element({...input, type})

const trim = s => s.trim()
const non_empty = s => s !== ''

/**
 * Takes a readme as string input and returns list of elements which can be a file or a dir.
 * Elements have 3 properties:
 * - type
 * - name
 * - description
 *
 * NOTE: this parsing is very brittle nad needs more work. It expects the README file to have a specific structure:
 * ```
 * <SOME INTRODUCTION>
 *
 * ## Directories
 *
 * ### Directory: <directory name>
 * ...
 *
 * ## Files
 *
 * ### File: <file name>
 * ...
 *
 * ```
 */
const parse_readme = readme => {
  const [directories_part, files_part] = readme.split('## Directories')[1].split('## Files')

  const dirs = directories_part.split('### Directory:')
    .map(trim)
    .filter(non_empty)
    .map(parse_readme_line)
    .map(create_element_of_type('dir'))

  const files = files_part.split('### File:')
    .map(trim)
    .filter(non_empty)
    .map(parse_readme_line)
    .map(create_element_of_type('file'))

  return [
    ...dirs ,
    ...files
  ]
}

module.exports = {
  parse_readme
}