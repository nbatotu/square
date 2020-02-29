var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.addEventListener('click', onClick, false);
canvas.addEventListener('touchstart', onClick, false);
var x = 180
var y = 500
var gameover = false
var score = 0
var angle = false
var isstart = false
var speed = 0
var scoree = false
var pipes = []
var pipespeed = 2.5
var list
var yspeed = 0
var pipex = []
var scorey = -30
let lastTouch = 0;
document.addEventListener('touchend', event => {
  const now = window.performance.now();
  if (now - lastTouch <= 500) {
    event.preventDefault();
  }
  lastTouch = now;
}, true);
function draw(){

    ctx.clearRect(0,0,450,680)
    ctx.fillRect(x,y,75,75)
    ctx.fillRect(0,0,10,680)
    ctx.fillRect(440,0,10,680)
    ctx.font = "48px pixeled";
    ctx.textAlign = 'center'
    
    if(gameover == false){
        ctx.fillText(score,225,100)
        if(x < 10  || x > 370){
            gameover = true
        }
    }
    if(gameover == true){
        yspeed += 0.1
        ctx.fillText('GAMEOVER',225,100)
    }
 
    if (isstart == true){
        for(i=0;i<pipes.length;i++){
            ctx.fillRect(pipex[i],pipes[i],400,30)
            ctx.fillRect(pipex[i] + 600,pipes[i],400,30)
            pipes[i] += pipespeed
            if(pipes[i] > 480 && pipes[i] < 560){
                list = pipex[i]
                if(list+400>x || x>list+525){
                    if (gameover==false){
                        gameover = true
                    }
                    
                }
            }
            if(pipes[i]==520){
                score+=1
    
            }
        }
    
        
        x += speed
        if(gameover == false){
            if (angle==true){
                if(speed < 0){
                    speed += 0.4
                }else{
                    speed += 0.16
                }
                
            }else{
                if(speed > 0){
                    speed -= 0.4
                }else{
                    speed -=0.16
                }
                
            }

        }

    }else{
        ctx.fillText("Tap!",225,460)
    }

    if(gameover == true){
        speed = 0
        y += yspeed
        pipespeed =0

    }
}

function add(){
    if(isstart == true && gameover == false){
        pipes.push(-10)
        pipex.push(Math.round( Math.random()*300)-400)
    }
    
}

function onClick(e){    
    if (isstart == false){
        isstart = true
        console.log(isstart)
    }
    if (angle == true){
        angle=false
    }else{
        angle=true
    }
}


setInterval(draw,10)
setInterval(add,2000)
