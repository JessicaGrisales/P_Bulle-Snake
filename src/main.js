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

// Variables du Chronomètre
let gameTime; // Timestamp du début de la partie (pour calculer le temps écoulé)
let timeSecond = 0; // Temps écoulé en secondes
let intervalTime; // Intervalle pour le chronomètre

document.addEventListener("keydown", (event) => {
  // 32 est le code de la touche Espace
  if (event.keyCode === 32) { 
    pauseTouch(); // Appelle la fonction de pause/reprise
  } else if (!Paused && !gameOver) {
    // Ne change la direction que si le jeu n'est ni en pause ni terminé
    direction = handleDirectionChange(event, direction);
  }
});

// NOUVELLE FONCTION: Met à jour le temps écoulé
function updateTime() {
  if (Paused || gameOver) return;
  
  // Calculer le temps écoulé depuis le début du jeu en secondes
  const now = Date.now();
  timeSecond = Math.floor((now - gameTime) / 1000); 
}

// FONCTION MODIFIÉE: Gère l'état de pause/reprise
function pauseTouch() {
  if (gameOver) return; 
  
  Paused = !Paused;
  
  if (Paused) {
    clearInterval(gameInterval); // SUSPENDRE L'INTERVALLE du mouvement
    clearInterval(intervalTime); // SUSPENDRE L'INTERVALLE du chronomètre
    draw(); // Dessiner une dernière fois pour afficher le message PAUSE
  } else {
    // Reprendre le chronomètre en ajustant le temps de départ
    gameTime = Date.now() - (timeSecond * 1000); 
    
    // Redémarrer les intervalles
    gameInterval = setInterval(draw, gameSpeed); 
    intervalTime = setInterval(updateTime, 1000);
  }
}

// FONCTION MODIFIÉE: Initialisation du jeu
function startGame() {
  snake = initSnake(box); 
  food = generateFood(box, canvas); 
  score = 0; 
  gameOver = false;
  Paused = false; 

  // Démarrer le chronomètre
  gameTime = Date.now();
  timeSecond = 0;

  if(gameInterval) clearInterval(gameInterval);
  if(intervalTime) clearInterval(intervalTime); // Nettoyer l'ancien timer
  
  draw(); 

  gameInterval = setInterval(draw, gameSpeed);
  intervalTime = setInterval(updateTime, 1000); // Mise à jour toutes les 1000ms (1s)
}

// NOUVELLE FONCTION: Affiche le message PAUSE
function drawPause() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
}

// FONCTION MODIFIÉE: Affiche le message Game Over avec le temps final
function drawGameOver() {
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
    
    ctx.font = "20px Arial";
    ctx.fillText("Score final : " + score, canvas.width / 2, canvas.height / 2 + 50);
    // Affichage du temps final
    ctx.fillText("Temps écoulé : " + timeSecond + " s", canvas.width / 2, canvas.height / 2 + 80); 
}

// FONCTION MODIFIÉE: Boucle de jeu principale
function draw() {
  // A compléter

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. GESTION DE LA PAUSE : Si le jeu est en pause, on affiche le message et on sort.
  if (Paused) {
      drawSnake(ctx, snake, box); 
      drawFood(ctx, food, box);
      drawScore(ctx, score, timeSecond); // Doit passer le temps
      drawPause(); 
      return; 
  }  

  // 2. DESSIN DE L'ÉTAT ACTUEL (avant le mouvement)
  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box);
  drawScore(ctx, score, timeSecond); // Doit passer le temps

  // 3. CALCUL DE LA NOUVELLE TÊTE
  let head = moveSnake(snake, direction, box);

  // 4. VÉRIFICATION DE LA COLLISION (Game Over)
  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box)) {
    clearInterval(gameInterval);
    clearInterval(intervalTime); // Arrêter le chronomètre
    gameOver = true; 
  }
  
  // 5. GESTION DE LA FIN DU JEU : Si collision, on affiche le message et on sort.
  if (gameOver) {
    drawGameOver(); 
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