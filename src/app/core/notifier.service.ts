import { Injectable } from '@angular/core';

@Injectable()
export class NotifierService {
    private time: number;
    private notifications: Array<Object>;

    constructor() {
        this.time = 2000;
        this.notifications = [];
    }

    get() {
        return this.notifications;
    }

    add(notif) {
        this.notifications.push(notif);

        if (typeof notif.fixed === "undefined")
            this.clear(notif);
    }

    clearAll() {
        this.notifications.length = 0;
    }

    remove(notif) {
        var i = this.notifications.indexOf(notif);
        if (i !== -1) {
            this.notifications.splice(i, 1);
        }
    }

    clear(notif) {
        setTimeout(() => this.remove(notif), this.time);
    }

    success(text, fixed = undefined) {
        this.add({type: 'success', text: text, fixed})
    }

    warning(text, fixed = undefined) {
        this.add({type: 'warning', text: text, fixed})
    }

    error(text, fixed = undefined) {
        this.add({type: 'error', text: text, fixed})
    }
}
