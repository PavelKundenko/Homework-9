import {AuthorsMenu} from './classes/AuthorsMenu.js';
import {Mediator} from './helpers/Mediator.js';

const mediator = new Mediator();

document.querySelectorAll('.posts-search__authors-list')
    .forEach((elem) => new AuthorsMenu(elem, mediator.getMethods()));
