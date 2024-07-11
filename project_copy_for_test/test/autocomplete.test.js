beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
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

it("Dropdown starts closed", () => {
  const dropdown = document.querySelector(".dropdown");

  if (dropdown.className === "is-active")
    throw new Error("Expected dropdown to not be active");
});

it("After searching, dropdown opens again", () => {
  const input = document.querySelector("input");
  input.innerText = "Avengers";
  input.dispatchEvent(new Event("input"));

  const dropdown = document.querySelector(".dropdown");

  if (dropdown.className === "is-active")
    throw new Error("Expected dropdown to not be active");
});
