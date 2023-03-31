export { getData1 };
import { recipes } from "./recipes.js";

// DOM elements
const search = document.querySelector("#search");
const search_result = document.querySelector(".header_search_result");
const main = document.querySelector("main");

const modal_ingredient = document.getElementById("search_ingredients");
const modal_appliance = document.getElementById("search_appliances");
const modal_ustensil = document.getElementById("search_ustensils");

const button_ingredient = document.getElementById("button_ingredients");
const button_appliance = document.getElementById("button_appliances");
const button_ustensil = document.getElementById("button_ustensils");

const html = document.querySelector("html");

const inputSearchIng = document.getElementById("input_search_ingredients");
const inputSearchApp = document.getElementById("input_search_appliances");
const inputSearchUst = document.getElementById("input_search_ustensils");

const icon = document.querySelectorAll(".fa-chevron-down");

const ul1 = document.getElementById("ul-ingredient");
const ul2 = document.getElementById("ul-appliance");
const ul3 = document.getElementById("ul-ustensil");

const tags_ingredient = document.querySelector(".tags_ingredient");
const tags_appliance = document.querySelector(".tags_appliance");
const tags_ustensil = document.querySelector(".tags_ustensil");

let filteredRecipes = [];
let tag = [];
let tagsIngredient = [];
let tagsAppliance = [];
let tagsUstensil = [];
let output = [];
let outputIng = [];
let outputApp = [];
let outputUst = [];
let newRecipes = [];
function removeDuplicates(array) {
  for (let item of array) {
    if (!output.includes(item)) output.push(item);
  }
}
function removeDuplicatesIng(array) {
  for (let item of array) {
    if (!outputIng.includes(item)) outputIng.push(item);
  }
}
function removeDuplicatesApp(array) {
  for (let item of array) {
    if (!outputApp.includes(item)) outputApp.push(item);
  }
}
function removeDuplicatesUst(array) {
  for (let item of array) {
    if (!outputUst.includes(item)) outputUst.push(item);
  }
}
function card(e) {
  // DOM elements
  const article = document.createElement("article");
  const image = document.createElement("div");
  const recette_info = document.createElement("div");
  const recette_info1 = document.createElement("div");
  const recette_info2 = document.createElement("div");
  const name = document.createElement("p");
  const time = document.createElement("p");
  const ingredient = document.createElement("div");
  const description = document.createElement("p");

  main.appendChild(article);
  article.appendChild(image);
  article.appendChild(recette_info);

  recette_info.appendChild(recette_info1);
  recette_info1.appendChild(name);
  recette_info1.appendChild(time);

  recette_info.appendChild(recette_info2);
  recette_info2.appendChild(ingredient);

  for (let i = 0; i < e.ingredients.length; i++) {
    const element = e.ingredients[i];
    const ingredient_details = document.createElement("p");

    ingredient.appendChild(ingredient_details);
    if (element.unit) {
      ingredient_details.textContent = `${element.ingredient} : ${element.quantity} ${element.unit}`;
    } else if (element.quantity) {
      ingredient_details.textContent = `${element.ingredient} : ${element.quantity}`;
    } else {
      ingredient_details.textContent = `${element.ingredient}`;
    }
  }

  recette_info2.appendChild(description);

  article.classList.add("card_recipes");
  image.classList.add("card_recipes_image");
  recette_info.classList.add("card_recipes_info");
  recette_info1.classList.add("card_recipes_info1");
  recette_info2.classList.add("card_recipes_info2");
  ingredient.classList.add("ingredients");

  description.classList.add("card_recipes_description");

  name.textContent = e.name;
  time.textContent = `${e.time} min`;
  description.textContent = e.description;
}
function tags(e, state) {
  const span = document.createElement("span");
  const iconClose = document.createElement("i");

  iconClose.classList.add("fa-regular");
  iconClose.classList.add("fa-circle-xmark");
  iconClose.classList.add("closeIcon");
  if (state == 1) {
    tags_ingredient.appendChild(span);
    span.textContent = `${e}`;
    span.classList.add("tags_span_ingredient");
    span.classList.add("tag");
    span.appendChild(iconClose);
  } else if (state == 2) {
    tags_appliance.appendChild(span);
    span.textContent = `${e}`;
    span.classList.add("tags_span_appliance");
    span.classList.add("tag");
    span.appendChild(iconClose);
  } else if (state == 3) {
    tags_ustensil.appendChild(span);
    span.textContent = `${e}`;
    span.classList.add("tags_span_ustensil");
    span.classList.add("tag");
    span.appendChild(iconClose);
  }
}
function searchByTag(data, tags) {
  outputIng = [];
  outputApp = [];
  outputUst = [];
  ul1.innerHTML = "";
  ul2.innerHTML = "";
  ul3.innerHTML = "";
  main.innerHTML = "";
  newRecipes = [];
  filteredRecipes = [];
  for (let i = 0; i < data.length; i++) {
    let match = true;
    const data_e = JSON.stringify(data[i]).toLowerCase();
    for (let j = 0; j < tags.length; j++) {
      if (!data_e.includes(tags[j])) {
        match = false;
        break;
      }
    }
    if (match) {
      newRecipes.push(data[i]);
      filteredRecipes.push(data[i]);
    }
  }
  for (let k = 0; k < newRecipes.length; k++) {
    const e = newRecipes[k];
    const appliance = [e.appliance];

    card(e);

    for (let i = 0; i < e.ingredients.length; i++) {
      const element = e.ingredients[i];
      const element1 = element.ingredient.toLowerCase();

      removeDuplicatesIng([element1]);
    }

    removeDuplicatesApp(appliance);
    for (let i = 0; i < e.ustensils.length; i++) {
      const element = e.ustensils[i];
      const element1 = element.toLowerCase();

      removeDuplicatesUst([element1]);
    }
  }
  for (let i = 0; i < outputIng.length; i++) {
    const element = outputIng[i];
    const li = document.createElement("li");

    ul1.appendChild(li);

    li.textContent = element;

    li.classList.add("li-ingredient");
  }
  for (let i = 0; i < outputApp.length; i++) {
    const element = outputApp[i];
    const li = document.createElement("li");

    ul2.appendChild(li);

    li.textContent = element.toLowerCase();

    li.classList.add("li-appliance");
  }
  for (let i = 0; i < outputUst.length; i++) {
    const element = outputUst[i];
    const li = document.createElement("li");

    ul3.appendChild(li);

    li.textContent = element;

    li.classList.add("li-ustensil");
  }

  if (newRecipes.length <= 0) {
    main.style.display = "flex";
    main.style.justifyContent = "center";
    main.style.alignItems = "center";
    main.innerHTML = "<p class = 'no_result'>Aucun résultat trouvé...</p>";
  } else {
    main.style.display = "";
    main.style.justifyContent = "";
    main.style.alignItems = "";
  }
}
function searchByInput() {
  for (let i = 0; i < recipes.length; i++) {
    const e = recipes[i];
    const result = document.querySelectorAll(".search_result");
    const name = e.name.toLowerCase();
    const description = e.description.toLowerCase();
    const ustensils = JSON.stringify(e.ustensils).toLowerCase();
    const appliance = e.appliance.toLowerCase();
    const ingredient = JSON.stringify(e.ingredients).toLowerCase();

    if (name.includes(search.value)) {
      filteredRecipes.push(e);
    } else if (description.includes(search.value)) {
      filteredRecipes.push(e);
    } else if (ustensils.includes(search.value)) {
      filteredRecipes.push(e);
    } else if (appliance.includes(search.value)) {
      filteredRecipes.push(e);
    } else if (ingredient.includes(search.value)) {
      filteredRecipes.push(e);
    }
  }
}
// Récupère les datas
function getData1() {
  // state by default
  for (let i = 0; i < recipes.length; i++) {
    const e = recipes[i];
    const appliance = [e.appliance];

    filteredRecipes.push(e);
    card(e);
    for (let i = 0; i < e.ingredients.length; i++) {
      const element = e.ingredients[i];
      const element1 = element.ingredient.toLowerCase();

      removeDuplicatesIng([element1]);
    }

    removeDuplicatesApp(appliance);
    for (let i = 0; i < e.ustensils.length; i++) {
      const element = e.ustensils[i];
      const element1 = element.toLowerCase();

      removeDuplicatesUst([element1]);
    }
  }
  for (let i = 0; i < outputApp.length; i++) {
    const element = outputApp[i];
    const li = document.createElement("li");

    ul2.appendChild(li);

    li.textContent = element.toLowerCase();

    li.classList.add("li-appliance");
  }
  for (let i = 0; i < outputUst.length; i++) {
    const element = outputUst[i];
    const li = document.createElement("li");

    ul3.appendChild(li);

    li.textContent = element;

    li.classList.add("li-ustensil");
  }
  for (let i = 0; i < outputIng.length; i++) {
    const element = outputIng[i];
    const li = document.createElement("li");

    ul1.appendChild(li);

    li.textContent = element;

    li.classList.add("li-ingredient");
  }
  // state filtered
  search.addEventListener("keyup", function (evt) {
    if (search.value.length >= 3) {
      tagsIngredient = [];
      tagsAppliance = [];
      tagsUstensil = [];
      filteredRecipes = [];
      main.innerHTML = "";
      ul1.innerHTML = "";
      ul2.innerHTML = "";
      ul3.innerHTML = "";
      outputIng = [];
      outputApp = [];
      outputUst = [];
      searchByInput();
      searchByTag(filteredRecipes, tag);
    }
    if (firstSearch.value == "") {
      tagsIngredient = [];
      tagsAppliance = [];
      tagsUstensil = [];
      filteredRecipes = [];
      main.innerHTML = "";
      ul1.innerHTML = "";
      ul2.innerHTML = "";
      ul3.innerHTML = "";
      outputIng = [];
      outputApp = [];
      outputUst = [];
      searchByInput();
      searchByTag(filteredRecipes, tag);
    }
  });
  // state search precision when click outside & add tags
  html.addEventListener("click", (e) => {
    if (
      e.target === button_ingredient ||
      e.target === inputSearchIng ||
      e.target === icon[0]
    ) {
      modal_ingredient.style.display = "block";
      modal_appliance.style.display = "none";
      modal_ustensil.style.display = "none";

      button_ingredient.style.marginRight = "31.5em";
      button_appliance.style.marginRight = "";
      button_ustensil.style.marginRight = "";
    } else if (
      e.target === button_appliance ||
      e.target === inputSearchApp ||
      e.target === icon[1]
    ) {
      modal_appliance.style.display = "block";
      modal_ingredient.style.display = "none";
      modal_ustensil.style.display = "none";

      button_ingredient.style.marginRight = "";
      button_appliance.style.marginRight = "31.5em";
      button_ustensil.style.marginRight = "";
    } else if (
      e.target === button_ustensil ||
      e.target === inputSearchUst ||
      e.target === icon[2]
    ) {
      modal_ustensil.style.display = "block";
      modal_ingredient.style.display = "none";
      modal_appliance.style.display = "none";

      button_ingredient.style.marginRight = "";
      button_appliance.style.marginRight = "";
      button_ustensil.style.marginRight = "31.5em";
    } else if (e.srcElement.className === "li-ingredient") {
      // add tags
      tags_ingredient.innerHTML = "";
      newRecipes = [];
      filteredRecipes = [];
      tagsIngredient.push(e.target.textContent);
      tag.push(e.target.textContent);
      for (let i = 0; i < tagsIngredient.length; i++) {
        const e = tagsIngredient[i];
        tags(e, 1);
      }
      searchByInput();
      searchByTag(filteredRecipes, tag);
    } else if (e.srcElement.className === "li-appliance") {
      // add tags
      tags_appliance.innerHTML = "";
      newRecipes = [];
      filteredRecipes = [];
      tagsAppliance.push(e.target.textContent);
      tag.push(e.target.textContent);
      for (let i = 0; i < tagsAppliance.length; i++) {
        const e = tagsAppliance[i];
        tags(e, 2);
      }
      searchByInput();
      searchByTag(filteredRecipes, tag);
    } else if (e.srcElement.className === "li-ustensil") {
      // add tags
      tags_ustensil.innerHTML = "";
      newRecipes = [];
      filteredRecipes = [];
      tagsUstensil.push(e.target.textContent);
      tag.push(e.target.textContent);
      for (let i = 0; i < tagsUstensil.length; i++) {
        const e = tagsUstensil[i];
        tags(e, 3);
      }
      searchByInput();
      searchByTag(filteredRecipes, tag);
    } else if (e.srcElement.className.includes("closeIcon")) {
      filteredRecipes = [];
      newRecipes = [];
      const index = tag.indexOf(e.target.parentElement.textContent);
      if (index > -1) {
        // only splice array when item is found
        tag.splice(index, 1); // 2nd parameter means remove one item only
      }
      if (
        e.target.parentElement.className.replace(" tag", "") ===
        "tags_span_ingredient"
      ) {
        e.target.parentElement.remove();
        tagsIngredient.splice(tagsIngredient.length - 1, 1);
      } else if (
        e.target.parentElement.className.replace(" tag", "") ===
        "tags_span_appliance"
      ) {
        e.target.parentElement.remove();
        tagsAppliance.splice(tagsAppliance.length - 1, 1);
      } else if (
        e.target.parentElement.className.replace(" tag", "") ===
        "tags_span_ustensil"
      ) {
        e.target.parentElement.remove();
        tagsUstensil.splice(tagsUstensil.length - 1, 1);
      }
      searchByInput();
      searchByTag(filteredRecipes, tag);
    } else {
      modal_ingredient.style.display = "none";
      modal_appliance.style.display = "none";
      modal_ustensil.style.display = "none";

      button_ingredient.style.marginRight = "";
      button_appliance.style.marginRight = "";
      button_ustensil.style.marginRight = "";
    }
  });
  inputSearchIng.addEventListener("keyup", function (evt) {
    ul1.innerHTML = "";
    output = [];

    for (let index = 0; index < filteredRecipes.length; index++) {
      const e = filteredRecipes[index];
      for (let i = 0; i < e.ingredients.length; i++) {
        const element = e.ingredients[i];
        const element1 = element.ingredient.toLowerCase();

        removeDuplicates([element1]);
      }
    }
    for (let ind = 0; ind < output.length; ind++) {
      const element = output[ind];

      if (element.includes(inputSearchIng.value)) {
        const li = document.createElement("li");
        ul1.appendChild(li);

        li.textContent = element;
        li.classList.add("li-ingredient");
      }
    }
    if (ul1.innerHTML == "") {
      ul1.style.display = "flex";
      ul1.style.justifyContent = "center";
      ul1.style.alignItems = "center";
      ul1.innerHTML = "<p class = 'no_result2'>Aucun résultat trouvé...</p>";
    } else {
      ul1.style.display = "";
      ul1.style.justifyContent = "";
      ul1.style.alignItems = "";
    }
  });
  inputSearchApp.addEventListener("keyup", function (evt) {
    ul2.innerHTML = "";
    output = [];

    for (let i = 0; i < filteredRecipes.length; i++) {
      const e = filteredRecipes[i];
      const element = e.appliance.toLowerCase();

      removeDuplicates([element]);
    }
    for (let ind = 0; ind < output.length; ind++) {
      const element = output[ind];

      if (element.includes(inputSearchApp.value)) {
        const li = document.createElement("li");
        ul2.appendChild(li);

        li.textContent = element;
        li.classList.add("li-appliance");
      }
    }
    if (ul2.innerHTML == "") {
      ul2.style.display = "flex";
      ul2.style.justifyContent = "center";
      ul2.style.alignItems = "center";
      ul2.innerHTML = "<p class = 'no_result2'>Aucun résultat trouvé...</p>";
    } else {
      ul2.style.display = "";
      ul2.style.justifyContent = "";
      ul2.style.alignItems = "";
    }
  });
  inputSearchUst.addEventListener("keyup", function (evt) {
    ul3.innerHTML = "";
    output = [];

    for (let i = 0; i < filteredRecipes.length; i++) {
      const e = filteredRecipes[i];

      for (let i = 0; i < e.ustensils.length; i++) {
        const element = e.ustensils[i];
        const element1 = element.toLowerCase();

        removeDuplicates([element1]);
      }
    }
    for (let ind = 0; ind < output.length; ind++) {
      const element = output[ind];

      if (element.includes(inputSearchUst.value)) {
        const li = document.createElement("li");
        ul3.appendChild(li);

        li.textContent = element;
        li.classList.add("li-ustensil");
      }
    }
    if (ul3.innerHTML == "") {
      ul3.style.display = "flex";
      ul3.style.justifyContent = "center";
      ul3.style.alignItems = "center";
      ul3.innerHTML = "<p class = 'no_result2'>Aucun résultat trouvé...</p>";
    } else {
      ul3.style.display = "";
      ul3.style.justifyContent = "";
      ul3.style.alignItems = "";
    }
  });
}
