import { baseUrl, getUsers } from "./main.js";

const taskUrl = `${baseUrl}/tasks`;

const addTaskModal = document.getElementById("addTaskModal");
const openAddTaskBtn = document.getElementById("openAddTaskBtn");
const closeAddTaskBtn = document.getElementById("closeAddTaskBtn");
const cancelAddTaskBtn = document.getElementById("cancelAddTaskBtn");

const addTaskForm = document.getElementById("addTaskForm");
const taskStatusSelect = document.getElementById("taskStatus");
const taskNameInput = document.getElementById("taskName");
const userSelect = document.getElementById("user");
const statusFilter = document.getElementById("statusFilter");

let allTasks = [];
let allUsers = [];

// GET all tasks
const getTasks = async (Url) => {
  return fetch(Url)
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

const getStatusBadge = (status) => {
  switch (status) {
    case "In Progress":
      return '<span class="badge bg-warning text-dark">In Progress</span>';
    case "Completed":
      return '<span class="badge bg-success">Completed</span>';
    case "Pending":
    default:
      return '<span class="badge bg-secondary">Pending</span>';
  }
};

const renderTasks = (tasks, users) => {
  const tbody = document.getElementById("tasksTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  tasks.forEach((task, index) => {
    const assignedUser = users.find(
      (u) => u.id == task.userId || u.id == task.user_id
    );
    const userName = assignedUser ? assignedUser.name : "Unassigned";
    const statusHtml = getStatusBadge(task.status || "Pending");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.taskName || task.name}</td>
      <td>${userName}</td>
      <td>${statusHtml}</td>
    `;
    tbody.appendChild(tr);
  });
};

const applyTaskFilter = () => {
  const selectedStatus = statusFilter.value;

  if (selectedStatus === "All") {
    renderTasks(allTasks, allUsers);
  } else {
    const filteredTasks = allTasks.filter(
      (task) => (task.status || "Pending") === selectedStatus
    );
    renderTasks(filteredTasks, allUsers);
  }
};

const loadTasks = async () => {
  try {
    allTasks = await getTasks(taskUrl);
    allUsers = await getUsers();

    console.log("Tasks:", allTasks);
    console.log("Users:", allUsers);

    applyTaskFilter();
    renderTasks(tasks, users);
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
};

const loadtaskUsers = async () => {
  try {
    const users = await getUsers();
    userSelect.innerHTML = '<option value="">Select a user</option>';

    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = `${user.name} - ${user.email}`;
      userSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading users:", error);
  }
};

if (statusFilter) {
  statusFilter.addEventListener("change", applyTaskFilter);
}

openAddTaskBtn.addEventListener("click", () => {
  //addTaskModal.style.display = "block";
  addTaskModal.style.display = "flex";
  loadtaskUsers();
});
const closeModal = () => (addTaskModal.style.display = "none");
closeAddTaskBtn.addEventListener("click", closeModal);
cancelAddTaskBtn.addEventListener("click", closeModal);

const createTask = async (url, task) => {
  return fetch(url, {
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

//Submit The Form Of Add New Task(Send Add Task Form)
addTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const taskName = taskNameInput.value.trim();
  const taskStatus = taskStatusSelect.value;
  const userId = userSelect.value;

  if (!taskName || !userId) {
    alert("Please enter task name and select a user");
    return;
  }

  const newTask = {
    taskName: taskName,
    status: taskStatus,
    user_id: userId,
  };

  console.log("New Task:", newTask);
  try {
    const createdTask = await createTask(taskUrl, newTask);
    console.log("Task created successfully:", createdTask);
    addTaskForm.reset();
    closeModal();
    await loadTasks();
  } catch (error) {
    console.error("Failed to create task:", error);
  }
});

await loadTasks();
