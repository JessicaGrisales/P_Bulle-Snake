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
let isGameOver = false; // varible d'état

document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});

function startGame() {
  snake = initSnake(box); // Correction 3
  food = generateFood(box, canvas); // Correction 5
  score = 0; // Réinitialiser le score au démarrage
  isGameOver = false; // Réinitialiser l'état

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

  // 3. VÉRIFIER la collision
  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box)) {
    clearInterval(gameInterval);
    isGameOver = true; // 👈 Mettre l'état à Game Over
    // Le reste du code est ignoré
  }
  
  // 4. Si c'est Game Over, affichez le message et sortez !
  if (isGameOver) {
    drawGameOver(); // 👈 Nouvelle fonction pour l'affichage
    return; // Sortir de la fonction draw
  }
  
  // 5. METTRE À JOUR les positions si PAS de collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood(box, canvas);
  } else {
    snake.pop();
  }

  snake.unshift(head);
  
  // 6. Le DESSIN du corps mis à jour se fera au prochain appel de draw()
}

 // Affiche le message "Game Over" au centre du canvas.
function drawGameOver() {
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
    
    ctx.font = "20px Arial";
    ctx.fillText("Score final : " + score, canvas.width / 2, canvas.height / 2 + 50);
}
  startGame(); 
