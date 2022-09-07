export const dataFunctions = {createLists, filterCharactersByHouses, sortLists, calcPercentage, searchListedObject};

function createLists(objects, key) {
  return objects.map((object) => object[key]);
}

function filterCharactersByHouses(characters, houseToFilterBy) {
  const filteredCharacters = characters.filter((character) => {
    if (character.house === houseToFilterBy && character.house !== null) {
      return true;
    } else {
      return false;
    }
  })
  return filteredCharacters.map((character) => character.name);
}

function sortLists(objects, key, inputValue){
  if(inputValue == 'asc') {
    return objects.sort((a, b) => {
      if(a[key] > b[key]) {
        return 1;
      } else if (a[key] < b[key]) {
        return -1;
      } else {
        return 0;
      } 
    });
  }
  if (inputValue == 'desc') {
    return objects.sort((a, b) => {
      if(a[key] < b[key]){
        return 1;
      } else if (a[key] > b[key]) {
        return -1;
      } else {
        return 0;
      } 
    });
  }
  
}

function calcPercentage(filteredCharactersLength, allCharactersLength) {
  return Math.round((filteredCharactersLength * 100) / allCharactersLength);
}

function searchListedObject (objects, key, eventTarget) {
  const filterObjects = objects.filter((object) => object[key].toLowerCase().includes(eventTarget.toLowerCase()))
  return filterObjects.map((object) => object[key]);
}
