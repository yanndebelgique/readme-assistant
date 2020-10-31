const R = require('ramda')
const { promisify } = require('./promisify')
const car = ([elem]) => elem
const cdr = ([,elem]) => elem

const prepend = pre => str => `${pre} ${str}`
const append = app => str => `${sr} ${app}`

const is_file = R.compose(R.equals('file'),car)
const is_dir = R.compose(R.equals('dir'),car)

const make_important = prepend('###')

const get_element = cdr


const tag = tag_name => element => ([ tag_name, element ])

module.exports = {
  car,
  cdr,
  prepend,
  append,
  make_important,
  is_file,
  is_dir,
  promisify,
  get_element,
  tag
}
