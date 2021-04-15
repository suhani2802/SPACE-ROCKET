var rocket, star, galaxy, starGroup, rocketImg, starImg, galaxyImg,
  meteor, meteorImg, meteorGrp;

var score = 0;
var stars = 0;
var gameState = "play";

function preload() {
  starImg = loadImage("star.png");
  rocketImg = loadImage("rocket.png");
  galaxyImg = loadImage("galaxy.jpg");
  meteorImg = loadImage("meteroid.jfif");
}

function setup() {
  createCanvas(400, 400);

  galaxy = createSprite(210, 210);
  galaxy.addImage("galaxy", galaxyImg);
  galaxy.velocityY = 1;

  rocket = createSprite(210, 300, 50, 50);
  rocket.addImage("rocket", rocketImg);
  rocket.scale = 0.12;

  starGrp = new Group();
  meteorGrp = new Group();

}

function draw() {

  background(180);

  if (gameState === "play") {
    drawSprites();

    fill("white");
    textSize(15);
    text("Stars: " + stars, 300, 30);
    text("Score: " + score, 300, 45);
    score = score + Math.round(getFrameRate() / 60);

    if (galaxy.y > 225) {
      galaxy.y = 200;
    }

    if (keyDown("left_arrow")) {
      rocket.x = rocket.x - 3;
    }

    if (keyDown("right_arrow")) {
      rocket.x = rocket.x + 3;
    }

    if (keyDown("space")) {
      rocket.velocityY = -5;
    }

    rocket.velocityY = rocket.velocityY + 0.8;

    if (meteorGrp.isTouching(rocket) || rocket.y > 420) {
      rocket.destroy();
      gameState = "END";
    }
  }

  if (starGrp.isTouching(rocket)) {
    star.destroy();
    fill("white");
    textSize(15);
    
    stars = stars + 1;

  }

  if (gameState === "END") {
    stroke("black");
    fill("black");
    textSize(30);
    text("GameOver", 120, 200);
    textSize(25);
    text("Your rocket has been crashed", 30, 230);

  }

  spawnmeteors();
  spawnstars();

}

function spawnmeteors() {
  if (frameCount % 300 === 0) {
    var meteor = createSprite(200, -50);
    meteor.addImage("meteor", meteorImg);
    meteor.x = Math.round(random(50, 350));
    meteor.velocityY = 1;
    meteor.lifetime = 600;
    meteor.scale = 0.25;
    meteorGrp.add(meteor);
  }
}

function spawnstars() {
  if (frameCount % 250 === 0) {
    star = createSprite(300, -40);
    star.addImage("star", starImg);
    star.x = Math.round(random(50, 350));
    star.velocityY = 1;
    star.lifetime = 600;
    star.scale = 0.2;
    starGrp.add(star);
  }
}