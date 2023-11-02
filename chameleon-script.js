const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image()
playerImage.src = 'chameleon.png'

let frameX = 0;
let frameRate = 0

let action = 'idle'
let spriteFace = 'right'
let movement = 0

const chameleonProperty = {
  "idle": {
    "size": [
      [180, 170.5], [185, 170.5], [180, 170.5], [178.3, 170.5], [178.5, 170.5], [179.4, 170.5]
    ],
    "extraSize": [-5, -5, -5, -5, -5, -5],
    "position": {
      "left": [[0 ,0], [0 ,0], [0 ,0], [0 ,0], [0 ,0], [0 ,0]],
      "right": [[0 ,0], [4.7 ,0], [0 ,0], [-2 ,0], [-2 ,0], [-1 ,0]]
    },
    "column": 0
  },
  "walk": {
    "size": [
      [180, 167], [189, 167], [193, 167], [190, 167]
    ],
    "extraSize": [-5, -5, -5, -5],
    "position": {
      "left": [[0 ,0], [0 ,0], [0 ,0], [0 ,0]],
      "right": [[0 ,0], [0 ,0], [0 ,0], [0 ,0]]
    },
    "column": 1
  },
  "attack": {
    "size": [
      [180, 179], [190, 179], [255, 179], [280, 179], [302, 179], [315, 179]
    ],
    "extraSize": [0, 140, 90, 90, 70, 0],
    "position": {
      "left": [[165, 0], [100, 0], [29,0], [-10, 0], [-28, 0], [120, 0]],
      "right": [[165, 0], [100, 0], [29,0], [-10, 0], [-28, 0], [120, 0]]
    },
    "column": 6
  }
}

function animate(){
  if(frameX > chameleonProperty[action].size.length-1) frameX = chameleonProperty[action].size.length-1
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.save();
  ctx.scale(spriteFace === 'right' ? -1 : 1, 1);
  ctx.drawImage(
    playerImage, 
    frameX * chameleonProperty[action].size[frameX][0],
    chameleonProperty[action].column * chameleonProperty[action].size[frameX][1], 
    chameleonProperty[action].size[frameX][0] + chameleonProperty[action].extraSize[frameX], 
    chameleonProperty[action].size[frameX][1], 
    chameleonProperty[action].position[spriteFace][frameX][0] + movement, 
    chameleonProperty[action].position[spriteFace][frameX][1], 
   (chameleonProperty[action].size[frameX][0] + chameleonProperty[action].extraSize[frameX]) * (spriteFace === 'right' ? -1 : 1), 
    chameleonProperty[action].size[frameX][1]
  )
  ctx.restore();
  if (frameRate % 6 === 0) {
    if (frameX < chameleonProperty[action].size.length-1) frameX++
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
        movement = movement - 7
        spriteFace = 'left'
        break;
    case 'ArrowRight':
        if ( spriteFace == 'left' ) movement = movement*-1
        movement = movement - 7
        spriteFace = 'right'
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