import {Ball} from './ball.js';
import {controlCallbackByTarget, controlCallbackByBrowser} from './util-control-callback.js';

export class Game {
    constructor(boardTarget, max = 10) {
        this.boardTarget = boardTarget;
        this.max = max;
        this.curBall = null;
        this.successCount = 0;
        this.failCount = 0;
        this.controlCallback = null;
    }

    /**
     * 生成多个小球
     * @param {*} num : 小球数量
     * @param {*} speed 
     */
    generateBalls(ballNum = 1, speed = 3, delay = 2000) {
        // 每次移动元素或者浏览器都会触发这个回调，将最新的坐标值传入
        this.controlCallback(this.boardTarget);

        for (let i = 0; i < ballNum; i++) {
            setTimeout(() => {
                // 生成小球
                this.curBall = new Ball();
                // 渲染
                this.curBall.render();

                // 下降速度为3， 小球销毁后，调用函数
                this.curBall.drop(speed, (revert) => {
                    if (revert) {
                        this.successCount++;
                        console.log('接小球成功个数', this.successCount);
                    }
                    else {
                        this.failCount++;
                        console.log('接小球失败个数', this.failCount);
                    }
                    // 销毁一个 再生成一个
                    this.generateBalls(1, speed, delay);
                });
            }, delay * i);
        }
        
    }

    // 游戏开始
    start(num, speed, delay) {
        this.controlCallback = controlCallbackByTarget;
        this.generateBalls(num, speed, delay);
    }

    startByBrowser(num, speed, delay) {
        this.controlCallback = controlCallbackByBrowser;
        this.generateBalls(num, speed, delay);
    }
}

