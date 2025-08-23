import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {Group} from "@/models/access/groups";
import {useWebsocketStore} from "@/store/websocket";
import {Notify} from "quasar";


export const useGroupsStore = defineStore('groups', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<Group[]>([]);
    const item = ref<Group>(<Group>{});
    const loading = ref(false);

    const get = computed(() => (id: string) => list.value.find(g => g.id === id));

    function load(id?: string) {
        if (loading.value === false) {
            loading.value = true;
            websocket.send(
                "access.groups.list",
                {
                    id: id,
                    filter: filter.value,
                },
                (msg) => {
                    list.value = msg.result.groups;
                    item.value = list.value[0];
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

    function save() {
        if (loading.value === false) {
            loading.value = true;
            websocket.send(
                'access.groups.group.save',
                item.value,
                (msg) => {
                    loading.value = false;
                    if (msg.result?.id === item.value.id) {
                        Notify.create({
                            icon: 'check_circle',
                            color: 'positive',
                            message: `API: Данные успешно сохранены`,
                        });
                        return true;
                    }
                    return false;
                }, () => {
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
        item,
        loading,
        save,
    };
});