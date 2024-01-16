import './style.css';
import { save, clear, fromLocalStorage, toLocalStorage } from './storage';
import { changeLanguage } from './language';
import { closestIndexTo } from 'date-fns';

const userInput = document.querySelector('#user-input-project');
const submitProjectButton = document.querySelector('#submit-project-btn');
const displayProjects = document.querySelector('#projects');
const projectTemplate = document.querySelector('#project-template');
const checkBox = document.querySelectorAll('.checkbox');
const sidebarContainer = document.querySelector('.sidebar-section');

// display language related //
const chooseGaeilge = document.querySelector('#gaeilge');
const chooseEnglish = document.querySelector('#english');
const title = document.querySelector('.title');
const myProjects = document.querySelector('.my-projects');
const myProjectTasks = document.querySelector('.my-project-tasks');

function startUp() {
    fromLocalStorage();
    submitProjectButton.addEventListener('click', function(e) {
        e.preventDefault();
        save(userInput.value);
        fromLocalStorage();
        userInput.value = '';
    })
    displayProjects.addEventListener('click', function(e) {
        console.log('clicked on display container')
    })
    chooseGaeilge.addEventListener('click', function(e) {
        changeLanguage('gaeilge');
    })
    chooseEnglish.addEventListener('click', function(e) {
        changeLanguage('english')
    })
}
startUp();

export { userInput, submitProjectButton, displayProjects, projectTemplate, checkBox, sidebarContainer, chooseGaeilge, chooseEnglish, startUp, title, myProjects, myProjectTasks }