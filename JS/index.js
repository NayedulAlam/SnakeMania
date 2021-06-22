// Game constants and variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('/SnakeMania/Assets/eat.wav')
const gameOverSound = new Audio('/SnakeMania/Assets/dead.wav')
const gameSound = new Audio('/SnakeMania/Assets/tune.mp3')
const moveSound = new Audio('/SnakeMania/Assets/move.wav')
let speed = 8
let score = 0
let lastPaintTime = 0
let snakeArr = [
    {
        x: 13, y: 15
    }
]
food = { x: 6, y: 7 };



// Game Function 
function main(ctime) {
    window.requestAnimationFrame(main);
    
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine()
}
function isCollide(snake) {
    // if you hit yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if you hit the wall
        if(snake [0].x>=18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y <=0){
            return true;
    }
}
function gameEngine() {
    //part 1 : Updating the snake array and food
    if(isCollide(snakeArr)){
        gameSound.play()
        gameOverSound.play()
        gameSound.pause()
        inputDir = {x:0, y:0};
        alert('Game Over Press Any Key To Play Again!',)
        snakeArr = [{x: 13, y:15 }];
        score = 0; 
    }
// if you have eaten the food increament the score and regenrate the food

if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score += 1;
    if(score> hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiScoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b - a)* Math.random())}
        }
         
        //Moving the snake
     for (let i = snakeArr.length - 2; i>=0 ; i--) {
         snakeArr[i + 1] = {...snakeArr[i]};
         
     }   
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

    // part 2 : Display the snake and foood

    
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });
    
    // Display the Food
    
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

// Main Logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval= JSON.parse(hiscore)
    hiScoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    moveSound.play();
    gameSound.play()
    switch (e.key) {

        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});

