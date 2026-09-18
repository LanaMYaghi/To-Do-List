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

// عناصر Modal تعديل الحالة الجديدة
const editStatusModal = document.getElementById("editStatusModal");
const closeEditStatusBtn = document.getElementById("closeEditStatusBtn");
const cancelEditStatusBtn = document.getElementById("cancelEditStatusBtn");
const editStatusForm = document.getElementById("editStatusForm");
const editTaskIdInput = document.getElementById("editTaskId");
const editStatusSelect = document.getElementById("editStatusSelect");

let allTasks = [];
let allUsers = [];


const getTasks = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};


const getStatusBadge = (status) => {
  switch (status) {
    case "In Progress":
      return `<span class="badge bg-warning text-dark">In Progress</span>`;
    case "Completed":
      return `<span class="badge bg-success">Completed</span>`;
    case "Pending":
    default:
      return `<span class="badge bg-secondary">Pending</span>`;
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
    const status = task.status || "Pending";
    const statusHtml = getStatusBadge(status);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.taskName || task.name}</td>
      <td>${userName}</td>
      <td>${statusHtml}</td>
      <td>
        <button class="btn btn-warning btn-sm edit-status-btn" data-id="${task.id}" data-status="${status}">
          Edit Status
        </button>
        <button class="btn btn-danger btn-sm delete-task-btn" data-id="${task.id}">
          Delete
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // أحداث فتح النافذة لتحديد الحالة يدويًا
  const editButtons = document.querySelectorAll(".edit-status-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const currentStatus = button.dataset.status;
      openEditStatusModal(id, currentStatus);
    });
  });

  // أحداث الحذف
  const deleteButtons = document.querySelectorAll(".delete-task-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      deleteTask(id);
    });
  });
};


const applyTaskFilter = () => {
  const selectedStatus = statusFilter ? statusFilter.value : "All";
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
    applyTaskFilter();
  } catch (error) {
    console.error("Failed to load tasks:", error);
  }
};


const loadtaskUsers = async () => {
  try {
    const users = await getUsers();
    if (!userSelect) return;
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

if (openAddTaskBtn) {
  openAddTaskBtn.addEventListener("click", () => {
    if (addTaskModal) addTaskModal.style.display = "flex";
    loadtaskUsers();
  });
}

const closeModal = () => {
  if (addTaskModal) addTaskModal.style.display = "none";
  if (editStatusModal) editStatusModal.style.display = "none";
};

if (closeAddTaskBtn) closeAddTaskBtn.addEventListener("click", closeModal);
if (cancelAddTaskBtn) cancelAddTaskBtn.addEventListener("click", closeModal);
if (closeEditStatusBtn) closeEditStatusBtn.addEventListener("click", closeModal);
if (cancelEditStatusBtn) cancelEditStatusBtn.addEventListener("click", closeModal);

// فتح نافذة اختيار الحالة اليدوية
const openEditStatusModal = (id, currentStatus) => {
  editTaskIdInput.value = id;
  editStatusSelect.value = currentStatus;
  editStatusModal.style.display = "flex";
};

const createTask = async (url, task) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

if (addTaskForm) {
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

    try {
      await createTask(taskUrl, newTask);
      addTaskForm.reset();
      closeModal();
      await loadTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  });
}

if (editStatusForm) {
  editStatusForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = editTaskIdInput.value;
    const selectedStatus = editStatusSelect.value;

    try {
      const response = await fetch(`${taskUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) throw new Error("Failed to update task status");

      closeModal();
      await loadTasks();
    } catch (error) {
      console.error("Failed to change status:", error);
    }
  });
}


async function deleteTask(id) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${taskUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete task");

    await loadTasks();
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}
// ========================================
// NEW MULTI-ASSIGNMENT ELEMENTS
// ========================================
const openAssignTaskToUsersBtn = document.getElementById("openAssignTaskToUsersBtn");
const openAssignUserTasksBtn = document.getElementById("openAssignUserTasksBtn");

const assignTaskToUsersModal = document.getElementById("assignTaskToUsersModal");
const assignUserTasksModal = document.getElementById("assignUserTasksModal");

const multiUsersSelect = document.getElementById("multiUsersSelect");
const singleUserSelect = document.getElementById("singleUserSelect");

const assignTaskToUsersForm = document.getElementById("assignTaskToUsersForm");
const assignUserTasksForm = document.getElementById("assignUserTasksForm");

// إغلاق النوافذ الجديدة
document.querySelectorAll(".close-multi-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (assignTaskToUsersModal) assignTaskToUsersModal.style.display = "none";
    if (assignUserTasksModal) assignUserTasksModal.style.display = "none";
  });
});

// تعبئة قوائم المستخدمين
const populateUsersSelects = async () => {
  const users = await getUsers();
  if (multiUsersSelect) {
    multiUsersSelect.innerHTML = "";
    users.forEach((u) => {
      multiUsersSelect.innerHTML += `<option value="${u.id}">${u.name}</option>`;
    });
  }
  if (singleUserSelect) {
    singleUserSelect.innerHTML = '<option value="">Select User</option>';
    users.forEach((u) => {
      singleUserSelect.innerHTML += `<option value="${u.id}">${u.name}</option>`;
    });
  }
};

// فتح النافذة الأولى: مهمة واحدة لأكثر من مستخدم
if (openAssignTaskToUsersBtn) {
  openAssignTaskToUsersBtn.addEventListener("click", () => {
    populateUsersSelects();
    assignTaskToUsersModal.style.display = "flex";
  });
}

// فتح النافذة الثانية: عدة مهام لمستخدم واحد
if (openAssignUserTasksBtn) {
  openAssignUserTasksBtn.addEventListener("click", () => {
    populateUsersSelects();
    assignUserTasksModal.style.display = "flex";
  });
}

// ========================================
// 1. إرسال مهمة واحدة لعدة مستخدمين
// ========================================
if (assignTaskToUsersForm) {
  assignTaskToUsersForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskName = document.getElementById("multiTaskName").value.trim();
    const status = document.getElementById("multiTaskStatus").value;
    const selectedUserIds = Array.from(multiUsersSelect.selectedOptions).map(opt => opt.value);

    if (selectedUserIds.length === 0) {
      alert("Please select at least one user");
      return;
    }

    try {
      // إنشاء طلبات إنشاء لكل مستخدم بالتوازي
      const promises = selectedUserIds.map((userId) =>
        createTask(taskUrl, { taskName, status, user_id: userId })
      );
      await Promise.all(promises);

      assignTaskToUsersForm.reset();
      assignTaskToUsersModal.style.display = "none";
      await loadTasks();
    } catch (error) {
      console.error("Failed to assign task to multiple users:", error);
    }
  });
}

// ========================================
// 2. إرسال عدة مهام لمستخدم واحد
// ========================================
if (assignUserTasksForm) {
  assignUserTasksForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userId = singleUserSelect.value;
    const rawTasks = document.getElementById("multipleTaskNames").value;
    const status = document.getElementById("bulkTasksStatus").value;

    // تقسيم النص إلى أسماء مهام (سواء بفاصلة أو بسطر جديد)
    const taskNames = rawTasks
      .split(/[\n,]/)
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (taskNames.length === 0) {
      alert("Please enter at least one task name");
      return;
    }

    try {
      // إنشاء طلبات لكل مهمة بنفس المستخدِم
      const promises = taskNames.map((taskName) =>
        createTask(taskUrl, { taskName, status, user_id: userId })
      );
      await Promise.all(promises);

      assignUserTasksForm.reset();
      assignUserTasksModal.style.display = "none";
      await loadTasks();
    } catch (error) {
      console.error("Failed to assign multiple tasks to user:", error);
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});