//@flow
/**
 * Utility function to turn callback functions into "regular" functions with async/await
 * @example:
 * Before: await new Promise((resolve,reject) => writeFile(new_readme_path, readme, (err,res) => err ? reject(err) : resolve(res))
 * After:
 * const pWriteFile = promisify(writeFile)
 * await pWriteFile(new_readme_path, readme)
 */
const promisify = fnc => (...args) => {
  return new Promise((resolve,reject) => {
    fnc(...args,(err,res) => {
      if(err){
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

module.exports = {
  promisify
}