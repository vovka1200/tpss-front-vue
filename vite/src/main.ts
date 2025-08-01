import {createApp} from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket-vue3';
import router from "./router";
import {Quasar, Notify, Loading} from 'quasar'
import 'quasar/src/css/index.sass'
import langRu from 'quasar/lang/ru'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import './assets/main.css'
import './assets/animations.css'
import {useWebsocketStore} from '@/store/websocket'
import {createPinia} from "pinia";

const store = createPinia();

const app = createApp(App);
app.use(store);
const useSocketStore = useWebsocketStore();
app.use(router);
app.use(VueNativeSock,
    import.meta.env.VITE_TPSS_API_URL, {
        store: useSocketStore,
        format: 'json',
        reconnection: true,
        reconnectionAttempts: 12,
        reconnectionDelay: 5000,
    });
app.use(Quasar, {
    lang: langRu,
    plugins: {
        Notify,
        Loading,
    },
    config: {
        brand: {
            primary: '#091a09',
            secondary: '#333633',
            accent: '#1f82c0',
            dark: '#05250e',
            'dark-page': '#211e1e',
            positive: '#21BA45',
            negative: '#9b3520',
            info: '#31CCEC',
            warning: '#dc7500'
        }
    }
});
app.mount('#app');

export default app;
