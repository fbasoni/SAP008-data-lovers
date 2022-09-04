import { mainFilters } from './data.js';
import data from './data/harrypotter/data.js';

const dataBaseCharacters = data.characters;
const dataBaseBooks = data.books;
const dataBaseSpells = data.spells;

const welcomeSection = document.getElementById('welcome-section');
const charactersList = document.getElementById('characters-list');
const booksList = document.getElementById('books-list');
const spellsList = document.getElementById('spells-list');
const charactersResult = document.getElementById('characters-content');
const booksResult = document.getElementById('books-content');
const spellsResult = document.getElementById('spells-content');
const charactersListHeader = document.getElementById('header-modal-characters');
const characterCard = document.getElementById('card-info-characters');
const bookCard = document.getElementById('card-info-books');
const spellCard = document.getElementById('card-info-spells');
const sortValue = document.getElementById('sort');
const percentageResult = document.getElementById('characters-percentage');
const selectValue = sortValue.value;
const charactersNames = mainFilters.displayCharactersList(dataBaseCharacters);

function hideModals() {
    welcomeSection.style.display = 'none';
    booksList.style.display = 'none';
    spellsList.style.display = 'none';
    charactersList.style.display = 'none';
    characterCard.style.display = 'none';
    bookCard.style.display = 'none';
    spellCard.style.display = 'none';
    percentageResult.style.display = 'none';
}

function formatList(arrElementsProperties) {
    return arrElementsProperties.map(elemProperty => `<ul><li class="list-elements">${elemProperty}</li></ul>`).join('');
}

const btnCharacters = document.getElementById('btn-characters');
btnCharacters.addEventListener('click', () => {
    hideModals();
    charactersList.style.display = 'block';
    mainFilters.sortNames(charactersNames, selectValue);
    charactersListHeader.innerText = 'Characters list';
    return charactersResult.innerHTML = formatList(charactersNames);
});

sortValue.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const sortedList = mainFilters.sortNames(charactersNames, selectedValue)
    return charactersResult.innerHTML = formatList(sortedList);
});

function displayCharactersByHouses(house) {
    const charactersByHouses = mainFilters.filterCharactersByHouses(dataBaseCharacters, house);
    mainFilters.sortNames(charactersNames, selectValue);
    let charactersByHousePercentage = mainFilters.calcPercentage(charactersByHouses.length, dataBaseCharacters.length);
    percentageResult.innerHTML = `The characters in <em class="house-name">${house}</em> represent ${charactersByHousePercentage}% of all characters in the Harry Potter Books`
    hideModals();
    charactersList.style.display = 'block';
    percentageResult.style.display = 'block';
    return charactersResult.innerHTML = formatList(charactersByHouses);
}

const btnGryffindor = document.getElementById('btn-gryffindor')
btnGryffindor.addEventListener('click', () => {
    const house = 'Gryffindor';
    charactersListHeader.innerText = 'Characters from house Gryffindor';
    displayCharactersByHouses(house);
});

const btnSlytherin = document.getElementById('btn-slytherin')
btnSlytherin.addEventListener('click', () => {
    const house = 'Slytherin';
    charactersListHeader.innerText = 'Characters from house Slytherin';
    displayCharactersByHouses(house);
});

const btnHufflepuff = document.getElementById('btn-hufflepuff')
btnHufflepuff.addEventListener('click', () => {
    const house = 'Hufflepuff';
    charactersListHeader.innerText = 'Characters from house Hufflepuff';
    displayCharactersByHouses(house);
});

const btnRavenclaw = document.getElementById('btn-ravenclaw')
btnRavenclaw.addEventListener('click', () => {
    const house = 'Ravenclaw';
    charactersListHeader.innerText = 'Characters from house Ravenclaw';
    displayCharactersByHouses(house);
});

const btnBooks = document.getElementById('btn-books');
btnBooks.addEventListener('click', () => { 
    const bookTitles = mainFilters.displayBooksList(dataBaseBooks);
    hideModals();
    booksList.style.display = 'block';
    return booksResult.innerHTML = formatList(bookTitles);
});

const btnSpells = document.getElementById('btn-spells');
btnSpells.addEventListener('click', () => {
    const spellsNames = mainFilters.displaySpellsList(dataBaseSpells);
    hideModals()
    spellsList.style.display = 'block';
    return spellsResult.innerHTML = formatList(spellsNames);
});

function displayCharacterCard(listedCharacter) {
    hideModals();
    characterCard.style.display = 'block';
    const cardTitle = document.getElementById('card-title-characters');
    const cardContent = document.getElementById('card-content-characters');
    const clickedName = listedCharacter.target.innerText;
    const filterCharacters = dataBaseCharacters.filter((character) => character.name === clickedName);
           
    return filterCharacters.map((character) => {
        if (character.birth === null) character.birth = 'Unknown'
        if (character.death === null) character.death = 'Unknown'
        if (character.species === null) character.species = 'Unknown'
        if (character.ancestry === null) character.ancestry = 'Unknown'
        if (character.gender === null) character.gender = 'Unknown'
        if (character.hair_color === null) character.hair_color = 'Unknown'
        if (character.eye_color === null) character.eye_color = 'Unknown'
        if (character.patronus === null) character.patronus = 'Unknown'
        if (character.house === null) character.house = 'Unknown'
        if (character.books_featured_in === null) character.books_featured_in = 'Unknown'

        cardTitle.innerHTML = `${character.name}`
        cardContent.innerHTML = 
            `
            <li class="card-line"><em class="card-content-heading">Birth:</em> ${character.birth}</li>
            <li class="card-line"><em class="card-content-heading">Death:</em> ${character.death}</li>
            <li class="card-line"><em class="card-content-heading">Species:</em> ${character.species}</li>
            <li class="card-line"><em class="card-content-heading">Ancestry:</em> ${character.ancestry}</li>
            <li class="card-line"><em class="card-content-heading">Gender:</em> ${character.gender}</li>
            <li class="card-line"><em class="card-content-heading">Hair color:</em> ${character.hair_color}</li>
            <li class="card-line"><em class="card-content-heading">Eye color:</em> ${character.eye_color}</li>
            <li class="card-line"><em class="card-content-heading">Patronus:</em> ${character.patronus}</li>
            <li class="card-line"><em class="card-content-heading">House:</em> ${character.house}</li>
            <li class="card-line"><em class="card-content-heading">Books featured in:</em> ${character.books_featured_in}</li>
            ` 
    }) 
}
    
const charactersListContent = Array.from(document.getElementsByClassName('modal-characters-content')); 
charactersListContent.forEach(characterName => {
    characterName.addEventListener('click', displayCharacterCard);
});

function displayBookCard(listedBook) {
    hideModals();
    bookCard.style.display = 'block';
    const cardTitle = document.getElementById('card-title-books');
    const cardContent = document.getElementById('card-content-books');
    const clickedTitle = listedBook.target.innerText;
    const filterBooks = dataBaseBooks.filter((book) => book.title === clickedTitle);
       
    return filterBooks.map((book) => {
        if (book.releaseDay === null) book.releaseDay = 'Unknown'
        if (book.author === null) book.author = 'Unknown'
        if (book.description === null) book.description = 'Unknown'
        cardTitle.innerHTML = `${book.title}`
        cardContent.innerHTML = 
            `
            <li class="card-line"><em class="card-content-heading">Release Date:</em> ${book.releaseDay}</li>
            <li class="card-line"><em class="card-content-heading">Author:</em> ${book.author}</li>
            <li class="card-line"><em class="card-content-heading">Description:</em> ${book.description}</li>
            ` 
    }); 
}
    
const booksListContent = Array.from(document.getElementsByClassName('modal-books-content')); 
booksListContent.forEach(bookTitle => {
    bookTitle.addEventListener('click', displayBookCard);
});

function displaySpellCard(listedSpell) {
    hideModals()
    spellCard.style.display = 'block';
    const cardContent = document.getElementById('card-content-spells')
    const cardTitle = document.getElementById('card-title-spells')
    const clickedSpell = listedSpell.target.innerText;
    const filterSpells = dataBaseSpells.filter((spell) => spell.name === clickedSpell);
       
    return filterSpells.map((spell) => {
        if (spell.pronunciation === null) spell.pronunciation = 'Unknown'
        if (spell.spell_type === null) spell.spell_type = 'Unknown'
        if (spell.description === null) spell.description = 'Unknown'
        if (spell.mention === null) spell.mention = 'Unknown'
        cardTitle.innerHTML = `${spell.name}`
        cardContent.innerHTML = 
            `
            <li class="card-line"><em class="card-content-heading">Pronunciation:</em> ${spell.pronunciation}</li>
            <li class="card-line"><em class="card-content-heading">Type:</em> ${spell.spell_type}</li>
            <li class="card-line"><em class="card-content-heading">Description:</em> ${spell.description}</li>
            <li class="card-line"><em class="card-content-heading">Mention:</em> ${spell.mention}</li>
            ` 
    }); 
}

const spellsListContent = Array.from(document.getElementsByClassName('modal-spells-content')); 
spellsListContent.forEach(spellName => {
    spellName.addEventListener('click', displaySpellCard);
});

const returnToCharactersList = document.getElementById('return-btn-characters');
returnToCharactersList.addEventListener('click', 
function returnButtonCharacter(){
    hideModals()
    charactersList.style.display = 'block';
});

const returnToBooksList = document.getElementById('return-btn-books');
returnToBooksList.addEventListener('click', 
function returnButtonBook(){
    hideModals()
    booksList.style.display = 'block';
});

const returnToSpellsList = document.getElementById('return-btn-spells');
returnToSpellsList.addEventListener('click', 
function returnButtonSpell(){
    hideModals()
    spellsList.style.display = 'block';
});

const pageLogo = document.getElementById('page-logo');
pageLogo.addEventListener('click',
function returnToHomepage(){
    hideModals()
    welcomeSection.style.display = 'block';
});