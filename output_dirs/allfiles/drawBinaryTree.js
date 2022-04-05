function drawBinaryTree(root, canvasElement) {
    var isInsert = false;
    var path = window.location.pathname;
    var nameOfPage = path.split("/").pop();
    var maxHeight = document.body.clientHeight * 0.65;
    var maxWidth = document.body.clientWidth * 0.80;
    drawSimpleBinaryTree(root, canvasElement, maxHeight, maxWidth);
}
//# sourceMappingURL=drawBinaryTree.js.map