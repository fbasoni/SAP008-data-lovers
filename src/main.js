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

function formatList(arrayElements) {
    return arrayElements.map(elementName => `<ul><li class="list-elements">${elementName}</li></ul>`).join('');
}

function displayCharactersList() {
    const sortValue = document.getElementById('sort').value;
    charactersNames = mainFilters.displayCharactersList(dataBaseCharacters);
    mainFilters.sortNames(charactersNames, sortValue);
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
    charactersNames = mainFilters.sortNames(charactersNames, sortValue)
    return charactersResult.innerHTML = formatList(charactersNames);
});

function displayCharactersByHouse(house) {
    charactersNames = mainFilters.filterCharactersByHouses(dataBaseCharacters, house);
    const sortValue = document.getElementById('sort').value;
    charactersNames = mainFilters.sortNames(charactersNames, sortValue);
    let percentageOfCharsByHouse = mainFilters.calcPercentage(charactersNames.length, dataBaseCharacters.length);
    document.getElementById('characters-percentage').innerHTML = `The characters in <em class="house-name">${house}</em> represent ${percentageOfCharsByHouse}% of all characters in the Harry Potter Books`
    hideModals();
    charactersList.style.display = 'block';
    percentageResult.style.display = 'block';
    return charactersResult.innerHTML = formatList(charactersNames);
}

const btnGryffindor = document.getElementById('btn-gryffindor')
btnGryffindor.addEventListener('click',
    function displayGryffindorCharacters() {
        const house = 'Gryffindor';
        charactersListHeader.innerText = 'Characters from house Gryffindor';
        displayCharactersByHouse(house);
    })

const btnSlytherin = document.getElementById('btn-slytherin')
btnSlytherin.addEventListener('click',
    function displaySlytherinCharacters() {
        const house = 'Slytherin';
        charactersListHeader.innerText = 'Characters from house Slytherin';
        displayCharactersByHouse(house);
    })

const btnHufflepuff = document.getElementById('btn-hufflepuff')
btnHufflepuff.addEventListener('click',
    function displayHufflePuffCharacters() {
        const house = 'Hufflepuff';
        charactersListHeader.innerText = 'Characters from house Hufflepuff';
        displayCharactersByHouse(house);
    })

const btnRavenclaw = document.getElementById('btn-ravenclaw')
btnRavenclaw.addEventListener('click',
    function displayRavenclawCharacters() {
        const house = 'Ravenclaw';
        charactersListHeader.innerText = 'Characters from house Ravenclaw';
        displayCharactersByHouse(house);
    })

const btnBooks = document.getElementById('btn-books');
btnBooks.addEventListener('click',
    function displayBooksList() {
        const bookTitles = mainFilters.displayBooksList(dataBaseBooks);
        hideModals();
        booksList.style.display = 'block';
        return booksResult.innerHTML = formatList(bookTitles);
    })

const btnSpells = document.getElementById('btn-spells');
btnSpells.addEventListener('click',
    function displaySpellsList() {
        const spellsNames = mainFilters.displaySpellsList(dataBaseSpells);
        hideModals()
        spellsList.style.display = 'block';
        return spellsResult.innerHTML = formatList(spellsNames);
    })

function displayCharacterCard(listedCharacter) {
    charactersList.style.display = 'none';
    characterCard.style.display = 'block';
    const cardContent = document.getElementById('card-content-characters');
    const cardTitle = document.getElementById('card-title-characters');
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
    
const charactersListItens = Array.from(document.getElementsByClassName('modal-characters-content')); 
charactersListItens.forEach(characterName => {
    characterName.addEventListener('click', displayCharacterCard);
});

function displayBookCard(listedBook) {
    booksList.style.display = 'none';
    bookCard.style.display = 'block';
    const cardContent = document.getElementById('card-content-books');
    const cardTitle = document.getElementById('card-title-books');
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
    
const booksListItens = Array.from(document.getElementsByClassName('modal-books-content')); 
booksListItens.forEach(bookTitle => {
    bookTitle.addEventListener('click', displayBookCard);
});

function displaySpellCard(listedSpell) {
    spellsList.style.display = 'none';
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

const spellsListItens = Array.from(document.getElementsByClassName('modal-spells-content')); 
spellsListItens.forEach(spellName => {
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