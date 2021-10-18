var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg, zombie;
var explosionSnd, explosionImg, explosion
var bullet
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;

function preload() {
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  explosionSnd = loadSound("assets/explosion.mp3")
  explosionImg = loadImage("assets/heart_1.png")
  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adding the background image
  bg = createSprite(displayWidth / 2 + 5, displayHeight / 2 - 25, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 2.2


  //creating the player sprite
  player = createSprite(displayWidth - 1700, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)
 
  
//creating sprites to depict lives remaining
heart1 = createSprite(displayWidth - 150, 40, 20, 20)
heart1.visible = false
heart1.addImage("heart1", heart1Img)
heart1.scale = 0.4

heart2 = createSprite(displayWidth - 100, 40, 20, 20)
heart2.visible = false
heart2.addImage("heart2", heart2Img)
heart2.scale = 0.4

heart3 = createSprite(displayWidth - 150, 40, 20, 20)
heart3.addImage("heart3", heart3Img)
heart3.scale = 0.4


 //creating group for zombies    
 zombieGroup = new Group();
 bulletGroup = new Group();
}

function draw() {
  background(0);


  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 30
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 30
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting);
    bullet =createSprite(player.x,player.y,30,10);
    bullet.velocityX =25;
    bulletGroup.add(bullet);
    //explosion = createSprite(displayWidth - 1700, displayHeight - 300, 50, 50);
    //explosion.shapeColor ="red"
    //explosion.addImage(explosionImg);
    //explosion.scale = 0.1
    explosionSnd.play();

  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }
  //spawn the zombie 
  enemy();
  //destroy zombie when player touches it
  if (zombieGroup.isTouching(player) ) {


    for (var i = 0; i < zombieGroup.length; i++) {

      if (zombieGroup[i].isTouching(player) ) {
        zombieGroup[i].destroy()
      }
    }
  }
  //destroy the zombie when bullet touches it 
  if (zombieGroup.isTouching(bulletGroup) ) {


    for (var i = 0; i < zombieGroup.length; i++) {

      if (zombieGroup[i].isTouching(bulletGroup) ) {
        zombieGroup[i].destroy()
      }
    }
  }
  drawSprites();

}
function enemy() {
  if (frameCount % 80 == 0) {
    // creating zombie sprite
    zombie = createSprite(random(displayWidth + 10,displayWidth +80), random(displayHeight -100,displayHeight-850 ) , 50, 50)
    zombie.addImage(zombieImg)
    zombie.scale = 0.15;
    //zombie.lifetime = 600;
    zombie.velocityX= -3 ;
    zombieGroup.add(zombie)
  }
}
