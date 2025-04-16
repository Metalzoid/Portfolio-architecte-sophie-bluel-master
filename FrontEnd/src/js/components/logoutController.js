export const logoutController = () => {
  const token = sessionStorage.getItem("token");
  const logoutLink = document.querySelector("#login-link");
  if (token) {
    logoutLink.addEventListener("click", () => {
      logout();
    });
  }
};

const logout = () => {
  sessionStorage.removeItem("token");
  window.location.reload();
};
