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

let timeoutId;
const onInput = (event) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    const searchTerm = event.target.value;
    fetchData(searchTerm);
  }, 1000);
}

input.addEventListener('input', onInput);
