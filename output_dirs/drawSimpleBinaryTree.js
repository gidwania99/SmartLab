function recursivelyDrawNodes(root, canvasComponent, currentLine, xstart, xend) {
    // X Calculation
    const xStart = xstart;
    const xEnd = xend;
    const xPosition = (xStart + xEnd) / 2;
    //const xPosition = canvasComponent.width()/ 2;
    // Y Calculation
    const yPosition = currentLine * FIXED_VALUE.lineHeight;
    // Draw the node
    root.nodeCircle.setCoordinates(xPosition, yPosition);
    root.nodeCircle.draw(canvasComponent);
    // Draw the left child nodes
    // Radius is added and subtracted from y to move the line outside the circle
    if (root.left) {
        recursivelyDrawNodes(root.left, canvasComponent, currentLine + 1, xStart, xPosition);
        connectPointsWithBezierCurve(canvasComponent, xPosition, (xStart + xPosition) / 2, yPosition + FIXED_VALUE.radius, getCanvasHeightFromTreeHeight(currentLine + 1) - FIXED_VALUE.radius);
    }
    if (root.right) {
        recursivelyDrawNodes(root.right, canvasComponent, currentLine + 1, xPosition, xEnd);
        connectPointsWithBezierCurve(canvasComponent, xPosition, (xPosition + xEnd) / 2, yPosition + FIXED_VALUE.radius, getCanvasHeightFromTreeHeight(currentLine + 1) - FIXED_VALUE.radius);
    }
}
function drawSimpleBinaryTree(root, canvasElement, height, width) {
    const heightOfTree = root.getHeight();
    const maxNumberOfLeafNodes = getMaxLeafNodesFromHeight(heightOfTree);
    // const { maxHeight, maxWidth } = options;
    const maxHeight = height;
    const maxWidth = width;
    // Init calculation
    var midPoint = 0;
    if (screen.width > 600 && screen.width < 992)
        midPoint = 2.5;
    else {
        midPoint = 2.2;
    }
    const midPointInCanvas = maxWidth / midPoint;
    const xStart = (midPointInCanvas - maxWidth / 2.5) +
        FIXED_VALUE.leafNodeSpace;
    const xEnd = (midPointInCanvas + maxWidth / 2.5) -
        FIXED_VALUE.leafNodeSpace;
    // Initialize the canvas
    const canvasComponent = new CanvasComponent(canvasElement);
    // canvasComponent.setMaxWidthAndHeight(maxHeight, maxWidth);
    canvasComponent.clearCanvas();
    // Recursively draw the tree
    recursivelyDrawNodes(root, canvasComponent, 1, xStart, xEnd);
}
//# sourceMappingURL=drawSimpleBinaryTree.js.map