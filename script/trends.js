'use strict'

//Trends

const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`;

function setEvenMouse(id) {
    //console.log(id);
    let txtTitle = document.getElementById(id);
    txtTitle.style.display = "block";
}
function setOutMouse(id) {
    let txtTitle = document.getElementById(id);
    txtTitle.style.display = "none";

}
function getComponentGift(url, id, height, tittle, width) {
    return `
         <div class = "caja">
            <img src = "${url}" onmouseover = "setEvenMouse('${id}')" onmouseout ="setOutMouse('${id}')" class = "item-trend" height = "${height}" alt="${tittle}" width = "${width}">
            <figcaption  id = "${id}" style ="display : none" class="gif-titles">${tittle}</figcaption>   
         </div>       
    `;
}
function getTrendResults() {
    fetch(path).then((response) => {
        return response.json()
    }).then((json) => {
        //console.log(json.data[0].images.fixed_width.url);
        //console.log(json.data[0].title);

        const resultsEl = document.getElementById('trend-image');

        let resultsHTML = '';

        json.data.forEach(element => {

            const url = element.images.fixed_height.url;
            const height = element.images.fixed_height.height;
            const width = element.images.fixed_height.width;

            resultsHTML += getComponentGift(url, element.id, height, element.title, width);
            //console.log(resultsHTML)

        });
        resultsEl.innerHTML = resultsHTML;

    }).catch((error) => {
        console.log(error.message)
    });
}
getTrendResults();
