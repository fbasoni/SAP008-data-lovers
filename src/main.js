import { mainFilters } from './data.js';
import data from './data/harrypotter/data.js';

const dataBaseCharacters = data.characters;
const dataBaseBooks = data.books;
const dataBaseSpells = data.spells;
let charactersNames;


function hideModals() {
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('books-list').style.display = 'none';
    document.getElementById('spells-list').style.display = 'none';
    document.getElementById('characters-list').style.display = 'none';
    document.getElementById('card-info-characters').style.display = 'none';
    document.getElementById('card-info-books').style.display = 'none';
    document.getElementById('card-info-spells').style.display = 'none';
}

function formatList(arrayObjects) {
    return arrayObjects.map(names => `<ul><li class="list-elements">${names}</li></ul>`).join('');
}

function displayCharactersList() {
    const sortBy = document.getElementById('sort').value;
    charactersNames = mainFilters.displayCharactersList(dataBaseCharacters);
    charactersNames = mainFilters.sortBy(charactersNames, sortBy);
    hideModals();
    document.getElementById('characters-list').style.display = 'block';
    document.getElementById('header-modal-characters').innerText = 'Characters list';
    const charactersResult = document.getElementById('characters-content');
    return charactersResult.innerHTML = formatList(charactersNames);
}

const btnCharacters = document.getElementById('btn-characters');
btnCharacters.addEventListener('click', displayCharactersList);

const sortCharacters = document.getElementById('sort');
sortCharacters.addEventListener('change', () => {
    const sortBy = document.getElementById('sort').value;
    charactersNames = mainFilters.sortBy(charactersNames, sortBy)
    const charactersResult = document.getElementById('characters-content');
    return charactersResult.innerHTML = formatList(charactersNames);
});

function displayCharactersByHouse(house) {
    charactersNames = mainFilters.filterCharactersByHouses(dataBaseCharacters, house);
    const sortBy = document.getElementById('sort').value;
    charactersNames = mainFilters.sortBy(charactersNames, sortBy);
    let percentageOfCharsByHouse = mainFilters.calcPercentage(charactersNames.length, dataBaseCharacters.length);
    document.getElementById('characters-percentage').innerHTML = `The characters in <em class="house-name">${house}</em> represent ${percentageOfCharsByHouse}% of all characters in the Harry Potter Books`
    hideModals();
    document.getElementById('characters-list').style.display = 'block';
    const charactersByHouseResult = document.getElementById('characters-content');
    return charactersByHouseResult.innerHTML = formatList(charactersNames);
}

const btnGryffindor = document.getElementById('btn-gryffindor')
btnGryffindor.addEventListener('click',
    function displayGryffindorCharacters() {
        const house = 'Gryffindor';
        document.getElementById('header-modal-characters').innerText = 'Characters from house Gryffindor';
        displayCharactersByHouse(house);
    })

const btnSlytherin = document.getElementById('btn-slytherin')
btnSlytherin.addEventListener('click',
    function displaySlytherinCharacters() {
        const house = 'Slytherin';
        document.getElementById('header-modal-characters').innerText = 'Characters from house Slytherin';
        displayCharactersByHouse(house);
    })

const btnHufflepuff = document.getElementById('btn-hufflepuff')
btnHufflepuff.addEventListener('click',
    function displayHufflePuffCharacters() {
        const house = 'Hufflepuff';
        document.getElementById('header-modal-characters').innerText = 'Characters from house Hufflepuff';
        displayCharactersByHouse(house);
    })

const btnRavenclaw = document.getElementById('btn-ravenclaw')
btnRavenclaw.addEventListener('click',
    function displayRavenclawCharacters() {
        const house = 'Ravenclaw';
        document.getElementById('header-modal-characters').innerText = 'Characters from house Ravenclaw';
        displayCharactersByHouse(house);
    })

const btnBooks = document.getElementById('btn-books');
btnBooks.addEventListener('click',
    function displayBooksList() {
        const bookTitles = mainFilters.displayBooksList(dataBaseBooks);
        hideModals();
        document.getElementById('books-list').style.display = 'block';

        const booksResult = document.getElementById('books-content');
        return booksResult.innerHTML = formatList(bookTitles);
    })

const btnSpells = document.getElementById('btn-spells');
btnSpells.addEventListener('click',
    function displaySpellsList() {
        const spellsNames = mainFilters.displaySpellsList(dataBaseSpells);
        hideModals()
        document.getElementById('spells-list').style.display = 'block';

        const spellsResult = document.getElementById('spells-content');
        return spellsResult.innerHTML = formatList(spellsNames);
    })

function displayCharacterCard(characterListed) {
    document.getElementById('characters-list').style.display = 'none';
    document.getElementById('card-info-characters').style.display = 'block';
    const cardContent = document.getElementById('card-content-characters');
    const cardTitle = document.getElementById('card-title-characters');
    const clickedName = characterListed.target.innerText;
    const filterCharacters = dataBaseCharacters.filter((character) => character.name === clickedName);
           
    return filterCharacters.map((character) => {
    if (character.birth == null) character.birth = 'Unknown'
    if (character.death == null) character.death = 'Unknown'
    if (character.species == null) character.species = 'Unknown'
    if (character.ancestry == null) character.ancestry = 'Unknown'
    if (character.gender == null) character.gender = 'Unknown'
    if (character.hair_color == null) character.hair_color = 'Unknown'
    if (character.eye_color == null) character.eye_color = 'Unknown'
    if (character.patronus == null) character.patronus = 'Unknown'
    if (character.house == null) character.house = 'Unknown'
    if (character.books_featured_in == null) character.books_featured_in = 'Unknown'

    cardTitle.innerHTML = `${character.name}`
    cardContent.innerHTML = 
     `
        <li><em class="card-content-heading">Birth:</em> ${character.birth}</li>
        <li><em class="card-content-heading">Death:</em> ${character.death}</li>
        <li><em class="card-content-heading">Species:</em> ${character.species}</li>
        <li><em class="card-content-heading">Ancestry:</em> ${character.ancestry}</li>
        <li><em class="card-content-heading">Gender:</em> ${character.gender}</li>
        <li><em class="card-content-heading">Hair color:</em> ${character.hair_color}</li>
        <li><em class="card-content-heading">Eye color:</em> ${character.eye_color}</li>
        <li><em class="card-content-heading">Patronus:</em> ${character.patronus}</li>
        <li><em class="card-content-heading">House:</em> ${character.house}</li>
        <li><em class="card-content-heading">Books featured in:</em> ${character.books_featured_in}</li>
     ` 
    }) 
}
    
const charactersList = Array.from(document.getElementsByClassName('modal-characters-content')); 
charactersList.forEach(name => {
    name.addEventListener('click', displayCharacterCard);
});

function displayBookCard(event) {
    document.getElementById('books-list').style.display = 'none';
    document.getElementById('card-info-books').style.display = 'block';
    const cardContent = document.getElementById('card-content-books');
    const cardTitle = document.getElementById('card-title-books');
    const clickedTitle = event.target.innerText;
    const filterBooks = dataBaseBooks.filter((book) => book.title === clickedTitle);
       
    return filterBooks.map((book) => {
    cardTitle.innerHTML = `${book.title}`
    cardContent.innerHTML = 
     `
        <li><em class="card-content-heading">Release Date:</em> ${book.release}</li>
        <li><em class="card-content-heading">Author:</em> ${book.author}</li>
        <li><em class="card-content-heading">Description:</em> ${book.description}</li>
     ` 
    }); 
}
    
const booksList = Array.from(document.getElementsByClassName('modal-books-content')); 
booksList.forEach(title => {
    title.addEventListener('click', displayBookCard);
});

function displaySpellCard(event) {
    document.getElementById('spells-list').style.display = 'none';
    document.getElementById('card-info-spells').style.display = 'block';
    const cardContent = document.getElementById('card-content-spells')
    const cardTitle = document.getElementById('card-title-spells')
    const clickedSpell = event.target.innerText;
    const filterSpells = dataBaseSpells.filter((spell) => spell.name === clickedSpell);
       
    return filterSpells.map((spell) => {
    cardTitle.innerHTML = `${spell.name}`
    cardContent.innerHTML = 
     `
        <li><em class="card-content-heading">Pronunciation:</em> ${spell.pronunciation}</li>
        <li><em class="card-content-heading">Type:</em> ${spell.spell_type}</li>
        <li><em class="card-content-heading">Description:</em> ${spell.description}</li>
        <li><em class="card-content-heading">Mention:</em> ${spell.mention}</li>
     ` 
    }); 
}

const spellsList = Array.from(document.getElementsByClassName('modal-spells-content')); 
spellsList.forEach(name => {
    name.addEventListener('click', displaySpellCard);
});

const returnToCharactersList = document.getElementById('return-btn-characters');
returnToCharactersList.addEventListener('click', 
function returnButtonCharacter(){
    hideModals()
    document.getElementById('characters-list').style.display = 'block';
});

const returnToBooksList = document.getElementById('return-btn-books');
returnToBooksList.addEventListener('click', 
function returnButtonBook(){
    hideModals()
    document.getElementById('books-list').style.display = 'block';
});

const returnToSpellsList = document.getElementById('return-btn-spells');
returnToSpellsList.addEventListener('click', 
function returnButtonSpell(){
    hideModals()
    document.getElementById('spells-list').style.display = 'block';
});

const pageLogo = document.getElementById('page-logo');
pageLogo.addEventListener('click',
function returnToHomepage(){
    hideModals()
    document.getElementById('welcome-section').style.display = 'block';
});