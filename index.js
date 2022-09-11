
//get all dom elements：
const button = document.getElementById("button");
const scoreNode = document.getElementById("score");
const gameBoard = document.getElementById("game-board");

let lastRenderTime = 0;

//variables related to snake：
const SNAKE_SPEED = 5;  

const snakeBody = [{ x: 15, y: 15 }];    //snake's inial position
var snakeSize = 5;        //snake's initial size
let snakeDirection = { x: 0, y: -1 };   //snake's initial moving direction

//variables related to food：
var food = {x: 3, y: 3};

//request id：
var id;
var id2;

//variables related to scores：
var score = 0

/*----------------------------------------------------------------*/

//game loop：
function main(currentTime) {

    id2 = window.requestAnimationFrame(main);  
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 
    if (secondsSinceLastRender < (1 / SNAKE_SPEED)) return;
    lastRenderTime = currentTime;

    updateSnake();
    drawSnake();
    drawFood();

    //when game will stop：
    if (snakeIsDead()) {
        console.log("hit")
        window.cancelAnimationFrame(id);
        window.cancelAnimationFrame(id2);
    }
}

button.addEventListener("click", () => {
    button.setAttribute("disabled", "false");   
    id = window.requestAnimationFrame(main);   
})


/* --------------------------------------------------------------- */

function updateSnake() {
    //1、when snake is moving：
    let snakeHead = {   
        x: snakeBody[0].x + snakeDirection.x,
        y: snakeBody[0].y + snakeDirection.y
    }

    snakeBody.unshift(snakeHead);

    while (snakeBody.length > snakeSize) {
        snakeBody.pop();
    }

    //2、when snake eat food：
    if(snakeBody[0].x === food.x && snakeBody[0].y === food.y){
        snakeSize += 1;   
        score += 1;
        updateScore();   
        putFood();  
    }

}

function drawSnake() {

    gameBoard.innerHTML = "";  

    for (let i = 0; i < snakeBody.length; i++) {
        let snakeElement = document.createElement("div");
        snakeElement.classList.add("snake");
        snakeElement.style.gridRowStart = snakeBody[i].y;
        snakeElement.style.gridColumnStart = snakeBody[i].x;
        gameBoard.appendChild(snakeElement);
    }
}

function snakeIsDead() {

    //1，when snake hit the wall
    if (snakeBody[0].x < 1 || snakeBody[0].x > 30) {
        return true;
    }
    if (snakeBody[0].y < 1 || snakeBody[0].y > 30) {
        return true;
    }

    //2 when snake hit itself
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0].x === snakeBody[i].x &&
            snakeBody[0].y === snakeBody[i].y) {
            return true;
        }
    }
    return false;
}


function putFood() {
    food = {
        x: Math.floor(Math.random() * 30 + 1),
        y: Math.floor(Math.random() * 30 + 1)
    }

    //if the food has been put on snake's body, need to be put one more time
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i].x === food.x && snakeBody[i].y === food.y) {
            putFood();
            break;
        }
    }
}

function drawFood() {
    let foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    gameBoard.appendChild(foodElement);
}

function updateScore(){
    scoreNode.innerHTML = score;
}


window.addEventListener("keydown", (event) => {  
    switch (event.key) {
        case "ArrowUp":
            if (snakeDirection.y !== 0) break;
            snakeDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (snakeDirection.y !== 0) break;
            snakeDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (snakeDirection.x !== 0) break;
            snakeDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (snakeDirection.x !== 0) break;
            snakeDirection = { x: 1, y: 0 };
            break;
    }
});
