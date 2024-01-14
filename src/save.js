import { toLocalStorage } from "./localStorage";
import { items } from ".";


function save(newItemFromUser) {
    let item = {};
    if (newItemFromUser != '') {
        console.log(newItemFromUser)
        item.name = newItemFromUser;
        item.id = new Date().valueOf();
        item.complete = false;
        item.subItem = [];
        items.push(item);
        toLocalStorage();
    }
}

export { save }