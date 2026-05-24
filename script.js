"use strict";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let tasks = [];

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = todoInput.value.trim();
    if (!text) return;

    tasks.push(text);

    todoInput.value = "";

    renderTasks();
});

function renderTasks() {
    todoList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;

        todoList.appendChild(li);
        console.log("list : " + todoList);
    });

    console.log(tasks);
    
    
}

