var monkey , monkey_running;
var banana ,bananaImg, obstacle, obstacleImg;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
 
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
   
   monkey_running =  loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")   
 monkey_stop =  loadAnimation("sprite_0.png")
}
function setup() {
  //Canvas
  createCanvas(600,400);
  
  //Groups
  BananaGroup = createGroup();
  obstacleGroup = createGroup();

  
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.shapeColor = "black"
  
  score = 0;
 
  
}

function draw() {
  
  //Background
  background ("lightgreen");

    fill("black");
      textSize(20);
  text("Score:"+  score, 500, 50);
  
 
  monkey.collide(ground);
  
  if(gameState === PLAY){
     
    if (ground.x < 200){
      ground.x = ground.width/2;
    }
    
   monkey.changeAnimation("running", monkey_running);
  
    if(BananaGroup.isTouching(monkey)) {
      BananaGroup.destroyEach();
      score = score + 2;
    }
    
     if(keyDown("space")) {
        monkey.velocityY = -11;
    }    
    
    
 
  obstacleGroup.setLifetimeEach(-1);
  banana1()
  obstacle1();
    
    
 monkey.velocityY = monkey.velocityY + 0.8;
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
   if (gameState === END) {
    BananaGroup.destroyEach();
     ground.velocityX = 0
      
     obstacleGroup.destroyEach()
     
     monkey.changeAnimation(monkey_stop)
     
     
    fill("black");
       textSize(50);
  text("Game Over", 180, 200);
  
   }

  drawSprites();
}


function banana1() {
  if (frameCount % 100 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImg);
    banana.y = Math.round(random(140,200));
    banana.scale = 0.1;
    
    banana.velocityX = -(4 + score * 1.1);
    banana.lifetime = 200;
BananaGroup.add(banana);
  }
}
function obstacle1() {
  if (frameCount % 200 === 0){
    obstacle = createSprite(450,330,20,20);
    obstacle.addImage(obstacleImg);
     obstacle.scale = 0.1 ;
     obstacle.lifetime = 200;
    obstacle.velocityX = -(4 + score * 1.1);
     obstacleGroup.add(obstacle);
  }

}

