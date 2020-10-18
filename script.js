function add(num1, num2) {
    let res = parseFloat(num1)+parseFloat(num2)
    res = Number((res).toFixed(2))
    return res
}
function subtract(num1, num2) {
    let res = parseFloat(num1)-parseFloat(num2)
    res = Number((res).toFixed(2))
    return res
}
function multiply(num1, num2) {
    let res = parseFloat(num1)*parseFloat(num2)
    res = Number((res).toFixed(2))
    return res
}
function divide(num1, num2) {
    res = parseFloat(num1)/parseFloat(num2)
    res = Number((res).toFixed(2))
    return res
}

function operate(num1,num2,operator) {
    switch(operator) {
        case "+":
            return add(num1,num2)

        case "-":
            return subtract(num1,num2)

        case "*":
            return multiply(num1,num2)
        
        case "/":
            return divide(num1,num2)
    }
}

function uploadDisplay(num) {
    
    const display = document.querySelector('.display');

    display.innerHTML = num;
}


document.addEventListener('DOMContentLoaded', () => {
    uploadDisplay(0);
    var num1 = "";
    var num2 = "";
    var operator = null;
    var num1End = false;
    var result = "";

    const calBtns = document.querySelectorAll('.calBtn');

    calBtns.forEach(button => {

        button.addEventListener('click', event => {
            

            if (button.dataset.btn in {"number": "", "decimal": ""} && num1End === false) {
                let n = event.target.innerHTML; 
                num1 += n;
                if(num1.length <= 6) {
                    uploadDisplay(num1);
                }
                if(button.dataset.btn === "decimal") {
                    button.disabled = true;
                }
            }
            else if (button.dataset.btn === "operator" && num1End === false && result != "") {
                
                operator = event.target.innerHTML;
                num1 = result;
                num1End = true;
                uploadDisplay(0);
            } 
            else if (button.dataset.btn === "operator" && num1End === false) {
                document.querySelector('.dotBtn').disabled = false;
                operator = event.target.innerHTML;
                num1End = true;
                uploadDisplay(0);
            }
            else if (button.dataset.btn in {"number": "", "decimal": ""} && num1End === true) {
                let n = event.target.innerHTML;
                num2 += n;
                if(num2.length <= 6) {
                    uploadDisplay(num2);
                }
            }
            else if (button.dataset.btn === "equals" && num1 != "" && num2 != "") {
                if (num2 === "0") {
                    alert("Division by zero is undefined");
                } else {
                    result = operate(num1,num2,operator);
                    uploadDisplay(result);
                }
                

                num1 = "";
                num2 = "";
                operator = null;
                num1End = false;

            }
            else if (button.dataset.btn === "clear") {
                uploadDisplay(0);
                num1 = "";
                num2 = "";
                operator = null;
                num1End = false;
                result = "";
            }
            else if (button.dataset.btn === "back" && num1 != "") {
                
                if (num1End === false) {
                    
                    num1 = num1.replace(num1.charAt(num1.length-1),"")
                    uploadDisplay(num1)
                } else {
                    
                    num2 = num2.replace(num2.charAt(num2.length-1),"")
                    uploadDisplay(num2)
                }
            }   
        });
    });

});