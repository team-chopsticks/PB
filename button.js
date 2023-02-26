const button = document.getElementById("random-position-button");

button.style.position = "absolute";
button.style.top = Math.random() * window.innerHeight + "px";
button.style.left = Math.random() * window.innerWidth + "px";
button.style.transform = "rotate(" + Math.random() * 360 + "deg)";
