export const mainFilters = {
  displayCharactersList, displayBooksList, displaySpellsList,
  filterCharactersByHouses, sortBy, calcPercentage
};

function charactersFromAtoZ(charactersNames) {
  return charactersNames.sort();
}

function charactersFromZtoA(charactersNames) {
  return charactersNames.sort().reverse();
}

function displayCharactersList(names) {
  let characters = names.map((characters) => characters.name);
  return characters;
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
    }
  })
  return filteredCharacters.map((character) => character.name)
}

function sortBy(arrObjects, sortByParam) {
  if (sortByParam == 'asc') {
    arrObjects = charactersFromAtoZ(arrObjects);
  }
  else if (sortByParam == 'desc') {
    arrObjects = charactersFromZtoA(arrObjects);
  }
  return arrObjects
}

function calcPercentage(lengthFilteredCharacters, lengthAllCharacters) {
  if (lengthFilteredCharacters < 0) {
    throw TypeError("Can't receive a negative number");
  }
  if (lengthAllCharacters == 0) {
    throw TypeError("Can't divide by zero");
  }
  return Math.round((lengthFilteredCharacters * 100) / lengthAllCharacters);
}