
function getMaxLeafNodesFromHeight(treeHeight: number) {
  return 2 ** (treeHeight - 1);
}


function getCanvasWidthFromMaxNodeSpacing(maxNodes: number) {
  return (maxNodes + 2) * FIXED_VALUE.leafNodeSpace;
}


function getXPositionFromGivenHorizontalNodePosition(nodes: number) {
  return (nodes) * FIXED_VALUE.leafNodeSpace;
}


function getCanvasHeightFromTreeHeight(treeHeight: number) {
  return (treeHeight) * FIXED_VALUE.lineHeight;
}


function generateTree(type?:String): void {
  canvasComponent.clearCanvas();
  root = null;
  randomNumber = Math.floor(Math.random() * 10) + 0;
  //randomNumber = 10 ;
  if(type == 'demo')
    tree = demoTree[randomNumber];
  else if(type == 'sim')
    tree = simTree[randomNumber];
  else
    tree = testTree[randomNumber];

  for (let i = 0; i < tree.length; i++) {
    insertNode(tree[i]);
  }
}

// function used
function insertNode(data: number) {
  if (root == null) {
    root = new BinarySearchTreeNode(data);
  } else {
    root.insert(data);
  }
  // drawBinaryTree(root, canvas);
  // return root;
}


let preOrderNodeList: BinarySearchTreeNode[] = [];
let postOrderNodeList: BinarySearchTreeNode[] = [];
let inorderNodeList: BinarySearchTreeNode[] = [];
function listOfNodesPreorder(root): void {
  if (root == null)
    return;
  preOrderNodeList.push(root)

  if (root.left != null) {
    listOfNodesPreorder(root.left)
  }
  if (root.right != null) {
    listOfNodesPreorder(root.right)
  }
}
function listOfNodesInorder(root): void {
  if (root == null)
    return;
  if (root.left != null) {
    listOfNodesInorder(root.left)
  }
  inorderNodeList.push(root)
  if (root.right != null) {
    listOfNodesInorder(root.right)
  }
}
function listOfNodesPostorder(root): void {
  if (root == null)
    return;
  if (root.left != null) {
    listOfNodesPostorder(root.left)
  }
  if (root.right != null) {
    listOfNodesPostorder(root.right)
  }
  postOrderNodeList.push(root)
}
function animateWrongNode(node){
  node.nodeCircle.setNodeColor("red","grey","white");
  node.nodeCircle.draw(canvasComponent);
  setTimeout(()=>{
    restoreCircle(node);
  },2000);

}

function restoreCircle(node) {
    
  node.nodeCircle.setDefault();
  node.nodeCircle.draw(canvasComponent);
}
function chooseWrongNode(node){

  node.nodeCircle.setNodeColor("red","grey","white");
  node.nodeCircle.draw(canvasComponent);
  setTimeout(()=>{
    if(node.isLocked){
      node.nodeCircle.setNodeColor(FIXED_VALUE.animateBorderColor, FIXED_VALUE.animateFillColor, FIXED_VALUE.animateTextColor);
      node.nodeCircle.draw(canvasComponent);
  }
  else
      restoreCircle(node);
    },3000);

}

function writeNodeValue(value: number) {
  const fontSize = FIXED_VALUE.textFontSize;
  const textFont = FIXED_VALUE.textFontType
  const fontWeight = FIXED_VALUE.textFontWeight;
  const ctx = canvasComponent.getContext();

  ctx.fillStyle = "black";
  ctx.font = `${fontSize}px ${textFont} ${fontWeight}`;
  ctx.textAlign = "center";
  ctx.fillText(value + "", width, 375);
  width += 50;
}

function removeAllNodeValue() {
  const ctx = canvasComponent.getContext();
  ctx.clearRect(0, 360, width, 385);
  width = 100;

}
function removeNodeValue() {

  const ctx = canvasComponent.getContext();
  ctx.clearRect(width - 70, 360, width, 385);
  width -= 50;

}


function setLeftRightNull(root) {
  if (root == null)
    return;
  root.isLeftComplete = false;
  root.isRightComplete = false;
  root.isLocked=false;
  if (root.left != null) {
    setLeftRightNull(root.left)
  }
  if (root.right != null) {
    setLeftRightNull(root.right)
  }
}


function getRequiredAndActualHeightAndWidth(
    maxNodeSpacing: number,
    heightOfTree: number,
    maxWidth: number,
    maxHeight: number,
) {
  const maxCanvasWidthRequired = getCanvasWidthFromMaxNodeSpacing(
      maxNodeSpacing,
  );
  const maxCanvasHeightRequired = getCanvasHeightFromTreeHeight(heightOfTree+1);
  const actualMaxWidth = maxCanvasWidthRequired > maxWidth ?
    maxCanvasWidthRequired : maxWidth;
  const actualMaxHeight = maxCanvasHeightRequired > maxHeight ?
    maxCanvasHeightRequired : maxHeight;

  return {
    maxCanvasHeightRequired,
    maxCanvasWidthRequired,
    actualMaxHeight,
    actualMaxWidth,
  };
}

function freeListNode(list:BinarySearchTreeNode[]){
for(var i = 0 ; i < list.length ; i++){
      list[i].isLocked = false;
      list[i].nodeCircle.setDefault();
      list[i].nodeCircle.draw(canvasComponent);
  }
}

//postorder 

//find the left most element x of the tree 
function getLeftX(node : BinarySearchTreeNode) : BinarySearchTreeNode{
  var leftNode : BinarySearchTreeNode = node;
  while(node.left != null){
      var nodeXY = node.nodeCircle.getCoordinates();
      var getLeftXY = node.left.nodeCircle.getCoordinates();

      if(nodeXY[0] > getLeftXY[0]){
          leftNode = node.left
      }
      node = node.left;
  }
  return leftNode;
}

//find the right most element x of the tree
function getRightX(node :BinarySearchTreeNode):BinarySearchTreeNode{
  var rightNode : BinarySearchTreeNode = node;

  while(node.right != null){
      var nodeXY = node.nodeCircle.getCoordinates();
      var getRightXY = node.right.nodeCircle.getCoordinates();
      if(nodeXY[0] < getRightXY[0]){
          rightNode = node.right
      }
      node = node.right;
  }
  return rightNode;
}
//find the bottom Y for the tree 
function getRightY(node:BinarySearchTreeNode) : BinarySearchTreeNode {
 
  var leftLeafNode : BinarySearchTreeNode = node.left != undefined ? getRightY(node.left) : node ;
  var rightLeafNode : BinarySearchTreeNode = node.right != undefined ? getRightY(node.right) : node;

  var leftXY = leftLeafNode.nodeCircle.getCoordinates();
  var rightXY = rightLeafNode.nodeCircle.getCoordinates();

  if(leftXY[1] > rightXY[1]){
      return leftLeafNode
  }else{
      return rightLeafNode;
  }

}



