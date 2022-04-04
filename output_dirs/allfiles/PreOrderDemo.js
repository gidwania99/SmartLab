var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @format */
canvasComponent.resizeCanvas();
window.onresize = () => {
    if (window.innerWidth < 1300) {
        canvasComponent.resizeCanvas();
        drawBinaryTree(root, canvas);
        writePreorderRules();
    }
};
const btnStartPreorder = (document.getElementById("btnStart"));
const btnNextPreorder = (document.getElementById("btnNext"));
const btnRestartPreorder = (document.getElementById("btnRestart"));
const demoInstructionsPreorder = (document.getElementById("demoInstruction"));
const demoHintsPreorder = (document.getElementById("demoHints"));
const demoOrderPreorder = document.getElementById('demoOrder');
canvasComponent.clearCanvas();
root = null;
var list = [];
var incrementSeconds = 1000;
var waitForPressResolve;
mainPreorder('demo');
writePreorderRules();
btnRestart.onclick = preOrder;
btnStart.onclick = preOrder;
function preOrder() {
    demoOrder.innerHTML = "<b>Preorder :</b>";
    preOrderManually(root);
}
;
function setInstructionTextForSimulationDemoPreorder(node, isPrintable = true) {
    if (!node.isLeftComplete) {
        if (isPrintable) {
            demoHints.innerText = node.value + " is the root node.\nTherefore, Print " + node.value + ".";
        }
        else {
            if (node.left) {
                demoHints.innerText = "The left subtree of " + node.value + " is not null. \nTherefore, traverse left.";
                //demoHints.innerText =node.value+" left subtree is not null. \nso traverse left.";
                setTimeout(() => {
                    drawLeftSubtreeInstruction(node);
                }, 1500);
            }
            else if (node.right) {
                demoHints.innerText = "The left subtree of " + node.value + " is null but right is not null.\nTherefore, traverse right.";
                setTimeout(() => {
                    drawRightSubtreeInstruction(node);
                }, 1500);
            }
            else if (node != preOrderNodeList[preOrderNodeList.length - 1]) {
                demoHints.innerText = "The left & right subtree of " + node.value + " is null.\nTherefore, go back to its parent.";
                node.isRightComplete = true;
            }
            else if (node == preOrderNodeList[preOrderNodeList.length - 1]) {
                demoHints.innerText = "The left & right subtree of " + node.value + " is null.";
            }
            node.isLeftComplete = true;
        }
    }
    else {
        if (!node.right) {
            if (canvasComponent.width() > 550)
                demoHints.innerText = "The left subtree of " + node.value + " is completed & right is null.\nTherefore, go back to its parent.";
            else
                demoHints.innerText = "The left subtree of " + node.value + " is completed & right is null.Therefore, go back to its parent.";
            node.isRightComplete = true;
        }
        else {
            if (!node.isRightComplete) {
                if (canvasComponent.width() > 550)
                    demoHints.innerText = "The left subtree of " + node.value + " is completed & right is not null.\n Therefore, traverse right.";
                else
                    demoHints.innerText = "The left subtree of " + node.value + " is completed & right is not null.Therefore, traverse right.";
                setTimeout(() => {
                    drawRightSubtreeInstruction(node);
                }, 1500);
                node.isRightComplete = true;
            }
            else {
                if (!node.left)
                    demoHints.innerText = "The left subtree of " + node.value + " is null & right is completed.\nTherefore, go back to its parent.";
                else
                    demoHints.innerText = "The left & right subtree of " + node.value + " is completed.\nTherefore, go back to its parent.";
            }
        }
    }
}
function delayAnimationPreorder(node, isPrintable = false) {
    if (isPrintable)
        demoOrder.innerHTML += " <b>" + node.value + "</b>";
    setInstructionTextForSimulationDemoPreorder(node, isPrintable);
    return new Promise((resolve) => (waitForPressResolve = resolve));
}
btnNext.onclick = function () {
    btnNext.disabled = true;
    btnNext.classList.add('opacity-50');
    setTimeout(() => {
        btnNext.disabled = false;
        btnNext.classList.remove('opacity-50');
    }, 2000);
    if (waitForPressResolve)
        waitForPressResolve();
    drawBinaryTree(root, canvas);
    writePreorderRules();
};
function preOrderManually(node) {
    return __awaiter(this, void 0, void 0, function* () {
        btnStart.style.display = "none";
        btnRestart.style.display = "none";
        btnNext.style.display = "inline-block";
        demoHints.innerText = "Demo Started\n  ";
        setLeftRightNull(node);
        let seconds = 0;
        let S = [];
        if (node == null)
            return;
        S.push(node);
        let prev = null;
        while (S.length != 0) {
            let current = S[S.length - 1];
            blinkNode(current);
            if (!current.isLeftComplete) {
                yield delayAnimationPreorder(current, true);
                //restoreCircle(current);
                yield delayAnimationPreorder(current, false);
                // await showTreeAnimation(current);
            }
            else {
                yield delayAnimationPreorder(current, false);
            }
            if (current == preOrderNodeList[preOrderNodeList.length - 1])
                break;
            // S.pop();
            if ((prev == null || prev.left == current || prev.right == current)) {
                //  await this.delayAnimation(current, true);
                //  restoreCircle(current);
                list.push(current.value);
                if (current.left != null) {
                    S.push(current.left);
                    current.isLeftComplete = true;
                }
                else if (current.right != null) {
                    S.push(current.right);
                    current.isRightComplete = true;
                }
                else {
                    S.pop();
                    current.isRightComplete = true;
                    current.isLeftComplete = true;
                }
            }
            else if (current.value > prev.value) {
                if (current.right != null) {
                    S.push(current.right);
                    current.isRightComplete = true;
                }
                else {
                    S.pop();
                }
            }
            else if (current.value <= prev.value) {
                S.pop();
                current.isRightComplete = true;
                current.isLeftComplete = true;
            }
            prev = current;
            stopBlink();
        }
        stopBlink();
        btnNext.style.display = "none";
        btnRestart.style.display = "inline-block";
        demoHints.innerText = "Preorder Traversal is completed\nClick Restart Button To Restart Simulation.";
        // hints.setAttribute('data-after',' ');
    });
}
function writePreorderRules() {
    let context = canvasComponent.getContext();
    let xPoint;
    let yPoint = root.nodeCircle.getCoordinates()[1];
    if (canvasComponent.width() > 550) {
        context.font = "bold 16px Monospace";
        xPoint = canvasComponent.width() * (0.75);
    }
    else {
        context.font = "bold 10px Monospace";
        xPoint = canvasComponent.width() * (0.65);
    }
    context.textAlign = "start";
    context.fillText("Preorder Traversal", xPoint, yPoint);
    context.fillText("Root->Left->Right", xPoint, yPoint + 30);
}
//# sourceMappingURL=PreOrderDemo.js.map