"use strict";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let tasks = [];

let editMode = false;
let editTaskId = null;

renderTasks();

// ADD / UPDATE
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();
    if (!text) return;

    if (editMode) {
        const task = tasks.find(t => t.id === editTaskId);
        if (task) task.text = text;

        editMode = false;
        editTaskId = null;

    } else {
        tasks.push({
            id: Date.now(),
            text,
            completed: false
        });
    }

    todoInput.value = "";
    renderTasks();
    // Place le curseur directement dans l'input pour faciliter la modification
    todoInput.focus();
});

// TASK DISPLAY
function renderTasks() {
    todoList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // TASK CONTENT
        const taskContent = document.createElement("div");
        taskContent.className = "task-content";

        // CHECKBOX LABEL
        const label = document.createElement("label");
        label.className = "checkbox";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const spanCheck = document.createElement("span");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        label.appendChild(checkbox);
        label.appendChild(spanCheck);

        // TEXT
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        taskContent.appendChild(label);
        taskContent.appendChild(span);

        // TASK ACTIONS
        const taskActions = document.createElement("div");
        taskActions.className = "taskActions";

        // EDIT
        const editBtn = document.createElement("button");
        editBtn.className = "icon-btn";
        editBtn.innerHTML = "✏️";

        editBtn.addEventListener("click", () => {
            todoInput.value = task.text;
            editMode = true;
            editTaskId = task.id;
            todoInput.focus();
        });

        // DELETE
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "icon-btn";
        deleteBtn.innerHTML = "🗑️";

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);

        li.appendChild(taskContent);
        li.appendChild(taskActions);

        todoList.appendChild(li);
    });

    console.log(tasks);
    
    
}

