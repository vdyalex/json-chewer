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

module.exports = {
  fileExists,
  writeFile
};
