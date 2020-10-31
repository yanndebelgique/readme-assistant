const R = require('ramda')
const { cdr, car, tag } = require('../../lib')

/**
 * returns true if content of readme and actual files and directories are correct
 * @param elements_in_readme - parsed content in readme (i.e. what's in the readme)
 * @param actual_elements - the actual elements in the directory (i.e. what's in the directory)
 * @returns Array<Issue>
 *   Issue = issue type + element. Issue type can be 'remove' or 'add'. 'remove' tag means the element should be removed from README.
 *   'add' tag means the element should be added in README. Elements can be a file or a directory
 */

const issues_with_readme = ({elements_in_readme, actual_elements})  => {
  const to_remove_issues_in_readme = R.differenceWith(R.equals,elements_in_readme,actual_elements).map(tag('remove'))
  const to_add_issues_in_readme = R.differenceWith(R.equals,actual_elements,elements_in_readme).map(tag('add'))
  return [
    ...to_remove_issues_in_readme,
    ...to_add_issues_in_readme
  ]
}

const is_issue = tag => elem => car(elem) === tag
const get_element = cdr

/**
 * Creates a readable message to user based on the issues
 * @param issues - list of issues
 * @return {string} - human readable message
 */
const create_readable_message = issues => {
  if(issues.length == 0){
    return 'no issues! good job'
  }
  const entries_to_remove = issues.filter(is_issue('remove')).map(get_element)
  const entries_to_add = issues.filter(is_issue('add')).map(get_element)
  const get_name = cdr
  const to_remove_msg = `There are ${entries_to_remove.length} to remove: ${entries_to_remove.map(get_name).join(', ')}`
  const to_add_msg = `There are ${entries_to_add.length} to add: ${entries_to_add.map(get_name).join(', ')}`
  return to_remove_msg + (entries_to_add.length !== 0 ? ` and ${to_add_msg}` : '')
}

module.exports ={
  issues_with_readme,
  create_readable_message
}