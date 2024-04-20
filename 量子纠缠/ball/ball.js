
import {isElementOutViewport} from './util.js';
import {boundState} from './bounding.js';

export class Ball {
    get randomPos() {
        return Math.floor(Math.random() * window.innerWidth);
    }
    get createBallElem() {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        return ball;
    }
    get diameter() {
        return this.size * 10;
    }
    constructor(size = 3, color) {
        // 尺寸
        this.size = size;
        // 颜色
        this.color = color;
        // 创建标签
        this.ball = this.createBallElem;
        this.top = 0;
        this.left = 0;
        // 是否反转
        this.revert = false;
    }

    render(container = document.body) {
        this.left = this.randomPos;
        this.ball.style.background = this.color;
        this.ball.style.width = this.diameter + 'px';
        this.ball.style.height = this.diameter + 'px';
        this.ball.style.left = this.left + 'px';
        this.ball.style.top = this.top + 'px';
        container.appendChild(this.ball);
    }

    /**
     * 完成一个小球的下降、反转、销毁动作
     */
    drop(speed = 0.03, destroy) {
        let animationId;

        const run = () => {
            // 小球超出浏览器窗口销毁
            if (isElementOutViewport(this.ball)) {
                cancelAnimationFrame(animationId);
                this.ball.remove();
                // 销毁时通过this.revert 判断是接小球成功还是失败
                destroy && destroy(this.revert);
            }
            this._checkCollision(() => (this.revert = true));
            const _speed = 1 + speed;
            if (this.revert) {
                // 掉转方向
                this.top -= _speed;
            }
            else {
                // 改变小球的高度
                this.top += _speed;
            }

            this.ball.style.top = this.top + 'px';
            // 在任务中再次调用 requestAnimationFrame
            animationId = requestAnimationFrame(run);
        };

        // 启动周期性任务
        animationId = requestAnimationFrame(run);
    }

    /**
     * 实现小球与物体的碰撞检测，反转
     * @param {*} successFn 完成回调函数
     */
    _checkCollision(successFn) {
        /**
         * 小球与物体进行碰撞的条件：
         * - 小球的左边坐标x >= target的x坐标
         * - 小球的右边坐标 <= target的左边坐标加宽度
         * - 小球的top >= 目标的top
         */
        const top = this.top + this.diameter;
        const right = this.left + this.diameter;
        const left = this.left;

        if (!boundState.bound) {
            return;
        };

        if (
            top >= boundState.bound.top &&
            left >= boundState.bound.left &&
            right <= boundState.bound.right
        ) {
            successFn && successFn();
        }
    }
}