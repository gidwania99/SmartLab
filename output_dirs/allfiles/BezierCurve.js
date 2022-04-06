/** @format */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Closepath {
    constructor(context, arrapoint) {
        this.point = arrapoint;
        this.context = context;
        this.color = "blue";
    }
    draw() {
        var i;
        this.context.beginPath();
        this.context.moveTo(this.point[0].x, this.point[0].y);
        for (i = 1; i < this.point.length; i++) {
            this.context.lineTo(this.point[i].x, this.point[i].y);
        }
        this.context.closePath();
        this.context.strokeStyle = "black";
        this.context.lineWidth = 2;
        this.context.fillStyle = "rgba(0,0,0,0.1)";
        this.context.fill();
        this.context.stroke();
    }
}
class Ellipse extends Closepath {
    constructor(context, x, y, majorx, minory) {
        super(context, []);
        this.startpt = new Point(x, y);
        this.a = majorx;
        this.b = minory;
    }
    draw() {
        this.calculate();
        super.draw();
    }
    calculate() {
        this.point = [];
        for (var i = 0; i <= 360; i++) {
            let x1 = this.a * Math.cos(i * Math.PI / 180) + this.startpt.x;
            let y1 = this.b * Math.sin(i * Math.PI / 180) + this.startpt.y;
            this.point.push(new Point(x1, y1));
        }
    }
}
class BezierCurve {
    constructor(start, cp1, cp2, end) {
        this.color = FIXED_VALUE.lineJointColor;
        const { x: xStart, y: yStart } = start;
        const { x: cp1x, y: cp1y } = cp1;
        const { x: cp2x, y: cp2y } = cp2;
        const { x: xEnd, y: yEnd } = end;
        this.xStart = xStart;
        this.yStart = yStart;
        this.cp1x = cp1x;
        this.cp1y = cp1y;
        this.cp2x = cp2x;
        this.cp2y = cp2y;
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.xStart, this.yStart);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = FIXED_VALUE.lineJointWidth;
        ctx.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.xEnd, this.yEnd);
        ctx.stroke();
    }
}
//# sourceMappingURL=BezierCurve.js.map