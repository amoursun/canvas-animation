export let a = 'a';

export let objA = { a: 'a' };

let defaultA = 1;
export default defaultA;

export function fn(str) {
    a = str
    defaultA = str
}