"use strict";

/* ===== DOM ELEMENTS ===== */
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editMode = false;
let editTaskId = null;


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(text) {
    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });
}

function updateTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task) task.text = newText;
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
    }
}

function openEditTask(task) {
    todoInput.value = task.text;
    editMode = true;
    editTaskId = task.id;
    todoInput.focus();
}


/* ===== TASK DISPLAY ===== */
function renderTasks() {
    todoList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // TASK CONTENT (checkbox + text)
        const taskContent = document.createElement("div");
        taskContent.className = "task-content";

        const label = document.createElement("label");
        label.className = "checkbox";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const spanCheck = document.createElement("span");

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
            saveTasks();
            renderTasks();
        });

        label.appendChild(checkbox);
        label.appendChild(spanCheck);

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        taskContent.appendChild(label);
        taskContent.appendChild(span);

        // TASK ACTIONS
        const taskActions = document.createElement("div");
        taskActions.className = "taskActions";

        // OPEN EDIT MODE
        const editBtn = document.createElement("button");
        editBtn.className = "icon-btn";
        editBtn.innerHTML = "✏️";
        editBtn.addEventListener("click", () => openEditTask(task));

        // DELETE
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "icon-btn";
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
            saveTasks();
            renderTasks();
        });

        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);

        li.appendChild(taskContent);
        li.appendChild(taskActions);

        todoList.appendChild(li);
    });
}

/* ===== EVENT ===== */
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();
    if (!text) return;

    if (editMode) {
        updateTask(editTaskId, text);
        editMode = false;
        editTaskId = null;
    } else {
        addTask(text);
    }

    todoInput.value = "";
    // Place le curseur directement dans l'input pour faciliter la modification
    todoInput.focus();

    saveTasks();
    renderTasks();
});



/* ===== INIT ===== */
renderTasks();