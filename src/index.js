import './style.css';
import hamburgerMenu from './hamburgerMenu.png'
import { sayHello } from './hello';
import { closestIndexTo } from 'date-fns';

function announcement() {
    const element = document.createElement('div');

    // element.innerHTML = _.join(['To Do List', 'Project'], ' ');
    sayHello();
    return element;
}

document.body.appendChild(announcement());

// to do array //
let todoArray = getLocalStorageItems;


// On page load //
function startupAndSyncWithLocalStorage() {
    if (!localStorage.todo) {
        setLocalStorageItems;
        
    } getLocalStorageItems;
    // getLocalStorageItems();
    console.log('start up')
}
startupAndSyncWithLocalStorage();

// listen to new user entry //
const userSubmitEntry = document.querySelector('.add-new-to-do').addEventListener('click', function(e) {
    e.preventDefault();
    console.log('click add')
    addToLocalStorage();
})

// sync new user entry to local todoArray //



// add to do list to local storage //
function addToLocalStorage() {

}

// pull saved items from local storage //
function getLocalStorageItems() {
    let items = localStorage.getItem('toDoList');
    console.log(items);
    return items;
}

function setLocalStorageItems() {
    let items = 'item here'
    localStorage.setItem('todo', JSON.stringify(items));
}