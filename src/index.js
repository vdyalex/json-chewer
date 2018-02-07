const util = require('util');

const importCwd = require('import-cwd');
const faker = require('faker');

const repeat = require('./repeat');
const parse = require('./lib/parse');
const { fileExists, prepareLog, writeFile } = require('./lib/helpers');

function generate(template, isVerbose = false) {
  const start = Date.now();
  const generated = parse(template);
  const end = Date.now();

  if (isVerbose) {
    console.log(`Generated in ${(end - start) / 1000}s.`)
  };

  return generated;
}

function execute(input, output, isPretty = false, isVerbose = false) {
  const template = importCwd(input);

  try {
    const generated = generate(template, isVerbose);

    if (output) {
      writeFile(generated, output, isPretty);
    }

    if (isVerbose || !output) {
      const log = prepareLog(generated, isPretty, isVerbose);
      console.log(log);
    }
  } catch (e) {
    console.error('Error while processing the file.', e);
    process.exit(1);
  }
}

function main(input, output, isPretty = false, isVerbose = false) {

  if (!fileExists(input)) {
    console.error(`The file ${input} does not exists. Please inform an existing file.`);
    process.exit(1);
  }

  if (isVerbose) {
    console.info(`Started at ${new Date()}.`)
  };

  const start = Date.now();
  execute(input, output, isPretty, isVerbose);
  const end = Date.now();

  if (isVerbose) {
    console.info(`Completed in ${(end - start) / 1000}s.`)
  };
  process.exit(0);
}

main.faker = faker;
main.repeat = repeat;

module.exports = main;
