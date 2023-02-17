var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var rei, reiImg;
var reisubzero, reisubzeroImg;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  reisubzeroImg = loadImage("rei subzero.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  reisubzero = createSprite(200,200,50,50);
  reisubzero.scale = 0.3;
  reisubzero.addImage("rei subzero", reisubzeroImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      reisubzero.x = reisubzero.x - 3;
    }
    
    if(keyDown("right_arrow")){
      reisubzero.x = reisubzero.x + 3;
    }
    
    if(keyDown("space")){
      reisubzero.velocityY = -10;
    }
    
    reisubzero.velocityY = reisubzero.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(rei));
    if(climbersGroup.isTouching(reisubzero)){
      reisubzero.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(reisubzero) || reisubzero.y > 600){
      reisubzero.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //escreva o código aqui para gerar portas na torre
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    reisubzero.depth = door.depth;
    reisubzero.depth +=1;
   
    //atribua tempo de vida à variável
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //adicione cada porta ao grupo
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

