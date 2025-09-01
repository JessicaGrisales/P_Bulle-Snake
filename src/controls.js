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
function handleDirectionChange(event) {
  // A compléter

  //document.addEventListener("keydown", direction)

  let Key = event.keyCode;
  if(key == 37 && direction != "RIGHT"){
    direction = "LEFT";

  } else if (key == 38 && direction != "DOWN"){
    direction = "UP";

  } else if (key == 39 && direction != "LEFT"){
    direction = "RIGHT";

  } else if (key == 40 && direction != "UP"){
    direction = "DOWN";
  }

}