const path = require('path');
const fs = require('fs');

function fileExists(path) {
  try {
    return fs.statSync(path || '').isFile();
  } catch (e) {
    return false;
  }
}

function writeFile(output, filename, isPretty = false) {
  const json = isPretty
    ? JSON.stringify(output, null, '  ')
    : JSON.stringify(output);

  const written = fs.writeFileSync(filename, json);
  console.info(`JSON saved into file ${filename}`);
}

function prepareLog(generated, isPretty = false, isVerbose = false) {
  const options = { maxArrayLength: null, colors: true, depth: null };

  if (isVerbose) {
    return util.inspect(generated, options);
  }

  return isPretty
    ? JSON.stringify(generated, null, '  ')
    : JSON.stringify(generated);
}

module.exports = {
  fileExists,
  prepareLog,
  writeFile
};
