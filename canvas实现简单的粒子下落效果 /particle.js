// 创建一个粒子类，包含位置，速度，半径等属性，并实现绘制方法
export class Particle {
    constructor(opts) {
        const {
            ctx, x, y, radius, color
        } = opts || {};
        this.ctx = ctx;

        // 位置
        this.x = x;
        this.y = y;

        // 半径颜色
        this.radius = radius;
        this.color = color;

        // 下落速度
        this.speed = 4;
    }

    draw() {
        // 绘制圆形粒子
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}
