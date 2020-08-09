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

function getComponentGift(url, id, height, tittle, width) {
    return `
         <div class = "caja">
            <img src = "${url}" onmouseover = "setEvenMouse('${id}')" onmouseout ="setOutMouse('${id}')" class = "item-trend" height = "${height}" alt="${tittle}" width = "${width}">
            <figcaption  id = "${id}" style ="display : none" class="gif-titles">${tittle}</figcaption>   
         </div>       
    `;  
}

function trytitle(search){
    const titleEL = document.getElementById('ensayo');
    if(!search) {
        const search = searchUser.value;
        let titleHTML = "";
        titleHTML +=  `<input type="text" class="section-tittle" value="Resultado de búesqueda para: ${search}" disabled="disabled">`;
        titleEL.innerHTML = titleHTML;
    } else {
        let titleHTML = "";
        titleHTML +=  `<input type="text" class="section-tittle" value="Resultado de búesqueda para: ${search}" disabled="disabled">`;
        titleEL.innerHTML = titleHTML;
    }

}

const apiKey = 'lCIxyIpyjzmnIETV0Z1M6WMnWOtsdeH3';
const URL = 'https://api.giphy.com/v1/gifs/search?q=';

const searchForm = document.getElementById('search-form');
const searchUser = document.getElementById('search-input');
const resultsEl = document.getElementById('search-results');
const buttonsDiv = document.getElementById('searchSuggestions');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const search = searchUser.value;
    buttonsDiv.style.display = 'none';
    getSearchResults(search);
    trytitle(search);
});

function getSearchResults(search) {

    searchUser.value = search;
    console.log(search);
    console.log(searchUser);
    fetch(URL + search + '&api_key=' + apiKey)
        .then((response) => {
            return response.json()
        }).then(data => {
            //console.log(data.data[0].images.fixed_width.url);
            let resultsHTML = '';
            data.data.forEach(element => {
                //console.log(element);
               // console.log(element.id)
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

searchUser.addEventListener('keyup', function () {
    buttonsDiv.style.display = 'block';
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

            const greybuttonsDiv = document.getElementById("searchSuggestions");
            let greybuttons = "";
            data.data.forEach(function (obj) {
                //console.log(obj.name)
                greybuttons +=
                    `<button class="button-searchSuggestions" onclick = "getSuggestSearch('${obj.name}')">${obj.name}</button>`;
            })
            greybuttonsDiv.innerHTML = greybuttons;
        }).catch(function (error) {
            console.log(error.message)
        })
})
function getSuggestSearch (search) {
    buttonsDiv.style.display = 'none';
    document.getElementById("searchSuggestions").style.visibility = "hidden";
    console.log(search);
    fetch(URL + search + '&api_key=' + apiKey)
        .then((response) => {
            return response.json()
        }).then(data => {
            //console.log(data.data[0].images.fixed_width.url);
            let resultsHTML = '';
           
            data.data.forEach(element => {
                
                //console.log(element.title)
                const url = element.images.fixed_height.url;
                const width = element.images.width;
                const height = element.images.fixed_height.height;
                resultsHTML += getComponentGift(url, element.id, height, element.title, width);
            });
            
            //searchButtons();
            trytitle(search);

            resultsEl.innerHTML = resultsHTML;
        }).catch(function (error) {
            return error
        });
}
function searchButtons() {
    buttonsDiv.style.display = 'none';
    
    const input = searchUser.value;
  
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q="${input}"&limit=3`, requestOptions)

        .then((response) => {

            return response.json();
        }).then(function (data) {

            const bluebuttonsDiv = document.getElementById("bluebuttons");
            
            let bluebuttons = "";
            data.data.forEach(function (obj) {
                let title = obj.name;
                //console.log(obj.name)
                bluebuttons +=
                    `<button class="otrosbotones" onclick = "getSuggestSearch('${obj.name}')">${obj.name}</button>`;
                    console.log(title);
            })          
            bluebuttonsDiv.innerHTML = bluebuttons;

        }).catch(function (error) {
            console.log(error.message)
        })
}
