/**
 * ETML
 * Auteur : Jessica Grisales
 * Date : 26.10.2025
 * Description : Module qui gère le score du jeu
 */
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

/**
 * Fonction qui dessine et donne forme au score. 
 */
function drawScore(ctx, score, timeSecond) { 
  // Affichage du Score (en haut à gauche)
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Score : " + score, 10, 20); 

  // Affichage du Temps (en haut à droite)
  ctx.textAlign = "right"; 
  ctx.fillText(timeSecond + " s", ctx.canvas.width - 10, 20); 
}