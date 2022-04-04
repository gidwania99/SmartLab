/** @format */
class Circle {
    constructor(value) {
        this.radius = FIXED_VALUE.radius;
        this.borderColor = FIXED_VALUE.borderColor;
        this.fillColor = FIXED_VALUE.fillColor; // 
        this.textColor = FIXED_VALUE.textColor;
        this.value = null;
        this.x = -1;
        this.y = -1;
        this.value = value;
    }
    drawCircle(ctx) {
        const { x, y } = this;
        ctx.beginPath();
        ctx.fillStyle = this.fillColor;
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
    drawBorder(ctx) {
        const { x, y, borderColor, radius } = this;
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = FIXED_VALUE.borderWidth;
        ctx.stroke();
    }
    writeText(ctx) {
        const { x, y, value, borderColor } = this;
        // Decide font size
        const fontSize = FIXED_VALUE.nodeFontSize;
        const textFont = FIXED_VALUE.nodeFontType;
        const ySpacing = fontSize / 2;
        const fontWeight = FIXED_VALUE.nodeFontWeight;
        ctx.fillStyle = this.textColor;
        ctx.textAlign = "center";
        ctx.font = `${fontSize}px ${textFont} ${fontWeight} `;
        ctx.fillText(value + "", x, y + ySpacing);
    }
    getRadius() {
        return this.radius;
    }
    setNodeColor(borderColor, fillColor, textColor) {
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.textColor = textColor;
    }
    setDefault() {
        const { borderColor, fillColor, textColor } = this;
        this.borderColor = FIXED_VALUE.borderColor;
        this.fillColor = FIXED_VALUE.fillColor;
        this.textColor = FIXED_VALUE.textColor;
    }
    isinside(x, y) {
        let r = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
        if (r < FIXED_VALUE.radius) {
            return (true);
        }
        else {
            return (false);
        }
    }
    changeColor() {
        console.log("value = ", this.value, "X = ", this.x, "  Y = ", this.y);
    }
    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
    getCoordinates() {
        return [this.x, this.y];
    }
    getCordinates() {
        return new Point(this.x, this.y);
    }
    get X() {
        return this.x;
    }
    get Y() {
        return this.y;
    }
    incrementX() {
        this.x++;
    }
    incrementY() {
        this.y++;
    }
    decrementX() {
        this.x--;
    }
    decrementY() {
        this.y--;
    }
    draw(comp) {
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
//# sourceMappingURL=Circle.js.map