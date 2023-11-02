const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image()
playerImage.src = 'golden-pig.png'

const goldenPigHeight = 79
const goldenPigProperty = {
  "idle": {
    width: [77, 75, 74.5, 74.7, 74.5, 74.2, 74.35, 74.15, 74.15],
    column: 0,
    extraWidth: 14
  },
  "walk": {
    width: [76.6, 76.6, 76.6, 76.6, 76.6],
    column: 1,
    extraWidth: 7
  },
  "die": {
    width: [76.6, 89.3, 97, 102.2, 103],
    column: 4,
    extraWidth: 26
  },
  "hit": {
    width: [76.6, 89.3, 97,],
    column: 4,
    extraWidth: 26
  },
}

let frameX = 0;
let frameRate = 0

let action = 'idle'
let spriteFace = 'right'
let movement = 0


function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.save();
  ctx.scale(spriteFace === 'right' ? -1 : 1, 1);
  ctx.drawImage(
    playerImage, 
    (frameX * goldenPigProperty[action].width[frameX])+goldenPigProperty[action].extraWidth,
    goldenPigProperty[action].column * goldenPigHeight,
    goldenPigProperty[action].width[frameX]-10, 
    goldenPigHeight,
    0 + movement, 
    action === 'walk' ? +5 : 0,
    goldenPigProperty[action].width[frameX] * (spriteFace === 'right' ? -1 : 1),
    goldenPigHeight
  )
  ctx.restore();
  if (frameRate % 6 === 0) {
    if (frameX < goldenPigProperty[action].width.length-1) frameX++
    else frameX = 0
  }
  
  frameRate++
  requestAnimationFrame(animate)
}

animate()

document.addEventListener("keydown", function(e) {
  action = 'walk'
  switch (e.key) {
    case 'ArrowUp':
        // up arrow
        break;
    case 'ArrowDown':
        // down arrow
        break;
    case 'ArrowLeft':
        if ( spriteFace == 'right' ) movement = movement*-1
        if( movement <= -7) action = 'hit'
        else {
          movement = movement - 7
          spriteFace = 'left'
        }
       
        break;
    case 'ArrowRight':
        if ( spriteFace == 'left' ) movement = movement*-1
        if( movement <= -540) action = 'hit'
        else {
          movement = movement - 7
          spriteFace = 'right'
        }
        break;
    case 'x':
      action = 'attack'
      break;
    case 'X':
      action = 'attack'
      break;
  }

});

document.addEventListener("keyup", function(e) {
  action = 'idle'
});