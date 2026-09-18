export const baseUrl = "http://localhost:3000";
const userUrl = "/users";

const createUser = async (url, user) => {
  return fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

// PUT update user (full replace)
const updateUser = async (userUrl, id, user) => {
  return fetch(`${userUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

// GET all users
export const getUsers = async () => {
  const url = `${baseUrl}${userUrl}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

// DELETE user
const deleteUser = async (userUrl, id) => {
  return fetch(`${userUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return true;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

const renderUsers = (users) => {
  const tbody = document.getElementById("usersTableBody");
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button class="btn btn-sm btn-warning edit-user-btn" data-id="${
          user.id
        }" data-name="${user.name}" data-email="${user.email}">
          Edit
        </button>
        <button class="btn btn-sm btn-danger delete-user-btn" data-id="${
          user.id
        }">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  attachUserActionListeners();
};

const attachUserActionListeners = () => {
  document.querySelectorAll(".edit-user-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const name = e.target.getAttribute("data-name");
      const email = e.target.getAttribute("data-email");

      document.getElementById("editUserId").value = id;
      document.getElementById("editUserName").value = name;
      document.getElementById("editUserEmail").value = email;

      document.getElementById("editUserModal").style.display = "flex";
    });
  });

  document.querySelectorAll(".delete-user-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");

      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteUser(`${baseUrl}${userUrl}`, id);
          await loadUsers();
        } catch (error) {
          console.error("Failed to delete user:", error);
        }
      }
    });
  });
};

const editUserModal = document.getElementById("editUserModal");
const closeEditUserBtn = document.getElementById("closeEditUserBtn");
const cancelEditUserBtn = document.getElementById("cancelEditUserBtn");

const closeEditModal = () => (editUserModal.style.display = "none");
closeEditUserBtn.addEventListener("click", closeEditModal);
cancelEditUserBtn.addEventListener("click", closeEditModal);

document
  .getElementById("editUserForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("editUserId").value;
    const name = document.getElementById("editUserName").value.trim();
    const email = document.getElementById("editUserEmail").value.trim();

    if (!name || !email) return;

    try {
      await updateUser(`${baseUrl}${userUrl}`, id, { name, email });
      closeEditModal();
      await loadUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  });

const loadUsers = async () => {
  try {
    const users = await getUsers();
    console.log(users);
    renderUsers(users);
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

const addUserModal = document.getElementById("addUserModal");
const closeAddUserBtn = document.getElementById("closeAddUserBtn");
const cancelAddUserBtn = document.getElementById("cancelAddUserBtn");

document.getElementById("openAddUserBtn").addEventListener("click", () => {
  //addUserModal.style.display = "block";
  addUserModal.style.display = "flex";
});

document.getElementById("addUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("userEmail").value.trim();
  const name = document.getElementById("userName").value.trim();

  if (!email || !name) return;

  try {
    await createUser(`${baseUrl}${userUrl}`, { email, name });
    e.target.reset();
    addUserModal.style.display = "none";
    await loadUsers();
  } catch (error) {
    console.error("Failed to create user", error);
  }
});

const closeModal = () => (addUserModal.style.display = "none");
closeAddUserBtn.addEventListener("click", closeModal);
cancelAddUserBtn.addEventListener("click", closeModal);

loadUsers();