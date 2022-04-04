/** @format */

class Point {
    x: number;
    y: number;
    constructor(x?:number,y?:number)
        {
            this.x=x;
            this.y=y;
        }  
}

class Closepath
{
    public startpt:Point;
    public point:Point[];
    public context:CanvasRenderingContext2D;
    public color:string;
    
    constructor(context:CanvasRenderingContext2D,arrapoint:Point[])
    {
        this.point=arrapoint;
        this.context=context;
        this.color="blue";
    }
    
    draw()
    {
        var i:number;
        
        this.context.beginPath();
        this.context.moveTo(this.point[0].x,this.point[0].y);
        for(i=1;i<this.point.length;i++)
        {
            this.context.lineTo(this.point[i].x,this.point[i].y);
        }
        
        this.context.closePath();
        
        this.context.strokeStyle="black";
        this.context.lineWidth=2;
        this.context.fillStyle = "rgba(0,0,0,0.1)"
        this.context.fill();
        this.context.stroke();
    }
}

class Ellipse extends Closepath
{
    public a:number;
    public b:number;
    constructor(context:CanvasRenderingContext2D,x:number,y:number,majorx:number,minory:number)
    {
        super(context,[]);
        this.startpt=new Point(x,y);
        this.a=majorx;
        this.b=minory;
    }
    
    draw()
    {
        
        this.calculate();
        super.draw();
    }
    
    protected calculate()
    {
        this.point=[];
        for(var i=0;i<=360;i++)
        {
            let x1=this.a * Math.cos(i * Math.PI /180) + this.startpt.x;
            let y1=this.b * Math.sin(i * Math.PI/180) + this.startpt.y;
            this.point.push(new Point(x1,y1));
        }
    }
}



class BezierCurve {
    xStart: number;
    cp1x: number;
    cp2x: number;
    xEnd: number;

    yStart: number;
    cp1y: number;
    cp2y: number;
    yEnd: number;

    color: string = FIXED_VALUE.lineJointColor;
    constructor(
        start: Point,
        cp1: Point,
        cp2: Point,
        end: Point,
    ) {
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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.xStart, this.yStart);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = FIXED_VALUE.lineJointWidth;
        ctx.bezierCurveTo(
            this.cp1x,
            this.cp1y,
            this.cp2x,
            this.cp2y,
            this.xEnd,
            this.yEnd
        );
        ctx.stroke();
    }
}
