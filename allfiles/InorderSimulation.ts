
mainInorder('sim');
window.onresize = () => {
    if (window.innerWidth < 1300)
        drawBinaryTree(root, canvas);
}

var hint1: HTMLSpanElement = <HTMLSpanElement>document.getElementById("hint1");
var hint2: HTMLSpanElement = <HTMLSpanElement>document.getElementById("hint2");
var hint3: HTMLSpanElement = <HTMLSpanElement>document.getElementById("hint3");
var simulationOrder: HTMLDivElement = <HTMLDivElement>document.getElementById("simulationOrder")
var modalTitle: HTMLDivElement = <HTMLDivElement>document.getElementById('modalTitle')
var modalText: HTMLDivElement = <HTMLDivElement>document.getElementById('modalText');
var retryModal: HTMLButtonElement = <HTMLButtonElement>document.getElementById('retryModal');
var learnModal: HTMLButtonElement = <HTMLButtonElement>document.getElementById('learnModal');
var testModal: HTMLButtonElement = <HTMLButtonElement>document.getElementById('testModal');

//var closeModalButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById('closeModalButton')


var falseCount: number = 0;
var counter: number = 0;

var userAnsList: BinarySearchTreeNode[] = [];







canvas.addEventListener('mousedown', function (e) {

    var i: number = 0;
    var [canvasX, canvasY] = canvasComponent.getCursorPosition(e);

    for (i = 0; i < inorderNodeList.length; i++) {
        if (!inorderNodeList[i].isLocked && inorderNodeList[i].nodeCircle.isinside(canvasX, canvasY)) {
            writeSimulationInstructionsInorder(inorderNodeList[i]);
        }
    }

});


function writeInstructionInorder(message1, message2, err?) {
    if (err && err != "done") {
        hint1.innerHTML = "<b style='color:red'>" + message1 + "</b>";
        hint2.innerHTML = "<span>" + message2 + "</span>";
        if (err == true || err == false)
            hint3.innerHTML = "<span>Reselect The Node</span>";
    } else {
        hint1.innerHTML = "<b style='color:green'>" + message1 + "</b>";
        hint2.innerHTML = "<span>" + message2 + "</span>";
        if (err != "done") {
            hint3.innerHTML = "<span>Select Next Node</span>";
        } else {
            hint3.innerHTML = "";
        }
    }

}


function writeSimulationInstructionsInorder(node: BinarySearchTreeNode) {

    let rightAns: BinarySearchTreeNode = inorderNodeList[counter];

    if (node == rightAns) {
        if (counter == 0)
            writeInstructionInorder("Correct!", node.value + " is the leftmost node.", false);
        
        else if (node.value > inorderNodeList[counter-1].value ) {

            if(node.parent==inorderNodeList[counter-1]){
               
                if (inorderNodeList[counter].value < root.value && inorderNodeList[counter + 1].value== root.value)
                    writeInstructionInorder("Correct!", node.value + " is the right child of " + inorderNodeList[counter-1].value + "." + "<br>The left subtree of root node " + root.value + " is completed.", false);
                else
                    writeInstructionInorder("Correct!", node.value + " is the right child of " + inorderNodeList[counter-1].value + ".", false);

            }
            else{
                if(node.left!=null){
                    if (inorderNodeList[counter].value < root.value && inorderNodeList[counter + 1].value == root.value)
                        writeInstructionInorder("Correct!", node.value + " is the parent of " + node.left.value + "." + "<br>The left subtree of " + root.value + " is completed.", false);
                    else
                        writeInstructionInorder("Correct!", node.value + " is the parent of " + node.left.value + ".", false);
                }
                else{
                    writeInstructionInorder("Correct!", node.value + " is the leftmost node  in the right subtree of "+inorderNodeList[counter-1].value+".", false);

                }
                
            }
            

        }

        lockNode(node);
        counter++;
    }
    else {    //wrong ans

        if (rightAns == root) {
            writeInstructionInorder("Incorrect", "Traverse the root node first!!", true);
            highlightNode(rightAns);
        }
        else if (rightAns.value < root.value) {  //left of root is not Traversed{

            if (node.value >= root.value) { //user select node from right tree
                writeInstructionInorder("Incorrect", "Traverse the left subtree of " + root.value + " first!!", true);
                drawLeftSubtreeInstruction(root);
            }
            else {
                if (node.parent == rightAns) {      //if user selects right child before root
                    writeInstructionInorder("Incorrect", "Traverse the parent of " + node.value + " first!!", true);
                    highlightNode(rightAns);
                }
                else if (node.left == rightAns) {   //if user selects root before left child
                    writeInstructionInorder("Incorrect", "Traverse the left child of " + node.value + " first!!", true);
                    highlightNode(rightAns);
                }
                else if (node.value > rightAns.parent.value) {
                    if (rightAns.parent.parent != node && rightAns.parent.parent != root) {
                        writeInstructionInorder("Incorrect", "Traverse the left subtree of " + rightAns.parent.parent.value + " first!!", true);
                        drawLeftSubtreeInstruction(rightAns.parent.parent);
                    }
                    else if (node.parent.parent == rightAns.parent) {
                        writeInstructionInorder("Incorrect", "Traverse the left subtree of " + node.parent.parent.value + " first!!", true);
                        drawLeftSubtreeInstruction(node.parent.parent);
                    }
                    else if (node.parent == rightAns.parent) {
                        writeInstructionInorder("Incorrect", "Traverse the left subtree of " + node.parent.value + " first!!", true);
                        drawLeftSubtreeInstruction(node.parent);
                    }
                    else {
                        writeInstructionInorder("Incorrect", "Traverse the left subtree of " + node.value + " first!!", true);
                        drawLeftSubtreeInstruction(node);
                    }

                }


            }

        }
        else {   //left of root is Traversed

            if (node.parent == rightAns) {      //if user selects right child before root
                writeInstructionInorder("Incorrect", "Traverse the parent of " + node.value + " first!!", true);
                highlightNode(rightAns);
            }
            else if (node.parent.parent == rightAns) {      //if user selects right subtree before root
                writeInstructionInorder("Incorrect", "Traverse the parent of " + node.parent.value + " first!!", true);
                highlightNode(rightAns);
            }
            else if (node.left == rightAns) {   //if user selects root before left child
                writeInstructionInorder("Incorrect", "Traverse the left child of " + node.value + " first!!", true);
                highlightNode(rightAns);
            }
            else if (node.value > rightAns.parent.value) {
                if (node.parent.parent == rightAns.parent) {
                    writeInstructionInorder("Incorrect", "Traverse the left subtree of " + node.parent.parent.value + " first!!", true);
                    drawLeftSubtreeInstruction(node.parent.parent);
                }
                else if (node.parent == rightAns.parent) {
                    writeInstructionInorder("Incorrect", "Traverse the left subtree of " + node.parent.value + " first!!", true);
                    drawLeftSubtreeInstruction(node.parent);
                }
                else {
                    writeInstructionInorder("Incorrect", "Traverse the left subtree of " + node.value + " first!!", true);
                    drawLeftSubtreeInstruction(node);
                }

            }
            else if (node.value > rightAns.value) {
                writeInstructionInorder("Incorrect", "Traverse the left subtree of " + node.value + " first!!", true);
                drawLeftSubtreeInstruction(node);
            }
        }




        setTimeout(() => {
            drawBinaryTree(root, canvas);
        }, 3000);
        falseCount++;
        if (falseCount == 3) {
            redirecting();
        }
        chanceCount.innerHTML = (3 - falseCount) + "";

        chooseWrongNode(node);

    }
    if (inorderNodeList.length == counter) {
        writeInstructionInorder("Congratulations", "You have Completed this..", "done")
        redirecting(true);
    }
}


learnModal.onclick = function () {
    removeModal();
    window.location.href = "InorderDemo.html"
}
testModal.onclick = function () {
    removeModal();
    window.location.href = "InorderTest.html"

}

retryModal.onclick = function () {
    removeModal();
    stopConfettiInner();
    hint1.innerHTML = "<span>Click on Node to Start PreOrder Simulation</span>";
    hint2.innerHTML = "<span></span>";
    hint3.innerHTML = "<span></span>";
    simulationOrder.innerHTML = "Selected Nodes:";
    falseCount = 0;
    counter = 0;
    chanceCount.innerHTML = (3 - falseCount) + "";
    if (retryModal.value == "new") {
        mainInorder('sim');

    }
    else {
        freeListNode(inorderNodeList);
        drawBinaryTree(root, canvas);
    }

}

