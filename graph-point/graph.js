import {Point} from './point.js';

export class Graph {
    constructor(obj) {
        const {
            pointNumber = 50,
            maxDistance = 500,
            ctx,
            cvs
        } = obj;
        this.ctx = ctx;
        this.cvs = cvs;
        this.points = new Array(pointNumber).fill(0).map(
            () => new Point({
                ctx,
                cvs,
            })
        );
        this.maxDis = maxDistance;
    }

    draw() {
        requestAnimationFrame(() => {
            this.draw();
        });
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
        for (let i = 0; i < this.points.length; i++) {
            const pi = this.points[i];
            pi.draw();
            for (let j = i + 1; j < this.points.length; j++) {
                const pj = this.points[j];
                const d = Math.sqrt(
                    (pi.x - pj.x) ** 2 + (pi.y - pj.y) ** 2
                );
                if (d > this.maxDis) {
                    continue;
                }
                this.ctx.beginPath();
                this.ctx.moveTo(pi.x, pi.y);
                this.ctx.lineTo(pj.x, pj.y);
                this.ctx.closePath();
                this.ctx.strokeStyle = `rgba(200, 200, 200, ${d / this.maxDis})`;
                this.ctx.stroke();
            }
        }
    }
}