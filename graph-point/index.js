import {Graph} from './graph.js';


const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

function init() {
    cvs.width = window.innerWidth * window.devicePixelRatio;
    cvs.height = window.innerHeight * window.devicePixelRatio;
}

init();

function draw() {
    const graph = new Graph({
        ctx,
        cvs,
    });
    graph.draw();
}
draw();

