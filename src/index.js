import "./style.css";

const selectOptions = [
  { value: "1", label: "Mrkva" },
  { value: "2", label: "Cikla" },
  { value: "3", label: "Grah" },
  { value: "4", label: "Paprika" },
  // ... more options
];

const select = [
  { value: "11", label: "kva" },
  { value: "22", label: "la" },
  { value: "33", label: "h" },
  { value: "44", label: "prika" },
  // ... more options
];

const settings = {
  theme: "dark", // light, dark
  search: false, // will enable search input in dropdown and search values
  multiSelect: true, // will enable multi selection of values
  dropdownButtonLabel: "Vegetables",
};
//const {theme, search, dropdownButtonLabel, multiSelect} = settings;

// const selectValues = [];
// let selectValue = null;

function createOptions(options, location, selector) {
  const selectValues = [];
  let selectValue = null;
  options.forEach((option) => {
    let dropdownOption = document.createElement("li");

    dropdownOption.setAttribute("value", option.value);
    dropdownOption.innerText = option.label;
    dropdownOption.classList.add(settings.theme);
    dropdownOption.addEventListener("click", (event) => {
      if (settings.multiSelect) {
        if (!dropdownOption.classList.contains("selected")) {
          dropdownOption.classList.add("selected");
          let selectedOptions = document.getElementsByClassName("selected");
          let values = Object.values(selectedOptions);
          selectValues.splice(0);
          values.forEach((item) => selectValues.push(item.value));
          getValues(selector, selectValues);
        } else {
          dropdownOption.classList.remove("selected");
          let selectedOptions = document.getElementsByClassName("selected");
          let values = Object.values(selectedOptions);
          selectValues.splice(0);
          values.forEach((item) => selectValues.push(item.value));
          getValues(selector, selectValues);
        }
      } else {
        let selectedOptions = document.getElementsByClassName("selected");
        let values = Object.values(selectedOptions);
        values.forEach((item) => item.classList.remove("selected"));
        if (!event.target.classList.contains("selected")) {
          event.target.classList.add("selected");
          selectValue = event.target.value;
          getValues(selector, selectValue);
        } else {
          event.target.classList.remove("selected");
          selectValue = null;
          getValues(selector, selectValue);
        }
      }
    });
    location.appendChild(dropdownOption);
  });
}

function getValues(selector, values) {
  console.log(selector, "FFFF");
  if (settings.multiSelect) {
    console.log(
      `Selected values of dropdown menu with id "${selector.id}"  are ${values}`
    );
    return values;
  } else {
    console.log(
      `Selected values of dropdown menu with id "${selector.id}"  are ${values}`
    );
    return values;
  }
}

function create(selector, options, settings) {
  const createAt = document.getElementById(selector);
  createAt.style.width = "200px";
  const dropdown = document.createElement("ul");

  dropdown.style.display = "none";

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  dropdown.insertAdjacentElement("afterbegin", searchInput);

  const dropButton = document.createElement("button");

  dropButton.innerText = settings.dropdownButtonLabel;

  settings.search //displays search input filed
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
    createOptions(options, dropdown, createAt);
  }
}

// create("dropdown", selectOptions, settings);
// create("drp", selectOptions, settings);

export default create;
