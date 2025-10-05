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

/*function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);
  score = 0;
  //gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle

  if(gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(draw, gameSpeed);
}*/

function startGame() {
  snake = initSnake(box); // Correction 3
  food = generateFood(box, canvas); // Correction 5

  // ... (votre code existant)

  if(gameInterval) clearInterval(gameInterval);
  
  // NOUVELLE CORRECTION : Dessiner une fois avant de démarrer l'intervalle
  draw(); 

  gameInterval = setInterval(draw, gameSpeed);
}

function draw() {
  // A compléter

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box);
  drawScore(ctx, score);

  let head = moveSnake(snake, direction, box);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood(box, canvas);
  } else {
    snake.pop();
  }

  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box)) {
    clearInterval(gameInterval);
    alert("Game Over ! Score final : " + score);
    return;
  }

  snake.unshift(head);
}
startGame(); 
