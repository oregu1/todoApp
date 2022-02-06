//ELEMENTS
const form = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');

let todosArr;
//1 step...check if something there in localStorage
!localStorage.todos ? todosArr = [] : todosArr = JSON.parse(localStorage.getItem('todos'));
//create todo-constructor
function Todo(description) {
    this.description = description;
    this.completed = false;
}

//function that cretes html-template
const createTodo = (todoItem, index) => {
    return `
        <div class="todo-item ${todoItem.completed ? 'completed' : ''}">
            <p class="todo-description">${todoItem.description}</p>
            <div class="todo-btns">
                <i onclick="completeTodo(${index})" class="fas fa-check-circle"></i>
                <i onclick="deleteTodo(${index})" class="fas fa-trash-alt"></i>
            </div>
        </div>
    `
}

const renderTodo = () => {
    todoList.innerHTML = '';
    if(todosArr.length > 0) {
        todosArr.forEach((todo, todoIndex) => {
            todoList.innerHTML += createTodo(todo, todoIndex);
        })
    }
}
//2 step
const updateLS = () => {
    localStorage.setItem('todos', JSON.stringify(todosArr));
}

const completeTodo = (index) => {
    let item = todosArr[index];
    //get all divs
    const divs = document.querySelectorAll('div.todo-item');
    if(item.completed !== false) {
        item.completed = !item.completed
        divs[index].classList.remove(`${item.completed}`);
    } else {
        item.completed = !item.completed
        divs[index].classList.add(`${item.completed}`);
    }
    updateLS();
    renderTodo();
}

const deleteTodo = (index) => {
    todosArr.splice(index, 1);
    updateLS();
    renderTodo();
}

form.addEventListener('submit', e => {
    e.preventDefault();

    //3 step...create an object with our date
    const todoEl = new Todo(todoInput.value)
    //4 step...push to array where we will store our todos
    todosArr.push(todoEl);
    //5 step...send array to LS
    updateLS();
    //6 step...render todo to HTML
    renderTodo();
    
    //clear input-field
    todoInput.value = ''
})

//check LS and render todos
window.addEventListener('DOMContentLoaded', renderTodo);