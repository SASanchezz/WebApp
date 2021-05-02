P1 = new Promise((resolve, reject) =>{
    setTimeout(() => {
        document.getElementById("Input").innerHTML = '';
        document.getElementById("Output").innerHTML = '';
        resolve();
    },1000)
})
let html_text;
document.getElementById("body").onclick = function () {
    html_text = document.getElementById("Input").innerHTML;
}
document.getElementById("equal").onclick = function() {Equal()};


function Equal() {
    document.getElementById("Output").style.fontSize = "20px";
    document.getElementById("Output").innerHTML = 'Calculating...';
    P2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            document.getElementById("Output").style.fontSize = "32px";
            document.getElementById("Output").innerHTML = eval(html_text.split(" ").join(""));
            resolve();
        }, 500)
    });
}
let old_photo;
let width;
let height;
document.querySelectorAll('input').forEach(item => {
    item.addEventListener('pointerenter', (event) => {
        old_photo = item.src;
        width = item.style.width;
        height = item.style.height;

        item.style.position = "relative"
        item.style.width = "200px";
        item.style.height = "200px";
        item.src="Photos/JustPush.jpg"


    });
    item.addEventListener('pointerleave', (event) => {
        item.style.position = "static"
        item.src=old_photo
        item.style.width = width;
        item.style.height = height;
    });
})



document.getElementById("1").onclick = function() {One()};
document.getElementById("2").onclick = function() {Two()};
document.getElementById("3").onclick = function() {Three()};

document.getElementById("4").onclick = function() {Four()};
document.getElementById("5").onclick = function() {Five()};
document.getElementById("6").onclick = function() {Six()};

document.getElementById("7").onclick = function() {Seven()};
document.getElementById("8").onclick = function() {Eight()};
document.getElementById("9").onclick = function() {Nine()};

document.getElementById("zero").onclick = function() {Zero()};
document.getElementById("zerozero").onclick = function() {ZeroZero()};

document.getElementById("plus").onclick = function() {Plus()};
document.getElementById("minus").onclick = function() {Minus()};
document.getElementById("multiply").onclick = function() {Multiply()};
document.getElementById("divide").onclick = function() {Divide()};

document.getElementById("clear").onclick = function() {Clear()};
document.getElementById("back").onclick = function() {BackSpace()};




const One = () => document.getElementById("Input").innerHTML += '1';
const Two = () => document.getElementById("Input").innerHTML += '2';
const Three = () => document.getElementById("Input").innerHTML += '3';

const Four = () => document.getElementById("Input").innerHTML += '4';
const Five = () => document.getElementById("Input").innerHTML += '5';
const Six = () => document.getElementById("Input").innerHTML += '6';

const Seven = () => document.getElementById("Input").innerHTML += '7';
const Eight = () => document.getElementById("Input").innerHTML += '8';
const Nine = () => document.getElementById("Input").innerHTML += '9';

const Zero = () => document.getElementById("Input").innerHTML += '0';
const ZeroZero = () => document.getElementById("Input").innerHTML += '00';

const Plus = () => document.getElementById("Input").innerHTML += ' + ';
const Minus = () => document.getElementById("Input").innerHTML +=' - ';
const Multiply = () => document.getElementById("Input").innerHTML += ' * ';
const Divide = () => document.getElementById("Input").innerHTML += ' / ';

const Clear = () => {
    document.getElementById("Input").innerHTML = '';
    document.getElementById("Output").innerHTML = '';
}

const BackSpace = () => {
    if (document.getElementById('Input').innerHTML.substr(document.getElementById('Input').innerHTML.length - 1) === ' ') {
        document.getElementById("Input").innerHTML = html_text.slice(0,-3);
    } else document.getElementById("Input").innerHTML = html_text.slice(0,-1);
}


