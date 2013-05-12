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
