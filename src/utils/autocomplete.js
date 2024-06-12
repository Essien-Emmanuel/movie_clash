const createAutocomplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  root.innerHTML = `
    <label> <b>Search</b></label>
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


  const renderItems = (items, renderOption, onOptionSelect, inputValue) => {
    dropdown.classList.add('is-active');
    for (const item of items) {
      const optionAnchor = document.createElement('a');
        
      optionAnchor.classList.add('dropdown-item');

      optionAnchor.innerHTML = renderOption(item)
    optionAnchor.addEventListener('click', event => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item)
      });

      resultsWrapper.appendChild(optionAnchor);
    }
  }

  const onInput = (fetchData) => {
    return async (event) => {
      const searchTerm = event.target.value;
      const itemsResult = await fetchData('s', searchTerm);
  
      if (!itemsResult.Response) {
        dropdown.classList.remove('is-active'); 
        return
      }
  
      const items = itemsResult.Search
      resultsWrapper.innerHTML = "";
        
      renderItems(items, renderOption, onOptionSelect, inputValue)
    }

  }

  input.addEventListener('input', debounce(onInput(fetchData), 500));

  document.addEventListener('click', event => {
    const clickedElement = event.target;
    const isTarget = root.contains(clickedElement);

    if (!isTarget) dropdown.classList.remove('is-active');
  });
}