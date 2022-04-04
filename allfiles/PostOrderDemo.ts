/** @format */

window.onresize = () => {
    drawBinaryTree(root, canvas)
    writePostorderRules();

}
const btnStart: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("btnStart")
);
const btnNext: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("btnNext")
);

const btnRestart: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("btnRestart")
);
const demoInstructions: HTMLDivElement = <HTMLDivElement>(
    document.getElementById("demoInstruction")
);
const demoHints: HTMLParagraphElement = <HTMLParagraphElement>(
    document.getElementById("demoHints")
);

const demoOrder: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById('demoOrder');

canvasComponent.clearCanvas();
root = null;
var list = [];
var incrementSeconds = 1000;
var waitForPressResolve;

mainPostorder('demo');
writePostorderRules();
btnRestart.onclick = postOrder;
btnStart.onclick = postOrder
function postOrder() {

    btnNext.disabled = true;

    btnNext.classList.add('opacity-50');

    setTimeout(() => {
        btnNext.disabled = false;

        btnNext.classList.remove('opacity-50');
    }, 2000);

    demoOrder.innerHTML = "<b>PostOrder :</b>";
    postOrderManually(root);

};


function setInstructionTextForSimulationDemo(node, isPrintable = true) {

    if (!node.isLeftComplete && node.left != null) {
        demoHints.innerText = "The left subtree of " + node.value + " is not null.\nTherefore, traverse left subtree first!";

        setTimeout(() => {
            drawLeftSubtreeInstruction(node);
        }, 1500);

        node.isLeftComplete = true;

    }
    else if (
        node.left != null &&
        node.isLeftComplete &&
        node.right != null &&
        node.isRightComplete == false
    ) {
        if (canvasComponent.width() > 550)
            demoHints.innerText = "The left subtree of " + node.value + " is completed & right is not null.\n Therefore, Traverse right.";
        else
            demoHints.innerText = "The left subtree of " + node.value + " is completed & right is not null.Therefore, Traverse right.";

        node.isRightComplete = true;
        setTimeout(() => {
            drawRightSubtreeInstruction(node);
        }, 1500);

    } else if (node.right != null && node.isRightComplete) {
        if (!isPrintable)
            demoHints.innerText = "The right subtree of " + node.value + " is completed.";
        else {
            if (node != root)
                demoHints.innerText = "Therefore, print " + node.value + "." + "\nAnd go back to its parent.";
            else
                demoHints.innerText = "Therefore, print " + node.value + ".";

        }
    }
    else if (node.right == null && node.left != null) {
        if (!isPrintable)
            demoHints.innerText = "The left subtree of " + node.value + " is completed & right is null.";
        else
            demoHints.innerText = "Therefore, print " + node.value + "\nAnd go back to its parent.";
        node.isLeftComplete = true
    }
    else if (node.left == null && node.right != null) {
        demoHints.innerText =
            "The left subtree of " + node.value + " is null.\nTherefore, Traverse right.";
        node.isRightComplete = true
        setTimeout(() => {
            drawRightSubtreeInstruction(node);
        }, 1500);
    } else if (node.left == null && node.right == null) {
        if (!isPrintable) {
            demoHints.innerText = "The left & right subtree of " + node.value + " is null.";
        }
        else {

            demoHints.innerText = "Therefore, print " + node.value + "." + "\nAnd go back to its parent.";;
        }
    } else if (!node.isRightComplete && node.right != null) {
        demoHints.innerText = node.value + " left is completed.\nTherefore Traverse Right.";
        node.isRightComplete = true;
    } else if (
        node.left != null &&
        node.right != null &&
        node.isLeftComplete &&
        node.isRightComplete
    ) {
        demoHints.innerText =
            "The left & right subtree of " + node.value + " is completed.\nTherefore, print " + node.value + ".";
    }

}



function delayAnimation(node: BinarySearchTreeNode, isPrintable = false) {

    if (isPrintable) {
        demoOrder.innerHTML += " <b>" + node.value + "</b>"
    }
    setInstructionTextForSimulationDemo(node, isPrintable);

    return new Promise((resolve) => (waitForPressResolve = resolve));
}

btnNext.onclick = function () {
    btnNext.disabled = true;

    btnNext.classList.add('opacity-50');

    setTimeout(() => {
        btnNext.disabled = false;

        btnNext.classList.remove('opacity-50');
    }, 2000);
    if (waitForPressResolve) waitForPressResolve();
    drawBinaryTree(root, canvas);
    writePostorderRules();
};

async function postOrderManually(node) {
    setLeftRightNull(node);
    btnStart.style.display = "none";
    btnRestart.style.display = "none";
    btnNext.style.display = "inline-block";
    let seconds = 0;

    let S: BinarySearchTreeNode[] = [];
    if (node == null) return;
    S.push(node);
    let prev = null;
    while (S.length != 0) {
        let current = S[S.length - 1];

        blinkNode(current);

        if (!current.isLeftComplete) {

            // await showTreeAnimation(current);
            drawBinaryTree(root, canvas);
            writePostorderRules();
        }

        await this.delayAnimation(current, false);



        if (prev == null || prev.left == current || prev.right == current) {
            if (current.left != null) {
                S.push(current.left);
            } else if (current.right != null) {
                S.push(current.right);
            } else {
                S.pop();
                await delayAnimation(current, true);
                restoreCircle(current);
                list.push(current.value);
            }
        } else if (current.left == prev) {
            if (current.right != null) {
                S.push(current.right);
            } else {
                S.pop();
                await delayAnimation(current, true);
                restoreCircle(current);
                list.push(current.value);
            }
        } else if (current.right == prev) {
            S.pop();
            await delayAnimation(current, true);
            restoreCircle(current);
            list.push(current.value);
        }
        prev = current;
        stopBlink();
    }
    stopBlink();
    btnNext.style.display = "none";
    btnRestart.style.display = "inline-block"
    demoHints.innerText = "Postorder Traversal is completed\nClick Restart Button To Restart Simulation.";
    // hints.setAttribute('data-after',' ');



}




//code for autometic traversal
function delay(node, isPrintable) {
    node.nodeCircle.setNodeColor(
        FIXED_VALUE.animateBorderColor,
        FIXED_VALUE.animateFillColor,
        FIXED_VALUE.animateTextColor
    );
    node.nodeCircle.draw(canvasComponent);
    if (isPrintable) {
        demoOrder.innerHTML += " <b>" + node.value + "</b>"
    }
    setInstructionTextForSimulationDemo(node, isPrintable);
    return new Promise((resolve) => setTimeout(resolve, 1500));
}

async function postOrderAuto(node) {
    // removeNodeValue();
    setLeftRightNull(node);
    btnStart.disabled = true;
    btnRestart.disabled = true;
    if (btnStart.style.display == "none")
        btnRestart.style.display = "inline-block";
    var S: BinarySearchTreeNode[] = [];

    if (node == null) return;
    S.push(node);

    var prev = null;
    while (S.length != 0) {
        var current = S[S.length - 1];
        // setInstructionText(current);
        await this.delay(current, false);
        restoreCircle(current);

        if (prev == null || prev.left == current || prev.right == current) {
            if (current.left != null) {
                S.push(current.left);
            } else if (current.right != null) {
                S.push(current.right);
            } else {
                S.pop();
                await this.delay(current, true);
                restoreCircle(current);
                list.push(current.value);
            }
        } else if (current.left == prev) {
            if (current.right != null) {
                S.push(current.right);
            } else {
                S.pop();
                await this.delay(current, true);
                restoreCircle(current);
                list.push(current.value);
            }
        } else if (current.right == prev) {
            S.pop();
            await this.delay(current, true);
            restoreCircle(current);
            list.push(current.value);
        }
        prev = current;
    }
    btnStart.style.display = "none";
    if (btnRestart.disabled) {
        btnStart.style.display = "none"
        btnRestart.disabled = false;
        btnRestart.style.display = "inline-block";
    }
    demoHints.innerText = "";
}


function writePostorderRules() {
    let context = canvasComponent.getContext();
    let xPoint: number;
    let yPoint: number = root.nodeCircle.getCoordinates()[1];
    if (canvasComponent.width() > 550) {
        context.font = "bold 16px Monospace";
        xPoint = canvasComponent.width() * (0.75);
    }
    else {
        context.font = "bold 10px Monospace";
        xPoint = canvasComponent.width() * (0.65);
    }
    context.textAlign = "start";
    context.fillText("Postorder Traversal", xPoint, yPoint);
    context.fillText("Left->Right->Root", xPoint, yPoint + 30);

}


