const container = document.querySelector(".image-container");
  const wrapAll = document.querySelector(".wrap-all");
  const tileCount = 16;

  let tiles = [];

  setGame();    

  function setGame() {
    tiles = createImageTiles();
    tiles.forEach(tile => container.appendChild(tile));
  }

  wrapAll.addEventListener('click', () => {


    shuffle(tiles).forEach(tile => container.appendChild(tile));

        // select all "li" elements
        const liList = document.querySelectorAll("li");
        // add delay to transition for all "li" elements
        liList.forEach(li => li.style.transition = "all 2.5s ease-in-out");

    setTimeout(() => {
      container.innerHTML = "";
      setGame();
    }, 3000)
  })

  function createImageTiles() {
    const tempArray = [];
    Array(tileCount).fill().forEach((_, i) => {
      const li = document.createElement("li");
      li.setAttribute('data-index', i)
      li.classList.add(`list${i}`);
      // add transition property to "li" element
      li.style.transition = "all 2.5s ease-in-out";
      tempArray.push(li)
    })
    return tempArray;
  }

  function shuffle(array) {
    let index = array.length - 1;
    while (index > 0) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
      index--;
    }
    return array;
  }