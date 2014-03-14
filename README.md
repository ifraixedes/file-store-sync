File-Store-Sync
====================

Store and retrieve synchronously, primitive and objects javascript values in/from a plain text file.

## Installation

    $ npm install file-store-sync

## Main concepts

File-store-sync store and retrieve synchronously primitive and objects javascript values into/from a plain text file.

All the values are reference by a key, and the module internally use a javascript object where all the values are added, removed or read as properties, so the property name is the used key and its value, the key's value.

Each operation read the content of the file, parse the content as a JSON data to get a plain javascript object, read/modify/delete the value using the key (property's name), transform the javascript object to JSON and write (entirely) the JSON value into the file. Due to this simple way to manage the file content and the I/O operations are synchronously, this module is not appropriated to manage a big amount of data but it may useful to persist some data and retrieve afterwards for example if you application is stopped or if another process need to access to that data and those process cannot continue executing the next instructions until they have read that data.

## How to use

Simply the module return a constructor that receive as a unique parameter the path to the file to use and just execute the operations that you need. Remember, no callbacks, all the operations are synchronously.

```js
var FileStoreSync = require('file-store-sync');
var store = new FileStoreSync('./store-test');

```

## API

* get(key) - Return the value associated with the key
* set(key, value) - Set or override the value associated with the key
* push(key, value) - Add a value to the array associate with the key
* pushIfNotExists(key, value) - Add a value if it doesn't exist into the array associated with the key
* remove(key, value) - Remove the value from the array associated with the key
* remove(key, value) - Remove the value associated with the key

## Example

```js

'use strict';

var FileStoreSync = require('file-store-sync');
var store = new FileStoreSync('./store-test');

store.push('array-key', 'array-value');

store.pushIfNotExists('array-key', 'array-value');

console.log('The value of array-key is: ' +  store.get('array-key'));

store.set('key', { some: 'value' });

console.log('The value of key is: ' +  store.get('key'));

store.remove('array-key', 'array-value');

console.log('Now array-key is: ' +  store.get('array-key'));

store.delete('key');

console.log('Now the value of key is: ' +  store.get('key'));

```


## Acknowledgements

I would like to appreciate to Raynos to develop the file-store project and release that under MIT license.


## LICENSE

License
(The MIT License)

Copyright (c) 2014 Ivan Fraixedes Cugat <ifcdev@gmail.com>

This project is a fork from the project file-store developed Raynos (https://github.com/Raynos/file-store)

Copyright (c) 2012 Raynos.
