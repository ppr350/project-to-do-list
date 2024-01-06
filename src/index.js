import './style.css';
import hamburgerMenu from './hamburgerMenu.png'
import { sayHello } from './hello';

function announcement() {
    const element = document.createElement('div');

    // element.innerHTML = _.join(['To Do List', 'Project'], ' ');
    sayHello();
    return element;
}

document.body.appendChild(announcement());

// to do array //
let todoArray = [];

// On page load //
function startupAndSyncWithLocalStorage() {
    if (!localStorage.toDoList) {
        localStorage.toDoList = todoArray;
    }
    getLocalStorageItems();
}
startupAndSyncWithLocalStorage();

// listen to new user entry //
const userSubmitEntry = document.querySelector('.add-new-to-do').addEventListener('click', function(e) {
    e.preventDefault();

    addToLocalStorage()
})

// add new user entry to todoArray //
function addToTodoArray() {
    let userEntry = document.querySelector('.new-to-do')
    todoArray.unshift(userEntry.value)
    userEntry.value = '';
    console.log(todoArray)
}


// add to do list to local storage //
function addToLocalStorage() {
    getLocalStorageItems();

    localStorage.setItem('toDoList', JSON.stringify(todoArray));
    addToTodoArray();

}

// pull saved items from local storage //
function getLocalStorageItems() {
    let items = localStorage.getItem('toDoList');
    console.log(items);
    return items;
}

// syncronise local storage with todoArray when page load or when it is called //
function syncItemsToTodoArray() {
    todoArray = getLocalStorageItems();
    console.log(todoArray);
}

syncItemsToTodoArray()