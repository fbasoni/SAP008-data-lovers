import { dataFunctions } from '../src/data.js'
import { charactersData, booksData, spellsData, sortedData } from '../test/data.mock.js'

describe('dataFunctions', () => {
  it('should be an object', () => {
    expect(typeof dataFunctions).toBe('object');
  });

});

describe('dataFunctions.createLists', () => {

  it('should be a function', () => {
    expect(typeof dataFunctions.createLists).toBe('function');
  });

  it('should return 08 characters', () => {
    expect(dataFunctions.createLists(charactersData, 'name').length).toBe(8)
  });

  it('should return Bellatrix Lestrange', () => {
    expect(dataFunctions.createLists(charactersData, 'name').includes('Bellatrix Lestrange')).toBe(true)
  });

  it('should return 2 books', () => {
    expect(dataFunctions.createLists(booksData, 'name').length).toBe(2)
  });

  it('should return Harry Potter and the Prisoner of Azkaban', () => {
    expect(dataFunctions.createLists(booksData, 'title').includes('Harry Potter and the Prisoner of Azkaban')).toBe(true)
  });

  it('should return 2 spells', () => {
    expect(dataFunctions.createLists(spellsData, 'name').length).toBe(2)
  });

  it('should return Wingardium Leviosa', () => {
    expect(dataFunctions.createLists(spellsData, 'name').includes('Wingardium Leviosa')).toBe(true)
  });

});

describe('dataFunctions.filterCharactersByHouses', () => {
  it('should be a function', () => {
    expect(typeof dataFunctions.filterCharactersByHouses).toBe('function')
  });

  it('should return Albus Dumbledore, Sirius Black and Harry Potter from house Gryffindor', () => {
    const gryffindorCharacters = dataFunctions.filterCharactersByHouses(charactersData, 'house', 'Gryffindor')
    expect(gryffindorCharacters[0]).toEqual('Albus Dumbledore')
    expect(gryffindorCharacters[1]).toEqual('Sirius Black')
    expect(gryffindorCharacters[2]).toEqual('Harry Potter')
  });

  it('should return Severus Snape and Albus Potter from house Slytherin', () => {
    const slytherinCharacters = dataFunctions.filterCharactersByHouses(charactersData, 'house', 'Slytherin')
    expect(slytherinCharacters[0]).toEqual('Severus Snape')
    expect(slytherinCharacters[1]).toEqual('Albus Potter')
  });

  it('should return Luna Lovegood from house Ravenclaw', () => {
    const ravenclawCharacters = dataFunctions.filterCharactersByHouses(charactersData, 'house', 'Ravenclaw')
    expect(ravenclawCharacters[0]).toEqual('Luna Lovegood')
  });

  it('should return Cedric Diggory from house Hufflepuff', () => {
    const hufflepuffCharacters = dataFunctions.filterCharactersByHouses(charactersData, 'house', 'Hufflepuff')
    expect(hufflepuffCharacters[0]).toEqual('Cedric Diggory')
  });

  it('should return 03 characters from house Gryffindor', () => {
    const gryffindorCharacters = dataFunctions.filterCharactersByHouses(charactersData, 'house', 'Gryffindor')
    expect(gryffindorCharacters.length).toBe(3)
  });

  it('should return 02 characters from house Slytherin', () => {
    const slytherinCharacters = dataFunctions.filterCharactersByHouses(charactersData, 'house', 'Slytherin')
    expect(slytherinCharacters.length).toBe(2)
  });
});

describe('dataFunctions.sortLists', () => {
  it('should be a function', () => {
    expect(typeof dataFunctions.sortLists).toBe('function')
  });
  it('should return array sorted from A to Z', () => {
    expect(dataFunctions.sortLists(sortedData, 'name', 'asc')).toEqual([sortedData[0], sortedData[1], sortedData[2]])
  });
  it('should return array sorted from Z to A', () => {
    expect(dataFunctions.sortLists(sortedData, 'name', 'asc')).toEqual([sortedData[2], sortedData[1], sortedData[0]])
  });
});

describe('dataFunctions.calcPercentage', () => {
  it('should be a function', () => {
    expect(typeof dataFunctions.calcPercentage).toBe('function')
  });
  
  it ('should return 30%', () => {
    expect(dataFunctions.calcPercentage(30, 100)).toBe(30)
  });
});