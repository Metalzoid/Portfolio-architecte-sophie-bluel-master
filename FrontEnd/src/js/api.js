const API_URL = "http://localhost:5678/api/";

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

export const getWorks = async () => {
  const response = await fetch(`${API_URL}works`);
  const data = await response.json();
  return data;
};

export const getCategories = async () => {
  const response = await fetch(`${API_URL}categories`);
  const data = await response.json();
  return data;
};

export const postWork = async (work) => {
  const response = await fetch(`${API_URL}works`, {
    method: "POST",
    body: JSON.stringify(work),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const deleteWork = async (id) => {
  const response = await fetch(`${API_URL}works/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
