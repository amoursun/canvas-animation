import {getRandom} from './utils.js';

export class Point {
    constructor(obj) {
        const {ctx, cvs} = obj;
        this.ctx = ctx;
        this.cvs = cvs;
        this.r = 6;
        this.x = getRandom(0, cvs.width - this.r / 2);
        this.y = getRandom(0, cvs.height - this.r / 2);
        this.xSpeed = getRandom(-50, 50);
        this.ySpeed = getRandom(-50, 50);
        this.lastDrawTime = null;
    }

    draw() {
        if (this.lastDrawTime) {
            // 根据运动时间计算当前位置
            const now = Date.now();
            const t = (now - this.lastDrawTime) / 1000;
            let x = this.x + this.xSpeed * t;
            let y = this.y + this.ySpeed * t;
            // 边界检测, 设置回弹
            if (x <= this.r || x >= this.cvs.width - this.r * 2) {
                this.xSpeed = -this.xSpeed;
            }
            if (y <= this.r || y >= this.cvs.height - this.r * 2) {
                this.ySpeed = -this.ySpeed;
            }
            this.x = x;
            this.y = y;
        }
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgb(200, 200, 200)';
        this.ctx.fill();
        this.lastDrawTime = Date.now();
    }
}