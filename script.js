// options

var imgs = ["pattern.svg"];
var randImg = imgs[Math.floor(Math.random() * imgs.length)];

var options = {
  imgSrc: randImg,
  containerName: "container",
  grid: false,
  tileWidth: 20,
  tileHeight: 1200, // default 80
  mouseTrail: true
}

// ----------------------------------------------------------
var tileWidth, tileHeight, numTiles, tileHolder, tileContainer;
var directionX, directionY;
var imgOriginalWidth, imgOriginalHeight;
var imgCoverWidth, imgCoverHeight;
var imageLoaded = false;

numTiles = 0;
tileWidth = options.tileWidth;
tileHeight = options.tileHeight;

tileContainer = document.getElementsByClassName(options.containerName)[0];

function autoMoveImage() {
  var randomTile = document.querySelectorAll(".tile")[Math.floor(Math.random() * numTiles)];
  moveImage({
    currentTarget: randomTile
  });
}

function init() {
  if (options.grid == false) tileContainer.className += " noGrid";

  //preload image and get original image size, then create tiles
  var image = new Image();
  image.src = options.imgSrc;
  image.onload = function (e) {
    imageLoaded = true;
    imgOriginalWidth = e.currentTarget.width;
    imgOriginalHeight = e.currentTarget.height;

    // Set the tile width based on the device width
    if (window.innerWidth < 820) {
      tileWidth = 10; // Set the tile width to 10 for devices with width less than 820px
    }


    createTileHolder();
    checkTileNumber();
    positionImage();
    addListeners();

    if (window.innerWidth < 820) {
      setInterval(autoMoveImage, 500);
    }
  };
}

function resizeHandler() {
  if (imageLoaded == false) return;

  //not working yet

  checkTileNumber();
  positionImage();
}

function createTileHolder() {
  tileHolder = document.createElement('div');
  tileHolder.className = "tileHolder";
  tileHolder.style.position = "absolute";
  tileHolder.style.top = "50%";
  tileHolder.style.left = "50%";
  tileHolder.style.transform = "translate(-50%, -65%) scale(1.1)";
  tileContainer.appendChild(tileHolder);

  // Add media query to adjust position on smaller screens
  const mediaQuery = window.matchMedia("(max-width: 820px)");

  function handleMediaQuery(event) {
    if (event.matches) {
      tileHolder.style.transform = "translate(-50%, -10%) scale(1.6)";
    } else {
      tileHolder.style.transform = "translate(-50%, -65%)";
    }
  }

  handleMediaQuery(mediaQuery);
  mediaQuery.addListener(handleMediaQuery);
}

function checkTileNumber() {
  tileHolder.style.width = Math.ceil(tileContainer.offsetWidth / tileWidth) * tileWidth + "px";
  tileHolder.style.height = Math.ceil(tileContainer.offsetHeight / tileHeight) * tileHeight + "px";

  var tilesFitInWindow = Math.ceil(tileContainer.offsetWidth / tileWidth) * Math.ceil(tileContainer.offsetHeight / tileHeight);
  if (numTiles < tilesFitInWindow) {
    for (var i = 0, l = tilesFitInWindow - numTiles; i < l; i++) {
      addTiles();
    }
  } else if (numTiles > tilesFitInWindow) {
    for (var i = 0, l = numTiles - tilesFitInWindow; i < l; i++) {
      removeTiles();
    }
  }
}


function addTiles() {
  var tile = document.createElement('div');
  tile.className = "tile";

  //maintain aspect ratio
  imgCoverWidth = tileContainer.offsetWidth;
  imgCoverHeight = tileContainer.offsetHeight;

  if (imgOriginalWidth > imgOriginalHeight) {
    imgCoverHeight = imgOriginalHeight / imgOriginalWidth * imgCoverWidth;
  } else {
    imgCoverWidth = imgOriginalWidth / imgOriginalHeight * imgCoverHeight;
  }


  tile.style.background = 'url("' + options.imgSrc + '") no-repeat';
  tile.style.backgroundSize = imgCoverWidth + "px " + imgCoverHeight + "px";
  tile.style.width = tileWidth + "px";
  tile.style.height = tileHeight + "px";
  document.querySelectorAll(".tileHolder")[0].appendChild(tile);

  tile.addEventListener("mouseover", moveImage);

  numTiles++;
}

function addListeners() {
  if (options.mouseTrail) {
    document.addEventListener('mousemove', function (event) {
      directionX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      directionY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    });
  }
}

function positionImage() {
  for (var t = 0, l = numTiles; t < l; t++) {
    var nowTile = document.querySelectorAll(".tile")[t];

    var left = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth / 2)));
    var top = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight / 2)));

    nowTile.style.backgroundPosition = left + "px " + top + "px";
  }
}

function resetImage(nowTile) {
  var left = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth / 2)));
  var top = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight / 2)));


  TweenMax.to(nowTile, 1., {
    backgroundPosition: left + "px " + top + "px",
    ease: Power1.easeInOut
  });
}


function moveImage(e) {
  var nowTile = e.currentTarget
  var minWidth = -tileContainer.offsetWidth + nowTile.offsetWidth;
  var minHeight = -tileContainer.offsetHeight + nowTile.offsetHeight;
  var nowLeftPos = (-nowTile.offsetLeft - (tileHolder.offsetLeft - (tileHolder.offsetWidth / 2)));
  var nowTopPos = (-nowTile.offsetTop - (tileHolder.offsetTop - (tileHolder.offsetHeight / 2)))
  var offset = 50; //default 60
  var left = nowLeftPos;
  var top = nowTopPos;

  if (options.mouseTrail) {
    //direction-aware movement
    if (directionX > 0) {
      left = nowLeftPos + offset;
    } else if (directionX < 0) {
      left = nowLeftPos - offset;
    }

    if (directionY > 0) {
      top = nowTopPos + offset;
    } else if (directionY < 0) {
      top = nowTopPos - offset;
    }
  } else {
    //random movement
    left = getRandomInt(nowLeftPos - offset, nowLeftPos + offset);
    top = getRandomInt(nowTopPos - offset, nowTopPos + offset);
  }

  // bounds
  if (left < minWidth) left = minWidth;
  if (left > 0) left = 0;
  if (top < minHeight) top = minHeight;
  if (top > 0) top = 0;

  //tween nowTile, 1.5 -- 2는 시간
  TweenMax.to(nowTile, 1.5, {
    backgroundPosition: left + "px " + top + "px",
    ease: Power1.easeOut,
    onComplete: resetImage,
    onCompleteParams: [nowTile]
  });
}

init();


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function () {
  var throttle = function (type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle("resize", "optimizedResize");
})();

window.addEventListener('resize', function () {
  location.reload();
});