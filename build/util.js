const glob = require('glob');
const fs = require('fs');
const path = require('path');

module.exports = {
  globp,
  readFile,
  matchSubject,
  matchHeadline,
  snake2pascal,
  categorize,
  writeFile,
};

/**
* @param {string} pattern
* @return {Promise.<string[]>}
*/
function globp(pattern = '') {
  return new Promise((resolve, reject) => {
    glob(pattern, '', (err, files) => {
      err
        ? reject(err)
        : resolve(files);
    });
  });
};

/**
 * @param {string} filepath
 * @return {Promise.<string>}
 */
function readFile(filepath = '') {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      err
        ? reject(err)
        : resolve(data);
    });
  });
}

function matchSubject(str = '') {
  const matched = str.match(/[^\/]+(?=\/[^\/]+.md$)/);
  return (matched && matched[0]) || '';
}

function matchHeadline(str = '') {
  const matched = str.match(/(?<=#).+$/m);
  const headline = (matched && matched[0]) || '';
  return headline.trim();
}

function snake2pascal(str = '') {
  return str.
    replace(/(?<=^|\-)./g, matched => matched.toUpperCase()).
    replace('-', ' ');
}

/**
 * @template T
 * @param {Array.<string>} arr
 * @param {Array.<T>} arr2
 * @return {Object.<string, T>}
 */
function categorize(arr, arr2) {
  var map = {};
  if (arr.length !== arr2.length) {
    return map;
  }
  arr.forEach((item, i) => {
    var items = map[item] || [];
    items.push(arr2[i]);
    map[item] = items;
  });
  return map;
}

/**
 * @param {string} filepath
 * @param {string} content
 * @return {Promise.<void>}
 */
function writeFile(filepath, content = '') {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(filepath), content, 'utf-8', err => {
      err ?
        reject(err) :
        resolve();
    });
  });
}
