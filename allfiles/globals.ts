const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById("canvas")
);

const canvasComponent: CanvasComponent = new CanvasComponent(canvas);
const chanceCount: HTMLSpanElement = <HTMLSpanElement>document.getElementById("chanceCount");
const chance: HTMLDivElement = <HTMLDivElement>document.getElementById("chance");
if (document.getElementById("animation-canvas") != null) {
  var animationCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("animation-canvas");
  var animationContext = animationCanvas.getContext("2d");

}

let root: BinarySearchTreeNode = null;
let width: number = 100

var demoTree: number[][] = [
  [15, 10, 11, 20, 25, 8, 4, 9, 18, 28],
  [25, 14, 8, 9, 18, 30, 50, 35, 16, 66],
  [30, 36, 33, 34, 24, 26, 5, 7, 1, 37, 40, 32],
  [23, 29, 17, 20, 60, 32, 1, 9, 25, 24, 21],
  [29, 24, 36, 38, 47, 4, 15, 27, 37, 3, 31],
  [10, 12, 7, 5, 4, 9, 25, 24, 34, 11, 8],
  [25, 21, 23, 30, 35, 15, 18, 12, 38, 27],
  [21, 14, 18, 17, 4, 9, 3, 33, 36, 30, 28],
  [20, 14, 15, 16, 28, 36, 14, 27, 26, 12],
  [13, 7, 9, 6, 3, 15, 20, 14, 8, 12, 14, 16]
  
];

var simTree: number[][] = [
  [66, 73, 39, 70, 49, 36, 72, 40, 58, 25],
  [40, 12, 25, 19, 33, 55, 42, 48, 5, 62],
  [57, 52, 84, 33, 45, 54, 53, 77, 80, 96],
  [38, 22, 42, 34, 30, 39, 53, 61, 49],
  [53, 7, 16, 10, 59, 56, 67, 62, 58, 5],
  [35, 32, 25, 28, 44, 37, 40, 51, 46, 54],
  [48, 42, 5, 25, 46, 96, 53, 50, 77],
  [60, 42, 57, 40, 25, 59, 63, 71, 86, 67],
  [46, 41, 32, 25, 43, 86, 89, 98, 88],
  [32, 11, 15, 24, 39, 60, 50, 7, 13, 35]
];

var testTree: number[][] = [
  [39, 49, 23, 15, 18, 5, 41, 46, 53, 50],
  [43, 48, 65, 51, 38, 25, 32, 40, 12, 69],
  [52, 37, 49, 32, 42, 51, 64, 56, 63],
  [63, 72, 68, 7, 25, 32, 71, 84, 79],
  [25, 24, 12, 18, 37, 28, 35, 43, 51],
  [55, 98, 76, 84, 42, 49, 45, 37, 22, 61],
  [32, 88, 47, 56, 25, 12, 28, 9, 30],
  [27, 15, 41, 12, 19, 23, 34, 45, 17, 52],
  [77, 93, 72, 98, 95, 75, 67, 52, 81],
  [47, 50, 62, 65, 57, 9, 13, 10, 24, 4]
];

let randomNumber: number;
let tree: number[];

function mainDeletion(){
  canvasComponent.resizeCanvas();
  generateTree("demo");
  drawBinaryTree(root, canvas);
}

function mainPreorder(type: String) {
  preOrderNodeList = [];
  canvasComponent.resizeCanvas();
  generateTree(type);
  drawBinaryTree(root, canvas);

  listOfNodesPreorder(root);
}

function mainInorder(type: String) {
  inorderNodeList = [];
  canvasComponent.resizeCanvas();
  generateTree(type);
  drawBinaryTree(root, canvas);
  listOfNodesInorder(root);
}


function mainPostorder(type: String) {
  preOrderNodeList = [];
  canvasComponent.resizeCanvas();
  generateTree(type);
  drawBinaryTree(root, canvas);
  listOfNodesPostorder(root);
}

// unlock all node and reset the timer
function resetTimerPreorder(isTimeOver: boolean = false) {
  checkResultPreorder(isTimeOver);
  clearInterval(intervalID)
  btnTestStart.disabled = false;
  if (!btnTestStart.disabled)
    btnTestStart.classList.remove('opacity-50')
  // btnTestStart.classList.toggle('opacity-100',!btnTestStart.disabled)
  testTimer.innerHTML = "00:00"
  mins = 3;
  seconds = 0;
  freeListNode(userAnsList);
  userAnsList = [];
  count = 0;
  showModal();
}
function resetTimerInorder(isTimeOver: boolean = false) {
  checkResultInorder(isTimeOver);
  clearInterval(intervalID)
  btnTestStart.disabled = false;
  testTimer.innerHTML = "00:00"
  mins = 3;
  seconds = 0;
  freeListNode(userAnsList);
  userAnsList = [];
  count = 0;
  showModal();
}


function lockNode(node: BinarySearchTreeNode) {
  if (!node.isLocked) {
    node.isLocked = true;
    node.nodeCircle.setNodeColor(FIXED_VALUE.animateBorderColor, FIXED_VALUE.animateFillColor, FIXED_VALUE.animateTextColor);
    node.nodeCircle.draw(canvasComponent);
    userAnsList[counter] = node;
    if (simulationOrder.style.display == '') {
      simulationOrder.style.display = "inline-block";
    }
    simulationOrder.innerHTML += "<b> " + node.value + "</b>"

  }
}

//postorder

function removeModal() {
  myModal.classList.add("hidden")

}
function showModal() {
  myModal.classList.remove("hidden")
}

function redirecting(success = false) {
  if (success == true) {
    animationCanvas.height = canvasComponent.height()
    animationCanvas.width = canvasComponent.width()
    var animationContext = animationCanvas.getContext("2d");
    startConfettiInner(animationContext);
    modalTitle.innerHTML = "<h3>Congratulation</h3>";
    modalText.innerHTML = "You have Completed Simulation with " + (falseCount) + " Wrong Attempts..";
    modalText.innerHTML += "<br/>Do You Want to Try With Another Problem?<br>Or give test?";
    retryModal.value = "new";
    retryModal.innerHTML = "Try Another Problem";
    learnModal.style.display = 'none';
    testModal.style.display = "block";
    testModal.innerHTML = "Give test";

  } else {
    modalTitle.innerHTML = "<h3 color='red'>OOPS!</h3>";
    modalText.innerHTML = "You couldn't Complete simulation Within 3 Attempts!! ";
    modalText.innerHTML += "<br/>You can retry or learn again in demo.";
    retryModal.innerHTML = "Retry";
    learnModal.innerHTML = "Learn in Demo";
    testModal.style.display = 'none';
  }
  showModal();
}

//preorder
function drawLeftSubtreeInstruction(node) {
  let context = canvasComponent.getContext();
  let hieght = node.left.getHeight() * 45;
  let width: number = canvasComponent.width() / 17.5;

  var bottom: BinarySearchTreeNode = getRightY(node.left)
  var pointY: number = (bottom.nodeCircle.getCoordinates()[1] + bottom.parent.nodeCircle.getCoordinates()[1]) / 2;

  let pointX = node.left.nodeCircle.x;

  if (!(node.left.left || node.left.right))
    pointY = node.left.nodeCircle.y;

  // let pointY=node.nodeCircle.y-40;
  context.strokeStyle = "black";
  context.lineWidth = 2;

  let lineptx = (pointX - node.nodeCircle.radius / 2);
  let lineptyFrom = pointY + hieght - (hieght * 0.25);
  let lineptyTO = pointY + hieght + (hieght * 0.20);

  context.beginPath();

  if (node.left.left) {
    if (node.left.left.left) {
      width = canvasComponent.width() / 5.5;
     // console.warn("width= "+canvasComponent.width());
      if (canvasComponent.width() < 550) {

        width = canvasComponent.width() / 5;
        
      }


    }
    else {

      width = canvasComponent.width() / 8;
      if (canvasComponent.width() < 550)
        width = canvasComponent.width() / 9.5;
    }
  }
  if (node.left.right) {

    if (node.left.right.right) {

      if (width < canvasComponent.width() / 5.5)
        width = canvasComponent.width() / 5.5;

      if (canvasComponent.width() < 550)
        width = canvasComponent.width() / 4.5;

    }
    else {

      if (node == root) {
        if (width < canvasComponent.width() / 7.5)
          width = canvasComponent.width() / 7.5;

      }
      else {
        if (width < canvasComponent.width() / 9.5)
          width = canvasComponent.width() / 9.5;

      }

      if (canvasComponent.width() < 550 && node == root) {
        if (width < canvasComponent.width() / 5.5)
          width = canvasComponent.width() / 5.5;
      }



    }

  }


  let s1: Ellipse;
  console.warn("width2= "+width);

  s1 = new Ellipse(context, pointX, pointY, width, hieght);

  s1.draw();
  return;

}

function drawRightSubtreeInstruction(node) {
  let context = canvasComponent.getContext();

  let hieght = node.right.getHeight() * 45;
  let width: number = canvasComponent.width() / 17.5;
  var bottom: BinarySearchTreeNode = getRightY(node.right);

  var pointY: number = (bottom.nodeCircle.getCoordinates()[1] + bottom.parent.nodeCircle.getCoordinates()[1]) / 2;
  //let pointX=node.right.nodeCircle.x+hieght;
  let pointX = node.right.nodeCircle.x;



  if (!(node.right.right || node.right.left))
    pointY = node.right.nodeCircle.y;


  context.strokeStyle = "black";
  context.lineWidth = 2;


  if (node.right.right) {
    if (node.right.right.right) {

      width = canvasComponent.width() / 5.5;

      if (canvasComponent.width() < 550)
        width = canvasComponent.width() / 5;
    }
    else {
      width = canvasComponent.width() / 8;
      if (canvasComponent.width() < 550)
        width = canvasComponent.width() / 9.5;
    }
  }
  if (node.right.left) {

    if (node.right.left.left) {
      if (width < canvasComponent.width() / 5.5)
        width = canvasComponent.width() / 5.5;
      if (canvasComponent.width() < 550)
        width = canvasComponent.width() / 4.5;


    }
    else {

      if (node == root) {
        if (width < canvasComponent.width() / 7.5)
          width = canvasComponent.width() / 7.5;
      }
      else {
        if (width < canvasComponent.width() / 9.5)
          width = canvasComponent.width() / 9.5;
      }


      if (canvasComponent.width() < 550 && node == root) {
        if (width < canvasComponent.width() / 5.5)
          width = canvasComponent.width() / 5.5;


      }


    }


  }


  let s1: Ellipse;


  s1 = new Ellipse(context, pointX, pointY, width, hieght);




  s1.draw();
  return;
}


function highlightNode(node) {
  let context = canvasComponent.getContext();

  let hieght = node.nodeCircle.radius * 2;
  let width:number;
  if(canvasComponent.width()<550)
     width= canvasComponent.width() / 22;
  else
    width= canvasComponent.width() / 24;

  

  var pointY: number = (node.nodeCircle.getCoordinates()[1]);
  //let pointX=node.right.nodeCircle.x+hieght;
  let pointX = node.nodeCircle.x;


  context.strokeStyle = "black";
  context.lineWidth = 2;


  let s1: Ellipse;


  s1 = new Ellipse(context, pointX, pointY, width, hieght);


  s1.draw();
  return;
}


let blinkIntervalID: number;
let blinkingNode: BinarySearchTreeNode;

function blinkNode(node: BinarySearchTreeNode) {
  blinkingNode = node;
  node.nodeCircle.setNodeColor(FIXED_VALUE.animateFillColor, FIXED_VALUE.fillColor, FIXED_VALUE.textColor);

  node.nodeCircle.draw(canvasComponent);

  blinkIntervalID = setInterval(() => {
    node.nodeCircle.setNodeColor(FIXED_VALUE.animateFillColor, FIXED_VALUE.fillColor, FIXED_VALUE.textColor);
    // drawBinaryTree(root,canvas);
    node.nodeCircle.draw(canvasComponent);
    setTimeout(() => {
      node.nodeCircle.setNodeColor(FIXED_VALUE.borderColor, FIXED_VALUE.fillColor, FIXED_VALUE.textColor);
      node.nodeCircle.draw(canvasComponent);

    }, 300);
  }, 700);
}
function stopBlink() {

  clearInterval(blinkIntervalID);
  blinkingNode.nodeCircle.setNodeColor(FIXED_VALUE.borderColor, FIXED_VALUE.fillColor, FIXED_VALUE.textColor);
  blinkingNode.nodeCircle.draw(canvasComponent);

  return;
}
function addNodeToList(node: BinarySearchTreeNode) {
  testOrder.innerHTML = "Selected Nodes : ";

  if (!node.isLocked) {
    node.isLocked = true;
    node.nodeCircle.setNodeColor(FIXED_VALUE.animateBorderColor, FIXED_VALUE.animateFillColor, FIXED_VALUE.animateTextColor);
    node.nodeCircle.draw(canvasComponent);
    userAnsList[count] = node;
    count++;
  } else if (node == userAnsList[count - 1]) {

    node.isLocked = false;
    count--;
    node.nodeCircle.setDefault();
    node.nodeCircle.draw(canvasComponent);
    removeNodeFromAnswerList(node.value);

  }
  for (var i = 0; i < userAnsList.length; i++) {
    testOrder.innerHTML += "<b>" + userAnsList[i].value + "</b> ";
  }
}
function removeNodeFromAnswerList(value: number) {
  for (var i = 0; i < userAnsList.length; i++) {
    if (userAnsList[i].value == value) {
      userAnsList.splice(i, 1);
    }
  }
}


function startTimer() {
  stopConfettiInner();
  intervalID = setInterval(function () {
    if (seconds == 0) {
      mins -= 1;
      seconds = 60;
    }
    seconds--;
    testTimer.innerHTML = "Time Left : " + (mins < 10 ? "0" + mins : mins) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    if (mins == 0 && seconds == 0) {
      resetTimer(true);

    }

  }, 1000);
}

