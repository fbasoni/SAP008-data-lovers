import { dataFunctions } from './data.js';
import data from './data/harrypotter/data.js';

const dataBaseCharacters = data.characters;
const dataBaseBooks = data.books;
const dataBaseSpells = data.spells;

const welcomeSection = document.getElementById('welcome-section');
const listModal = document.getElementById('list-modal');
const listResult = document.getElementById('lists-content');
const listModalHeader = document.getElementById('modal-header');
const cardModal = document.getElementById('card-modal');
const percentageResult = document.getElementById('characters-percentage');
const houseBtnsDiv = document.getElementById('house-btns-div');
const sortInputTwo = document.getElementById('sort-two');
const sortInputOne = document.getElementById('sort');
const housesInfo = document.getElementById('house-btn-info');
const searchCharacters = document.getElementById('search-characters');
const searchSpells = document.getElementById('search-spells');
const returnToCharactersList = document.getElementById('return-btn-one');
const returnToBooksList = document.getElementById('return-btn-two');
const returnToSpellsList = document.getElementById('return-btn-three');


let objectsNames;

function hideModals() {
    welcomeSection.style.display = 'none';
    listModal.style.display = 'none';
    cardModal.style.display = 'none';
    sortInputOne.style.display = 'none';
    sortInputTwo.style.display = 'none';
    houseBtnsDiv.style.display = 'none';
    housesInfo.style.display = 'none';
    percentageResult.style.display = 'none';
    searchCharacters.style.display = 'none';
    searchSpells.style.display = 'none';
    returnToCharactersList.style.display = 'none';
    returnToBooksList.style.display = 'none';
    returnToSpellsList.style.display = 'none';
}

function formatList(listedObjects) {
    const ul = document.createElement('ul');
    return ul.innerText = listedObjects.map((object) => `<li class="list-elements">${object}</li>`).join('');
}

function displayCharactersList() {
    objectsNames = dataFunctions.createLists(dataBaseCharacters, 'name');
    hideModals();
    listModal.style.display = 'block';
    sortInputOne.style.display = 'block';
    houseBtnsDiv.style.display = 'block';
    housesInfo.style.display = 'block';
    searchCharacters.style.display = 'block';
    percentageResult.style.display = 'block';
    return listResult.innerHTML = formatList(objectsNames);
}
function displayBooksList(){
    const booksTitles = dataFunctions.createLists(dataBaseBooks, 'title');
    hideModals();
    listModal.style.display = 'block';
    return listResult.innerHTML = formatList(booksTitles);
}
function displaySpellsList(){
    const spellsNames = dataFunctions.createLists(dataBaseSpells, 'name');
    hideModals();
    listModal.style.display = 'block';
    sortInputTwo.style.display = 'block';
    searchSpells.style.display = 'block';
    return listResult.innerHTML = formatList(spellsNames);
}

const menuBtns = Array.from(document.getElementsByClassName('menu-btns'));
menuBtns.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.characters === 'characters'){
        displayCharactersList()
        listModalHeader.innerText = 'Characters List';
    } else if (button.dataset.books === 'books'){
        displayBooksList(); 
        listModalHeader.innerText = 'Books list';
    } else if (button.dataset.spells === 'spells'){
        displaySpellsList(); 
        listModalHeader.innerText = 'Spells list';
    }
}));

const sortInputs = Array.from(document.getElementsByClassName('sort'));
sortInputs.forEach(input => input.addEventListener('change', () => {
    const sortInputOneValue = sortInputOne.value;
    const sortInputTwoValue = sortInputTwo.value;
    if (input.dataset.sort === 'characters'){
        objectsNames = dataFunctions.sortLists(dataBaseCharacters, 'name', sortInputOneValue);
        displayCharactersList();
    } else if (input.dataset.sort === 'spells'){
        objectsNames = dataFunctions.sortLists(dataBaseSpells, 'name', sortInputTwoValue);
        displaySpellsList();
    } 
}));

function displayCharactersByHouse(house) {
    objectsNames = dataFunctions.filterCharactersByHouses(dataBaseCharacters, house);
    let charactersPercentage = dataFunctions.calcPercentage(objectsNames.length, dataBaseCharacters.length);
    percentageResult.innerHTML = `The characters in <em class="house-name">${house}</em> represent ${charactersPercentage}% of all characters in the books`
    hideModals();
    listModal.style.display = 'block';
    sortInputOne.style.display = 'block';
    houseBtnsDiv.style.display = 'block';
    housesInfo.style.display = 'block';
    searchCharacters.style.display = 'block';
    percentageResult.style.display = 'block';
    return listResult.innerHTML = formatList(objectsNames);
}

const houseBtns = Array.from(document.getElementsByClassName('house-btn'));
houseBtns.forEach(button => button.addEventListener('click', () => {
    const houseGryffindor = 'Gryffindor';
    const houseSlytherin = 'Slytherin';
    const houseHufflepuff = 'Hufflepuff';
    const houseRavenclaw = 'Ravenclaw';
    if (button.dataset.house === 'Gryffindor'){
        displayCharactersByHouse(houseGryffindor);
        listModalHeader.innerText = 'Characters from house Gryffindor';
    } else if (button.dataset.house === 'Slytherin'){
        displayCharactersByHouse(houseSlytherin); 
        listModalHeader.innerText = 'Characters from house Slytherin';
    } else if (button.dataset.house === 'Hufflepuff'){
        displayCharactersByHouse(houseHufflepuff);
        listModalHeader.innerText = 'Characters from house Hufflepuff';
    } else if (button.dataset.house === 'Ravenclaw'){
        displayCharactersByHouse(houseRavenclaw);
        listModalHeader.innerText = 'Characters from house Ravenclaw';
    }
}));

function displayCharacterCard(listedCharacter) {
    hideModals();
    cardModal.style.display = 'block';
    returnToCharactersList.style.display = 'block';
    const cardContent = document.getElementById('card-content');
    const cardTitle = document.getElementById('card-title');
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
const charactersListItems = Array.from(document.getElementsByClassName('lists-content')); 
charactersListItems.forEach((characterName) => characterName.addEventListener('click', displayCharacterCard));

function displayBookCard(listedBook) {
    hideModals();
    cardModal.style.display = 'block';
    returnToBooksList.style.display = 'block';
    const cardContent = document.getElementById('card-content');
    const cardTitle = document.getElementById('card-title');
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
const booksListItems = Array.from(document.getElementsByClassName('lists-content')); 
booksListItems.forEach((bookTitle) => bookTitle.addEventListener('click', displayBookCard));

function displaySpellCard(listedSpell) {
    hideModals();
    cardModal.style.display = 'block';
    returnToSpellsList.style.display = 'block';
    const cardContent = document.getElementById('card-content');
    const cardTitle = document.getElementById('card-title');
    const clickedSpell = listedSpell.target.innerText;
    const filterSpells = dataBaseSpells.filter((spell) => spell.name === clickedSpell);
       
    return filterSpells.map((spell) => {
        const objectProperty = Object.keys(spell);
        objectProperty.forEach(property => {
            if (spell[property] === null) spell[property] = 'Unknown'});
        cardTitle.innerHTML = `${spell.name}`
        cardContent.innerHTML = `
            <li class="card-line"><em class="card-content-heading">Pronunciation:</em> ${spell.pronunciation};</li>
            <li class="card-line"><em class="card-content-heading">Type:</em> ${spell.spell_type};</li>
            <li class="card-line"><em class="card-content-heading">Description:</em> ${spell.description};</li>
            <li class="card-line"><em class="card-content-heading">Mention:</em> ${spell.mention}.</li>` 
    }); 
}
const spellsListItems = Array.from(document.getElementsByClassName('lists-content')); 
spellsListItems.forEach(spellName => spellName.addEventListener('click', displaySpellCard));

// const returnBtns = Array.from(document.getElementsByClassName('return-btn'));
// returnBtns.forEach(button => button.addEventListener('click', () => {
//     if (button.dataset.return === 'characters'){
//         displayCharactersList();
//     } else if (button.dataset.return === 'books'){
//         displayBooksList();
//     } else if (button.dataset.return === 'spells'){
//         displaySpellsList(); 
//     }
// }));

const returnToPageLogo = document.getElementById('page-logo');
returnToPageLogo.addEventListener('click', () => {
    hideModals();
    welcomeSection.style.display = 'block';
});

function displaySearchedCharacter(event){
    const searchedCharacters = dataFunctions.searchListedObject(dataBaseCharacters, 'name', event.target.value);
    return listResult.innerHTML = formatList(searchedCharacters);
}
searchCharacters.addEventListener('keyup', displaySearchedCharacter);

function displaySearchedSpell(event){
    const searchedSpell = dataFunctions.searchListedObject(dataBaseSpells, 'name', event.target.value);
    return listResult.innerHTML = formatList(searchedSpell);
}
searchSpells.addEventListener('keyup', displaySearchedSpell);