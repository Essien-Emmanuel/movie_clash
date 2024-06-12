const autocompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster !== "N/A" ? movie.Poster: "";
    return `
    <img src= "${imgSrc}" />
    ${movie.Title} (${movie.Year})
  `;
  },
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie);
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
});

createAutocomplete({
  ...autocompleteConfig,
  root: document.querySelector('#right-autocomplete'),
});

const onMovieSelect = async (movie) => {
  const movieDetail = async (movie) => {
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
  
  
  const summaryDiv = document.querySelector('#summary');
  summaryDiv.innerHTML = movieTemplate(await movieDetail(movie))
}

const movieTemplate = (movieDetail) => {
  const { Poster, Title, Genre, Plot, Awards, BoxOffice, Metascore, imdbRating, imdbVotes, } = movieDetail;
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

   <article class="notification is-primary">
    <p class="title">${Awards}</p>
    <p class="subtitle">Awards</p>
   </article>

   <article class="notification is-primary">
    <p class="title">${BoxOffice}</p>
    <p class="subtitle">Box Office</p>
   </article>

   <article class="notification is-primary">
    <p class="title"> ${Metascore} </p>
    <p class="subtitle">Metascore</p>
   </article>

   <article class="notification is-primary">
    <p class="title"> ${imdbRating} </p>
    <p class="subtitle">IMDB Rating</p>
   </article>

   <article class="notification is-primary">
    <p class="title"> ${imdbVotes} </p>
    <p class="subtitle">IMDB Votes</p>
   </article>
  `
}

