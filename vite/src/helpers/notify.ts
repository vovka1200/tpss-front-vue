import {Notify} from "quasar";

export function accessDenied() {
    Notify.create({
        icon: 'block',
        color: 'negative',
        message: `Доступ запрещён`,
    });
}

export function accessReadOnly() {
    Notify.create({
        icon: 'edit_off',
        color: 'warning',
        message: `Доступ ограничен: только чтение`,
    });
}