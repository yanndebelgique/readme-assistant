/**
 * Writes to stderr exits script with error code
 * @param error_message
 */
const exit_on_error = (error_message) => {
  process.stderr.write(error_message)
  const ERROR_CODE = 1
  process.exit(ERROR_CODE); // 1 = failure (see https://stackoverflow.com/questions/5266152/how-to-exit-in-node-js)
}