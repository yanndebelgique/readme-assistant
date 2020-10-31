const R = require('ramda')
const { is_dir, get_element, is_file, make_important, prepend } = require('../../lib')

/**
 * Generates a readme based on elements
 * element = [element_type, element]
 * element_type = dir or file
 * element = { description: string, name: string }
 */
const generate_readme = (elements) => {
  const files = elements.filter(is_file).map(get_element)
  const directories = elements.filter(is_dir).map(get_element)

  const join_element_name_with_description = element => {
    return `${element.name} \n ${element.description} \n`
  }
  /**
   * test: format_element('Dir')({{name: 'foo', description: 'this is bar'}}) = '### Dir: foo \n this is bar \n'
   */
  const format_element = element_type => R.compose(
    prepend(make_important(`${element_type}:`)),
    join_element_name_with_description
  )

  return readme_template({
    files_section: (files).map(format_element('File')).join(''),
    directories_section:  (directories).map(format_element('Directory')).join('')
  })
}

const readme_template = ({directories_section, files_section}) => `
# Table of content
  
## Directories
${directories_section}
  
## Files
${files_section}
`

module.exports = {
  generate_readme
}
