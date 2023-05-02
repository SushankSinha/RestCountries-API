//html elements

let main = document.createElement("div");
main.setAttribute("class", "main");
document.body.appendChild(main);

let container = document.createElement("div");
container.setAttribute("class", "container");
main.appendChild(container);

let title = document.createElement("h1");
title.setAttribute("id", "title");
title.setAttribute("class", "text-center");
title.appendChild(document.createTextNode("Weather API"));
container.appendChild(title);

let br1 = document.createElement("br");
container.appendChild(br1);

let rowData = document.createElement("div");
rowData.setAttribute("class", "row");
container.appendChild(rowData);

let col = document.createElement("div");
col.setAttribute("class", "col-sm-6.col-md-4.col-lg-4.col-xl-4");
rowData.appendChild(col);

let col2 = document.createElement("div");
col2.setAttribute("class", "col-md-8");

let search = document.createElement("div");
search.setAttribute("class", "search");
col.appendChild(search);

let iElement = document.createElement("i");
iElement.setAttribute("class", "fa fa-search");
search.appendChild(iElement);

let input = document.createElement("input");
input.setAttribute("class", "form-control");
input.setAttribute("id", "inputCountry");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Country Name");
search.appendChild(input);

let button = document.createElement("button");
button.setAttribute("class", "btn btn-primary");
button.setAttribute("id", "btn");
button.appendChild(document.createTextNode("Get Details"));
search.appendChild(button);

search.appendChild(col2);
col.appendChild(col2);

let col3 = document.createElement("div");
col3.setAttribute("class", "col-sm-6 col-md-4 col-lg-4 col-xl-4");

let br2 = document.createElement("br");
col3.appendChild(br2);

let card = document.createElement("div");
card.setAttribute("class", "card h-100");
card.style.width = "18rem";
col3.appendChild(card);

let header = document.createElement("div");
header.setAttribute("class", "card-header h-100");
header.setAttribute("id", "first");
header.appendChild(document.createTextNode("Country Name"));
card.appendChild(header);

let image = document.createElement("img");
image.setAttribute("id", "first-flag");
image.setAttribute("class", "card-img-top");
image.setAttribute("alt", "flag");
card.appendChild(image);

let cardBody = document.createElement("div");
cardBody.setAttribute("class", "card-body h-100");
card.appendChild(cardBody);

let cardText = document.createElement("div");
cardText.setAttribute("class", "card-text");
cardBody.appendChild(cardText);

let capital = document.createElement("p");
capital.setAttribute("id", "capital");
capital.appendChild(document.createTextNode("Capital"));
cardText.appendChild(capital);

let region = document.createElement("p");
region.setAttribute("id", "region");
region.appendChild(document.createTextNode("Region"));
cardText.appendChild(region);

let countryCode = document.createElement("p");
countryCode.setAttribute("id", "countryCode");
countryCode.appendChild(document.createTextNode("Country Code"));
cardText.appendChild(countryCode);

let latlong = document.createElement("p");
latlong.setAttribute("id", "latlong");
latlong.appendChild(document.createTextNode("Lat Long"));
cardText.appendChild(latlong);

let anchorLink = document.createElement("a");
anchorLink.setAttribute("id", "weather");
anchorLink.setAttribute("class", "btn btn-primary");
anchorLink.setAttribute("href", "");
anchorLink.appendChild(document.createTextNode("Click for Weather Details"));
cardBody.appendChild(anchorLink);

col.appendChild(col3);

document.getElementById("title").style.color = "white";


//javascript

document.getElementById("btn").onclick = function myFunc() {
  let country = document.getElementById("inputCountry").value;

  const countryName = country.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toLowerCase()
  );

  document.getElementById("inputCountry").innerHTML = "";

  let promise = fetch("https://restcountries.com/v3.1/all");
  promise
    .then((data) => data.json())
    .then((country) => {
      country.forEach((obj) => {
        if (
          countryName == obj.name.common.toLowerCase() ||
          countryName == obj.cca3.toLowerCase()
        ) {
          document.getElementById(
            "first"
          ).innerHTML = `${obj.name.common.toUpperCase()}`;

          document.getElementById("first-flag").src = obj.flags.png;
          document.getElementById(
            "capital"
          ).innerHTML = `Capital : <b> ${obj.capital} </b>`;
          document.getElementById(
            "region"
          ).innerHTML = `Region : <b> ${obj.region} </b>`;
          document.getElementById(
            "countryCode"
          ).innerHTML = `Country Code : <b> ${obj.cca3} </b>`;
          document.getElementById(
            "latlong"
          ).innerHTML = `Latitude, Longitude : <b> ${obj.latlng} </b>`;
          console.log(obj.latlng[0]);
          console.log(obj.latlng[1]);

          let Weatherdata = fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${obj.latlng[0]}&lon=${obj.latlng[1]}&appid=2cc2efcac615e5bffff95c52d163c516`
          );

          Weatherdata.then((data) => data.json()).then((res) => {
            document.getElementById(
              "weather"
            ).href = `https://openweathermap.org/city/${res.id}`;
          });
        }
      });
    });
};
