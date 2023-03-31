export { getData2 };
import { recipes } from "./recipes.js";

const main = document.querySelector("main");
const firstSearch = document.querySelector("#search");
const ul1 = document.querySelector("#ul-ingredient");
const ul2 = document.querySelector("#ul-appliance");
const ul3 = document.querySelector("#ul-ustensil");
const tags_ingredient = document.querySelector(".tags_ingredient");
const tags_appliance = document.querySelector(".tags_appliance");
const tags_ustensil = document.querySelector(".tags_ustensil");

let filteredRecipes = [];
let tags = {
  ingredient: [],
  appliance: [],
  ustensil: [],
};
let ing = [];
let app = [];
let ust = [];
function removeDuplicate(array) {
  let duplicateItems = [];
  const noDuplicate = array.filter((element) => {
    if (element in duplicateItems) {
      return false;
    }
    duplicateItems[element] = true;
    return true;
  });

  return noDuplicate;
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

  e.ingredients.forEach((element) => {
    const ingredient_details = document.createElement("p");
    ingredient.appendChild(ingredient_details);
    if (element.unit) {
      ingredient_details.textContent = `${element.ingredient} : ${element.quantity} ${element.unit}`;
    } else if (element.quantity) {
      ingredient_details.textContent = `${element.ingredient} : ${element.quantity}`;
    } else {
      ingredient_details.textContent = `${element.ingredient}`;
    }
  });

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
  tagList(e);
}
function searchRecipesWithTags(data) {
  if (
    !tags.ingredient.length &&
    !tags.appliance.length &&
    !tags.ustensil.length
  ) {
    filteredRecipes.forEach((element) => {
      return card(element);
    });
  } else {
    main.innerHTML = "";
    ing = [];
    app = [];
    ust = [];
    filteredRecipes = [];
    let allTag = [].concat(tags.ingredient, tags.appliance, tags.ustensil);

    data.forEach((element) => {
      let match = true;
      const data_e = JSON.stringify(element).toLowerCase();
      allTag.forEach((e) => {
        if (!data_e.includes(e)) {
          match = false;
          return;
        }
      });
      if (match) {
        filteredRecipes.push(element);
      }
    });
    filteredRecipes.forEach((element) => {
      return card(element);
    });
  }
  if (filteredRecipes.length <= 0) {
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
function searchRecipes() {
  main.innerHTML = "";
  filteredRecipes = [];
  ing = [];
  app = [];
  ust = [];
  const search = firstSearch.value.toLowerCase();
  if (!search || !search.length) {
    filteredRecipes = [...recipes];
  } else {
    filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(search) ||
        recipe.ingredients.find((ing) =>
          ing.ingredient.toLowerCase().includes(search)
        ) ||
        recipe.description.toLowerCase().includes(search) ||
        recipe.ustensils.find((ust) => ust.toLowerCase().includes(search)) ||
        recipe.appliance.toLowerCase().includes(search)
    );
  }
  searchRecipesWithTags(filteredRecipes);
}
function Tag(e, state) {
  const span = document.createElement("span");
  const iconClose = document.createElement("i");

  iconClose.classList.add("fa-regular");
  iconClose.classList.add("fa-circle-xmark");
  iconClose.classList.add("closeIcon");
  if (state == "ingredient") {
    tags_ingredient.appendChild(span);
    span.textContent = `${e}`;
    span.classList.add("tags_span_ingredient");
    span.classList.add("tag");
    span.appendChild(iconClose);
  } else if (state == "appliance") {
    tags_appliance.appendChild(span);
    span.textContent = `${e}`;
    span.classList.add("tags_span_appliance");
    span.classList.add("tag");
    span.appendChild(iconClose);
  } else if (state == "ustensil") {
    tags_ustensil.appendChild(span);
    span.textContent = `${e}`;
    span.classList.add("tags_span_ustensil");
    span.classList.add("tag");
    span.appendChild(iconClose);
  }
}
function sortDropDown() {
  const button_ingredient = document.querySelector("#button_ingredients");
  const button_appliance = document.querySelector("#button_appliances");
  const button_ustensil = document.querySelector("#button_ustensils");

  const modal_ingredient = document.querySelector("#search_ingredients");
  const modal_appliance = document.querySelector("#search_appliances");
  const modal_ustensil = document.querySelector("#search_ustensils");

  const inputSearchIng = document.getElementById("input_search_ingredients");
  const inputSearchApp = document.getElementById("input_search_appliances");
  const inputSearchUst = document.getElementById("input_search_ustensils");

  const html = document.querySelector("html");

  const icon = document.querySelectorAll(".fa-chevron-down");
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
      tags["ingredient"].push(e.target.textContent);
      tags["ingredient"].forEach((e) => {
        Tag(e, "ingredient");
      });
      searchRecipes();
    } else if (e.srcElement.className === "li-appliance") {
      // add tags
      tags_appliance.innerHTML = "";
      tags["appliance"].push(e.target.textContent);
      tags["appliance"].forEach((e) => {
        Tag(e, "appliance");
      });
      searchRecipes();
    } else if (e.srcElement.className === "li-ustensil") {
      // add tags
      tags_ustensil.innerHTML = "";
      tags["ustensil"].push(e.target.textContent);
      tags["ustensil"].forEach((e) => {
        Tag(e, "ustensil");
      });
      searchRecipes();
    } else if (e.srcElement.className.includes("closeIcon")) {
      // main.innerHTML = "";
      // filteredRecipes = [];
      // ing = [];
      // app = [];
      // ust = [];
      if (
        e.target.parentElement.className.replace(" tag", "") ===
        "tags_span_ingredient"
      ) {
        const index = tags["ingredient"].indexOf(
          e.target.parentElement.textContent
        );
        e.target.parentElement.remove();
        tags["ingredient"].splice(index, 1);
        searchRecipes();
      } else if (
        e.target.parentElement.className.replace(" tag", "") ===
        "tags_span_appliance"
      ) {
        const index = tags["appliance"].indexOf(
          e.target.parentElement.textContent
        );
        e.target.parentElement.remove();
        tags["appliance"].splice(index, 1);
      } else if (
        e.target.parentElement.className.replace(" tag", "") ===
        "tags_span_ustensil"
      ) {
        const index = tags["ustensil"].indexOf(
          e.target.parentElement.textContent
        );
        e.target.parentElement.remove();
        tags["ustensil"].splice(index, 1);
      }
      searchRecipes();
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
    ing = [];
    filteredRecipes.forEach((e) => {
      e.ingredients.forEach((element) => {
        ing.push(element.ingredient.toLowerCase());
      });
    });
    const ingredient = removeDuplicate(ing);
    ingredient.forEach((element) => {
      if (element.includes(inputSearchIng.value)) {
        const li = document.createElement("li");
        ul1.appendChild(li);
        li.textContent = element;
        li.classList.add("li-ingredient");
      }
    });
    if (ul1.innerHTML == "") {
      ul1.style.display = "flex";
      ul1.style.justifyContent = "center";
      ul1.style.alignItems = "center";
      ul1.innerHTML = "<p class = 'no_result2'>Aucun ingrédient trouvé...</p>";
    } else {
      ul1.style.display = "";
      ul1.style.justifyContent = "";
      ul1.style.alignItems = "";
    }
  });
  inputSearchApp.addEventListener("keyup", function (evt) {
    ul2.innerHTML = "";
    app = [];
    filteredRecipes.forEach((element) => {
      app.push(element.appliance.toLowerCase());
    });
    const appliance = removeDuplicate(app);
    appliance.forEach((element) => {
      if (element.includes(inputSearchApp.value)) {
        const li = document.createElement("li");
        ul2.appendChild(li);
        li.textContent = element;
        li.classList.add("li-appliance");
      }
    });
    if (ul2.innerHTML == "") {
      ul2.style.display = "flex";
      ul2.style.justifyContent = "center";
      ul2.style.alignItems = "center";
      ul2.innerHTML = "<p class = 'no_result2'>Aucun appareil trouvé...</p>";
    } else {
      ul2.style.display = "";
      ul2.style.justifyContent = "";
      ul2.style.alignItems = "";
    }
  });
  inputSearchUst.addEventListener("keyup", function (evt) {
    ul3.innerHTML = "";
    ust = [];
    filteredRecipes.forEach((e) => {
      e.ustensils.forEach((element) => {
        ust.push(element.toLowerCase());
      });
    });
    const ustensil = removeDuplicate(ust);
    ustensil.forEach((element) => {
      if (element.includes(inputSearchUst.value)) {
        const li = document.createElement("li");
        ul3.appendChild(li);

        li.textContent = element;
        li.classList.add("li-ustensil");
      }
    });
    if (ul3.innerHTML == "") {
      ul3.style.display = "flex";
      ul3.style.justifyContent = "center";
      ul3.style.alignItems = "center";
      ul3.innerHTML = "<p class = 'no_result2'>Aucun ustensil trouvé...</p>";
    } else {
      ul3.style.display = "";
      ul3.style.justifyContent = "";
      ul3.style.alignItems = "";
    }
  });
}
function tagList(p) {
  p.ingredients.forEach((element) => {
    ing.push(element.ingredient.toLowerCase());
  });
  [p.appliance].forEach((element) => {
    app.push(element.toLowerCase());
  });
  p.ustensils.forEach((element) => {
    ust.push(element.toLowerCase());
  });

  const ingredient = removeDuplicate(ing);
  const appliance = removeDuplicate(app);
  const ustensil = removeDuplicate(ust);
  ul1.innerHTML = "";
  ul2.innerHTML = "";
  ul3.innerHTML = "";
  ingredient.forEach((element) => {
    const li = document.createElement("li");
    ul1.appendChild(li);
    li.textContent = element;
    li.classList.add("li-ingredient");
  });

  appliance.forEach((element) => {
    const li = document.createElement("li");
    ul2.appendChild(li);
    li.textContent = element;
    li.classList.add("li-appliance");
  });
  ustensil.forEach((element) => {
    const li = document.createElement("li");
    ul3.appendChild(li);
    li.textContent = element;
    li.classList.add("li-ustensil");
  });
}
// Récupère les datas
function getData2() {
  // State by defautl
  recipes.forEach((element) => {
    filteredRecipes.push(element);
    card(element);
  });
  firstSearch.addEventListener("keyup", function (evt) {
    if (firstSearch.value.length >= 3) {
      filteredRecipes = [];
      ing = [];
      app = [];
      ust = [];
      main.innerHTML = "";
      searchRecipes();
    }
    if (firstSearch.value == "") {
      filteredRecipes = [];
      ing = [];
      app = [];
      ust = [];
      main.innerHTML = "";
      searchRecipes();
    }
  });
  sortDropDown();
}
