

const $sliderBall = document.querySelector('.slider-ball');
const $sliderEye = document.querySelector('.slider-eye');
const $ball = document.querySelector('.ball');
const $eye = document.querySelector('.eye');

function animationCal(ele, e) {
    ele.style.setProperty('--delay', `-${e.target.value}s`);
}

function animationBall(e) {
    animationCal($ball, e);
}
function animationEye(e) {
    animationCal($eye, e);
}

$sliderBall.oninput = animationBall;
$sliderEye.oninput = animationEye;
animationBall();
animationEye();