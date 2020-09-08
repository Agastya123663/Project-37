var player,scene,;
var obstacleGroup;
var play = 0;
var end = 1;
var gameState = play
var bullet;
var bulletGroup;
var score = 0;
var medal1
var superiorWin = "";
var obstacle2Group;
var youLost = "";

function preload(){
  sceneImg = loadImage("images/scene.jpg");

  playerImg = loadImage("images/bird.png");


  medalImg = loadImage("images/medal1.jpg");

}



function setup() {
  createCanvas(displayWidth,displayHeight);
  
  
  scene = createSprite(400,300,800,600);
  scene.addImage("scene",sceneImg);
  scene.y = scene.height/2
  scene.scale = 3;
  
  

  player = createSprite(200,200,10,10);
  player.addImage("player",playerImg);
  camera.position.y = player.y+100;
  camera.position.x = player.x + 100
  


  
  medal1 = createSprite(5,5,10,10);
  medal1.addImage("medal",medalImg);
  medal1.visible = false;
  medal1.scale = 0.05;

  medal2 = createSprite(50,5,10,10);
  medal2.addImage("medal",medalImg);
  medal2.visible = false;
  medal2.scale = 0.05;

  medal3 = createSprite(100,5,10,10);
  medal3.addImage("medal",medalImg);
  medal3.visible = false;
  medal3.scale = 0.05;

  obstacleGroup = new Group;

  bulletGroup = new Group;

  obstacle2Group = new Group

  fill("white");
  textFont("georgia")

}

function draw() {
  background(0);  

  if(gameState === play){

  createBullet();

  scene.velocityY = -3;

  if(scene.y < 0){
   scene.y = scene.height/2;
  }

  
  if(bullet.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityXEach(0);
  }

  if(bulletGroup.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    bulletGroup.destroyEach();
    score = score + 1;
  }

  if(score === 10){
    medal1.visible = true;
  }

  if(score === 20){
    medal2.visible = true;
  }

  if(score === 30){
    medal3.visible = true;
    superiorWin = "YOU HAVE UNLOCKED 3 BATCHES !!! , YOU ARE SUPERIOR ,KEEP GOING"
  }

  player.x = World.mouseX;
  player.y = World.mouseY;
  

  createObstacle();

  createObstacle2();
 }

 if(bulletGroup.isTouching(obstacle2Group)){
   gameState = end;

 }

 if(gameState === end){
   scene.velocityX = 0;
   scene.velocityY = 0;
   player.velocityX = 0
   player.velocityY = 0
   youLost = "YOU LOST , PRESS SPACE TO TRY AGAIN";
 }

 if(keyDown("space")){
   gameState = play;
   youLost = "";
   score = 0;
   medal1.visible = false;
   medal2.visible = false;
   medal3.visible = false;
   superiorWin = "";
 }

  drawSprites(); 

  text("ENEMIES KILLED : " + score,750,0)
  text("ENEMIES ARE WHITE , SOLDIERS ARE YELLOW " ,150,500)
  text("USE THE ARROW KEYS TO SHOOT IN DIFFERENT DIRECTIONS" ,90,550)
  text("DONT KILL THE SOLDIERS" ,600,550)
  text(superiorWin,50,5);
  text(youLost,50,150);

  

  }


function createObstacle(){
  if(frameCount%40 === 0 ){
    obstacle = createSprite(random(0,750),50,10,10);
    obstacle.shapeColor = "white"
    obstacle.velocityY = 4;
    obstacleGroup.add(obstacle);
    
  }
  
}

function createObstacle2(){
  if(frameCount%80 === 0 ){
    obstacle = createSprite(random(0,750),50,10,10);
    obstacle.shapeColor = "yellow"
    obstacle.velocityY = 4;
    obstacle2Group.add(obstacle)
  }
  
}

function createBullet(){
  bullet = createSprite(0,0 , 5,5);
  bullet.visible = false;
  if(keyDown(UP_ARROW)){
    bullet.x = player.x;
    bullet.y = player.y
    bullet.velocityY = -6;
    bullet.velocityX = 0;
    bullet.visible = true
  }
  if(keyDown(DOWN_ARROW)){
    bullet.x = player.x;
    bullet.y = player.y
    bullet.velocityY = 6;
    bullet.velocityX = 0;
    bullet.visible = true;
  }
  if(keyDown(LEFT_ARROW)){
    bullet.x = player.x;
    bullet.y = player.y
    bullet.velocityY = 0;
    bullet.velocityX = -6;
    bullet.visible = true;
  }
  if(keyDown(RIGHT_ARROW)){
    bullet.x = player.x;
    bullet.y = player.y
    bullet.velocityY = 0;
    bullet.velocityX = 6;
    bullet.visible = true;
  }

  bulletGroup.add(bullet);
}


