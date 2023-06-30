//html elements

window.onload = function myFunc() {
  let promise = fetch("https://restcountries.com/v3.1/all");
  promise
    .then((data) => data.json())
    .then((country) => {
      country.forEach((obj) => {
        let main = document.createElement("div");
        main.setAttribute("class", "main");
        document.body.appendChild(main);

        let rowData = document.createElement("div");
        rowData.setAttribute("class", "row");
        main.appendChild(rowData);

        let title = document.createElement("h1");
        title.setAttribute("id", "title");
        title.setAttribute("class", "text-center");
        rowData.appendChild(title);

        let col = document.createElement("div");
        col.setAttribute("class", "col1");
        rowData.appendChild(col);

        let col2 = document.createElement("div");
        col2.setAttribute("class", "col2");

        let col3 = document.createElement("div");
        col3.setAttribute("class", "col3");

        let card = document.createElement("div");
        card.setAttribute("class", "card h-100");
        card.style.width = "18rem";
        col3.appendChild(card);

        let header = document.createElement("div");
        header.setAttribute("class", "first card-header text-center");
        header.setAttribute("id", "first");
        header.appendChild(document.createTextNode(`${obj.name.common}`));
        card.appendChild(header);

        let image = document.createElement("img");
        image.setAttribute("id", "first-flag");
        image.setAttribute("src", `${obj.flags.png}`);
        image.setAttribute("class", "first-flag card-img-top");
        card.appendChild(image);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body h-100");
        card.appendChild(cardBody);

        let cardText = document.createElement("div");
        cardText.setAttribute("class", "card-text");
        cardBody.appendChild(cardText);

        let capital = document.createElement("p");
        capital.setAttribute("id", "capital");
        capital.setAttribute("class", "capital");
        capital.appendChild(
          document.createTextNode(`Capital : ${obj.capital}`)
        );
        cardText.appendChild(capital);

        let region = document.createElement("p");
        region.setAttribute("id", "region");
        region.setAttribute("class", "region");
        region.appendChild(document.createTextNode(`Region : ${obj.region}`));
        cardText.appendChild(region);

        let countryCode = document.createElement("p");
        countryCode.setAttribute("id", "countryCode");
        countryCode.setAttribute("class", "countryCode");
        countryCode.appendChild(
          document.createTextNode(`Country Code : ${obj.cca3}`)
        );
        cardText.appendChild(countryCode);

        let latlong = document.createElement("p");
        latlong.setAttribute("id", "latlong");
        latlong.setAttribute("class", "latlong");
        latlong.appendChild(
          document.createTextNode(
            `Latitude, Longitude : ${(obj.latlng[0]).toFixed(2)}, ${(obj.latlng[1]).toFixed(2)}`
          )
        );

        cardText.appendChild(latlong);

        let weatherBtn = document.createElement("button");
        weatherBtn.setAttribute("class", "weather btn btn-primary");
        weatherBtn.setAttribute("onclick", "weatherFunc()");
        weatherBtn.setAttribute("id", "weather");
        weatherBtn.appendChild(
          document.createTextNode("Click for Weather Details")
        );

        cardBody.appendChild(weatherBtn);

        col.appendChild(col3);

        document
          .querySelector(".weather")
          .addEventListener("click", weatherFunc);
        function weatherFunc() {
          let Weatherdata = fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${obj.latlng[0]}&lon=${obj.latlng[1]}&appid=2cc2efcac615e5bffff95c52d163c516`
          );

          Weatherdata.then((data) => data.json()).then((res) => {
            document.getElementById("capital").remove();
            document.getElementById("region").remove();
            document.getElementById("countryCode").remove();
            document.getElementById("latlong").remove();

            let humidity = document.createElement("p");
            humidity.setAttribute("id", "humidity");
            humidity.setAttribute("class", "humidity");
            humidity.appendChild(
              document.createTextNode(`Humidity : ${res.main.humidity} hPa`)
            );
            cardText.appendChild(humidity);

            let pressure = document.createElement("p");
            pressure.setAttribute("id", "pressure");
            pressure.setAttribute("class", "pressure");
            pressure.appendChild(
              document.createTextNode(`Pressure : ${res.main.pressure} hPa`)
            );
            cardText.appendChild(pressure);

            let maxTemp = document.createElement("p");
            maxTemp.setAttribute("id", "maxTemp");
            maxTemp.setAttribute("class", "maxTemp");
            maxTemp.appendChild(
              document.createTextNode(
                `Avg Max Temp : ${(res.main.temp_max - 273.15).toFixed(2)}° C  `
              )
            );
            cardText.appendChild(maxTemp);

            let description = document.createElement("p");
            description.setAttribute("id", "description");
            description.setAttribute("class", "description");
            description.appendChild(
              document.createTextNode(
                `Description : ${res.weather[0].description.toUpperCase()}`
              )
            );
            cardText.appendChild(description);

            let windSpeed = document.createElement("p");
            windSpeed.setAttribute("id", "windSpeed");
            windSpeed.setAttribute("class", "windSpeed");
            windSpeed.appendChild(
              document.createTextNode(`Wind Speed : ${res.wind.speed} m/s`)
            );
            cardText.appendChild(windSpeed);

            document.getElementById("weather").remove();
          });
        }
      });
    });
};
