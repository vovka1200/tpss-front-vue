import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {User} from "@/models/access/users";
import {useWebsocketStore} from "@/store/websocket";
import {Notify} from "quasar";


export const useUsersStore = defineStore('users', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<User[]>([]);
    const item = ref<User>(<User>{});
    const loading = ref(false);

    const get = computed(() => (id: string) => list.value.find(u => u.id === id));

    function load(id?: string | string[] | undefined) {
        if (loading.value === false) {
            loading.value = true;
            websocket.send(
                'access.users.list',
                {
                    id: id || null,
                    filter: filter.value,
                },
                (msg) => {
                    list.value = msg.result?.users;
                    item.value = list.value[0];
                    loading.value = false;
                    return true;
                },
                () => {
                    loading.value = false;
                    return false;
                }
            );
        }
    }

    function save() {
        if (loading.value === false) {
            loading.value = true;
            websocket.send(
                'access.users.user.save',
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
        item,
        load,
        get,
        save,
        loading,
    };
});