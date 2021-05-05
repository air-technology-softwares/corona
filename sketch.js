var deliveryman;
var START=0,PLAY=1,END=2,WIN=3;
var corona, sanitizer, mask, vaccine, food;
var levels=1,corona;
var deliverymanImage;
var homeImage;
var coronaGroup;
var hits=0;
var home;
var gameState=START;
var start,startImage;
var flag=0;
var san=0,mas=0,vac=0;
var sanitizer, mask, vaccine;


function preload()
{
  coronaImage=loadImage("corona.png");
  deliverymanImage=loadImage("deliveryman.png")
  homeImage=loadImage("home.png")
  startImage=loadImage("start.png")
  maskImage=loadImage("mask.png")
  sanitizerImage=loadImage("sanitizer.png")
  vaccineImage=loadImage("vaccine.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  deliveryman=createSprite(400, 200, 50, 50);
  deliveryman.addImage(deliverymanImage);
  deliveryman.scale=0.3;
  deliveryman.visible=false;
  home=createSprite(width-100,height-80);
  home.addImage(homeImage);
  home.scale=0.5;
  home.visible=false;
  coronaGroup=new Group();
  start=createSprite(width/2,height/2-150);
  start.addImage(startImage);
  start.scale-=0.5;
  sanitizer=createSprite(random(100,width-300),random(100,height-100));
  sanitizer.visible=false;
  sanitizer.addImage(sanitizerImage);
  sanitizer.scale=0.5;


  sanitizer.setCollider("rectangle",0,0,200,100);



  mask=createSprite(random(100,width-300),random(100,height-100));
  mask.visible=false;
  mask.addImage(maskImage);
  mask.scale=0.5;

  vaccine=createSprite(random(100,width-300),random(100,height-100));
  vaccine.visible=false;
  vaccine.addImage(vaccineImage);
  vaccine.scale=0.2;

}

function draw()
{
  background(255,255,255);
  textSize(15);
  textAlign(CENTER);
  fill("purple");
  stroke("yellow");
  strokeWeight(2);
  text("Lifelines: "+ (100-hits),100,100);
  if(gameState===START)
  {
    textSize(15);
    textAlign(CENTER);
    fill("purple");
    stroke("yellow");
    strokeWeight(2);
    text("You need to save the earth from apocalypse\n by collecting all the corona fighters \nand deliver it to our home. \nIf the corona is hit 3 times, game will end \n\n Press the button to start the game",width/2,height/2-100);
    if(mousePressedOver(start))
    {
      gameState=PLAY;
      start.visible=false;
      sanitizer.visible=true;
      vaccine.visible=true;

    }
  }
  else if(gameState===PLAY){
    deliveryman.visible=true;
    home.visible=true;

    mask.visible=true;
    if(keyDown("up"))
    {
      deliveryman.y-=10;
    }
    if(keyDown("down")){
      deliveryman.y+=10;
    }

    if(keyDown("left"))
    {
      deliveryman.x-=10;
    }
    if(keyDown("right")){
      deliveryman.x+=10;
    }

    if(deliveryman.collide(sanitizer))
    {
      sanitizer.destroy();
      san+=1;
    }
    if(deliveryman.collide(mask))
    {
      mask.destroy();
      mas+=1;
    }
    if(deliveryman.collide(vaccine))
    {
      vaccine.destroy();
      vac+=1;
    }
    if(deliveryman.isTouching(coronaGroup))
    {
      hits+=1;
    }

    if(hits===100)
    {
      gameState=END;
    }
    if(deliveryman.isTouching(home))
    {
      if(san>=1 && vac>=1 && mas>=1)
      {
      gameState=WIN;
      }
      else {
       text("You need to collect the savers",width/2,height/2)
      }
    }

    spreadCorona();
}
if(gameState===WIN)
{
  coronaGroup.setVelocityXEach(0);
  coronaGroup.setVelocityYEach(0);
  textSize(25);
  textAlign(CENTER);
  fill("skyblue");
  stroke("red");
  strokeWeight(2);
  text("You Win over corona",width/2,height/2);
}

  drawSprites();
}

function spreadCorona()
{
        if(frameCount%15===0)
        {
          corona=createSprite(width,100,25,25);
          corona.addImage(coronaImage);


          var rand=Math.round(random(1,4))

          if(rand===1)
          {
            corona.x=width;
            corona.scale=0.2;
              corona.setCollider("circle",0,0,100);
            corona.velocityX=-(5+levels);
            corona.y=Math.round(random(10,height-10));
          }
        else if(rand===2)
        {
          corona.x=0;
          corona.scale=0.4;
          corona.setCollider("circle",0,0,180);
          corona.velocityX=(5+levels);
          corona.y=Math.round(random(10,height-10));
        }
        else if(rand===3)
        {
          corona.y=height;
          corona.scale=0.3;
          corona.setCollider("circle",0,0,160);
          corona.velocityY=-(5+levels);
          corona.x=Math.round(random(10,width-10));
        }
        else if(rand===4)
        {
          corona.y=0;
          corona.scale=0.3;
          corona.setCollider("circle",0,0,160);
          corona.velocityX=(5+levels);
          corona.x=Math.round(random(10,width-10));
        }
        corona.lifetime=200;
        coronaGroup.add(corona);
      }
}
