const image = document.getElementById("image");
const imageDate = document.getElementById("image-date");
const imageTitle = document.getElementById("image-title");
const imageDescription = document.getElementById("image-description");
import key from "./key.js";
const detailsContainer = document.querySelector(".details-container");
let currentId;

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  currentId = urlParams.get("date"); // = 2023-06-01
  validateDate(currentId);
  function validateDate(currentId) {
    const dateSyntax = /^\d{4}-\d{2}-\d{2}$/;
    const bool = dateSyntax.test(currentId);
    if (bool){
        selectedAstronomy();
    } else {
        getAstronomy();
    }
  }
};

// gets image for the current day 
function getAstronomy() {
    let timeoutId = setTimeout(() => {
      imageError();
    }, 5000);
  // change to render url 
    fetch("https://astronomy-uxjs.onrender.com/")
      .then((res) => {
        clearTimeout(timeoutId);
        return res.json();
      })
      .then((json) => {
        const astronomyData = json;
        displayAstronomy(astronomyData);
      })
      .catch((error) => {
        imageError();
      });
  }
  
// gets image for the selected day 
function selectedAstronomy () {   
    let timeoutId = setTimeout(() => {
        imageError();
      }, 1000);

      fetch("https://astronomy-uxjs.onrender.com/media", {
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          date: currentId,
        }),
      })
      .then((res) => res.json())
      .then((json) => {
        const astronomyData = json;
        displayAstronomy(astronomyData);
      })
      .catch((err) => imageError());
    // fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${currentId}`)
    //     .then((res) => {
    //       clearTimeout(timeoutId);
    //       return res.json();
    //     })
    //     .then((json) => {
    //       const astronomyData = json;
    //       console.log(astronomyData);
    //       displayAstronomy(astronomyData);
    //     })
    //     .catch((error) => {
    //       imageError();
    //     });
}

function validateMedia (astronomyData) {
  if (astronomyData.media_type === "video") {
    image.innerHTML = `<embed
    src="${astronomyData.url}"
    wmode="transparent"
    type="video/mp4"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowfullscreen
    title="Nasa image"
  >`;
  } else {
      image.innerHTML = `<img src="${astronomyData.url}"/>`;
  }
}

// displays the images and data fetched 
function displayAstronomy (astronomyData) {
  validateMedia(astronomyData);
  setText(imageDate, `${astronomyData.date}`);
  setText(imageTitle, `${astronomyData.title}`);
  setText(imageDescription, `${astronomyData.explanation}`);
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

