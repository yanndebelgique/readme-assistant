#!/usr/bin/env node
const inquirer = require('inquirer')
const { validate } = require('./commands/validate/validate')
const { generate } = require('./commands/generate/generate')


const valid_commands = [
  'generate',
  'validate'
]

/**
 * grabs command from the passed in variables. Otherwise asks users to select a command
 */
const get_command_to_run = async () => {
  const [ passed_in_command ] = process.argv.slice(2) // see https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
  if(passed_in_command){
    return passed_in_command
  }
  process.stdout.write('hello there. How can I help?')
  const questions = [
      {
        type : 'list',
        name: 'command',
        choices: valid_commands
      }
  ]
  const { command } = await inquirer.prompt(questions)
  return command
}

const run_command = async (command) => {
    switch (command){
      case 'generate':{
        await generate()
        break
      }
      case 'validate': {
        await validate()
      }
    }
}


const main = () => {
  get_command_to_run().then(run_command)
}

main()


