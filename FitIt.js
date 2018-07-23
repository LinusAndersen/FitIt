class Ball{
    constructor(x,y,radius, color){ //status(true = blue, red = false)
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    show(){
        drawCircle(this.x, this.y, this.radius, this.color);
    }
    fall(pixel){
        this.y += pixel;
    }
}

let gameSpeed = 0.1;
let canvas =  document.getElementById("c");
let ctx =canvas.getContext("2d");
let cW = canvas.width;
let cH = canvas.height;
let r = 20;
let balls = generateBalls(20, 10, r);
let score = 0;
let pScore = 10;
let speed = 1;
console.log(balls);

console.log(document.getElementById("score").value);

let countBalls = randomiseBalls(balls, 100);
console.log(countBalls);

gameLoop();
function gameLoop(){
    //resize
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    cW = canvas.width;
    cH = canvas.height;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (ball of balls){
        ball.fall(speed);
        ball.show();
    }
    
    for (ball of countBalls){
        ball.y = cH - 40;
        ball.show();
    }
    
    if (balls[0].y > countBalls[0].y){
        console.log(getColors(balls));
        console.log(getColors(countBalls));
        let right = true;
        if (areEqual(balls, countBalls)){
            console.log("Right");
            score += pScore;
            speed += 0.1;
            document.getElementById("score").value = "Score: " + score;
            console.log(score);
        }
        else{
            console.log("Wrong");
            right = false;
        }
        balls = generateBalls(20,10,20);
        countBalls = randomiseBalls(balls);
        if (right == false){
            balls = [];
            countBalls = [];
        }
    }
    setTimeout(gameLoop, gameSpeed);
}
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    
    if (charStr == "a"){
        balls = switchBalls(balls, "left").slice();
    }
    if (charStr == "d"){
        balls = switchBalls(balls, "right").slice();
    }
};
function drawCircle(x,y,r,color){
    ctx.beginPath();
    ctx.arc(x ,y,r,0,2*Math.PI, true);
    ctx.fillStyle=color;
    ctx.fill();
    ctx.fillStyle="#000000";
}
function generateBalls(y, num,r){
    let balls = [];
    for (let i = 0; i < num; i ++){
        let col = "#003bff"; //blue
        if (Math.random() >= 0.5){
            col = "#ff0000";
        }
        console.log(col);
        balls.push(new Ball(i*2*r + r,y,r, col));
    }
    return balls;
}
function switchBalls(balls, dir){
    let newBalls = balls.slice();
    console.log(balls);
    let colors = getColors(balls);
    if (dir == "left"){
        for (let i = 1; i < balls.length; i++){
            newBalls[i - 1].color = colors[i];
        }
        newBalls[newBalls.length - 1].color = colors[0];
    }
    if (dir == "right"){
        newBalls[0].color = colors[balls.length - 1];
        for (let i = 0; i < balls.length - 1; i++){
            newBalls[i + 1].color = colors[i];
        }
    }
    return(newBalls);
}
function randomiseBalls(balls, y){
    let rBalls = [];
    console.log(y);
    for (ball of balls){
        rBalls.push(new Ball(ball.x, ball.y, ball.radius, ball.color));
    }
    console.log(rBalls);
    for (let i = 0; i < Math.random() * rBalls.length; i++){
        rBalls = switchBalls(rBalls, "left").slice();
    }
    return(rBalls);
}
function getColors(balls){
    let colors = [];
    for (ball of balls){
        colors.push(ball.color);
    }
    return (colors)
}
function areEqual(balls1,balls2){
    for (let i = 0; i < balls1.length; i++){
        if (balls1[i].color != balls2[i].color){
            console.log(balls1[i], balls2[i]);
            return (false);
        }
    }
    return(true);
}