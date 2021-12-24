var PLAY = 1;
var END = 2;
var gameState = PLAY;

var jet,earthbg,missile,asteroid1,asteroid2,coin,sound,sound2,sadunicorn,gameOver,restart;
  
var jetImg,missileImg,earthbgImg,asteroid1Img,asteroid2Img,coinImg,sadunicornImg,gameOverImg,restartImg;
 
var asteroid1Group,asteroid2Group,coinGroup;

var life =5;
var score=0;

function preload(){
 jetImg = loadImage("fighter jet.png")
 earthImg = loadImage("earth.png")
 missileImg = loadImage("missileImg.png")
 earthbgImg = loadImage("space bg2.jpg")
 asteroid1Img = loadImage("asteroid1.png")
 asteroid2Img = loadImage("asteroid2.png")
 coinImg = loadImage("coin.png")
 sound = loadSound("jet.wav")
 sound2 = loadSound("collided.wav")
 sadunicornImg = loadImage("sad unicorn.png")
 gameOverImg = loadImage("gameOver.png")
 restartImg = loadImage("restart.png")
 
}

function setup() {
  createCanvas(1500,750);
 
  earth= createSprite(700,800, 10,50 )
  earth.addImage(earthImg)
  earth.scale=1.9

  jet= createSprite(1400, 650, 50,50);
  jet.addImage(jetImg)
  jet.scale=0.4

  sadunicorn = createSprite(290,80)
  sadunicorn.addImage(sadunicornImg)
  sadunicorn.scale = 0.1/3

  gameOver = createSprite(630,375)
  gameOver.addImage(gameOverImg)
  gameOver.scale  = 1

  restart = createSprite(630,450)
  restart.addImage(restartImg)
  restart.scale  = 0.1
  

  asteroid1Group =  new Group()
  asteroid2Group = new Group()
  coinGroup = new Group()
 
  sadunicorn.visible = false;
  gameOver.visible = false;
  restart.visible = false;

  heading= createElement("h1");
  scoreboard= createElement("h1");


}

function draw() {
  background(earthbgImg);
  
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:white'); 
  scoreboard.position(width-200,20)

  

  if(gameState===PLAY){  
   //Game adaptivity code
    asteroid1Group.velocityY = (4 + score/10)
    asteroid2Group.velocityY = (4 + score/10)
      
       textSize(50)
      text("press space key to start",450,290);


    jet.x= mouseX
    if (frameCount % 180 === 0) {
      asteroid1();
    }

    if (frameCount % 180 === 0) {
      asteroid2();
    }

    if (frameCount % 1000 === 0){
      coin();
    }

    if(keyDown("space")){
      shootMissile();
      sound.play()
    }
    
    if(asteroid1Group.isTouching(missile)){
      asteroid1Group.destroyEach()
      score=score+1
    }

    if(asteroid2Group.isTouching(missile)){
     asteroid2Group.destroyEach()
     score=score+1
    }  

    if(coinGroup.isTouching(missile)){
      coinGroup.destroyEach()
      score=score +5
     }  

    if(coinGroup.isTouching(earth)){
      asteroidcollision(coinGroup)
      sound2.play()
     }  

    if (asteroid1Group.isTouching(earth)){
    asteroidcollision(asteroid1Group);
    sound2.play()
    sadunicorn.visible = true
    
   }
    
    if (asteroid2Group.isTouching(earth)) {
    asteroidcollision(asteroid2Group);
    sound2.play()
    sadunicorn.visible = true
    }
    
   else if (life === 0) {
      gameState === END
             
     gameOver.visible = true
     restart.visible = true
     asteroid1Group.destroyEach()
     asteroid2Group.destroyEach()
     coinGroup.destroyEach()
     missile.destroy()

      
    if(mousePressedOver(restart)) {
      reset();
  }
     

    }
  drawSprites()
}
function asteroid1(){
  asteroid1 = createSprite(random(10,1500),random(10,20),40,40);
  asteroid1.addImage(asteroid1Img);
  asteroid1.scale = 0.1;
  asteroid1.velocityY = 3;
  asteroid1.lifetime = 400;
  asteroid1Group.add(asteroid1)
  }

  function asteroid2(){
    asteroid2 = createSprite(random(10,1500),random(10,20),40,40);
    asteroid2.addImage(asteroid2Img);
    asteroid2.scale = 0.1;
    asteroid2.velocityY = 3;
    asteroid2.lifetime = 400;
    asteroid2Group.add(asteroid2)
    }

    function coin(){
      coin = createSprite(random(10,1500),random(10,20),40,40);
      coin.addImage(coinImg);
      coin.scale = 0.2;
      coin.velocityY = 3;
      coin.lifetime = 400;
      coinGroup.add(coin)  
    }

    function shootMissile(){
      missile= createSprite(1400,650, 50,50 )
      missile.x= jet.x-1
      missile.addImage(missileImg)
      missile.scale=0.12
      missile.velocityY= -16
    }

  function asteroidcollision(asteroidGroup){
  
    life=life-1;
   asteroidGroup.destroyEach()
    
   
    }
  function reset(){
    
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    jet.visible = true;
    earth.visible = true;
    coinGroup.visible = true
    asteroid1Group.Each();
    asteroid2Group.Each();
    coinGroup.destroyEach();
    life = 0;
  }
  }

