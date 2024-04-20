import {Game} from './game.js';
import {resizeChannel} from './util-control-callback.js';
import {querySelector} from './util.js';
const $board = querySelector('.board');

const game = new Game($board);
// 用元素接小球
game.start(3, 10);

// 用浏览器接小球
// game.startByBrowser(3, 10);

resizeChannel();