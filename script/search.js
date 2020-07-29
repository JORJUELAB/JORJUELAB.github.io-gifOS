'use strict'

//Change CSS Sheet
function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
}
function onButton(){
    document.getElementById("search-button").classList.replace("change1", "search-change");
}
function outButton(){
    document.getElementById("search-button").classList.replace("search-change", "change1");
}


const apiKey = 'lCIxyIpyjzmnIETV0Z1M6WMnWOtsdeH3';
const URL = 'https://api.giphy.com/v1/gifs/search?q=';

const searchForm = document.getElementById('search-form');
const searchUser = document.getElementById('search-input');
const resultsEl = document.getElementById('search-results');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const search = searchUser.value
    getSearchResults(search)
});


function getSearchResults(search) {

    fetch(URL + search + '&api_key=' + apiKey)
        .then((response) => {
            return response.json()
        }).then(data => {
            //console.log(data.data[0].images.fixed_width.url);
            let resultsHTML = '';

            data.data.forEach(element => {
                //console.log(element);
                console.log(element.id)
                const url = element.images.fixed_height.url;
                const width = element.images.width;
                const height = element.images.fixed_height.height;
                resultsHTML += getComponentGift(url, element.id, height, element.title, width);
            });

            resultsEl.innerHTML = resultsHTML;

        }).catch(function (error) {
            return error
        });
}
searchUser.addEventListener('keyup', function () {
    let button = document.getElementById("search-button");
    button.classList.replace("search-button", "change1");
    searchUser.style.color = ("#110038");
    document.getElementById("searchSuggestions").style.visibility = "visible";
    const input = searchUser.value;
    if (input == "") {
        document.getElementById("searchSuggestions").style.visibility = "hidden";
        button.classList.replace("change1", "search-button");
    }
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
        
    };

   

    fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q="${input}"&limit=3`, requestOptions)

        .then((response) => {

            return response.json();
        }).then(function (data) {

            const prueba = document.getElementById("searchSuggestions");
            let prueba1 = "";
            data.data.forEach(function (obj) {
                //console.log(obj.name)
                prueba1 +=
                    `<button class="button-searchSuggestions" onclick = "getSuggestSearch('${obj.name}')">${obj.name}</button>`;
            })
            prueba.innerHTML = prueba1;

        }).catch(function (error) {
            console.log(error.message)
        })
})

function getSuggestSearch (search) {
    document.getElementById("searchSuggestions").style.visibility = "hidden";

    fetch(URL + search + '&api_key=' + apiKey)
        .then((response) => {
            return response.json()
        }).then(data => {
            console.log(data.data[0].images.fixed_width.url);
            let resultsHTML = '';

            data.data.forEach(element => {
                
                //console.log(element.title)
                const url = element.images.fixed_height.url;
                const width = element.images.width;
                const height = element.images.fixed_height.height;
                resultsHTML += getComponentGift(url, element.id, height, element.title, width);
            });
            searchButtons();
            resultsEl.innerHTML = resultsHTML;
        }).catch(function (error) {
            return error
        });
}

function searchButtons() {
    
    const input = searchUser.value;
  
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q="${input}"&limit=3`, requestOptions)

        .then((response) => {

            return response.json();
        }).then(function (data) {

            const xprueba = document.getElementById("masbotones");
            
            let prueba5 = "";
            data.data.forEach(function (obj) {
                console.log(obj.name)
                prueba5 +=
                    `<button class="otrosbotones" onclick = "getSuggestSearch('${obj.name}')">${obj.name}</button>`;
            })
            xprueba.innerHTML = prueba5;

        }).catch(function (error) {
            console.log(error.message)
        })
}
