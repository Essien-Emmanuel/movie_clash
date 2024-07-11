it("Shows autocomplete widget", () => {
  createAutocomplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not Avengers" },
        { Title: "some other movies" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});
