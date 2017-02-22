var dots = [];
var energy = 0; //starting value of energy
var singleShake = 0;
var maxEnergy= 500; //max energy for eathquake

var myImage1;
var myImage2;
var Cover;

function preload() {
   Cover = loadImage("images/gif-a-2-orizzontale.gif");
   myImage1 = loadImage("images/prova1.jpg");    
   myImage2 = loadImage("images/prova2.jpg");
}
    
function setup(){
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw(){
    background(204);    
    
    var magnitude = int(map(energy, 0, 500, 0, 10)); 
    
    if (energy < 0.5) {
        
     image(Cover,0,0,windowWidth,windowHeight); 
        
     } else if (energy > 0.5 && energy < maxEnergy){
     
     textSize(height/20);
     textAlign(CENTER);
     textStyle(BOLD);
     fill(0);
     noStroke();
     text("EARTHQUAKE INTENSITY", width/2,height - height/1.1);     
     

  fill(0);
  noStroke();
  textSize(height/30);
  textAlign(CENTER);
  textStyle(BOLD);
  text("SEE RESULT",width/1.3, height - height/8);
  

  fill(0);
  noStroke();
  textSize(height/30);
  textAlign(CENTER);
  textStyle(BOLD);
  text("TRY AGAIN",width/4, height - height/8);
  
      
    //CREATE THE ELLIPSE AREA
    var x = width/2;
    var y = height/2;
    var r = energy * 2; 
    
    noFill();
    stroke(0);
    strokeWeight(1);
    ellipse (x, y, r, r);

    //magnitude indication
    fill(0);
    noStroke();    
    
    textSize(height/40);
    textAlign(CENTER);
    textStyle(NORMAL);
    text("Magnitude", width/2, height - height/5);
        
    textSize(height/20);
    textAlign(CENTER);
    textStyle(BOLD);
    text(magnitude,width/2, height - height/6.7);
    
        
 } else if(energy >= maxEnergy) {
         
    textSize(height/10);
    textAlign(CENTER);
    textStyle(BOLD);
    text("ALSO THE STRONGEST EARTHQUAKE ISN'T STRONG AS YOU",width/2, height - height/2)
    textSize(height/20);
    text("10",width/2, height - height/6.7)
    energy = maxEnergy;
    background(204);
         
     }
        
    //draw dots and given methods (actions)
      noStroke();
      fill(0);
      for (var i = 0; i < energy * 100; i++){
        dots[i].move();
        dots[i]. display();
       }
   
    if(touchX > width/1.3 - width/7 && touchX < width/1.3 + width/7 && touchY > height/9 - width/7 && touchY <  height/9 + width/7){   
       
    if (magnitude <= 5){
         
         image(myImage1,0,0,windowWidth,windowHeight);
         
     } else {
         
         image(myImage2,0,0,windowWidth,windowHeight);
     } 
       
   }   
    
   if(touchX > width/4 - width/7 && touchX < width/4 + width/7 && touchY > height/9 - width/7 && touchY <  height/9 + width/7){   
       
    background(204);
    energy = 0;
       
   }    
    
}

function deviceShaken(){
    
  singleShake = abs(accelerationX) + abs(accelerationY) + abs(accelerationZ);
  energy += singleShake;
    
   
  //create objects
    for (var i = 0; i < energy*100; i++){
        dots.push(new QuakeDots());
    } 
    
}
    
function QuakeDots(){ 
    var a = random(0,360);
    var b = random(0,energy * 1.6);
    var x = sin(a) * b; // mi dà un numero che va da -b a b
    var y = cos(a) * b; // mi dà un numero che va da -b a b
    var d = dist(width/2,height/2, width/2, height/2 + x/2);
    
    this.xdot = random(width/2 - d, width/2 + d); //according to ellipse area
    this.ydot = random(height/2 - d, height/2 + d); //according to ellipse area
    this.diameter = 6;
    this.speed = 4; //according to magnitude

    this.move = function(){
    this.xdot += random(-this.speed,this.speed);
    this.ydot += random(-this.speed,this.speed);
 
    }

    this.display = function(){
    if(this.xdot > width/2 + d || this.xdot < width/2 - d || this.ydot > height/2 + d || this.ydot < height/2 - d){
       this.xdot = random(width/2 - d, width/2 + d);
       this.ydot = random(height/2 - d, height/2 + d); 
       }
    ellipse(this.xdot, this.ydot, this.diameter, this.diameter);
    };
 
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}
