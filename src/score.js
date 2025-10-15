export { drawScore };
/**
 * Dessine le score et le temps écoulé sur le canvas.
 *
 * Cette fonction affiche le score actuel du jeu dans le coin supérieur gauche du canvas.
 * Le temps est affiché dans le coin supérieur droit.
 *
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas utilisé pour dessiner.
 * @param {number} score - Le score à afficher, qui est un entier.
 * @param {number} timeSecond - Le temps écoulé en secondes.
*/
function drawScore(ctx, score, timeSecond) { // 👈 CORRECTION 1: Ajout de timeSecond
  // 1. Affichage du Score (en haut à gauche)
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  // CORRECTION 4: Retrait du \n et formatage standard
  ctx.fillText("Score : " + score, 10, 20); 

  // 2. Affichage du Temps (en haut à droite)
  // CORRECTION 3: Remplacement de **right** par "right"
  ctx.textAlign = "right"; 
  
  // CORRECTION 2: Remplacement de timeElapsed par timeSecond
  // Le temps est affiché 10px avant le bord droit
  ctx.fillText(timeSecond + " s", ctx.canvas.width - 10, 20); 
}