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
let gameOver = false; // varible d'état
let Paused = false; // variable pour la pause

document.addEventListener("keydown", (event) => {
  // 32 est le code de la touche Espace
  if (event.keyCode === 32) { 
    pauseTouch(); // Appelle la fonction de pause/reprise
  } else if (!Paused && !gameOver) {
    // Ne change la direction que si le jeu n'est ni en pause ni terminé
  direction = handleDirectionChange(event, direction);
  }
});

function pauseTouch() {
  if (gameOver) return; 
  
  Paused = !Paused;
  
  if (Paused) {
    clearInterval(gameInterval); // SUSPENDRE L'INTERVALLE
    draw(); // Dessiner une dernière fois pour afficher le message PAUSE
  } else {
    // Si on reprend, redémarrer l'intervalle
    gameInterval = setInterval(draw, gameSpeed); 
  }
}

function startGame() {
  snake = initSnake(box); // Correction 3
  food = generateFood(box, canvas); // Correction 5
  score = 0; // Réinitialiser le score au démarrage
  gameOver = false; // Réinitialiser l'état
  Paused = false; // Réinitialiser l'état

  // ... (votre code existant)

  if(gameInterval) clearInterval(gameInterval);
  
  // NOUVELLE CORRECTION : Dessiner une fois avant de démarrer l'intervalle
  draw(); 

  gameInterval = setInterval(draw, gameSpeed);
}

function drawPause() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
}

function drawGameOver() {
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
    
    ctx.font = "20px Arial";
    ctx.fillText("Score final : " + score, canvas.width / 2, canvas.height / 2 + 50);
}

function draw() {
  // A compléter

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // GESTION DE LA PAUSE : Si le jeu est en pause, on affiche le message et on sort.
  if (Paused) {
      drawSnake(ctx, snake, box); 
      drawFood(ctx, food, box);
      drawScore(ctx, score);
      drawPause(); 
      return; 
  }  

  // 2. DESSIN DE L'ÉTAT ACTUEL (avant le mouvement)
  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box);
  drawScore(ctx, score);

    // 3. CALCUL DE LA NOUVELLE TÊTE
  let head = moveSnake(snake, direction, box);

  // 4. VÉRIFICATION DE LA COLLISION (Game Over)
  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box)) {
    clearInterval(gameInterval);
    gameOver = true; // Mettre l'état à Game Over
    // Le reste du code est ignoré
  }
  
  // 5. GESTION DE LA FIN DU JEU : Si collision, on affiche le message et on sort.
  if (gameOver) {
    drawGameOver(); // Nouvelle fonction pour l'affichage
    return; // Sortir de la fonction draw
  }
  
  // 6. MISE À JOUR DU CORPS (UNIQUEMENT SI PAS DE COLLISION)
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood(box, canvas);
  } else {
    snake.pop();
  }
  // 7. AJOUT DE LA NOUVELLE TÊTE
  snake.unshift(head);
  
}
  startGame(); 
