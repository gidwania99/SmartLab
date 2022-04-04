mainInorder('test');

window.onresize = () => {
    if (window.innerWidth < 1300)
        drawBinaryTree(root, canvas);
}
var userAnsList: BinarySearchTreeNode[] = [];
var count = 0
var testResult: HTMLDivElement = <HTMLDivElement>document.getElementById("testResult");
var testOrder: HTMLSpanElement = <HTMLSpanElement>document.getElementById("testOrder");
var btnTestStart: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnTestStart");
var testTimer: HTMLSpanElement = <HTMLSpanElement>document.getElementById("testTimer");

var modalTitle: HTMLDivElement = <HTMLDivElement>document.getElementById('modalTitle')
var modalText: HTMLDivElement = <HTMLDivElement>document.getElementById('modalText');
var modalNewButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('modalNewButton')
var modalRestartButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('modalRestartButton')

var seconds: number = 0;
var mins: number = 3;
var intervalID;


modalNewButton.onclick = () => {
    btnTestStart.disabled = true;
    inorderNodeList = []
    mainInorder('test');
    removeModal();
    testResult.innerHTML = "Click Node to Start Test"
    testOrder.innerHTML = "<div>&nbsp;</div>";
    startTimer();
};
modalRestartButton.onclick = () => {
    removeModal();
    testResult.innerHTML = "Click Node to Start Test"
    testOrder.innerHTML = "<div>&nbsp;</div>";
    btnTestStart.disabled = true;
    testTimer.innerHTML = "00:00"
    mins = 3;
    seconds = 0;
    freeListNode(userAnsList);
    userAnsList = [];
    count = 0;
    startTimer();

}


btnTestStart.onclick = function () {
    btnTestStart.disabled = true;
    if (btnTestStart.disabled)
        btnTestStart.classList.add('opacity-50');
    testResult.innerHTML = "Click Node to Start InOrder traversal Test"
    testOrder.innerHTML = "<div>&nbsp;</div>";
    btnTestStart.disabled = true;
    testTimer.innerHTML = "Time Left : 03:00"
    startTimer();

}


canvas.addEventListener('mousedown', function (e) {
    if (btnTestStart.disabled == true) {
        var i = 0;
        var [canvasX, canvasY] = canvasComponent.getCursorPosition(e);

        for (i = 0; i < inorderNodeList.length; i++) {
            if (inorderNodeList[i].nodeCircle.isinside(canvasX, canvasY)) {
                testResult.innerText = "Select Next Node";
                addNodeToList(inorderNodeList[i]);
            }
        }
        if (userAnsList.length == inorderNodeList.length) {
            resetTimerInorder();
        }
    }

});
function checkResultInorder(isTimeOver: boolean = false) {
    animationCanvas.height = canvasComponent.height();
    animationCanvas.width = canvasComponent.width();
    if (isTimeOver) {
        modalTitle.innerHTML = "<h3 style=color:black>" + "OOPS!!" + "</h3>"
        modalText.innerHTML = "Your Time is Over <br/> Do You Want to Restart";
        modalNewButton.style.display = "none";
        modalRestartButton.style.display = "block";
        modalRestartButton.innerHTML = "Yes";

        return;
    }
    var total = 0;
    for (var i = 0; i < inorderNodeList.length; i++) {
        if (inorderNodeList[i] == userAnsList[i]) {
            total++;
        }
    }
    var percent = (total * 100) / (inorderNodeList.length)
    testResult.innerHTML = "You Scored " + percent.toFixed(2) + " % ";
    modalText.innerHTML = "You Scored " + percent.toFixed(2) + " % " + "<br>"
    if (percent == 100) {
        startConfettiInner(animationContext)
        modalTitle.innerHTML = "<h3 style=color:green>" + "Congratulation!! </h3>";
        modalText.innerHTML += "Do You Want To Try Another Test"
        modalNewButton.style.display = "block";
        modalNewButton.innerHTML = "Take New Test";
        modalRestartButton.style.display = "none";
    } else if (percent >= 60 && percent <= 99) {
        modalTitle.innerHTML = "<h3 style=color:blue>" + "Too Close!! </h3>"
        modalText.innerHTML += "Do You Want To Restart the Test"
        modalRestartButton.style.display = "block";
        modalNewButton.style.display = "block";
        modalRestartButton.innerHTML = "Restart Test";
        modalNewButton.innerHTML = "Take a New Test";
    } else if (percent > 40) {
        modalTitle.innerHTML = "<h3 style=color:black>" + "Not Bad!! </h3>"
        modalText.innerHTML += "Do You Want To Restart the Test"
        modalRestartButton.style.display = "block";
        modalNewButton.style.display = "block";
        modalRestartButton.innerHTML = "Restart Test";
        modalNewButton.innerHTML = "Take a New Test"
    }
    else {
        modalTitle.innerHTML = "<h3>" + "OOPS!!</h3>"
        modalText.innerHTML += "Do You Want To Restart the Test";
        modalRestartButton.style.display = "block";
        modalRestartButton.innerHTML = "Restart Test";
        modalNewButton.style.display = "none";
    }

}