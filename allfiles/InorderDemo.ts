/** @format */
canvasComponent.resizeCanvas();
window.onresize = () => {
    if (window.innerWidth < 1300) {
        canvasComponent.resizeCanvas();
        drawBinaryTree(root, canvas);
        writeInorderRules();
    }
}
const btnStartInorder: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("btnStart")
);
const btnNextInorder: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("btnNext")
);

const btnRestartInorder: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("btnRestart")
);

const demoHintsInorder: HTMLParagraphElement = <HTMLParagraphElement>(
    document.getElementById("demoHints")
);

const demoOrderInorder: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById('demoOrder');


canvasComponent.clearCanvas();
root = null;
var list = [];
var incrementSeconds = 1000;
var waitForPressResolve;

mainInorder('demo');
writeInorderRules();

btnRestartInorder.onclick = inorder;
btnStartInorder.onclick = inorder
function inorder() {

    demoOrderInorder.innerHTML = "<b>Inorder :</b>";
    inOrderManually(root);

};


function delayAnimationInorder(node: BinarySearchTreeNode, msg, isPrintable = false) {
    blinkNode(node);
    if (isPrintable) {
        demoOrderInorder.innerHTML += " <b>" + node.value + "</b>";
        node.isLocked = true;

    }
    demoHintsInorder.innerHTML = msg;

    return new Promise((resolve) => (waitForPressResolve = resolve));
}

btnNextInorder.onclick = function () {
    btnNext.disabled = true;

    btnNext.classList.add('opacity-50');
    setTimeout(() => {
        btnNext.disabled = false;

        btnNext.classList.remove('opacity-50');
    }, 2000);
    if (waitForPressResolve) waitForPressResolve();
};


async function inOrderManually(node) {
    btnStartInorder.style.display = "none";
    btnRestartInorder.style.display = "none";
    btnNextInorder.style.display = "inline-block";
    demoHintsInorder.innerText = "Demo Started\n  ";
    setLeftRightNull(node);

    let S: BinarySearchTreeNode[] = [];
    let curr = root;
    let text: string;


    while (curr != null || S.length != 0) {


        while (curr != null) {

            if (!curr.isLocked && !curr.isLeftComplete) {
                S.push(curr);


                if (curr.left != null) {
                    setTimeout(() => drawLeftSubtreeInstruction(curr), 1500);

                    if (canvasComponent.width() > 550)
                        text = "As in inorder traversal we are supposed to traverse left sub-tree first <br/> Let's move to left sub-tree of " + curr.value + ".";
                    else
                        text = "As in inorder traversal we are supposed to traverse left sub-tree first. Let's move to left sub-tree of " + curr.value + ".";

                    await delayAnimationInorder(curr, text);
                }
                else {
                    await delayAnimationInorder(curr, "As the left sub-tree of " + curr.value + " is null <br/> So let's print this node!", true);
                }
            }

            drawBinaryTree(root, canvas);
            writeInorderRules();
            curr.isLeftComplete = true;
            curr = curr.left;
            stopBlink();

        }
        curr = S.pop();

        drawBinaryTree(root, canvas);
        writeInorderRules();


        if (curr != null && curr.isLocked && curr.isRightComplete) {



            if (canvasComponent.width() > 550)
                text = "As now we have traversed the left & right sub-tree of " + curr.value + ".<br/>Let's move back to the parent node!";
            else
                text = "As now we have traversed the left & right sub-tree of " + curr.value + ". Let's move back to the parent node!";


            await delayAnimationInorder(curr, text);
            stopBlink();

        }
        else {

            if (curr.left != null) {
                await delayAnimationInorder(curr, "As now we have traversed the left sub-tree of " + curr.value + "<br/>let's print this node!", true);
                stopBlink();
            }
            if (curr.right == null) {
                if (curr.value == inorderNodeList[inorderNodeList.length - 1].value) {

                    btnNextInorder.style.display = "none";
                    btnRestartInorder.style.display = "inline-block"


                    delayAnimationInorder(curr, "Inorder Traversal is completed.<br/>Click the Restart Button To Restart Simulation");


                }
                else {
                    await delayAnimationInorder(curr, "Now that the right sub-tree of " + curr.value + " is null <br/> Let's move back to the parent node!");

                    curr.isRightComplete = true;
                }

                stopBlink();
            }
            else {
                setTimeout(() => drawRightSubtreeInstruction(curr), 1500);
                await delayAnimationInorder(curr, "Now that we have printed root <br/>let's move to right sub-tree!");
                stopBlink();
                if (curr.value < root.value) {
                    S.push(curr);
                }

            }
            curr.isRightComplete = true;
            curr = curr.right;

        }

        drawBinaryTree(root, canvas);
        writeInorderRules();

    }

}



function writeInorderRules() {
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
    context.fillText("Inorder Traversal", xPoint, yPoint);
    context.fillText("Left->Root->Right", xPoint, yPoint + 30);

}
