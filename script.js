let hero_fname = document.querySelector(".hero-first-name");
const signUp = (e) => {
  let fname = document.getElementById("fname").value,
    lname = document.getElementById("lname").value,
    email = document.getElementById("email").value,
    pwd = document.getElementById("pwd").value,
    cpwd = document.getElementById("cpwd").value;

  if (pwd != cpwd) {
    alert("Passwords do not match. Please Try Again");
  } else {
    let formData = JSON.parse(localStorage.getItem("formData")) || [];

    let exist =
      formData.length &&
      JSON.parse(localStorage.getItem("formData")).some(
        (data) =>
          data.fname.toLowerCase() == fname.toLowerCase() &&
          data.lname.toLowerCase() == lname.toLowerCase()
      );

    if (!exist) {
      formData.push({ fname, lname, email, pwd });
      localStorage.setItem("formData", JSON.stringify(formData));
      document.querySelector("form").reset();
      document.getElementById("fname").focus();
      alert("Account Created Successfully");
      window.location.href = "signin.html";
    } else {
      alert("User Already Registered. Please Log In.");
    }
  }

  e.preventDefault();
};
var loggedInUser_lname = "";
var loggedInUser_fname = "";

function signIn(e) {
  let email = document.getElementById("email").value,
    pwd = document.getElementById("pwd").value;
  // console.log(email);
  let formData = JSON.parse(localStorage.getItem("formData")) || [];
  let matchedUser = formData.find(
    (data) => data.email.toLowerCase() == email && data.pwd== pwd
  );

  if (!matchedUser) {
    alert("Incorrect login credentials");
  } else {
    loggedInUser_lname = matchedUser.lname;
    loggedInUser_fname = matchedUser.fname;
    sessionStorage.setItem("loggedInUser_fname", loggedInUser_fname);
    sessionStorage.setItem("loggedInUser_lname", loggedInUser_lname);
    location.href = "/dashboard.html";
  }
  e.preventDefault();
}

document.addEventListener("DOMContentLoaded", function () {
  
  let heroFirstNameElement = document.getElementById("hero-first-name");
  let profile_fname = document.getElementById("profile-fname");
  let profile_lname = document.getElementById("profile-lname");

  if (heroFirstNameElement) {
    let storedUserFname = sessionStorage.getItem("loggedInUser_fname");
    heroFirstNameElement.innerText = storedUserFname || "";
  }
  if (profile_fname) {
    let storedUserFname = sessionStorage.getItem("loggedInUser_fname");
    profile_fname.innerText = storedUserFname || "";
  }
  if (profile_lname) {
    let storedUserLname = sessionStorage.getItem("loggedInUser_lname");
    profile_lname.innerText = storedUserLname || "";
  }
  fetchImages();
});

async function fetchImages() {
  
  const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=motivation&client_id=891D1HdacI4CmmaQLi-GCOFkjO5IAwobbP1nzMKoHyI&per_page=100`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results) {
      displayImages(data.results);
    } else {
      console.error("Unable to fetch images from Unsplash API.");
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
function displayImages(images)
{
  const imageContainer = document.querySelector(".hero-section-images");
  images.forEach((image) => {
    const imageElement = document.createElement("img");
    imageElement.src = image.urls.regular;
    imageElement.alt = image.alt_description;
    imageElement.classList.add('hero-image');
    imageContainer.appendChild(imageElement);
  });
}

let sign_out1 = document.getElementById("nav-btn-1");
sign_out1.addEventListener("click", () => {
  location.href = "/index.html";
})
let sign_out2 = document.getElementById("profile-btn-1");
sign_out2.addEventListener("click", () => {
  location.href = "/index.html";
});