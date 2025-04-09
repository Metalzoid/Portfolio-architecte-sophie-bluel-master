export const logoutController = () => {
  const token = localStorage.getItem("token");
  const logoutLink = document.querySelector("#login-link");
  if (token) {
    logoutLink.addEventListener("click", () => {
      logout();
    });
  }
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};
