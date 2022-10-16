const env = process.env.NODE_ENV || 'development';
const _ = require('underscore');
const { error } = require('../../common/helpers/logger.helper');
const codes = require('../../common/helpers/errorCodes.helpers');

const parseObject = (obj, tabspace) => {
  tabspace || (tabspace = 1);
  return (
    _.reduce(
      obj,
      (memo, value, key) => {
        if (_.isObject(value)) {
          value = parseObject(value, tabspace + 1);
        }

        if (_.isString(value)) {
          value = value.replace(
            /(?:\r\n|\r|\n)/g,
            '\n' + '  '.repeat(tabspace + 1)
          );
        }

        memo.string += `${' '.repeat(tabspace) + key}: ${value}\n`;

        return memo;
      },
      { string: '{\n', tabspace }
    ).string + '}'
  );
};

const formatError = (errorException) => {
  const message = codes[errorException.message]
    ? errorException.message
    : 'Internal Server Error';

  const { code, description } = codes[message];

  const formatted = {
    message,
    statusCode: code,
    description: errorException.description
      ? errorException.description
      : description,
    details: description,
    customError: errorException.customError ? errorException.customError : null,
  };

  if (env !== 'production') {
    errorException.path && (formatted.path = errorException.path);
    errorException.details &&
      (formatted.details = errorException.details.stack);
    errorException.path ||
      (formatted.details = errorException.stack
        .split(/\n/)[1]
        .split('src')[1]
        .split(')')[0]
        .trim());
  }

  return formatted;
};

const formatSuccess = (data) => {
  const message = codes[data.message] ? data.message : 'OK';

  const { code, description } = codes[message];
  const outPut = data.outPut;

  const formatted = {
    message,
    statusCode: code,
    description: data.description ? data.description : description,
    outPut: outPut ? outPut : null,
  };

  return formatted;
};

const handlerResponse = {
  error: (data, res = null) => {
    const response = formatError(data);

    error(parseObject(response, null, 2));

    if (res) return res.status(response.statusCode || 500).send(response);

    return response;
  },
  success: (data, res) => {
    const response = formatSuccess(data);

    if (res) return res.status(response.statusCode || 200).send(response);

    return response;
  },
};

module.exports = handlerResponse;
