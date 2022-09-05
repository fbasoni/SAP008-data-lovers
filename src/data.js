export const dataFunctions = {
  displayCharactersList, displayBooksList, displaySpellsList,
  filterCharactersByHouses, sortNames, calcPercentage, createLists
};

function createLists(obj, characters, books, spells){
  if (obj === characters){
    return characters.map(character => character.name);
  } else if (obj === books){
    return books.map(book => book.title);
  } else if (obj === spells){
    return spells.map(spell => spell.name);
  }
}

function displayCharactersList(characters) {
  return characters.map((character) => character.name);
}

function displayBooksList(books) {
  return books.map((book) => book.title);
}

function displaySpellsList(spells) {
  return spells.map((spell) => spell.name);
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

function sortNames(charactersList, sortValue) {
  if (sortValue == 'asc') {
    return charactersNamesFromAtoZ(charactersList);
  } else if (sortValue == 'desc') {
    return charactersNamesFromZtoA(charactersList);
  } 
}

function charactersNamesFromAtoZ(names) {
  return names.sort();
}

function charactersNamesFromZtoA(names) {
  return names.sort().reverse();
}

function calcPercentage(filteredCharactersLength, allCharactersLength) {
  return Math.round((filteredCharactersLength * 100) / allCharactersLength);
}
