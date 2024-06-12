const createAutocomplete = ({ root }) => {
  root.innerHTML = `
    <label> <b>Search For a Movie </b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;  
  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');


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
}