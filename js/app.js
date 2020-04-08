const url = `https://covid19.mathdro.id/api`;

// DOM Selctors
let container = document.querySelector(".details");
let recoveries = document.querySelector(".rec-count");
let death = document.querySelector(".def-count");
let countryName = document.querySelector(".countryName");
let updateAt = document.getElementsByClassName(".updated-at");
let pickCountry = document.getElementById("pick-country");
let countryData = document.querySelector(".countryData");
var ctx = document.getElementById("myChart");
var ctx1 = document.getElementById("myChart1");

// Loads Global Data
const getData = async () => {
  try {
    let {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    let html = "";

    html += `
        <div class="row">
            <div class="card infections">
            Total infections
            <h3 class="inf-count count">${confirmed.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
            <div class="card recoveries">
            Total recoveries
            <h3 class="rec-count count">${recovered.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
            <div class="card deaths">
            Total deaths
            <h3 class="def-count count">${deaths.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
        </div>
        `;

    container.innerHTML = html;

    // Loads Chart for Global Data
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Confirmed", "Recovered", "Deaths"],
        datasets: [
          {
            label: "Covid-19 Cases",
            data: [confirmed.value, recovered.value, deaths.value],
            backgroundColor: [
              "rgb(54, 162, 235)",
              "rgb(51, 250, 51)",
              "rgb(255,45,32)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Get All Countries
const getCountry = async () => {
  try {
    let {
      data: { countries: countriesAll },
    } = await axios.get(`${url}/countries`);

    let countryData = "";
    countriesAll.forEach((country) => {
      countryData += ` <option value="${country.name}">${country.name}</option>`;
    });

    pickCountry.insertAdjacentHTML("beforeend", countryData);
  } catch (error) {}
};

// Loads Global Data
const getCountryData = async () => {
  try {
    let {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(`${url}/countries/${pickCountry.value}`);

    let html = "";

    html += `
      <div class="row">
          <div class="card infections">
            Total infections
            <h3 class="inf-count count">${confirmed.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
          </div>
          <div class="card recoveries">
            Total recoveries
            <h3 class="rec-count count">${recovered.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
          </div>
          <div class="card deaths">
            Total deaths
            <h3 class="def-count count">${deaths.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
          </div>
        </div>
      `;
    countryName.innerHTML = pickCountry.value;
    countryData.innerHTML = html;

    // Display chart For A Selected Country
    var myChart = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["Confirmed", "Recovered", "Deaths"],
        datasets: [
          {
            label: "# of Votes",
            data: [confirmed.value, recovered.value, deaths.value],
            backgroundColor: [
              "rgb(54, 162, 235)",
              "rgb(51, 250, 51)",
              "rgb(255,45,32)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// All Function Calls
window.onload = getData();
getCountry();
// Event To Get Country Data and populate
pickCountry.addEventListener("change", getCountryData);
