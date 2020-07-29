"use strict";

//Trends
let mygif = localStorage.getItem("vector_id");
const apiKey = 'lCIxyIpyjzmnIETV0Z1M6WMnWOtsdeH3';
const path =
    "http://api.giphy.com/v1/gifs?ids=" +
    mygif +
    '&api_key=' + apiKey;

function getSuggestResults() {
    fetch(path)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json.data[0].images.fixed_width.url);

            const resultsEl = document.getElementById("misGifos-results");
            let resultsHTML = "";

            json.data.forEach((element) => {
                console.log(element);
                const url = element.images.fixed_width.url;
                const height = element.images.fixed_height.height;
                const width = element.images.fixed_width.width;
                const tittle = element.tittle;

                resultsHTML += `<img src = "${url}" class = "item" width = "${width}" height = "${height}" alt="${tittle}">`;
            });
            resultsEl.innerHTML = resultsHTML;
        })
        .catch((error) => {
            console.log(error.message);
        });
}
getSuggestResults();