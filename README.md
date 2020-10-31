# How to manual

CLI has 3 commands:
- readme-assistant generate
- readme-assistant validate
- readme-assistant update (not implemented yet)

## generate command

generates a README.g.md in the directory based on content of the directory

## validate command

verifies README.g.md contains all the necessary entries

## update command (upcoming)

It takes the README.g.md in the directory and adds any missing entries in the README.g.md file

# How to add descriptions to this file

You need to preserve the structure of the file. Otherwise validation and updating will not work.
The tool expects the README to be in the following format:

```
<SOME INTRODUCTION>

## Directories

### Directory: <directory name>

<-- write a description here -->

### Directory: <directory name>

<-- write a description here -->

...

## Files

### File: <file name>

<-- write a description here -->

### File: <file name>

<-- write a description here -->
...
``` 
