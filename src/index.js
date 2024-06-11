
const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "3957e820",
      s: searchTerm

    } 
  });
  
  const data = response.data
  // const h2 = document.createElement('h2');
  if (data.Error) {
    // h2.innerText = "No Movie Found.";
    // document.querySelector("#target").appendChild(h2)
    return []
  };
  // h2.innerText = "";
  // document.querySelector('#target').appendChild(h2);

  return data.Search;
}

//dropdown widget
const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label> <b>Search For a Movie </b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;  
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const renderMovies = (movies) => {
  dropdown.classList.add('is-active');
  for (const movie of movies) {
    const { Poster, Title} = movie;
    const optionAnchor = document.createElement('a');
       
    optionAnchor.classList.add('dropdown-item');
    const imgSrc = Poster !== "N/A" ? Poster: "";

    optionAnchor.innerHTML = `
    <img src= "${imgSrc}" />
    ${Title} 
  `;
  optionAnchor.addEventListener('click', event => {
      dropdown.classList.remove('is-active');
      input.value = Title;
    });

    resultsWrapper.appendChild(optionAnchor);
  }
}

let timeoutId;
const onInput = async (event) => {
  const searchTerm = event.target.value;
  const movies = await fetchData(searchTerm);

  if (!movies.length) {
    dropdown.classList.remove('is-active'); 
    return
  }
  resultsWrapper.innerHTML = "";
  
  renderMovies(movies)
}

input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', event => {
  const clickedElement = event.target;
  const isTarget = root.contains(clickedElement);

  if (!isTarget) dropdown.classList.remove('is-active');
  // else dropdown.classList.add('is-active')
});
