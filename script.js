document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const clearBtn = document.getElementById("clear-btn");

    let editMode = false; // 新增一個變數用來追蹤是否處於編輯模式
    let editItem = null; // 新增一個變數用來保存被編輯的項目

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const todoText = input.value.trim();
        if (editMode) { // 如果處於編輯模式
            if (todoText !== "") {
                editItem.querySelector("span").textContent = todoText; // 更新原本項目的文字
                clearBtn.style.display = "block"; // 顯示清除按鈕
                form.reset(); // 重置表單
                form.classList.remove('edit-mode'); // 把編輯按鈕丟掉！！！
                editMode = false; // 退出編輯模式
            }
        } else { // 如果不是編輯模式，則新增項目
            if (todoText !== "") {
                addTodoItem(todoText);
                clearBtn.style.display = "block"; // 顯示清除按鈕
                form.reset(); // 重置表單
            }
        }
    });

    function addTodoItem(text) {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <span>${text}</span>
            <button class="edit-btn">編輯</button>
            <button class="delete-btn">刪除</button>
        `;
        todoList.appendChild(todoItem);
    }

    todoList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.remove();
            if (todoList.children.length === 0) {
                clearBtn.style.display = "none"; // 如果待辦事項列表空了，隱藏清除按鈕
            }
        } else if (event.target.classList.contains("edit-btn")) {
            const todoText = event.target.parentElement.querySelector("span").textContent; // 獲取待辦事項文字
            input.value = todoText; // 將待辦事項文字填入輸入框
            editMode = true; // 進入編輯模式
            editItem = event.target.parentElement; // 保存被編輯的項目
            const form = document.getElementById("todo-form");
            form.classList.add('edit-mode'); // 添加編輯模式的 CSS 類
        }
    });

    clearBtn.addEventListener("click", function() {
        todoList.innerHTML = "";
        clearBtn.style.display = "none"; // 清除後隱藏清除按鈕
    });
});
