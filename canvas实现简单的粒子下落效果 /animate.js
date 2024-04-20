import {Particle} from './particle.js'

export class Animate {
    constructor(opts) {
        const {
            canvas,
            ctx,
            count,
        } = opts || {};
        this.canvas = canvas;
        this.ctx = ctx;

        this.particleCount = count || 200;
        // 创建粒子实例数组并初始化
        this.particles = [];
    }

    create() {
        for (let i = 0; i < this.particleCount; i++) {
            // 随机生成粒子的位置和大小，颜色
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const radius = Math.random() * 5 + 1;
            this.particles.push(new Particle({
                ctx: this.ctx,
                x,
                y,
                radius, 
                color: 'white',
            }));
        }
    }

    // 实现粒子的动画效果
    animate = () => {
        requestAnimationFrame(this.animate);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 遍历粒子数组，实现动画效果
        this.particles.forEach(particle => {
            // 绘制粒子
            particle.draw();
            // 更新粒子的位置
            particle.y += particle.speed;
            // 判断是否超出屏幕，超出则重新生成
            if (particle.y > this.canvas.height + particle.radius) {
                particle.y = -particle.radius;
            }
        });
    };
}
