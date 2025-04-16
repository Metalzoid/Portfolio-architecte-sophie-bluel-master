const API_URL = "http://localhost:5678/api/";
const token = sessionStorage.getItem("token");

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return { error: "Email ou mot de passe incorrect" };
    }
  } catch {
    return { error: "Email ou mot de passe incorrect" };
  }
};

export const getWorks = async () => {
  try {
    const response = await fetch(`${API_URL}works`);
    const data = await response.json();
    return data;
  } catch {
    return { error: "Erreur lors de la récupération des travaux" };
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}categories`);
    const data = await response.json();
    return data;
  } catch {
    return { error: "Erreur lors de la récupération des catégories" };
  }
};

export const postWork = async (work) => {
  try {
    console.log(token);

    const response = await fetch(`${API_URL}works`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: work,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Erreur lors de l'ajout du travail : ", err };
  }
};

export const deleteWork = async (id) => {
  try {
    const response = await fetch(`${API_URL}works/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    return { error: "Erreur lors de la suppression du travail : ", err };
  }
};
