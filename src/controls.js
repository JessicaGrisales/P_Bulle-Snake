/**
 * ETML
 * Auteur : Jessica Grisales
 * Date : 26.10.2025
 * Description : Module qui permettra de changer le serpent de direction avec les touches directionnelles. 
 */
export { handleDirectionChange };
/**
 * Gère le changement de direction du serpent en fonction de l'entrée de l'utilisateur.
 *
 * Cette fonction est appelée chaque fois qu'une touche directionnelle est pressée.
 * Elle vérifie que la nouvelle direction n'est pas opposée à la direction actuelle
 * (pour éviter que le serpent se retourne sur lui-même) et retourne la nouvelle direction
 * si elle est valide.
 *
 * @param {KeyboardEvent} event - L'événement clavier qui contient les informations sur la touche pressée.
 * @param {string} currentDirection - La direction actuelle du serpent (peut être "UP", "DOWN", "LEFT", ou "RIGHT").
 * @returns {string} - La nouvelle direction du serpent après traitement, ou la direction actuelle si le changement n'est pas valide.
 */

/**
 * Fonction permettre de changer de direction.
 */
function handleDirectionChange(event, currentDirection) {
  // Vérifie quelle touche est pressée et si le serpent peut changer de direction
  let key = event.keyCode;
  if (key === 37 && currentDirection !== "RIGHT") return "LEFT";
  if (key === 38 && currentDirection !== "DOWN") return "UP";
  if (key === 39 && currentDirection !== "LEFT") return "RIGHT";
  if (key === 40 && currentDirection !== "UP") return "DOWN";
  // Aucun changement valide, retourne la direction actuelle
    return currentDirection; 

}