function connectPointsWithBezierCurve(canvasComponent, xstart, xend, ystart, yend) {
    // X, Y Calculation
    const xStart = xstart;
    const xEnd = xend;
    const yStart = ystart;
    const yEnd = yend;
    const halfY = (yStart + yEnd) / 2;
    const halfX = (xStart + xEnd) / 2;
    // Draw the bezier curve
    const berzierCurve = new BezierCurve({ x: xStart, y: yStart }, { x: halfX, y: halfY }, { x: xEnd, y: halfY }, { x: xEnd, y: yEnd });
    berzierCurve.draw(canvasComponent.getContext());
}
// export default connectPointsWithBezierCurve;
//# sourceMappingURL=connectPointsWithBezierCurve.js.map