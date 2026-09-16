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

/////////////////////////////////////////////////////////////////
const taskUrl = "http://localhost:3000/tasks";

// GET all tasks
const getTasks = async (taskUrl) => {
  return fetch(`${taskUrl}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
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

// GET single task by id
const getTaskById = async (taskUrl, id) => {
  return fetch(`${taskUrl}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch task");
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

// POST create task
const createTask = async (taskUrl, task) => {
  return fetch(`${taskUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create task");
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

// PUT update task (full replace)
const updateTask = async (taskUrl, id, task) => {
  return fetch(`${taskUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update task");
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

// PATCH update task (partial update)
const patchTask = async (taskUrl, id, task) => {
  return fetch(`${taskUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to patch task");
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

// DELETE task
const deleteTask = async (taskUrl, id) => {
  return fetch(`${taskUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      return true;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};




// run all operations

// const singleTask = await getTaskById(taskUrl, "ci5RLpkhU78");
// console.log("Single task:", singleTask);

// const newTask = await createTask(taskUrl, {
//   name: "John",
//   email: "john@example.com",
// });
// console.log("Created user:", newTask);

// const tasks = await getUsers(taskUrl);
// console.log("All users:", tasks);

// const updatedTask = await updateTask(taskUrl, "ci5RLpkhU78", {
//   name: "lana Updated",
//   email: "john@example.com",
// });
// console.log("Updated task:", updatedTask);

// const patchedTask = await patchTask(taskUrl, "ci5RLpkhU78", { name: "John Patched" });
// console.log("Patched task:", patchedTask);

// const isDeleted = await deleteTask(taskUrl, "mvmv8iVOCAU");
// console.log("Deleted:", isDeleted);
