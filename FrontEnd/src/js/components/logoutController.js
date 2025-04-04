export const logoutController = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const loginLink = document.querySelector("#login-link");
    loginLink.textContent = "logout";
    loginLink.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  }
};
