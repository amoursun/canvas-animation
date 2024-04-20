import b, { a, fn, objA } from './a.js';

console.log(a, '---', b, '---', objA.a, '---', 'test1.js')
setTimeout(() => {
    objA.a = 'hello world'
    fn('hello world')
    console.log(a, '---', b, '---', objA.a, '---', 'test1.js')
});