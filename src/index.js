import './style.css';
import menuIcon from './MenuIcon.png'
import { sayHello } from './hello';

function announcement() {
    const element = document.createElement('div');

    // element.innerHTML = _.join(['To Do List', 'Project'], ' ');
    sayHello();
    return element;
}

document.body.appendChild(announcement());