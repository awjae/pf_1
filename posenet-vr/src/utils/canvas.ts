export default class Canvas {
    public ctx;

    constructor(ctx) {
        this.ctx = ctx;
    }

    drawPoint(x, y) {
        const circle = new Path2D();
        circle.arc(x, y, 4, 0, 2 * Math.PI);
        this.ctx.fill(circle);
        this.ctx.fillStyle = "#00ff2a";
        this.ctx.strokeStyle = "#00ff2a";
        this.ctx.stroke(circle);
    }
    drawSkeleton(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#fff';
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
}