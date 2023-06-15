import key from "./key.js";
const image = document.getElementById("image");
const imageDate = document.getElementById("image-date");
const imageTitle = document.getElementById("image-title");
const imageDescription = document.getElementById("image-description");
const detailsContainer = document.querySelector(".details-container");

// calls data for the current day
function getAstronomy () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
    .then((res) => res.json())
    .then((json) => {
        const astronomyData = json;
        displayAstronomy(astronomyData);
        console.log(astronomyData);
    })
    .catch((error) => {
        imageError();
    });
}

let currentId;
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  currentId = urlParams.get("date"); // = 2023-06-01
  validateDate(currentId);
  function validateDate(currentId) {
    const dateSyntax = /^\d{4}-\d{2}-\d{2}$/;
    const bool = dateSyntax.test(currentId);
    if(bool){
        selectedAstronomy();
    } else {
        getAstronomy();
    }
    console.log(bool)
  }
};

// calls data for the day chosen
function selectedAstronomy () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${currentId}`)
    .then((res) => res.json())
    .then((json) => {
        const astronomyData = json;
        displayAstronomy(astronomyData);
    })
    .catch((error) => {
        imageError();
    });
}
// displays the images and data fetched 
function displayAstronomy (astronomyData) {
    setImg(image, `${astronomyData.url}`);
    setText(imageDate, `${astronomyData.date}`);
    setText(imageTitle, `${astronomyData.title}`);
    setText(imageDescription, `${astronomyData.explanation}`);
}



// sets image
function setImg (element, imgSrc) {
    if(imgSrc === undefined){
        return
    } 
     element.setAttribute("src", imgSrc);
    }

// sets text
function setText (element, string ) {
    element.innerText = string;
     }

// displays when nasa api is down 
function imageError () {
    detailsContainer.innerHTML = `<img src="/images/filler.jpeg" alt="astronomy image" id="image">
    <section>
        <h1 id="image-date">2020 January 5</h1>
        <h3 id="image-title">A Starry Night of Iceland</h3>
        <p class="error"> NASA's data is down temporarily. Here is the picture taken on January meanwhile the site is being maintainced. Please check back later! </p><br>
        <p id="image-description">
            Like an illustration in a galactic Just So Story, the Elephant's Trunk Nebula winds through the emission region and young star cluster complex IC 1396, in the high and far off constellation of Cepheus. Seen on the left the cosmic elephant's trunk, also known as vdB 142, is over 20 light-years long. This detailed telescopic view features the bright swept-back ridges and pockets of cool interstellar dust and gas that abound in the region. But the dark, tendril-shaped clouds contain the raw material for star formation and hide protostars within. Nearly 3,000 light-years distant, the relatively faint IC 1396 complex covers a large region on the sky, spanning over 5 degrees. This rendition spans a 1 degree wide field of view though, about the angular size of 2 full moons. Of course the dark shapes below and to the right of the outstretched Elephant's Trunk, are known to some as The Caravan.
        </p>
    </section>`;
  }

