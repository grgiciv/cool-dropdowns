const selectOptions = [
  { value: "1", label: "Mrkva" },
  { value: "2", label: "Cikla" },
  { value: "3", label: "Grah" },
  { value: "4", label: "Paprika" },

  // ... more options
];

const settings = {
  theme: "dark", // light, dark
  search: true, // will enable search input in dropdown and search values
  multiSelect: false, // will enable multi selection of values
};

function createOptions(options, location) {
  options.forEach((option) => {
    let dropdownOption = document.createElement("li");
    dropdownOption.setAttribute("value", option.value);
    dropdownOption.innerText = option.label;
    dropdownOption.classList.add(settings.theme);
    location.appendChild(dropdownOption);
  });
}

function create(selector, options, settings) {
  const createAt = document.getElementById(selector);
  const dropdown = document.createElement("ul");
  dropdown.style.display = "none";

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  dropdown.insertAdjacentElement("afterbegin", searchInput);

  const dropButton = document.createElement("button");
  dropButton.innerText = "Dropdown";
  settings.search
    ? (searchInput.style.display = "")
    : (searchInput.style.display = "none");
  dropButton.addEventListener("click", () => {
    if (dropdown.style.display === "none") {
      dropdown.style.display = "";
    } else {
      dropdown.style.display = "none";
    }
  });
  createAt.appendChild(dropButton);
  createAt.appendChild(dropdown);

  if (settings.search) {
    createOptions(options, dropdown);

    searchInput.addEventListener("keyup", () => {
      let listItems = dropdown.querySelectorAll("li");
      for (let i = 0; i < listItems.length; i++) {
        if (
          listItems[i].innerHTML
            .toUpperCase()
            .includes(searchInput.value.toUpperCase())
        ) {
          listItems[i].style.display = "block";
        } else {
          listItems[i].style.display = "none";
        }
      }
    });
  } else {
    createOptions(options, dropdown);
  }
}

create("dropdown", selectOptions, settings);
