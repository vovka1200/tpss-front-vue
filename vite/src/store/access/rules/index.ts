import {defineStore} from "pinia";
import {ref} from "vue";
import {useWebsocketStore} from "@/store/websocket";
import {AccessMatrix} from "@/models/access/maxrix";


export const useRulesStore = defineStore('rules', () => {
    const websocket = useWebsocketStore();
    const list = ref<AccessMatrix>([]);
    const loading = ref(false);

    function load(id: string | undefined) {
        websocket.send(
            "access.groups.group.rules.list",
            {
                group_id: id,
            },
            (msg) => {
                loading.value = false;
                list.value = msg.result.rules;
                return true
            },
            () => {
                loading.value = false
                return false;
            }
        );
    }

    return {
        list,
        load,
        loading,
    };
});