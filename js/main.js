let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(700);
    $("body").css("overflow", "visible");
  });
});

function openSideNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);
  $(".open-close-icon").removeClass("fa-bars");
  $(".open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}
function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate({ left: -boxWidth }, 500);
  $(".open-close-icon").addClass("fa-bars");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

function displayMeals(arr) {
  let Box = ``;
  for (let i = 0; i < arr.length; i++) {
    Box += `<div class="col-md-3">
        <div  onclick="getMealDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img src="${arr[i].strMealThumb}" alt="" class="w-100">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${arr[i].strMeal}</h3>
          </div>
        </div>
      </div>`;
  }
  rowData.innerHTML = Box;
}
async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}
function displayCategories(arr) {
  let Box = ``;
  for (let i = 0; i < arr.length; i++) {
    Box += `<div class="col-md-3">
  <div onclick="getCategoryMeal('${
    arr[i].strCategory
  }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
    <img src="${arr[i].strCategoryThumb}" alt="" class="w-100">
    <div class="meal-layer position-absolute text-center text-black p-2">
      <h3>${arr[i].strCategory}</h3>
      <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
  </div>
</div>`;
  }
  rowData.innerHTML = Box;
}
async function getCategoryMeal(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}
function displayArea(arr) {
  let Box = ``;
  for (let i = 0; i < arr.length; i++) {
    Box += `<div class="col-md-3">
    <div  onclick="getAreaMeal('${arr[i].strArea}')" class="text-center rounded-2 cursor-pointer">
    <i class="fa-solid fa-house-laptop fa-3x"></i>
    <h3>${arr[i].strArea}</h3>
     
    </div>
  </div>`;
  }
  rowData.innerHTML = Box;
}
async function getAreaMeal(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
function displayIngredients(arr) {
  let Box = ``;
  for (let i = 0; i < arr.length; i++) {
    Box += `<div class="col-md-3">
    <div   onclick="getIngredientMeal('${
      arr[i].strIngredient
    }')"  class="text-center rounded-2 cursor-pointer">
    <i class="fa-solid fa-drumstick-bite fa-2x"></i>
    <h3>${arr[i].strIngredient}</h3>
    <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
     
    </div>
  </div>`;
  }
  rowData.innerHTML = Box;
}
async function getIngredientMeal(ingredient) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
async function getMealDetails(maleId) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${maleId}`
  );
  response = await response.json();
  displayMealDetailes(response.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}
function displayMealDetailes(meal) {
  searchContainer.innerHTML = "";
  let ingredient = ``;
  for (let i = 0; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredient += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]} </li>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }
  let Box = `<div class="col-md-4">
<img src="${meal.strMealThumb}" class="w-100 rounded-3 " alt="">
<h3>${meal.strMeal}</h3>
</div>
<div class="col-md-8">
<h2>Instructions</h2>
<p>${meal.strInstructions}</p>
<h3><span class="fw-bolder">Area :</span>${meal.strArea}</h3>
<h3><span class="fw-bolder">Category :</span>${meal.strCategory}</h3>
<h3>Recipes :</h3>
<ul class="list-unstyled d-flex g-3 flex-wrap">${ingredient}</ul>
<h3>Tags :</h3>
<ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
<a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
<a href="${meal.strYoutube}" target="_blank" class="btn btn-success">Youtube</a>
</div>
`;
  rowData.innerHTML = Box;
}
function showSearchInbut() {
  searchContainer.innerHTML = `<div class="row py-4">
  <div class="col-md-6">
    <input
    onkeyup="searchByName(this.value)" 
      type="text"
      class="form-control bg-transparent text-white"
      placeholder="Search By Name"
    />
  </div>
  <div class="col-md-6">
    <input
    onkeyup="searchByLetter(this.value)"
      type="text"
      class="form-control bg-transparent text-white"
      placeholder="Search By Frist Letter"
      maxlength="1"
    />
  </div>
</div>`;
  rowData.innerHTML = "";
}
async function searchByName(name) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}
async function searchByLetter(Letter) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  Letter == "" ? (Letter = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${Letter}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

function showContact() {
  searchContainer.innerHTML=""
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
    <div class="row g-4">
      <div class="col-md-6">
        <input onkeyup="inputsValidation()"  type="text" id="nameInbut" placeholder="Enter Your Name" class="form-control">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none" >
          Special characters and numbers not allowed
        </div>
      </div>
      <div class="col-md-6">
        <input  onkeyup="inputsValidation()" type="email" id="emailInbut" placeholder="Enter Your Email" class="form-control">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none" >
        Email not valid *exemple@yyy.zzz
        </div>
      </div>
      <div class="col-md-6">
      <input  onkeyup="inputsValidation()" type="text" id="phoneInbut" placeholder="Enter Your phone" class="form-control">
      <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none" >
      Enter valid Phone Number
      </div>
    </div>
    <div class="col-md-6">
      <input  onkeyup="inputsValidation()" type="number" id="ageInbut" placeholder="Enter Your age" class="form-control">
      <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none" >
      Enter valid age
      </div>
    </div>
    <div class="col-md-6">
    <input  onkeyup="inputsValidation()" type="password" id="passwordInbut" placeholder="Enter Your password" class="form-control">
    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none" >
    Enter valid password *Minimum eight characters, at least one letter and one number:*
    </div>
  </div>
  <div class="col-md-6">
  <input  onkeyup="inputsValidation()" type="password" id="repasswordInbut" placeholder="Enter Your password agine" class="form-control">
  <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none" >
  Enter valid password
  </div>
</div>
    </div>
    <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">submit</button>
  </div>
</div>`;
  submitBtn = document.getElementById("submitBtn");
  document.getElementById("nameInbut").addEventListener("focus", () => {
    nameInputTouched = true;
  });
  document.getElementById("emailInbut").addEventListener("focus", () => {
    emailInbutTouched = true;
  });
  document.getElementById("phoneInbut").addEventListener("focus", () => {
    phoneInbutTouched = true;
  });
  document.getElementById("ageInbut").addEventListener("focus", () => {
    ageInbutTouched = true;
  });
  document.getElementById("passwordInbut").addEventListener("focus", () => {
    passwordInbutTouched = true;
  });
  document.getElementById("repasswordInbut").addEventListener("focus", () => {
    repasswordInbutTouched = true;
  });
}
let nameInputTouched = false;
let emailInbutTouched = false;
let phoneInbutTouched = false;
let ageInbutTouched = false;
let passwordInbutTouched = false;
let repasswordInbutTouched = false;
function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInbutTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (phoneInbutTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (ageInbutTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (passwordInbutTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInbutTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (
    nameValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInbut").value);
}
function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInbut").value
  );
}
function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInbut").value
  );
}
function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInbut").value
  );
}
function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInbut").value
  );
}
function repasswordValidation() {
  return (
    document.getElementById("repasswordInbut").value ==
    document.getElementById("passwordInbut").value
  );
}
$("#logo").click(function(){
  searchByName("")
})