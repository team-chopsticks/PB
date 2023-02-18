const container = document.querySelector(".image-container");
const wrapAll = document.querySelector(".wrap-all");
const startButton = document.querySelector(".start-button");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");
const tileCount = 16;

let tiles = [];


// shuffle(tiles).forEach(tile => container.appendChild(tile)); 셔플
setGame();

function setGame(){
  tiles = createImageTiles();
  tiles.forEach(tile => container.appendChild(tile));
  // setTimeout(() => {
  //   container.innerHTML = "";
  //   shuffle(tiles).forEach(tile => container.appendChild(tile));
  // }, 1000)
}

wrapAll.addEventListener('click', () => {
  shuffle(tiles).forEach(tile => container.appendChild(tile));
  setTimeout(() => {
    container.innerHTML = "";
    setGame();
  }, 1000)
})

function createImageTiles(){
  const tempArray = [];
  Array(tileCount).fill().forEach( (_, i)=>{ 
    const li = document.createElement("li");
    li.setAttribute('data-index', i) //data 인덱스 넣기
    li.classList.add(`list${i}`);
    //container.appendChild(li); //컨테이너에 넣기
    tempArray.push(li)
  })
  return tempArray;
}


function shuffle(array){
  let index = array.length -1;
  while(index > 0){
    const randomIndex = Math.floor(Math.random()*(index+1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
    index--;
  }
  return array;
}