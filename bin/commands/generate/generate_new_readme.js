const R = require('ramda')
const { generate_readme } = require('./generate_readme')
/**
 * Used when there is no readme yet
 */
const generate_new_readme = ({ files, directories }) => {
  const to_element = type => element_name => ([type, {name: element_name}])
  const add_description_placeholder = ([type, {name}]) => [type, {name, description: R.compose(add_some_padding, add_common_descriptions)(name)}]
  return generate_readme([
    ...directories.map(R.compose(add_description_placeholder, to_element('dir'))),
    ...files.map(R.compose(add_description_placeholder, to_element('file')))
  ])
}
const add_some_padding = str => `\n${str}\n`

/**
 * Adds descriptions to often used files (e.g., .gitignore)
 */
const add_common_descriptions = (file_name) => {
  const common_descriptions = [
    { file_name: '.gitignore', description: 'Specifies intentionally untracked files to ignore [here](https://git-scm.com/docs/gitignore)'},
    { file_name: 'README.md', description: 'Free-form readme. Everything except description of directory structure (which should be in README.g.md).' },
    { file_name: 'package-lock.json', description: 'A manifestation of the manifest. More information [here](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json)'},
    { file_name: 'package.json', description: 'Specifics of npm\'s package.json handling. More information [here](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)'}
  ]
  const has_description = R.propEq('file_name', file_name)
  const { description } = common_descriptions.find(has_description) || {}
  if(description){
    return description
  } else {
    return 'ADD INFO HERE'
  }
}


module.exports = {
  generate_new_readme
}
