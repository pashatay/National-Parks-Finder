const apiKey = 'gP4dSaZz79eAIkfcWskg6mFfCaUbKcTx7fONM9Em';


$(".chosen-select").chosen({
    no_results_text: "Oops, nothing found!"
  })


const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <h4><a href='${responseJson.data[i].url}'>Learn more</a></h4>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  const params = {
    stateCode: query,
    api_key: apiKey,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = listStatesParam(states);
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}



const states =  $('.chosen-choices').find('.search-choice');

function listStatesParam(x){
const statesArr=[];
 for(let i=0; i<x.length; i++){
     let state = x[i].textContent;
     statesArr.push(state);
}
return statesArr.join(',');
}


$(watchForm);