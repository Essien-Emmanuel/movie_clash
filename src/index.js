const autocompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster !== "N/A" ? movie.Poster: "";
    return `
    <img src= "${imgSrc}" />
    ${movie.Title} (${movie.Year})
  `;
  },
  
  inputValue(movie) {
    return movie.Title;
  },
  
  async fetchData(param = 's', searchTerm)  {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "3957e820",
        s: searchTerm
      }
    });
    const data = response.data;
    if (data.Error) {
      return []
    };
    return data;
  }
}

createAutocomplete({
  ...autocompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, 'left');
  },
});

createAutocomplete({
  ...autocompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, 'right');
  },
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, side) => {
  const movieDetailPromise = async (movie) => {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "3957e820",
        i: movie.imdbID
      }
    });
    const data = response.data;
    if (data.Error) {
      return []
    };
    return data;
  }

  const movieDetail = await movieDetailPromise(movie);
  
  const summaryElement = document.querySelector(`#${side}-summary`);
  summaryElement.innerHTML = movieTemplate(movieDetail);

  if (side === 'left') {
    leftMovie = movieDetail;
  } else {
    rightMovie = movieDetail;
  }

  if (leftMovie && rightMovie) {
    runComparison()
  }
}

const runComparison = () => {
  console.log('time for comparison');
}

const movieTemplate = (movieDetail) => {
  const { Poster, Title, Genre, Plot, Awards, BoxOffice, Metascore, imdbRating, imdbVotes, } = movieDetail;

  const dollars = parseInt(BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
  const metascore = parseInt(Metascore);
  const IMDBRating = parseFloat(imdbRating);
  const IMDBVotes = parseInt(imdbVotes.replace(/,/g, ''));

  const awards = Awards.split(' ').reduce((current, total) => {
    const value = parseInt(total);
    if (isNaN(value)) return current  
      return current + value;
  }, 0);

  return `
   <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src=${Poster}" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${Title}</h1>
        <h4>${Genre}</h4>
        <p>${Plot}</p>
      </div>
    </div>
   </article>

   <article data-value=${awards} class="notification is-primary">
    <p class="title">${Awards}</p>
    <p class="subtitle">Awards</p>
   </article>

   <article data-value=${dollars} class="notification is-primary">
    <p class="title">${BoxOffice}</p>
    <p class="subtitle">Box Office</p>
   </article>

   <article data-value=${metascore} class="notification is-primary">
    <p class="title"> ${Metascore} </p>
    <p class="subtitle">Metascore</p>
   </article>

   <article data-value=${IMDBRating} class="notification is-primary">
    <p class="title"> ${imdbRating} </p>
    <p class="subtitle">IMDB Rating</p>
   </article>

   <article data-value=${IMDBVotes} class="notification is-primary">
    <p class="title"> ${imdbVotes} </p>
    <p class="subtitle">IMDB Votes</p>
   </article>
  `
}

