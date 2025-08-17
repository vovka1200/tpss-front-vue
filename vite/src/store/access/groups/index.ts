import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {Group} from "@/models/access/groups";
import {useWebsocketStore} from "@/store/websocket";


export const useGroupsStore = defineStore('groups', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<Group[]>([]);
    const loading = ref(false);

    const get = computed(() => (id: string) => list.value.find(g => g.id === id));

    function load() {
        if (loading.value === false) {
            loading.value = true;
            websocket.send(
                "access.groups.list",
                {
                    filter: filter.value,
                },
                (msg) => {
                    list.value = msg.result.groups;
                    loading.value = false;
                    return true
                },
                () => {
                    loading.value = false;
                    return false
                }
            );
        }
    }

    return {
        filter,
        list,
        load,
        get,
        loading,
    };
});