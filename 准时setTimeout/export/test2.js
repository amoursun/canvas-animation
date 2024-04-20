import b, { a, objA } from './a.js';

console.log(a, '---', b, '---', objA.a, '---', 'test2.js')
setTimeout(() => {
    console.log(a, '---', b, '---', objA.a, '---', 'test2.js')
}, 100)