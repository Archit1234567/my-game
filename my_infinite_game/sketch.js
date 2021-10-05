var player,playerImg;
var o1Img;
var o2Img;
var o3Img;
var bia,biaImg;
var gameState = "PLAY";
var invisGrnd;
var obstacle ;
var obGrp;
var score;

function preload(){
playerImg = loadImage ("player.png");
o1Img = loadImage ("o1.png");
o2Img = loadImage ("o2.png");
o3Img = loadImage ("o3.png");
biaImg = loadImage ("bia.png");
}

function setup() {
 createCanvas(700,250);
 player = createSprite (30,150,10,10);
 player.addImage ("l",playerImg);
 player.scale = 0.2;

 invisGrnd = createSprite (30,190,40,5);
 invisGrnd.visible = false;

 obGrp = createGroup();
 

 score = 0;
}

function draw() {
 background ("black");
 text ("score ="+score,560,15);
 matrix ();
 console.log (mouseX,mouseY);
 if (gameState === "PLAY"){
  obstacles();
 
  score = score + Math.round(getFrameRate()/60);
  if (keyDown ("space")&& player.y >= 150 ){
      player.velocityY = -15;   
    }
if (obGrp.isTouching(player)){
    gameState = "END";
}
 }
 if (gameState === "END"){
     obGrp.setVelocityXEach (0);
     obGrp.setLifetimeEach (-1);
     fill ("red");
     text ("press ^",350,125);
    if (keyDown ("up_arrow")){
        gameState = "PLAY";
        obGrp.destroyEach ();
        score = 0;
    }
 }
 player.velocityY = player.velocityY + 0.8;

 player.collide (invisGrnd);
 
 drawSprites ();
}

function obstacles () {
    if (frameCount % 200 === 0){
    obstacle = createSprite (700,165,20,20);
    var rand = Math.round (random (1,3));
    obstacle.velocityX = -(10+score/100);
    obstacle.scale = 0.1;
    switch (rand){
        case 1 : obstacle.addImage ("i",o1Img);
        break;
        case 2 : obstacle.addImage ("i",o2Img);
        break;
        case 3 : obstacle.addImage ("i",o3Img);
        break;
        case 4: break;
    }
    obstacle.lifetime = 400;

    player.depth = obstacle.depth;
    player.depth = player.depth +1;
    obGrp.add (obstacle);
}
}
function matrix (){
    if (frameCount % 1 === 0){
bia = createSprite (750,Math.round(random(15,220)),10,10);
bia.addImage ("l",biaImg);
bia.scale = 0.1;
bia.velocityX = -(10+score/100);
bia.lifetime = 700;
 player.depth = bia.depth;
  player.depth = player.depth +1;
    }
}