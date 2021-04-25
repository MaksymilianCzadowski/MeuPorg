import {
    life
} from './main.js'

export var vie = 100

export function lostLife(lostPoints) {
     vie -= 10
     life.innerHTML = ("Vie : " + vie + "/100")
}

