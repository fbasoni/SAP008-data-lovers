import { dataFunctions } from './data.js';
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
const percentageResult = document.getElementById('characters-percentage');

let charactersNames;

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

function formatList(listedObjects) {
    const ul = document.createElement('ul');
    return ul.innerText = listedObjects.map((object) => `<li class="list-elements">${object}</li>`).join('');
}

function displayCharactersList() {
    const sortValue = document.getElementById('sort').value;
    charactersNames = dataFunctions.displayCharactersList(dataBaseCharacters);
    dataFunctions.sortNames(charactersNames, sortValue);
    hideModals();
    charactersList.style.display = 'block';
    charactersListHeader.innerText = 'Characters list';
    return charactersResult.innerHTML = formatList(charactersNames);
}

const btnCharacters = document.getElementById('btn-characters');
btnCharacters.addEventListener('click', displayCharactersList);

const sortCharacters = document.getElementById('sort');
sortCharacters.addEventListener('change', () => {
    const sortValue = document.getElementById('sort').value;
    charactersNames = dataFunctions.sortNames(charactersNames, sortValue);
    return charactersResult.innerHTML = formatList(charactersNames);
});

function displayCharactersByHouse(house) {
    charactersNames = dataFunctions.filterCharactersByHouses(dataBaseCharacters, house);
    const sortValue = document.getElementById('sort').value;
    charactersNames = dataFunctions.sortNames(charactersNames, sortValue);
    let percentageOfCharsByHouse = dataFunctions.calcPercentage(charactersNames.length, dataBaseCharacters.length);
    percentageResult.innerHTML = `The characters in <em class="house-name">${house}</em> represent ${percentageOfCharsByHouse}% of all characters in the Harry Potter Books`
    hideModals();
    charactersList.style.display = 'block';
    percentageResult.style.display = 'block';
    return charactersResult.innerHTML = formatList(charactersNames);
}

const btnGryffindor = document.getElementById('btn-gryffindor');
btnGryffindor.addEventListener('click', () => {
    const house = 'Gryffindor';
    charactersListHeader.innerText = 'Characters from house Gryffindor';
    displayCharactersByHouse(house);
});

const btnSlytherin = document.getElementById('btn-slytherin')
btnSlytherin.addEventListener('click', () => {
    const house = 'Slytherin';
    charactersListHeader.innerText = 'Characters from house Slytherin';
    displayCharactersByHouse(house);
});

const btnHufflepuff = document.getElementById('btn-hufflepuff')
btnHufflepuff.addEventListener('click', () => {
    const house = 'Hufflepuff';
    charactersListHeader.innerText = 'Characters from house Hufflepuff';
    displayCharactersByHouse(house);
});

const btnRavenclaw = document.getElementById('btn-ravenclaw')
btnRavenclaw.addEventListener('click', () => {
    const house = 'Ravenclaw';
    charactersListHeader.innerText = 'Characters from house Ravenclaw';
    displayCharactersByHouse(house);
});

const btnBooks = document.getElementById('btn-books');
btnBooks.addEventListener('click', () => {
    const bookTitles = dataFunctions.displayBooksList(dataBaseBooks);
    hideModals();
    booksList.style.display = 'block';
    return booksResult.innerHTML = formatList(bookTitles);
});

const btnSpells = document.getElementById('btn-spells');
btnSpells.addEventListener('click', () => {
    const spellsNames = dataFunctions.displaySpellsList(dataBaseSpells);
    hideModals();
    spellsList.style.display = 'block';
    return spellsResult.innerHTML = formatList(spellsNames);
});

function displayCharacterCard(listedCharacter) {
    hideModals();
    characterCard.style.display = 'block';
    const cardContent = document.getElementById('card-content-characters');
    const cardTitle = document.getElementById('card-title-characters');
    const clickedName = listedCharacter.target.innerText;
    const filterCharacters = dataBaseCharacters.filter((character) => character.name === clickedName);
           
    return filterCharacters.map((character) => {
        const objectProperty = Object.keys(character);
        objectProperty.forEach(property => {
            if (character[property] === null) character[property] = 'Unknown'});
        cardTitle.innerHTML = `${character.name}`
        cardContent.innerHTML = `
            <li class="card-line"><em class="card-content-heading">Birth:</em> ${character.birth};</li>
            <li class="card-line"><em class="card-content-heading">Death:</em> ${character.death};</li>
            <li class="card-line"><em class="card-content-heading">Species:</em> ${character.species};</li>
            <li class="card-line"><em class="card-content-heading">Ancestry:</em> ${character.ancestry};</li>
            <li class="card-line"><em class="card-content-heading">Gender:</em> ${character.gender};</li>
            <li class="card-line"><em class="card-content-heading">Hair color:</em> ${character.hair_color};</li>
            <li class="card-line"><em class="card-content-heading">Eye color:</em> ${character.eye_color};</li>
            <li class="card-line"><em class="card-content-heading">Patronus:</em> ${character.patronus};</li>
            <li class="card-line"><em class="card-content-heading">House:</em> ${character.house};</li>
            <li class="card-line"><em class="card-content-heading">Books featured in:</em> ${character.books_featured_in}.</li>` 
    }) 
}
    
const charactersListItems = Array.from(document.getElementsByClassName('modal-characters-content')); 
charactersListItems.forEach((characterName) => characterName.addEventListener('click', displayCharacterCard));

function displayBookCard(listedBook) {
    hideModals();
    bookCard.style.display = 'block';
    const cardContent = document.getElementById('card-content-books');
    const cardTitle = document.getElementById('card-title-books');
    const clickedTitle = listedBook.target.innerText;
    const filterBooks = dataBaseBooks.filter((book) => book.title === clickedTitle);
       
    return filterBooks.map((book) => {
        const objectProperty = Object.keys(book);
        objectProperty.forEach(property => {
            if (book[property] === null) book[property] = 'Unknown'});
        cardTitle.innerHTML = `${book.title}`
        cardContent.innerHTML = `
            <li class="card-line"><em class="card-content-heading">Release Date:</em> ${book.releaseDay};</li>
            <li class="card-line"><em class="card-content-heading">Author:</em> ${book.author};</li>
            <li class="card-line"><em class="card-content-heading">Description:</em> ${book.description}.</li>` 
    }); 
}
    
const booksListItems = Array.from(document.getElementsByClassName('modal-books-content')); 
booksListItems.forEach((bookTitle) => bookTitle.addEventListener('click', displayBookCard));

function displaySpellCard(listedSpell) {
    spellsList.style.display = 'none';
    spellCard.style.display = 'block';
    const cardContent = document.getElementById('card-content-spells')
    const cardTitle = document.getElementById('card-title-spells')
    const clickedSpell = listedSpell.target.innerText;
    const filterSpells = dataBaseSpells.filter((spell) => spell.name === clickedSpell);
       
    return filterSpells.map((spell) => {
        const objectProperty = Object.keys(spell);
        objectProperty.forEach(property => {
            if (spell[property] === null) spell[property] = 'Unknown'});
        cardTitle.innerHTML = `${spell.name}`
        cardContent.innerHTML = 
            `
            <li class="card-line"><em class="card-content-heading">Pronunciation:</em> ${spell.pronunciation};</li>
            <li class="card-line"><em class="card-content-heading">Type:</em> ${spell.spell_type};</li>
            <li class="card-line"><em class="card-content-heading">Description:</em> ${spell.description};</li>
            <li class="card-line"><em class="card-content-heading">Mention:</em> ${spell.mention}.</li>
            ` 
    }); 
}

const spellsListItems = Array.from(document.getElementsByClassName('modal-spells-content')); 
spellsListItems.forEach(spellName => spellName.addEventListener('click', displaySpellCard));

const returnToCharactersList = document.getElementById('return-btn-characters');
returnToCharactersList.addEventListener('click', () => {
    hideModals();
    charactersList.style.display = 'block';
});

const returnToBooksList = document.getElementById('return-btn-books');
returnToBooksList.addEventListener('click', () => {
    hideModals();
    booksList.style.display = 'block';
});

const returnToSpellsList = document.getElementById('return-btn-spells');
returnToSpellsList.addEventListener('click', () => {
    hideModals();
    spellsList.style.display = 'block';
});

const returnToPageLogo = document.getElementById('page-logo');
returnToPageLogo.addEventListener('click', () => {
    hideModals();
    welcomeSection.style.display = 'block';
});