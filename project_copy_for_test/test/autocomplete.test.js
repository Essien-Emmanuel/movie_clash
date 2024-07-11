it("Shows autocomplete widget", () => {
  createAutoComplete({
    root: document.querySelector("#target"),

    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not avengers" },
        { Title: "some other movies" },
      ];
    },

    renderOption(movie) {
      return movie.Title;
    },
  });
});
