const cca3 = localStorage.getItem('cca3');
console.log(cca3);

const isDarkMode = localStorage.getItem('darkMode') === 'true';
if(isDarkMode){
    document.body.classList.add('dark-mode');
}
console.log(isDarkMode);

const contentMax = document.querySelector('.content-max');
const imgFlag = document.querySelector('.img-flag');

const namePrincipal = document.querySelector('.name');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');

const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');

const pBC = document.querySelector('.p-border-countries');

const darkMode = document.querySelector('.dark-mode-btn');



const url = `https://restcountries.com/v3.1/alpha/${cca3}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`;


const btnBack = document.querySelector('.back');
btnBack.addEventListener('click', () => {
    window.location.href = '/index.html';
})

async function getCountryDetail() {
    let response = await fetch(url);
    let result = await response.json();
    console.log(result);
    let bordersName = await getBordersName(result.borders);
    for (let i = 0; i < bordersName.length; i++) {
        const singleName = bordersName[i];
        const spanBorderCountries = document.createElement('span');
        spanBorderCountries.classList.add('spanBG');
        pBC.appendChild(spanBorderCountries);
        spanBorderCountries.innerHTML = `${singleName.name.common} `;
    }

    imgFlag.src = result.flags.png;
    namePrincipal.innerHTML = result.name.common;
    nativeName.innerHTML = result.name.official;
    population.innerHTML = result.population;
    region.innerHTML = result.region;
    subRegion.innerHTML = result.subregion;
    capital.innerHTML = result.capital;

    topLevelDomain.innerHTML = result.tld.toString();
    currencies.innerHTML = Object.keys(result.currencies);
    languages.innerHTML = Object.values(result.languages).toString();
}

getCountryDetail();

async function getBordersName(borders) {
    const url2 = `https://restcountries.com/v3.1/alpha?codes=${borders.toString()}&fields=name`;
    let response = await fetch(url2);
    let result = await response.json();
    return result;
}

darkMode.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
})