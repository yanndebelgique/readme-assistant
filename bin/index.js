#!/usr/bin/env node
const inquirer = require('inquirer')
const { validate } = require('./commands/validate/validate')
const { generate } = require('./commands/generate/generate')

const questions = [
  {
    type : 'list',
    name: 'command',
    choices: [
      'generate',
      'validate'
    ]
  }
]
process.stdout.write('hello there. How can I help?')
inquirer.prompt(questions)
  .then(async ({command}) => {
  switch (command){
    case 'generate':{
      await generate()
      break
    }
    case 'validate': {
      await validate()
    }
  }
})





