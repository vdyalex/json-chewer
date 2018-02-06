#! /usr/bin/env node --harmony
const path = require('path');

const commander = require('commander');
const package = require('../package');
const chewer = require('../src');

const program = commander
  .description('Generate random JSON file using pure javascript')
  .arguments('<file>')
  .option('-O, --output <file>', 'Define the output file.')
  .option('-p, --pretty', 'Use pretty formatting to output file.')
  .option('-v, --verbose', 'Display additional information about the generation processing.')
  .version(package.version)
  .parse(process.argv);

const options = program.opts();

const input = root(program.args.shift());
const output = root(options.output);
const pretty = options.pretty || false;
const verbose = options.verbose || false;

if (!input) {
  program.help();
  process.exit(1);
}

chewer(input, output, pretty, verbose);

function root(filepath) {
  return filepath
    ? path.join(process.cwd(), filepath)
    : undefined;
}
