document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".todo__input");
    const ul = document.querySelector(".todo__list");
    const saveBtn = document.querySelector(".todo__btn-save");
    const clearBtn = document.querySelector(".todo__btn-clear");
    const showHelp = document.querySelector(".todo__btn-showtips");
    const closeHelp = document.querySelector(".help__close");
    const helpBlock = document.querySelector(".help");
    const todoTitle = document.querySelector(".todo__title")
    let nowDate = new Date().toLocaleDateString();

    saveBtn.addEventListener("click", () => {
        localStorage.setItem("todo__list", ul.innerHTML);
    });
    clearBtn.addEventListener("click", () => {
        ul.innerHTML = "";
        localStorage.removeItem('todo__list', ul.innerHTML);
    });
    showHelp.addEventListener("click", () => {
        helpBlock.classList.toggle("active");
    });
    closeHelp.addEventListener("click", () => {
        helpBlock.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        if (event.target == helpBlock) {
            helpBlock.classList.toggle("active");
        }
    });
    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });
    todoTitle.append(nowDate);

    function createTodo() {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo__text");
        const newTodo = input.value;
        textSpan.append(newTodo);

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("trash-ico");
        deleteBtn.innerHTML = "&times;";
        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = "";
        listenDeleteTodo(deleteBtn);
    };

    function listenDeleteTodo(elem) {
        elem.addEventListener("click", () => {
            elem.parentElement.remove();
        });
    };

    function onClickTodo(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }
    ul.addEventListener("click", onClickTodo);

    function loadTodos() {
        const data = localStorage.getItem("todo__list");
        if (data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        for (const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }
    loadTodos();
});