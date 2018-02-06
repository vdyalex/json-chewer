const isBound = require('is-bound-function');

function parseObject(obj) {
  const newObj = {};

  Object.keys(obj).forEach((property) => {
    const scope = { ...obj, ...newObj };
    const digested = digest(scope, obj[ property ]);
    newObj[ property ] = digested();
  });

  return newObj;
}

function parseArray(collection) {
  return collection.map((value, index, arr) => {
    const digested = digest(this, value);
    return digested(value, index, arr);
  });
}

function digest(scope, value) {
  return function (/* ...args */) {
    const digested = typeof value === 'function'
      ? call(scope, value, arguments)
      : value;

    return parse.call(scope, digested);
  };
}

function call(scope, fn, args) {
  return !isBound(fn)
    ? fn.call(scope, ...args)
    : fn(...args);
}

function parse(element) {
  if (element instanceof Array) {
    return parseArray.call(this, element);
  }

  if (element instanceof Object) {
    return parseObject.call(this, element);
  }

  return element;
}

module.exports = (template = {}) => {
  return parse.call(template, template);
};
