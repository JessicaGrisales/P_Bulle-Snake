/**
 * ETML
 * Auteur : Jessica Grisales
 * Date : 26.10.2025
 * Description : Partie principale où se rejoingnent toutes les autres fonctions
 *               des différents modules et les connecter entre eux. 
 */
import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Taille d'une case de la grille
const box = 20;
// Vitesse du jeu (intervalle en ms)
const gameSpeed = 200;
// Tableau représentant le serpent
let snake;
// Objet représentant la nourriture
let food;
// Direction initiale
let direction = "RIGHT";
// Score initial
let score = 0;
// Intervalle pour la boucle de jeu
let gameInterval; 
// varible d'état
let gameOver = false; 
// variable pour la pause
let Paused = false; 

// Variables du Chronomètre
// Début de la partie (pour calculer le temps écoulé)
let gameTime; 
// Temps écoulé en secondes
let timeSecond = 0; 
// Intervalle pour le chronomètre
let intervalTime; 

// ======================================
// GESTION DES TOUCHES
// ======================================

document.addEventListener("keydown", (event) => {
  // 32 est le code de la touche Espace
  if (event.keyCode === 32) { 
    // // Touche espace → pause/reprise
    pauseTouch(); 
  } else if (!Paused && !gameOver) {
    // Ne change la direction que si le jeu n'est ni en pause ni terminé
    direction = handleDirectionChange(event, direction);
  }
});

// ======================================
// FONCTIONS DU CHRONOMÈTRE
// ======================================

/**
 * Met à jour le temps écoulé depuis le début du jeu.
 * Ne s'exécute pas si le jeu est en pause ou terminé.
 */
function updateTime() {
  if (Paused || gameOver) return;
  
  // Calculer le temps écoulé depuis le début du jeu en secondes
  const now = Date.now();
  timeSecond = Math.floor((now - gameTime) / 1000); 
}

// ======================================
// FONCTION DE PAUSE / REPRISE
// ======================================

/**
 * Gère l'état de pause et de reprise du jeu.
 * - Suspend la boucle principale et le chronomètre si en pause.
 * - Reprend les intervalles si le jeu est relancé.
 */
function pauseTouch() {
  if (gameOver) return; 
  
  Paused = !Paused;
  
  if (Paused) {
     // Suspendre le mouvement et le chronomètre
    clearInterval(gameInterval);
    clearInterval(intervalTime); 
    // Afficher le message PAUSE
    draw(); 
  } else {
    // Reprendre le chronomètre en ajustant le temps de départ
    gameTime = Date.now() - (timeSecond * 1000); 
    // Relancer les intervalles du jeu et du chronomètre
    gameInterval = setInterval(draw, gameSpeed); 
    intervalTime = setInterval(updateTime, 1000);
  }
}


// ======================================
// INITIALISATION DU JEU
// ======================================

/**
 * Initialise le jeu :
 * - Crée le serpent et la nourriture.
 * - Réinitialise le score et les états.
 * - Démarre la boucle principale et le chronomètre.
 */
function startGame() {
  snake = initSnake(box); 
  food = generateFood(box, canvas); 
  score = 0; 
  gameOver = false;
  Paused = false; 

  // Démarrer le chronomètre
  gameTime = Date.now();
  timeSecond = 0;
  // Nettoyer d'éventuels intervalles précédents
  if(gameInterval) clearInterval(gameInterval);
  if(intervalTime) clearInterval(intervalTime);
  
  draw(); 

  gameInterval = setInterval(draw, gameSpeed);
  // Mise à jour toutes les 1000ms (1s)
  intervalTime = setInterval(updateTime, 1000); 
}

// ======================================
// AFFICHAGE DES MESSAGES
// ======================================

/**
 * Affiche le message PAUSE sur le canvas.
 */
function drawPause() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Affichage du un style 
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
}

/**
 * Affiche le message GAME OVER avec le score et le temps écoulé.
 */
function drawGameOver() {
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    // Affichage de Game Over
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
    
    ctx.font = "20px Arial";
    // Affichage du score final
    ctx.fillText("Score final : " + score, canvas.width / 2, canvas.height / 2 + 50);
    // Affichage du temps final
    ctx.fillText("Temps écoulé : " + timeSecond + " s", canvas.width / 2, canvas.height / 2 + 80); 
}

// ======================================
// BOUCLE PRINCIPALE DU JEU
// ======================================

/**
 * Boucle principale de dessin et de mise à jour du jeu.
 * - Gère la pause et le Game Over.
 * - Déplace le serpent.
 * - Vérifie les collisions.
 * - Gère la consommation de nourriture.
 * - Met à jour le tableau du serpent.
 */
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gestion de la pause : Si le jeu est en pause, on affiche le message et on sort.
  if (Paused) {
      drawSnake(ctx, snake, box); 
      drawFood(ctx, food, box);
      drawScore(ctx, score, timeSecond); // Doit passer le temps
      drawPause(); 
      return; 
  }  

  // Dessin de l'état actuel (avant le mouvement)
  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box);
  drawScore(ctx, score, timeSecond); // Doit passer le temps

  // Calcule de la nouvelle tête
  let head = moveSnake(snake, direction, box);

  // Vérification des collisions (Game Over)
  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box)) {
    clearInterval(gameInterval);
    // Arrêter le chronomètre
    clearInterval(intervalTime); 
    gameOver = true; 
  }
  
  // Gestion de la fin de jeu : Si collision, on affiche le message et on sort.
  if (gameOver) {
    drawGameOver(); 
    return; // Sortir de la fonction draw
  }
  
  // Gestion de la nourriture
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood(box, canvas);
  } else {
    snake.pop();
  }
  // Ajout de la nouvelle tête
  snake.unshift(head);
}

// ======================================
// DÉMARRAGE DU JEU
// ======================================
startGame(); 