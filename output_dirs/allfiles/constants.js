let CHOOSE_VALUE;
if (screen.width < 768) {
    CHOOSE_VALUE = {
        radius: 15,
        leafNodeSpace: 0,
        lineHeight: 75,
        lineJointWidth: 2,
        lineJointColor: "black",
        borderWidth: 4,
        borderColor: "#f56042",
        fillColor: "white",
        textColor: "black",
        nodeFontSize: 15,
        nodeFontType: "Poppins",
        nodeFontWeight: "normal",
        animateBorderColor: "black",
        animateFillColor: "blue",
        animateTextColor: "white",
        textFontWeight: "bold",
        textFontType: "Poppins",
        textFontSize: "15"
    };
}
else {
    CHOOSE_VALUE = {
        radius: 20,
        leafNodeSpace: 10,
        lineHeight: 70,
        lineJointWidth: 2,
        lineJointColor: "black",
        borderWidth: 4,
        borderColor: "#f56042",
        fillColor: "white",
        textColor: "black",
        nodeFontSize: 18,
        nodeFontType: "Poppins",
        nodeFontWeight: "normal",
        animateBorderColor: "black",
        animateFillColor: "blue",
        animateTextColor: "white",
        textFontWeight: "bold",
        textFontType: "Poppins",
        textFontSize: "20"
    };
}
const FIXED_VALUE = CHOOSE_VALUE;
let VALUES;
if (screen.width < 768) {
    VALUES = {
        lineWidth: 2,
        strokeColor: 'rgba(0,0,0)',
        backgroundColor: 'red',
        nodeLeftSpace: 5,
        nodeTopSpace: 5,
        nodeBottomSpace: 5,
        nodeRightSpace: 5,
    };
}
else {
    VALUES = {
        lineWidth: 2,
        lineColor: 'rgba(0,0,0)',
        backgroundColor: 'red',
        nodeToBorderSpace: 5,
    };
}
const HINT_CANVAS_VALUES = VALUES;
//# sourceMappingURL=constants.js.map