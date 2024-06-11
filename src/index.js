const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "3957e820",
      s: searchTerm

    } 
  });
  console.log(response.data);
}

const input = document.querySelector('input');

input.addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  fetchData(searchTerm);
})