
const fetchData = async (param = 's', searchTerm) => {
  const params = {
    apikey: "3957e820",
  } 
  params[param] = searchTerm;

  const response = await axios.get("http://www.omdbapi.com/", {
    params
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

  return data;
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
      onMovieSelect(movie);
    });

    resultsWrapper.appendChild(optionAnchor);
  }
}

let timeoutId;
const onInput = async (event) => {
  const searchTerm = event.target.value;
  const moviesResult = await fetchData('s', searchTerm);

  if (!moviesResult.Response) {
    dropdown.classList.remove('is-active'); 
    return
  }

  const movies = moviesResult.Search
  resultsWrapper.innerHTML = "";
    
  renderMovies(movies)
}

input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', event => {
  const clickedElement = event.target;
  const isTarget = root.contains(clickedElement);

  if (!isTarget) dropdown.classList.remove('is-active');
});

const onMovieSelect = async (movie) => {
  const movieDetail = await fetchData('i', movie.imdbID);
  
  const summaryDiv = document.querySelector('#summary');
  summaryDiv.innerHTML = movieTemplate(movieDetail)
}

const movieTemplate = (movieDetail) => {
  const { Poster, Title, Genre, Plot } = movieDetail;
  return `
   <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src=${Poster}" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1> ${Title} </h1>
        <h4> ${Genre} </h4>
        <p> ${Plot} </p>
      </div>
    </div>
   </article>
  `
}

