'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = exports.normalizeObject = exports.normalizeArray = undefined;

var _utils = require('./utils');

const normalizeArray = exports.normalizeArray = array => {
  let data = array.map(item => {
    let type = (0, _utils.TypeOf)(item);

    switch (type) {

      case 'array':
        return item.length == 1 ? Array.isArray(item[0]) ? normalizeArray(item[0]) : item[0] : normalizeArray(item);

      case 'object':
        return normalizeObject(item);

      default:
        return item;
    }
  });

  return data.length > 1 ? data : data[0];
};

const normalizeObject = exports.normalizeObject = data => {
  for (let i in data) {
    if (Array.isArray(data[i])) {
      data[i] = normalizeArray(data[i]);
    } else if (typeof data[i] == 'object') {
      data[i] = normalizeObject(data[i]);
    }
  }
  return data;
};

// normalize objects and array
const normalize = exports.normalize = data => {
  if (Array.isArray(data)) return normalizeArray(data);else return normalizeObject(data);
};