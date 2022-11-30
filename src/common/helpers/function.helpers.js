const moment = require('moment-timezone');

exports.currentMxDate = () => {
  return moment.tz('America/Mexico_City');
};

exports.generateRandomPassword = () => {
  const chars =
    'abcdefghijklmnopqrstubwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890|!.$%&';
  let password = '';

  for (i = 0; i < 11; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
};

exports.validateEmail = (inputText) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return inputText.match(regex) ? true : false;
};

exports.validatePhoneNumber = (phone) => {
  const phoneRegexp = /^[0-9]{10}$/;
  return phoneRegexp.test(phone);
};

exports.roundOut = (num, decimals = 2) => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

exports.isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

exports.formatMoneyNumber = (value) => {
  const options = {
    style: 'currency',
    currency: 'USD',
  };

  return new Intl.NumberFormat('en-US', options).format(value);
};

exports.setSecondsDate = (seconds) => {
  return moment.tz('America/Mexico_City').add(seconds, 's');
};

exports.capitalize = (value) => {
  const textLower = value.toLowerCase();
  return `${textLower.charAt(0).toUpperCase()}${textLower.slice(1)}`;
};
