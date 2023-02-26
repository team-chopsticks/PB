const heroImage = document.querySelector('body');
const movementStrength = 150;
const height = movementStrength / window.innerHeight;
const width = movementStrength / window.innerWidth;

heroImage.addEventListener("mousemove", bgImageMove);

function bgImageMove() {
    const pageX = event.pageX - (window.innerWidth / 2);
    const pageY = event.pageY - (window.innerHeight / 2);
    const newvalueX = width * pageX * -1;
    const newvalueY = height * pageY * -1;
    heroImage.style.backgroundPosition = newvalueX + "px " + newvalueY + "px ";
}