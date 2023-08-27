const image = document.getElementById("image");
const imageDate = document.getElementById("image-date");
const imageTitle = document.getElementById("image-title");
const imageDescription = document.getElementById("image-description");
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
      }, 5000);

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
        clearTimeout(timeoutId);
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
        <h1 id="image-date">2023 August 14</h1>
        <h3 id="image-title">The Ring Nebula from Webb</h3>
        <p class="error">NASA's data is down temporarily. Here is the picture taken in August. Please check back later!</p><br>
        <p id="image-description">
          The Ring Nebula (M57), is more complicated than it appears through a small telescope. The easily visible central ring is about one light-year across, but this remarkable exposure by the James Webb Space Telescope explores this popular nebula with a deep exposure in infrared light. Strings of gas, like eyelashes around a cosmic eye, become evident around the Ring in this digitally enhanced featured image in assigned colors. These long filaments may be caused by shadowing of knots of dense gas in the ring from energetic light emitted within. The Ring Nebula is an elongated planetary nebula, a type of gas cloud created when a Sun-like star evolves to throw off its outer atmosphere to become a white dwarf star. The central oval in the Ring Nebula lies about 2,500 light-years away toward the musical constellation Lyra.
        </p>
    </section>`;
  }

