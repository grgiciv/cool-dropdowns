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

function createOptions(options) {
  options.forEach((option) => {
    let dropdownOption = document.createElement("li");
    dropdownOption.setAttribute("value", option.value);
    dropdownOption.innerText = option.label;
    dropdownOption.classList.add(settings.theme);
    dropdown.appendChild(dropdownOption);
  });
}

function filter(options, keyword) {
  let filteredOptions = options.filter((option) => {
    let lowerOption = option.label.toLowerCase();
    return lowerOption.includes(keyword);
  });
  createOptions(filteredOptions);
}

function create(selector, options, settings) {
  const createAt = document.getElementById(selector);
  const dropdown = document.createElement("ul");
  createAt.appendChild(dropdown);

  options.forEach((option) => {
    let dropdownOption = document.createElement("li");
    dropdownOption.setAttribute("value", option.value);
    dropdownOption.innerText = option.label;
    dropdownOption.classList.add(settings.theme);
    dropdown.appendChild(dropdownOption);
  });

  if (settings.search) {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    dropdown.insertAdjacentElement("beforebegin", searchInput);
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
    createOptions(options);
  }
}

create("dropdown", selectOptions, settings);
