export const dataFunctions = {createLists, filterCharactersByHouses, sortLists, calcPercentage, searchListedObject};

function createLists(objects, key) {
  return objects.map((object) => object[key]);
}

function filterCharactersByHouses(characters, key, houseBtn) {
  const filteredCharacters = characters.filter((character) => {
    if (character[key] === houseBtn && character[key] !== null) {
      return true;
    } 
  })
  return filteredCharacters.map((character) => character.name);
}

function sortLists(objects, key, inputValue){
  const sortAtoZ = objects.sort((a, b) => {
    if(a[key] > b[key]) {
      return 1;
    } else if (a[key] < b[key]) {
      return -1;
    } 
  });
  if(inputValue == 'asc') {
    return sortAtoZ
  } else if (inputValue == 'desc') {
    return sortAtoZ.reverse();
  }
}

function calcPercentage(filteredCharactersLength, allCharactersLength) {
  return Math.round((filteredCharactersLength * 100) / allCharactersLength);
}

function searchListedObject (objects, key, eventTarget) {
  const filterObjects = objects.filter((object) => object[key].toLowerCase().includes(eventTarget.toLowerCase()))
  return filterObjects.map((object) => object[key]);
}
