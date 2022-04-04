mainPostorder('sim');
window.onresize = () => {
    drawBinaryTree(root, canvas);
};
var hint1 = document.getElementById("hint1");
var hint2 = document.getElementById("hint2");
var hint3 = document.getElementById("hint3");
var simulationOrder = document.getElementById("simulationOrder");
var myModal = document.getElementById('myModal');
var modalTitle = document.getElementById('modalTitle');
var modalText = document.getElementById('modalText');
var modalButton = document.getElementById('modalButton');
var closeModalButton = document.getElementById('closeModalButton');
var falseCount = 0;
var counter = 0;
var userAnsList = [];
canvas.addEventListener('mousedown', function (e) {
    var i = 0;
    var [canvasX, canvasY] = canvasComponent.getCursorPosition(e);
    for (i = 0; i < postOrderNodeList.length; i++) {
        if (!postOrderNodeList[i].isLocked && postOrderNodeList[i].nodeCircle.isinside(canvasX, canvasY)) {
            writeSimulationInstructions(postOrderNodeList[i]);
        }
    }
});
function writeInstruction(message1, message2, err) {
    if (err && err != "done") {
        hint1.innerHTML = "<b style='color:red'>" + message1 + "</b>";
        hint2.innerHTML = "<span>" + message2 + "</span>";
        if (err == true || err == false)
            hint3.innerHTML = "<span>Reselect The Node</span>";
    }
    else {
        hint1.innerHTML = "<b style='color:green'>" + message1 + "</b>";
        hint2.innerHTML = "<span>" + message2 + "</span>";
        if (err != "done") {
            hint3.innerHTML = "<span>Select Next Node</span>";
        }
        else {
            hint3.innerHTML = "";
        }
    }
}
function writeSimulationInstructions(node) {
    let rightAns = postOrderNodeList[counter];
    //for first ans
    if (node == rightAns) {
        //writeInstruction("Correct!", node.value + " at right place", false);
        if (counter == 0) {
            if (node.value > node.parent.parent.value)
                writeInstruction("Correct!", node.value + " is the left child of " + node.parent.value + ".", false);
            else {
                if (node.value < node.parent.value)
                    writeInstruction("Correct!", node.value + " is the leftmost node.", false);
                else
                    writeInstruction("Correct!", node.value + " is the right child of " + node.parent.value + ".", false);
            }
        }
        else if (node.value < postOrderNodeList[counter - 1].value) {
            writeInstruction("Correct!", node.value + " is the parent of " + postOrderNodeList[counter - 1].value + ".", false);
        }
        else if (node.value > postOrderNodeList[counter - 1].value) {
            if (node == postOrderNodeList[counter - 1].parent) {
                if (postOrderNodeList[counter].value < root.value && postOrderNodeList[counter + 1].value > root.value)
                    writeInstruction("Correct!", node.value + " is the right child of " + postOrderNodeList[counter - 1].value + "." + "<br>The left subtree of " + root.value + " is completed.", false);
                else
                    writeInstruction("Correct!", node.value + " is the right child of " + postOrderNodeList[counter - 1].value + ".", false);
            }
            else {
                if (node.left != null) {
                    if (postOrderNodeList[counter].value < root.value && postOrderNodeList[counter + 1].value > root.value)
                        writeInstruction("Correct!", node.value + " is the parent of " + node.left.value + "." + "<br>The left subtree of " + root.value + " is completed.", false);
                    else
                        writeInstruction("Correct!", node.value + " is the parent of " + node.left.value + ".", false);
                }
                else {
                    if (node.parent == postOrderNodeList[counter + 1])
                        writeInstruction("Correct!", node.value + " is the right child of " + node.parent.value + ".", false);
                    else
                        writeInstruction("Correct!", node.value + " is the leftmost node  in the right subtree of " + postOrderNodeList[counter - 1].parent.value + ".", false);
                }
            }
        }
        lockNode(node);
        counter++;
    }
    else {
        if (rightAns == root) {
            writeInstruction("Incorrect", "traverse the root node first!!", true);
            highlightNode(rightAns);
        }
        else if (rightAns.value < root.value) { //left of root is not traversed{
            if (node.value >= root.value) { //user select node from right tree
                writeInstruction("Incorrect", "traverse the left subtree of " + root.value + " first!!", true);
                drawLeftSubtreeInstruction(root);
            }
            else {
                if (node.right == rightAns) { //if user selects root before right child 
                    writeInstruction("Incorrect", "traverse the right child of " + node.value + " first!!", true);
                    highlightNode(rightAns);
                }
                else if (node.left == rightAns) { //if user selects root before left child
                    writeInstruction("Incorrect", "traverse the left child of " + node.value + " first!!", true);
                    highlightNode(rightAns);
                }
                else if (node.value < rightAns.value) {
                    writeInstruction("Incorrect", "traverse the right subtree of " + node.value + " first!!", true);
                    drawRightSubtreeInstruction(node);
                }
                else if (node.value > rightAns.parent.value) {
                    if (rightAns.parent.parent != node && rightAns.parent.parent != root) {
                        writeInstruction("Incorrect", "traverse the left subtree of " + rightAns.parent.parent.value + " first!!", true);
                        drawLeftSubtreeInstruction(rightAns.parent.parent);
                    }
                    else if (node.parent.parent == rightAns.parent) {
                        writeInstruction("Incorrect", "traverse the left subtree of " + node.parent.parent.value + " first!!", true);
                        drawLeftSubtreeInstruction(node.parent.parent);
                    }
                    else if (node.parent == rightAns.parent) {
                        writeInstruction("Incorrect", "traverse the left subtree of " + node.parent.value + " first!!", true);
                        drawLeftSubtreeInstruction(node.parent);
                    }
                    else {
                        writeInstruction("Incorrect", "traverse the left subtree of " + node.value + " first!!", true);
                        drawLeftSubtreeInstruction(node);
                    }
                }
            }
        }
        else { //left of root is traversed
            if (node.parent == rightAns) { //if user selects right child before root
                writeInstruction("Incorrect", "traverse the parent of " + node.value + " first!!", true);
                highlightNode(rightAns);
            }
            else if (node.value < rightAns.value) {
                writeInstruction("Incorrect", "traverse the right subtree of " + node.value + " first!!", true);
                drawRightSubtreeInstruction(node);
            }
            else if (node.parent != null && node.parent.parent == rightAns) { //if user selects right subtree before root
                writeInstruction("Incorrect", "traverse the parent of " + node.parent.value + " first!!", true);
                highlightNode(rightAns);
            }
            else if (node.left == rightAns) { //if user selects root before left child
                writeInstruction("Incorrect", "traverse the left child of " + node.value + " first!!", true);
                highlightNode(rightAns);
            }
            else if (node.value > rightAns.parent.value) {
                if (node.parent.parent == rightAns.parent) {
                    writeInstruction("Incorrect", "traverse the left subtree of " + node.parent.parent.value + " first!!", true);
                    drawLeftSubtreeInstruction(node.parent.parent);
                }
                else if (node.parent == rightAns.parent) {
                    writeInstruction("Incorrect", "traverse the left subtree of " + node.parent.value + " first!!", true);
                    drawLeftSubtreeInstruction(node.parent);
                }
                else {
                    writeInstruction("Incorrect", "traverse the left subtree of " + node.value + " first!!", true);
                    drawLeftSubtreeInstruction(node);
                }
            }
            else if (node.value > rightAns.value) {
                writeInstruction("Incorrect", "traverse the left subtree of " + node.value + " first!!", true);
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
        animateWrongNode(node);
    }
    if (postOrderNodeList.length == counter) {
        writeInstruction("Congratulation", "You have Completed this..", "done");
        redirecting(true);
    }
}
learnModal.onclick = function () {
    removeModal();
    window.location.href = "PostOrderSimulationDemo.html";
};
testModal.onclick = function () {
    removeModal();
    window.location.href = "PostOrderTest.html";
};
retryModal.onclick = function () {
    stopConfettiInner();
    removeModal();
    hint1.innerHTML = "<span>Click on Node to Start PreOrder Simulation</span>";
    hint2.innerHTML = "<span></span>";
    hint3.innerHTML = "<span></span>";
    simulationOrder.innerHTML = "Selected Nodes:";
    falseCount = 0;
    counter = 0;
    chanceCount.innerHTML = (3 - falseCount) + "";
    if (retryModal.value == "new") {
        mainPostorder('sim');
    }
    else {
        freeListNode(postOrderNodeList);
        drawBinaryTree(root, canvas);
    }
};
//# sourceMappingURL=PostOrderSimulation.js.map