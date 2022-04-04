mainPostorder('test');
window.onresize = () => {
    drawBinaryTree(root, canvas);
}
var userAnsList: BinarySearchTreeNode[] = [];
var count = 0
var testResult: HTMLDivElement = <HTMLDivElement>document.getElementById("testResult");
var testOrder: HTMLSpanElement = <HTMLSpanElement>document.getElementById("testOrder");
var btnTestStart: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnTestStart");
var testTimer: HTMLSpanElement = <HTMLSpanElement>document.getElementById("testTimer");

var myModal: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById('myModal')
var modalTitle: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById('modalTitle')
var modalText: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById('modalText');
var modalNewButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('modalNewButton')
var modalRestartButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('modalRestartButton')

var animationCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("animation-canvas");

var seconds: number = 0;
var mins: number = 3;
var intervalID;


modalNewButton.onclick = () => {
    stopConfettiInner();

    btnTestStart.disabled = true;
    if (btnTestStart.disabled)
        btnTestStart.classList.add('opacity-50')
    postOrderNodeList = []
    mainPostorder('test');
    removeModal();
    testResult.innerHTML = "Click Node to Start PostOrder Test"
    testOrder.innerHTML = "<div>&nbsp;</div>";

    startTimer();

};
modalRestartButton.onclick = () => {
    removeModal();
    testResult.innerHTML = "Click Node to Start PostOrder Test"
    testOrder.innerHTML = "<div>&nbsp;</div>";
    btnTestStart.disabled = true;
    if (btnTestStart.disabled)
        btnTestStart.classList.add('opacity-50')
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

    testResult.innerHTML = "Click Node to Start PostOrder Test"
    testOrder.innerHTML = "<div>&nbsp;</div>";

    btnTestStart.disabled = true;
    if (btnTestStart.disabled)
        btnTestStart.classList.add('opacity-50')

    testTimer.innerHTML = "Time Left : 03:00"
    startTimer();

}

// unlock all node and reset the timer
function resetTimer(isTimeOver: boolean = false) {
    console.warn("hihi0");
    checkResult(isTimeOver);
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


canvas.addEventListener('mousedown', function (e) {
    if (btnTestStart.disabled == true) {
        var i = 0;
        var [canvasX, canvasY] = canvasComponent.getCursorPosition(e);

        for (i = 0; i < postOrderNodeList.length; i++) {
            if (postOrderNodeList[i].nodeCircle.isinside(canvasX, canvasY)) {
                testResult.innerText = "Select Next Node";
                addNodeToList(postOrderNodeList[i]);
            }
        }
        if (userAnsList.length == postOrderNodeList.length) {
            resetTimer();
        }
    }

});
function checkResult(isTimeOver: boolean = false) {
    animationCanvas.height = canvasComponent.height()
    animationCanvas.width = canvasComponent.width()


    if (isTimeOver) {
        modalTitle.innerHTML = "<h3 style=color:black>" + "OOPS!!" + "</h3>"
        modalText.innerHTML = "Your Time is Over <br/> Do You Want to Restart";
        modalNewButton.style.display = "none";
        modalRestartButton.style.display = "block";
        modalRestartButton.innerHTML = "Yes";

        return;
    }
    var total = 0;
    for (var i = 0; i < postOrderNodeList.length; i++) {
        if (postOrderNodeList[i] == userAnsList[i]) {
            total++;
        }
    }
    var percent = (total * 100) / (postOrderNodeList.length)
    testResult.innerHTML = "You Scored " + percent.toFixed(2) + " % ";
    if (percent == 100) {
        startConfettiInner(animationContext)
        modalTitle.innerHTML = "<h3 style=color:green>" + "Congratulation!!" + "</h3>"
        modalText.innerHTML = "You Scored " + percent.toFixed(2) + " % <br>";
        modalText.innerHTML += "Do You Want To Try Another Test"
        modalNewButton.style.display = "block";
        modalNewButton.innerHTML = "Take New Test";
        modalRestartButton.style.display = "none";
    } else if (percent >= 60 && percent < 99) {
        modalTitle.innerHTML = "<h3 style=color:blue>" + "Too Close!!" + "</h3>"
        modalText.innerHTML = "You Scored " + percent.toFixed(2) + " % <br>";
        modalText.innerHTML += "Do You Want To Restart the Test Or Take a New Test"
        modalRestartButton.style.display = "block";
        modalNewButton.style.display = "block";
        modalRestartButton.innerHTML = "Restart Test";
        modalNewButton.innerHTML = "Take a New Test";
    }
    else if (percent > 40) {
        modalTitle.innerHTML = "<h3 style=color:black>" + "Not Bad!! </h3>"
        modalText.innerHTML = "You Scored " + percent.toFixed(2) + " % <br>";
        modalText.innerHTML += "Do You Want To Restart the Test"
        modalRestartButton.style.display = "block";
        modalNewButton.style.display = "block";
        modalRestartButton.innerHTML = "Restart Test";
        modalNewButton.innerHTML = "Take a New Test"
    } else {
        modalTitle.innerHTML = "<h3 style=color:black>" + "OOPS!!" + "</h3>"
        modalText.innerHTML = "You Scored " + percent.toFixed(2) + " % <br>";
        modalText.innerHTML += "Do You Want To Restart the Test";
        modalRestartButton.style.display = "block";
        modalRestartButton.innerHTML = "Restart Test";
        modalNewButton.style.display = "none";
    }

}



