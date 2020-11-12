var gameState = "play";

var tower, towerImage;

var ghost, ghost_standing;

var doors, doorImage, doorGroup;

var climber, climberImage, climberGroup;

var invisibleblocks, blockGroup;

function preload() {

  towerImage = loadImage("tower.png");

  ghost_standing = loadImage("ghost-standing.png");

  doorImage = loadImage("door.png");

  climberImage = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  spookySound.loop();

  tower = createSprite(300, 300, 400, 600);
  tower.addImage("tower", towerImage);
  tower.velocityY = 5;

  ghost = createSprite(300, 400, 10, 30);
  ghost.addImage("standing", ghost_standing);
  ghost.scale = 0.4;

  doorGroup = new Group();

  climberGroup = new Group();

  blockGroup = new Group();

}

function draw() {

  background("white");

  if (gameState === "play") {

    if (climberGroup.isTouching(ghost)) {

      ghost.velocityY = 0;

    }

    if (blockGroup.isTouching(ghost) || ghost.y > 600) {

      ghost.destroy();
      
      gameState = "end";

    }

    if (tower.y > 600) {
      tower.y = 300;
    }

    if (keyDown("space")) {

      ghost.velocityY = -7;

    }

    if (keyDown("left_Arrow")) {

      ghost.x = ghost.x - 2;

    }

    if (keyDown("right_Arrow")) {

      ghost.x = ghost.x + 2;

    }

    ghost.velocityY = ghost.velocityY + 0.5;

    spawndoor();
    
    drawSprites();


  }else if(gameState === "end"){
    
    textSize(30);
    fill("red");
    text("GAME OVER !",200,300);
    
  }
  
}

function spawndoor() {

  if (frameCount % 150 === 0) {

    doors = createSprite(300, 0, 20, 30);
    doors.addImage("doorimage", doorImage);

    doors.x = Math.round(random(150, 450));

    doors.velocityY = 5;

    doors.lifetime = 120;

    doorGroup.add(doors);

    climber = createSprite(300, 50, 10, 10);
    climber.addImage("climbers", climberImage);

    climber.x = doors.x;

    climber.velocityY = 5;

    climber.lifetime = 120;

    ghost.depth = doors.depth;

    ghost.depth = ghost.depth + 1;

    climberGroup.add(climber);

    invisibleblocks = createSprite(300, 60);

    invisibleblocks.width = climber.width;
    
    invisibleblocks.x = doors.x;

    invisibleblocks.height = 2;

    invisibleblocks.velocityY = 5;

    invisibleblocks.lifetime = 120;

    blockGroup.add(invisibleblocks);

    blockGroup.visible = false;
    
    invisibleblocks.debug = true;
  }

}