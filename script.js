document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("name");
    const firstnameInput = document.getElementById("firstname");
    const ageInput = document.getElementById("age");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const data = JSON.parse(localStorage.getItem("userData")) || [];

    function renderList() {
        todoList.innerHTML = "";
        data.forEach((element, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${element.name} ${element.firstname}, ${element.age+' yosh'}</span>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
    addBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const firstname = firstnameInput.value.trim();
        const age = ageInput.value.trim();

        if (name && firstname && age) {
            data.unshift({ name, firstname, age });
            localStorage.setItem("userData", JSON.stringify(data));
            renderList();
            nameInput.value = "";
            firstnameInput.value = "";
            ageInput.value = "";
        }
    });
    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            data.splice(index, 1);
            localStorage.setItem("userData", JSON.stringify(data));
            renderList();
        }
    });

    renderList();
});