import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const gameSpeed = 200;
let snake;
let food;
let direction = "RIGHT";
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle

document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});

function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);

  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

function draw() {
  // A compléter

  useContext.clearRect(0, 0, 400, 400)

  for(let i = 0; i < snakeT.legth; i++){
    Context.fillStyle = (i == 0) ? "green" : "white"
    context.fillReact(snakeT[i].x, snake[i].y, box, box);
    context.strokeStyle = "red"
    context.strokeReact(snake[i].x, snake[i].y, box, box);
  }

  context.fillStyle = "orange"
  context.fillReact(food.x, food.y, box, box);

  let snakeX = snakeT[0].x
  let snakeY = snakeT[0].y

  if(direction == "LEFT") snakeX -= box;
  if(direction == "UP") snakeY -= box;
  if(direction == "RIGHT") snakeX += box;
  if(direction == "DOWN") snakeY += box;

  if(snakeX == food.x && snakeY == food.y){
    score ++ 
    food = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box
    }
  } else {
    snake.pop();
  }


let newHead = {
  x: snakeX,
  y: snakeY
}


if(snakeX < 0 || snakeY < 0 || snakeX > 19*box || snakeY >19*box || collision(newHead, snake)){
  clearInterval(game);
}

snake.unshift(newHead);

context.fillStyle = "red"
context.font = "30px Arial"
context.fillText(score, 2*box, 1.6*box)
}

function collision(head, array){
  for(let g = 0; g < array.legth; g++){
    if(head.x == array[g].x && head.y == array[g].y){
      return true;
    }
  }
  return false; 
}

let game = setInterval(draw, 100)

startGame(); 
