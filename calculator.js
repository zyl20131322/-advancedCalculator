var tds = document.getElementsByTagName("td"); //获得所有td标签
var displayResult = document.getElementById("displayResult"); //获得显示的数
var result = 0; //结果
var operator = ""; //操作符
var num1 = 0; //第一个数是否已设置值：1为设置了第一位字符 2为数字设置完值 0为否
var num2 = 0; //第二个数是否已设置值：1为设置了第一位字符 2为数字设置完值 0为否
var numpoint = 0; //是否有小数点：1为是 0为否
//给所有td标签添加事件
for (var i = 1; i < tds.length; i++) {

    if (tds[i].addEventListener) { //DOM2级事件处理程序
        tds[i].addEventListener("click", calcuate, false); //点击
        tds[i].addEventListener("mousedown", tdMouseDown, false); //鼠标按下
        tds[i].addEventListener("mouseup", tdMouseUp, false); //鼠标抬起
    } else if (tds[i].attachEvent) { //IE事件处理程序
        tds[i].attachEvent(onclick, calcuate);
        tds[i].attachEvent(onmousedown, tdMouseDown);
        tds[i].attachEvent(onmouseup, tdMouseUp);
    } else { //DOM0级事件处理程序
        tds[i].onclick = calcuate;
        tds[i].onmousedown = tdMouseDown;
        tds[i].onmouseup = tdMouseUp;
    }
}
//鼠标按下
function tdMouseDown() {
    this.style.border = "1px solid #000";
}
//鼠标抬起
function tdMouseUp() {
    this.style.border = "1px solid #a8a8a8";
}
//点击
function calcuate() {
    if (this.innerText == "AC") { //清0
        result = 0;
        operator = "";
        displayResult.value = 0;
        num1 = 0;
        num2 = 0;
        numpoint = 0;
    } else if (this.innerText == "π") {
        if (operator != "") {
            num2 = 1;
        } else {
            result = Math.PI;
            operator = "";
            num1 = 1;
            num2 = 0;
        }
        displayResult.value = Math.PI.toFixed(10);
    } else if (this.innerText == "e") {
        result = Math.E.toFixed(10);
        displayResult.value = result;
        operator = "";
        num1 = 1;
        num2 = 0;
    } else if (!isNaN(this.innerText) || this.innerText == ".") { //输入数字和小数点
        if ((operator == "" && numpoint == 0 && num1 == 0) || (operator != "" && num2 == 0) || (operator == "=")) {
            if (!isNaN(this.innerText)) { //输入第一个为数字
                displayResult.value = this.innerText;
                if (num1 == 0) {
                    num1 = 1;
                }

                if (operator != "") {
                    num2 = 1;

                    if (operator == "=") {
                        operator = "";

                    }
                }
            } else if (this.innerText == ".") { //输入第一个为小数点
                if (numpoint == 0) {
                    displayResult.value = "0.";
                    if (num1 == 0) {
                        num1 = 1;
                    }
                    numpoint = 1;
                } else {
                    displayResult.value += "";
                }
                if (operator != "") {
                    num2 = 1;
                    if (operator == "=") {
                        operator = "";

                    }
                }
            }
        } else if (num1 == 1 || num2 == 1) {
            if (displayResult.value == Math.PI.toFixed(10) || displayResult.value == Math.E.toFixed(10)) {
                return;
            }
            if (this.innerText == ".") { //输入小数点
                if (numpoint == 0) {
                    displayResult.value += this.innerText;
                    numpoint = 1;
                } else {
                    displayResult.value += "";
                }
            } else { //输入数字
                displayResult.value += this.innerText;


            }

        }
    } else { //输入操作符
        if (operator == "" || num2 == 0) { //输入第一个操作符
            operator = this.innerText;
            num1 = 1;
            if (operator == "=") {
                operator = "=";
            } else {
                operCalculate(operator);
            }

        } else if (this.innerText == "=") { //输入=操作符
            operCalculate(operator);
            displayResult.value = parseFloat(result.toFixed(10));
            operator = "";
            num1 = 0;
        } else { //输入其他操作符
            operCalculate(operator);
            operator = this.innerText;
        }
    }
}

function operCalculate(oper) {
    num = parseFloat(displayResult.value);
    if (oper == "%") { //%
        result = num / 100;
        displayResult.value = parseFloat(result.toFixed(10));
        operator = "";
    } else if (oper == "+/-") { //相反数
        result = -num;
        displayResult.value = parseFloat(result.toFixed(10));
        operator = "";
    } else if (oper == "1/x") {
        if (num == 0) {
            result = "错误";
            num1 = 0
            num2 = 2;
            numpoint = 0
            displayResult.value = result;
        } else {
            result = 1 / num;
            displayResult.value = parseFloat(result.toFixed(10));
        }
        operator = "";
    } else if (oper == "sqrt(x)") { //平方根
        result = Math.sqrt(num);
        displayResult.value = parseFloat(result.toFixed(10));
        operator = "";
    } else if (oper == "sin") { //sin
        result = Math.sin(num * Math.PI / 180);
        displayResult.value = parseFloat(result.toFixed(10));
        operator = "";
    } else if (oper == "cos") { //cos
        result = Math.cos(num * Math.PI / 180);
        displayResult.value = parseFloat(result.toFixed(10));
        operator = "";
    } else if (oper == "tan") { //tan
        isCorretDegree = parseFloat((num / Math.PI * 10 % 10).toFixed(10));
        if (isCorretDegree == 5) {
            result = "错误";
            num1 = 0
            num2 = 0;
            numpoint = 0
            displayResult.value = result;
        } else {
            result = Math.tan(num);
            displayResult.value = parseFloat(result.toFixed(10));
        }
        operator = "";
    } else if (oper == "e^x") { //e的x次幂
        result = Math.exp(num);
        displayResult.value = parseFloat(result.toFixed(10));
        operator = "";
    } else if (oper == "ln") {
        if (num == 0) {
            result = "错误";
            num1 = 0
            num2 = 0;
            numpoint = 0
            displayResult.value = result;
        } else {
            result = Math.log(num);
            displayResult.value = parseFloat(result.toFixed(10));
        }
        operator = "";
    } else if (num1 == 1 || num1 == 0) { //如果输入第一个运算符号
        result = num;
        num1 = 2;
        operator = oper;
        numpoint = 0;
    } else {
        switch (oper) {
            case "+": //+
                result = result + num;
                break;
            case "-": //-
                result = result - num;
                break;
            case "×": //*
                result = result * num;
                break;
            case "÷": ///
                if (num == 0) {
                    result = "NaN"; //除数为0
                    num1 = 0;
                    operator = "";
                } else {
                    result = result / num;
                }
                break;
            case "x^y": //*
                result = Math.pow(result, num);
                break;
        }
        if (result == "NaN") {
            displayResult.value = result;
        } else {
            displayResult.value = parseFloat(result.toFixed(10));
        }
        num2 = 0;
        numpoint = 0
    }
}