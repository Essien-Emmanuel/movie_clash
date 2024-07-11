const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearTimeout(timeout);
        clearInterval(interval);
        resolve();
      }
    }, 30);

    const timeout = setTimeout(() => {
      reject();
      clearInterval(interval);
    }, 2000);
  });
};

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

it("After searching, dropdown opens again", async () => {
  const input = document.querySelector("input");
  input.innerText = "Avengers";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const dropdown = document.querySelector(".dropdown");

  if (dropdown.className === "is-active")
    throw new Error("Expected dropdown to not be active");
});
