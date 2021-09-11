var playerRunner, player
var edges;
var ground, movingGround;
var ground2;
var cloud, movingCloud;
var cloud2, movingCloud2;
var negative,negativeImg
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var negativeGroup;
var cloudGroup;
var playerCollide;
var gameOver, gameOverText;
var restartButton, button;
var jumpSound;
var collideSound;
var checkPointSound;
var maskImg, mask
var bgImg

//var highScore = 0
localStorage['HighScore']=0
function preload() {
  playerRunner = loadAnimation(
    "./assets/costume1.svg",
    "./assets/costume2 (1).svg",
    "./assets/costume3.svg",
    "./assets/costume4.svg",
    "./assets/costume5.svg",
    "./assets/costume6.svg"
  );

  movingGround = loadImage("./assets/ground2.png");
  movingCloud = loadImage("./assets/cloud1.png");
  movingCloud2 = loadImage("./assets/cloud2.png");
  negativeImg = loadImage("./assets/negative.svg");
 // gameOver = loadImage("./assets/gameover.svg");
  restartButton = loadImage("./assets/restart.svg");
  collideSound = loadSound("collided.wav");
  checkPointSound = loadSound("checkPoint.mp3");
  jumpSound = loadSound("jump.wav");
  maskImg = loadImage("./assets/mask.svg")
  bgImg = loadImage("./assets/bg.png")
}
function setup() {
  createCanvas(4500,windowHeight);
 
 
  //create a trex sprite
  player = createSprite(50,height-108, 20, 50);
  player.addAnimation("running", playerRunner);
  player.scale = .89;
//player.debug = true;
  player.setCollider("rectangle", 0, 0, 30, 100);
  
 
  ground2 = createSprite(width/2, height, width, 125);
  ground2.visible = false;
  
  /*gameOverText = createSprite(width/2, height/2);
  gameOverText.addImage("gameOver", gameOver);
  gameOverText.visible = false;
  
  button = createSprite(width/2, height/2 + 60);
  button.addImage("restart", restartButton);
  button.visible = false;
  
  var anynumber = Math.round(random(20, 100));
  console.log(anynumber);

  obstacleGroup = createGroup();
  cloudGroup = createGroup();*/
}

function draw() {
  background(bgImg);
  console.log(player.y)
  console.log(height)
  if (keyDown("space") && player.y  >= height - 109 ) {
    player.velocityY = -8;
   // jumpSound.play();
    //touches = []
  }
  player.collide(ground2);
  player.velocityY = player.velocityY + 0.5;
  //increase the speed of ground
  

  /*edges = createEdgeSprites();
  
  if (gameState === PLAY) {
   

    if (score % 100 === 0 && score > 0) {
      checkPointSound.play();
    }

    
    score = score + Math.round(getFrameRate() / 60);

    spawnCactus();
    spawnClouds();

    if (trex.isTouching(obstacleGroup)) {
      gameState = END;
      collideSound.play();
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    cloudGroup.setVelocityEach(0, 0);
    obstacleGroup.setVelocityEach(0, 0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    trex.changeAnimation("stillMotion", trexCollide);
    trex.velocityY = 0;
    gameOverText.visible = true;
    button.visible = true;
    
    if(mousePressedOver(button)||touches.length>0){
      button.visible = false
      gameOverText.visible = false
      reset();
    }
  }

   

  text("Score: " + score, width-170, 40);
  text("High Score: " + localStorage['HighScore'],width-100,40)
 */
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(10, 100));
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        cloud.addImage("movingCloud", movingCloud);
        break;
      case 2:
        cloud.addImage("movingCloud2", movingCloud2);
        break;
      default:
        break;
    }

    cloud.scale = 0.25;
    cloud.velocityX = -(4 + (3 * score) / 100);
    cloud.lifetime = width/ (4 + (3 * score) / 100);
    cloudGroup.add(cloud);
  }
}

function spawnCactus() {
  if (frameCount % 70 === 0) {
    obstacle = createSprite(width, height-90, width, 125);

    obstacle.velocityX = -(4 + (3 * score) / 100);

    var randObstacle = Math.round(random(1, 6));
    switch (randObstacle) {
      case 1:
        obstacle.addImage("o1", o1);
        break;
      case 2:
        obstacle.addImage("o2", o2);
        break;
      case 3:
        obstacle.addImage("o3", o3);
        break;
      case 4:
        obstacle.addImage("o4", o4);
        break;
      case 5:
        obstacle.addImage("o5", o5);
        break;
      case 6:
        obstacle.addImage("o6", o6);
        break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = width/(4 + (3 * score) / 100);
    obstacleGroup.add(obstacle);
  }
}
function reset(){
   //score to 0
  gameState = PLAY
  
  
  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()
  
  trex.changeAnimation("running", trex_running);
    if(score >  localStorage['HighScore'] ){
     localStorage['HighScore']= score
  }
  score = 0
  //obstacles and clouds has to go back
  
  //gameState has to be play
  
  
}
