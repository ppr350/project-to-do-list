import './style.css';
import { save, clear, fromLocalStorage, toLocalStorage } from './storage';
import { closestIndexTo } from 'date-fns';

const userInput = document.querySelector('#user-input-project');
const submitProjectButton = document.querySelector('#submit-project-btn');
const displayProjects = document.querySelector('#projects');
const projectTemplate = document.querySelector('#project-template');
const checkBox = document.querySelectorAll('.checkbox');
const sidebarContainer = document.querySelector('.sidebar-section');

function startUp() {
    fromLocalStorage();
    submitProjectButton.addEventListener('click', function(e) {
        e.preventDefault();
        save(userInput.value);
        fromLocalStorage();
        userInput.value = '';
    })
    displayProjects.addEventListener('click', function(e) {
        console.log('clicked on dfsplay container')
    })
}
startUp();

export { userInput, submitProjectButton, displayProjects, projectTemplate, checkBox, sidebarContainer,}