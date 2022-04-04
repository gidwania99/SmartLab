/** @format */



class Circle {
    private radius: number = FIXED_VALUE.radius;
    private borderColor: string = FIXED_VALUE.borderColor
    private fillColor: string = FIXED_VALUE.fillColor // 
    private textColor: string = FIXED_VALUE.textColor
    private value: number = null;

    private x: number = -1;

    private y: number = -1;

    constructor(value: number) {
        this.value = value;
    }

    private drawCircle(ctx: CanvasRenderingContext2D) {
        const { x, y } = this;

        ctx.beginPath();
        ctx.fillStyle = this.fillColor;
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }


    private drawBorder(ctx: CanvasRenderingContext2D) {
        const { x, y, borderColor, radius } = this;

        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = FIXED_VALUE.borderWidth   
        ctx.stroke();
    }


    private writeText(ctx: CanvasRenderingContext2D) {
        const { x, y, value, borderColor } = this;

        // Decide font size
        const fontSize = FIXED_VALUE.nodeFontSize;
        const textFont = FIXED_VALUE.nodeFontType
        const ySpacing = fontSize / 2;
        const fontWeight = FIXED_VALUE.nodeFontWeight;
        ctx.fillStyle = this.textColor;
        ctx.textAlign = "center"
        ctx.font = `${fontSize}px ${textFont} ${fontWeight} `;
        
        ctx.fillText(value + "", x, y + ySpacing);
    }

 
    getRadius() {
        return this.radius;
    }


    public setNodeColor(borderColor, fillColor, textColor) {
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.textColor = textColor;
    }
    public setDefault() {
        const { borderColor, fillColor, textColor } = this;
        this.borderColor = FIXED_VALUE.borderColor;
        this.fillColor = FIXED_VALUE.fillColor;
        this.textColor = FIXED_VALUE.textColor;
    }

 

    isinside(x:number,y:number)
    {
        let r = Math.sqrt(Math.pow(this.x - x,2)+Math.pow(this.y-y,2));
        if(r<FIXED_VALUE.radius){
            return (true);
        }
        else{
            return (false);
        }
    }
   



    changeColor() {
        console.log("value = ", this.value, "X = ", this.x, "  Y = ", this.y);

    }


    setCoordinates(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getCoordinates() : [number,number] {
        return [this.x,this.y];
    }
    getCordinates():Point{
        return new Point(this.x,this.y);
    }
    get X(){
        return this.x;
    }
    get Y(){
        return this.y;
    }
    incrementX(){
        this.x++;
        
    }
    incrementY(){
        this.y++;
    }
    decrementX(){
        this.x--;
    }
    decrementY(){
        this.y--;
    }

    draw(comp: CanvasComponent) {
        // const { radius , fillColor } = this;

        // this.colorId = this.colorId ? this.colorId : "black";
        this.drawCircle(comp.getContext());

        // Draw border
        this.drawBorder(comp.getContext());

        // Write text
        this.writeText(comp.getContext());

        // Return the colorId
        // return this.colorId;
    }

}

