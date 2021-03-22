var balloon,balloonImage,bgImage;
var position, database;

function preload(){
balloonImage =  loadImage("Hot Air Ballon-02.png")
bgImage = loadImage("Hot Air Ballon-01.png")

}

function setup(){
    database = firebase.database()
    createCanvas(500,500);
    balloon = createSprite(250,250,50,50);
    balloon.addImage(balloonImage);
    balloon.scale = 0.36;
    var balloonPosition = database.ref('ball/position')
    
    balloonPosition.on("value",readPosition, showError)
}

function draw(){
    background(bgImage);
    if(position!== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-5,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(5,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-5);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+5);
        }
    }
    
    drawSprites();
}

function changePosition(x,y){
       database.ref('ball/position').set({
           x :position.x + x,
           y :position.y + y
       }) 
    
}

function readPosition(data){
    position = data.val()
    balloon.x = position.x;
    balloon.y = position.y;
}
 
function showError(){
    console.log("error!")
}
