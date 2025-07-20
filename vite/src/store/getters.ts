import {State} from "@/store/state";
import {Method} from "@/models/access/maxrix";

/**
 * Возвращает true, если метод доступен
 * @param {State} state
 * @returns Boolean
 */
export const allowed = (state: State) =>
    /**
     *
     * @param {String} objectName
     * @param {Method} method
     * @returns Boolean
     */
    (objectName: String, method: Method = Method.read) => {
        return state.access.matrix.findIndex(r => r.object === objectName && r.methods?.includes(method)) > -1;
    };