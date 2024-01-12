import './style.css';
import { fromLocalStorage, toLocalStorage } from './localStorage';
import { save } from './save'
import { closestIndexTo } from 'date-fns';

const userInput = document.querySelector('#user-input-project');
const submitProjectButton = document.querySelector('#submit-project-btn');
const displayProjects = document.querySelector('#projects');
const projectTemplate = document.querySelector('#project-template');
const checkBox = document.querySelectorAll('.checkbox');
const sidebarContainer = document.querySelector('.sidebar-section');
let items = JSON.parse(localStorage.getItem('todolist')) || [];

fromLocalStorage();

function startUp() {
    fromLocalStorage();
    submitProjectButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('click detected')
        save(userInput.value);
    })
}
startUp();