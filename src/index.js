import './style.css';
import { save, clear, fromLocalStorage, toLocalStorage } from './localStorage';
// import { save, clear } from './save';
import { closestIndexTo } from 'date-fns';

const userInput = document.querySelector('#user-input-project');
const submitProjectButton = document.querySelector('#submit-project-btn');
const displayProjects = document.querySelector('#projects');
const projectTemplate = document.querySelector('#project-template');
const checkBox = document.querySelectorAll('.checkbox');
const sidebarContainer = document.querySelector('.sidebar-section');
// let items = JSON.parse(localStorage.getItem('todolist')) || [];

function startUp() {
    fromLocalStorage();
    submitProjectButton.addEventListener('click', function(e) {
        e.preventDefault();
        fromLocalStorage();
        console.log('click detected')
        save(userInput.value);
        userInput.value = '';
    })
}
startUp();

export { userInput, submitProjectButton, displayProjects, projectTemplate, checkBox, sidebarContainer,}