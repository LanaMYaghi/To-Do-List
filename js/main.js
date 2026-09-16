const userUrl = "http://localhost:3000/users";

// GET all users
const getUsers = async (userUrl) => {
  return fetch(`${userUrl}`)
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

// GET single user by id
const getUserById = async (userUrl, id) => {
  return fetch(`${userUrl}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user");
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

// POST create user
const createUser = async (userUrl, user) => {
  return fetch(`${userUrl}`, {
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

// PATCH update user (partial update)
const patchUser = async (userUrl, id, user) => {
  return fetch(`${userUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to patch user");
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




// run all operations

// const singleUser = await getUserById(userUrl, "ci5RLpkhU78");
// console.log("Single user:", singleUser);

// const newUser = await createUser(userUrl, {
//   name: "John",
//   email: "john@example.com",
// });
// console.log("Created user:", newUser);

const users = await getUsers(userUrl);
console.log("All users:", users);

// const updatedUser = await updateUser(userUrl, "ci5RLpkhU78", {
//   name: "lana Updated",
//   email: "john@example.com",
// });
// console.log("Updated user:", updatedUser);

// const patchedUser = await patchUser(userUrl, "ci5RLpkhU78", { name: "John Patched" });
// console.log("Patched user:", patchedUser);

// const isDeleted = await deleteUser(userUrl, "mvmv8iVOCAU");
// console.log("Deleted:", isDeleted);
