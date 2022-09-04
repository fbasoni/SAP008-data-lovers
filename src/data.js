export const mainFilters = {
  displayCharactersList, displayBooksList, displaySpellsList,
  filterCharactersByHouses, sortNames, calcPercentage
};

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

function sortNames(charactersList, sortValue) {
  if (sortValue === 'asc') {
    return charactersNamesFromAtoZ(charactersList);
  } else if (sortValue === 'desc') {
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