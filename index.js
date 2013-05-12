
var dirname = require('path').dirname
  , mkdirp = require('mkdirp').sync
  , fs = require('fs')
  , stat = fs.statSync
  , readFile = fs.readFileSync
  , writeFile = fs.writeFileSync



var FileStoreSync = function (uri) {

  if (!(this instanceof FileStoreSync)) {
    new FileStoreSync(uri);
    return;
  }

  this.uri = uri;

};

FileStoreSync.prototype = {

  get: function (key) {
    var obj = this.__statAndRead();

    return obj[key] || null;
  },

  set: function (key, value) {

    var obj = this.__mkdirAndRead();

    obj[key] = value;
    return writeFile(this.uri, JSON.stringify(obj));
  },

  push: function (key, value) {
    var obj = this.__mkdirAndRead();
    var arr = obj[key] || (obj[key] = []);

    if (Array.isArray(arr)) {
      arr.push(value);
    } else {
      throw new Error('The key doesn\'t hold an array');
    }
    return writeFile(this.uri, JSON.stringify(obj));
  },

  pushIfNotExists: function (key, value) {
    var obj = this.__mkdirAndRead()
    var arr = obj[key] || (obj[key] = []);

    if (Array.isArray(arr)) {
      if (arr.indexOf(value) === -1) {
        arr.push(value);
      } else {
        return false;
      }
    } else {
      throw new Error('The key doesn\'t hold an array');
    }

    return writeFile(this.uri, JSON.stringify(obj));
  },

  remove: function (key, value) {

    var obj = this.__statAndRead();
    var arr = obj[key];

    if (Array.isArray(arr)) {
      arr.splice(arr.indexOf(value), 1)
    } else {
      throw new Error('The key doesn\'t hold an array');
    }

    writeFile(this.uri, JSON.stringify(obj));
  },

  delete: function (key) {

    var obj = this.__statAndRead();

    delete obj[key];
    writeFile(this.uri, JSON.stringify(obj));
  },

  __mkdirAndRead: function () {
    mkdirp(dirname(this.uri));
    return this.__statAndRead();
  },

  __statAndRead: function () {
    var buffer;

    try {
      stat(this.uri);
    } catch (e) {
      return {};
    }

    try {
      buffer = readFile(this.uri);
      return this.__readBuffer(buffer);
    } catch (e) {
      throw e;
    }
  },

  __readBuffer: function (buffer) {
    var obj;

    if (buffer.length) {
      obj = JSON.parse(buffer.toString())
    } else {
      obj = {}
    }

    return obj;
  }
};


module.exports = FileStoreSync;