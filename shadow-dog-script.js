const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image()
playerImage.src = 'shadow-dog.png'

const shadowDogWidth = 575;
const shadowDogHeight = 523;
let frameX = 0;
let frameY = 0;
let frameRate = 0

let action = 'idle'
let spriteFace = 'right'
let movement = 0

const shadowDogProperty = {
  "idle": {
    column: 0,
    frame: 6
  },
  "jump-up": {
    column: 1,
    frame: 6
  },
  "jump-down": {
    column: 2,
    frame: 6
  },
  "run": {
    column: 3,
    frame: 8
  },
  "play": {
    column: 4,
    frame: 10
  },
  "sit": {
    column: 5,
    frame: 4
  },
  "roll": {
    column: 6,
    frame: 6
  },
  "crawl": {
    column: 7,
    frame: 6
  },
  "fall": {
    column: 8,
    frame: 11
  },
  "hit": {
    column: 9,
    frame: 3
  },
}

const spriteFrame = [6, 6, 6, 8, 10, 4, 6, 6, 11, 3] 
let countHit = 0

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if(shadowDogProperty[action] === undefined) action = 'idle'
  ctx.save();
  ctx.scale(spriteFace === 'right' ? 1 : -1, 1);
  ctx.drawImage(
    playerImage, 
    frameX * shadowDogWidth,
    shadowDogProperty[action].column * shadowDogHeight, 
    shadowDogWidth, 
    shadowDogHeight, 
    0 + movement, 
    action === ('jump-up' || 'jump-down') ? -40 : 0,
    shadowDogWidth * (spriteFace === 'right' ? 1 : -1),  
    shadowDogHeight
  )
  ctx.restore();
  if (frameRate % 5 === 0) {
    if(action === 'fall'){
      if (frameX < shadowDogProperty[action].frame ) frameX++
      else frameX = shadowDogProperty[action].frame
    } else {
      if (frameX < shadowDogProperty[action].frame ) frameX++
      else frameX = 0
    }
  }
  frameRate++
  requestAnimationFrame(animate)
}

animate()

document.addEventListener("keydown", function(e) {
  if(countHit >= 5) action = 'fall' 
  else {
    action = 'run'
    switch (e.key) {
      case 'ArrowUp':
          // up arrow
          break;
      case 'ArrowDown':
          action = 'sit'
          break;
      case 'ArrowLeft':
          if ( spriteFace == 'right' ) movement = movement*-1
          if(movement >= 100) {
            action = 'hit'
            countHit ++
          }
          else {
            movement = movement + 7
            spriteFace = 'left'
          }
          break;
      case 'ArrowRight':
          if ( spriteFace == 'left' ) movement = movement*-1
          if(movement >= 100){
            action = 'hit'
            countHit ++
          }
          else {
            movement = movement + 7
            spriteFace = 'right'
          }
          break;
      case ' ':
          action = 'jump-up'
          break;
  }
  }
});

document.addEventListener("keyup", function(e) {
  if(action !== 'fall') {
    if (action === 'jump-up') {
      action = 'jump-down' 
    }
    setTimeout(function(){
      action = 'idle'
    }, 100);
  }
}); 