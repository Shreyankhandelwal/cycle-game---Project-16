//Variables have been loaded here

var road,mainCyclist;
var player1,player2, player3;
var roadImg,mainRacerImg1,mainRacerImg2;
var obs1,obs2,obs3;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell, RestartImg;
var obsImg1,obsImg2,obsImg3;

var pinkCyclistG, yellowCyclistG,redCyclistG; 

//for GameStates
var END = 0;
var PLAY = 1;
var gameState = PLAY;


var distance = 0;
var MaxDistance = 0;
var gameOver, restart;

function preload(){
  
  //Animations have been loaded here
  
  //Animation for Main cyclist being controlled by user
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  
  //Animation for Main cyclist when it collides with any obstacle or opponent
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  //Animation for pink cyclist  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  
  //Animation for pink cyclist when it collides with any obstacle or opponent
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  //Animation for yellow cyclist
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  
  //animation for yellow cyclist when it collides with any obstacle or opponent
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  //animation for red cyclist
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  
  //animation for red cyclist when it collides with any obstacle or opponent
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  //The images are loaded here
  roadImg = loadImage("images/Road.png");
  obsImg1 = loadImage("images/obstacle1.png")
  obsImg3 = loadImage("images/obstacle2.png")
  obsImg3 = loadImage("images/obstacle3.png")
  
  //the sounds have been loaded here
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.jpg");
  RestartImg = loadImage("images/reset.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
road=createSprite(100,150);
road.addImage(roadImg);
road.velocityX = -5;

// sprite for the Main cyclist(controlled by the user)
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//restart button sprite   
restart = createSprite(660,265);
restart.addImage(RestartImg);
restart.scale = 0.3;
restart.visible = false;  

//game over sprite
gameOver = createSprite(650,120);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.3;
gameOver.visible = false;  
  
//the groups have been created here  
pinkCyclistG = new Group();
yellowCyclistG = new Group();
redCyclistG = new Group();
obs1G = new Group();
obs3G = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance + "m",900,30);
  text("Maximum Distance covered: "+ MaxDistance + "m",840,60);
  
  if(gameState === PLAY){
    
   //increasing the speed of the road and distance covered  
   distance = distance + Math.round(getFrameRate()/60);
   road.velocityX = -(8 + 2*distance/150);
   
   mainCyclist.y = World.mouseY;
   mainCyclist.setCollider("circle",0,0,400);   //Collider for Main cyclist
   
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(road.x < 0 ){
    road.x = width/2;
  }
  
  //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players and obstacles
  var select_oppPlayer = Math.round(random(1,5));
  
  if (World.frameCount % 50 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    }  else if (select_oppPlayer == 3) {
      redCyclists();
    } else if (select_oppPlayer == 4) {
      obstacle1();
    } else {
      obstacle3();
    }
  }
    
  
    //Conditions for GameState = END
    
   if(pinkCyclistG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
  
    }
    
    if(yellowCyclistG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
   
    }
    
    if(redCyclistG.isTouching(mainCyclist)){
      gameState = END;
      //player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
      
    }
    
    if(obs1G.isTouching(mainCyclist)||obs3G.isTouching(mainCyclist) ){
      gameState = END;
    }
    
    //if(obs3G.isTouching(mainCyclist)){
      //gameState = END;
  //  }
    
   }else if (gameState === END) {
  
    gameOver.visible = true;
    restart.visible = true;
  
     road.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
     
   //restart game instrution
   if(mousePressedOver(restart)){
       reset();
     }
   
  //For the new Maximum distance   
  if(distance > MaxDistance){
    MaxDistance = distance;
  }
  
    
  
    //defining the lifetime and velocityX for the obstacles and players/opponents 
     
    pinkCyclistG.setVelocityXEach(0);
    pinkCyclistG.setLifetimeEach(-1);
      
    yellowCyclistG.setVelocityXEach(0);
    yellowCyclistG.setLifetimeEach(-1);
  
    redCyclistG.setVelocityXEach(0);
    redCyclistG.setLifetimeEach(-1);
    
    obs1G.setVelocityXEach(0);
    obs1G.setLifetimeEach(-1);

    obs3G.setVelocityXEach(0);
    obs3G.setLifetimeEach(-1);
  
    }
}

//function for the pink cyclists/opponents
function pinkCyclists(){
        player1 =createSprite(1300,Math.round(random(30, 270)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime = 170;
        player1.setCollider("circle",0,0,900);
        pinkCyclistG.add(player1);
  
  gameOver.depth = player1.depth;
  gameOver.depth = gameOver.depth + 1;
  reset.depth = player1.depth;
  reset.depth = reset.depth + 1;
  
}

//function for the yellow cyclists/opponents
function yellowCyclists(){
        player2 =createSprite(1300,Math.round(random(30, 270)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        player2.setCollider("circle",0,0,900);
        yellowCyclistG.add(player2);
  
  gameOver.depth = player2.depth;
  gameOver.depth = gameOver.depth + 1;
  reset.depth = player2.depth;
  reset.depth = reset.depth + 1;

}

//function for the red cyclists/opponents
function redCyclists(){
        player3 =createSprite(1300,Math.round(random(30,270)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        player3.setCollider("circle",0,0,900);
        redCyclistG.add(player3);
  
  gameOver.depth = player3.depth;
  gameOver.depth = gameOver.depth + 1;
  reset.depth = player3.depth;
  reset.depth = reset.depth + 1;

 }

//function for the 1st obstacle(cone)
function obstacle1(){
  
   obs1 = createSprite(1300,Math.round(random(30,270)));
   obs1.scale = 0.1;
   obs1.velocityX = -(6 + 2*distance/150);
   obs1.addImage("image", obsImg1);
   obs1.setCollider("circle",0,30,250);
   obs1G.add(obs1);
  
  gameOver.depth = obs1.depth;
  gameOver.depth = gameOver.depth + 1;
  reset.depth = obs1.depth;
   reset.depth = reset.depth + 1;

}

//function for the obstacle(3rd metal trash)
function obstacle3(){
  
   obs3 = createSprite(1300,Math.round(random(30,270)));
   obs3.scale = 0.1;
   obs3.velocityX = -(6 + 2*distance/150);
   obs3.addImage("image", obsImg3);
   obs3.setCollider("circle",0,30,250);
   obs3G.add(obs3);
  
   gameOver.depth = obs3.depth;
   gameOver.depth = gameOver.depth + 1;
   reset.depth = obs3.depth;
   reset.depth = reset.depth + 1;

}

//for the reset function 

function reset(){

  gameState = PLAY;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  mainCyclist.x = 70;
  mainCyclist.y = 150;
  
  distance = 0;
  
  
  gameOver.visible = false;
  restart.visible = false 
  
  pinkCyclistG.destroyEach();
  yellowCyclistG.destroyEach();
  redCyclistG.destroyEach();
  
  obs1G.destroyEach();
  obs3G.destroyEach();
  
}




