const contentMax = document.querySelector('.content-max');
const darkMode = document.querySelector('.dark-mode-btn');
const cardContainer = document.querySelector('.card-container');
const url = 'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3';
const inputSearchBar = document.querySelector('input');
const searchBar = document.querySelector('.search-bar');
const filterRegion = document.querySelector('.filter-by-region');

const continents = document.querySelector('.continents');
const btnFilter = document.querySelector('.filter');
const selectContinents = document.querySelector('.continents');
let nationsFiltered = [];

localStorage.removeItem('cca3');
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if(isDarkMode){
    document.body.classList.add('dark-mode');
}
console.log(isDarkMode);

async function getAllNation() {
    let response = await fetch(url);
    let resultJson = await response.json();
    console.log(resultJson);
    return resultJson;
}

function createCards(nationList) {
    cardContainer.innerHTML = '';
    nationList.forEach(nation => {
        const card = document.createElement('div');
        card.classList.add('card');
        cardContainer.appendChild(card);

        const imgFlag = document.createElement('img');
        imgFlag.classList.add('img-flag');
        imgFlag.src = nation.flags.png;

        const descriptionCard = document.createElement('div');
        descriptionCard.classList.add('card-description');
        const nameFlag = document.createElement('h2');
        nameFlag.innerHTML = nation.name.common;

        const p = document.createElement('p');
        p.innerHTML = `Population: <span>${nation.population}</span>
            <br> Region: <span>${nation.region}</span>
            <br> Capital: <span>${nation.capital}</span>`;

        card.appendChild(imgFlag);
        card.appendChild(descriptionCard);
        descriptionCard.appendChild(nameFlag);
        descriptionCard.appendChild(p);
        contentMax.appendChild(cardContainer);
        // --------------------------------------------------------------------
        card.addEventListener('click', () => {
            localStorage.setItem('cca3', nation.cca3);
            window.location.href = '/nationDescription.html';
        })
        // ---------------------------------------------------------------------
    })
}

async function init(){
    let nations = await getAllNation();
    nationsFiltered = nations;
    createCards(nations);

    inputSearchBar.addEventListener('keyup', () => {
        const nationFilter = nationsFiltered.filter(nation => {
            return nation.name.common.toLowerCase().startsWith(inputSearchBar.value.toLowerCase());
        })
        console.log(nationFilter);
        createCards(nationFilter);
    })

    selectContinents.addEventListener("change", ()=>{
        console.log(selectContinents.value);
        filterByNation(selectContinents.value, nations);
        inputSearchBar.value='';
    })
}

function filterByNation(cont, nationList){
    if(cont === 'All'){
        nationsFiltered = nationList;
        createCards(nationList);
        return;
    }
    for (let i = 0; i < nationList.length; i++) {
        if (nationList[i].region === cont) {
            const state = nationList.filter(nation => {
                if (nation.region === cont) {
                    return nation.region;
                }
            })
            nationsFiltered = state;
            createCards(state);
        }
    }
} 

darkMode.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
})

init();