var dots = [];
var energy = 0; //starting value of energy
var singleShake = 0;
var maxEnergy= 1000; //max energy for eathquake

var Chile;
var Japan;
var Indonesia;
var Cover;

var fontMetaRegular, fontMetaBold, fontMetaMedium, fontOCRB;

function preload() {
   Cover = loadImage("images/gif-a-2-orizzontale.gif");
   
   Chile = loadImage("images/Chile2.jpg");    //9.5
   Japan = loadImage("images/Japan.jpg");    //9.0
   Indonesia = loadImage("images/Indonesia.jpg"); //8.5
   
   fontMetaRegular = loadFont("assets/MetaPro-Normal.otf");
   fontMetaBold = loadFont("assets/MetaPro-Bold.otf");
   fontMetaMedium = loadFont("assets/MetaPro-Medium.otf");
   fontOCRB = loadFont("assets/OCRBStd.otf");
}
    
function setup(){
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
}

function draw(){
    background(204);    
    
    var magnitude = map(energy, 0, 1000, 0, 10); 
    
    if (energy < 0.5) {
        
     image(Cover,0,0,windowWidth,windowHeight); 
        
     } else if (energy > 0.5 && energy < maxEnergy){
        
     textFont(fontOCRB);
     textSize(height/25);
     textAlign(CENTER);
     textStyle(BOLD);
     fill(0);
     noStroke();
     text("EARTHQUAKE INTENSITY", width/2,height - height/1.2);     
 
    textFont(fontMetaBold);    
    fill(0);
    noStroke();
    textSize(height/30);
    textAlign(CENTER);
    textStyle(BOLD);
    text("SEE RESULT",width/1.3, height - height/15);

    fill(0);
    noStroke();
    textSize(height/30);
    textAlign(CENTER);
    textStyle(BOLD);
    text("TRY AGAIN",width/4, height - height/15);
  
      
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
    textFont(fontMetaRegular);   
    textSize(height/40);
    textAlign(CENTER);
    textStyle(NORMAL);
    text("Magnitude", width/2, height - height/5);
    
     textFont(fontMetaMedium);   
    textSize(height/20);
    textAlign(CENTER);
    textStyle(BOLD);
    text(nfc(magnitude,1,1), width/2, height - height/6.7);
        
        //draw dots and given methods (actions)
      noStroke();
      fill(0);
      for (var i = 0; i < energy * 100; i++){
        dots[i].move();
        dots[i]. display();
       }
    
        
 } else if(energy >= maxEnergy) {
    textFont(fontOCRB);      
    textSize(height/30);
    textAlign(CENTER);
    textStyle(BOLD);
    text("ALSO THE STRONGEST EARTHQUAKE",width/2, height - height/2);
    text("ISN'T STRONG AS YOU!",width/2, height - height/2.2);
    
    fill(0);
    noStroke();
    textSize(height/30);
    textAlign(CENTER);
    textStyle(BOLD);
    text("TRY AGAIN",width/4, height - height/15);
    
    //tap on TRY AGAIN 
     if(touchX > width/4 - width/7 && touchX < width/4 + width/7 && touchY > height - height/15 - width/7 && touchY <  height - height/15 + width/7){   
       
       image(Cover,0,0,windowWidth,windowHeight); 
       energy = 0;
       
      }   
         
  }
        
   //tap on SEE RESULT
    if(touchX > width/1.3 - width/7 && touchX < width/1.3 + width/7 && touchY > height - height/15- width/7 && touchY < height - height/15 + width/7){   
       
      if (magnitude <= 6){
         
         image(myImage1,0,0,windowWidth,windowHeight);
         //tap on the arrow
         if(touchX >  0  && touchX <  width && touchY > height/2  && touchY < height){   
           image(Cover,0,0,windowWidth,windowHeight);
         }
       } else if(magnitude > 6 && magnitude <= 7){
         
         image(myImage2,0,0,windowWidth,windowHeight);
         //tap on the arrow
         if(touchX >  0  && touchX <  width && touchY > height/2  && touchY < height){   
           image(Cover,0,0,windowWidth,windowHeight);
          }
          
       } else if(magnitude > 7 && magnitude <= 8){
         image(myImage1,0,0,windowWidth,windowHeight);
         //tap on the arrow
         if(touchX >  0  && touchX <  width && touchY > height/2  && touchY < height){   
           image(Cover,0,0,windowWidth,windowHeight);
         }        
                 
       } else if(magnitude > 8 && magnitude <= 8.5){
        image(Indonesia,0,0,windowWidth,windowHeight);
         //tap on the arrow
         if(touchX >  0  && touchX <  width && touchY > height/2  && touchY < height){   
           image(Cover,0,0,windowWidth,windowHeight);
         }
       } else if(magnitude > 8.5 && magnitude <= 9){
         image(Japan,0,0,windowWidth,windowHeight);
         //tap on the arrow
         if(touchX >  0  && touchX <  width && touchY > height/2  && touchY < height){   
           image(Cover,0,0,windowWidth,windowHeight);
         }
       } else if(magnitude > 9 && magnitude <= 10){
         image(Chile,0,0,windowWidth,windowHeight);
         //tap on the arrow
         if(touchX >  0  && touchX <  width && touchY > height/2  && touchY < height){   
           image(Cover,0,0,windowWidth,windowHeight);
         }
       }
   }   
   //tap on TRY AGAIN 
   if(touchX > width/4 - width/7 && touchX < width/4 + width/7 && touchY > height - height/15 - width/7 && touchY <  height - height/15 + width/7){   
       
     image(Cover,0,0,windowWidth,windowHeight);
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
    this.diameter = 7;
    this.speed = 5;
   
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
