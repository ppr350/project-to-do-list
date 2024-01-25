import './style.css';
import { saveProject, fromLocalStorage, clickedOnProjectSection, clickedOnTaskSection, activeProject, generateTasks } from './storage';
import { changeLanguage } from './language';
import { closestIndexTo } from 'date-fns';

const userInput = document.querySelector('#user-input-project');
const submitProjectButton = document.querySelector('#submit-project-btn');
const displayProjects = document.querySelector('#projects');
const projectTemplate = document.querySelector('#project-template');
const taskTemplate = document.querySelector('#task-template');
const checkBox = document.querySelectorAll('.checkbox');
const sidebarContainer = document.querySelector('.sidebar-section');

// display language related //
const chooseGaeilge = document.querySelector('#gaeilge');
const chooseEnglish = document.querySelector('#english');
const title = document.querySelector('.title');
const myProjects = document.querySelector('.my-projects');
const myTasksTitle = document.querySelector('.my-tasks-title');
const myProjectTasks = document.querySelector('.my-project-tasks');
const taskSection = document.querySelector('#task-section');

function startUp() {
    fromLocalStorage();
    submitProjectButton.addEventListener('click', function(e) {
        e.preventDefault();
        saveProject(userInput.value);
        fromLocalStorage();
        userInput.value = '';
    })
    displayProjects.addEventListener('click', function(e) {
        clickedOnProjectSection(e.target);
    })
    taskSection.addEventListener('click', function(e) {
        clickedOnTaskSection(e.target);
    })
    // myProjectTasks.addEventListener('click', function(e) {
    //     console.log(e.target)
    //     clickedOnTaskSection(e.target)
    // })
    chooseGaeilge.addEventListener('click', function(e) {
        changeLanguage('gaeilge');
    })
    chooseEnglish.addEventListener('click', function(e) {
        changeLanguage('english')
    })
}
startUp();

export { userInput, submitProjectButton, displayProjects, projectTemplate, taskTemplate, checkBox, sidebarContainer, chooseGaeilge, chooseEnglish, startUp, title, myProjects, myProjectTasks, myTasksTitle }