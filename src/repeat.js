function range(min, max, value) {
  const total = max > min
    ? Math.floor(Math.random() * max) + min
    : max;

  return repeat(total, value);
}

function repeat(total, value) {
  return Array(total).fill(value);
}

/**
 * Repeat given times a value.
 */
module.exports = function () {
  const args = Array.from(arguments);

  switch (args.length) {
    case 3: {
      const [ min, max, value ] = args;
      return range(min, max, value);
    }

    case 2: {
      const [ total, value ] = args;
      return repeat(total, value);
    }

    case 1: {
      const [ value ] = args;
      return value;
    }

    default: {
      return;
    }
  }
};
