
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

const input = document.querySelector('input');

const renderMovies = (movies) => {
  for (const movie of movies) {
    const { Poster, Title, Type, Year, imdbID} = movie;
    const div = document.createElement('div');
    div.innerHTML = `
      <img src= "${Poster}" />
      <h1> ${Title} </h1>
    `;

    document.querySelector('#target').appendChild(div);
  }
}

let timeoutId;
const onInput = async (event) => {
    const searchTerm = event.target.value;
    const movies = await fetchData(searchTerm);
    renderMovies(movies);
}

input.addEventListener('input', debounce(onInput, 500));
