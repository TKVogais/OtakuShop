const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  document.getElementById('l_user').value = "";
  document.getElementById('l_pass').value = "";
});

sign_in_btn.addEventListener("click", () => {
  ModoLogin()
});

const ModoLogin = () => {
  container.classList.remove("sign-up-mode");
  document.getElementById('c_user').value = "";
  document.getElementById('c_pass').value = "";
  document.getElementById('c_passc').value = "";
  document.getElementById('c_email').value = "";
}