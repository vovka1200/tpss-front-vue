import {createApp} from 'vue'
import App from './App.vue'
import {store, key} from './store'
import VueNativeSock from 'vue-native-websocket-vue3';
import router from "./router";
import {Quasar, Notify} from 'quasar'
import 'quasar/src/css/index.sass'
import langRu from 'quasar/lang/ru'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import './assets/main.css'

const app = createApp(App)
app.use(store, key)
app.use(router)
app.use(VueNativeSock,
    import.meta.env.VITE_TPSS_API_URL, {
        store: store,
        format: 'json',
        reconnection: true,
        reconnectionAttempts: 12,
        reconnectionDelay: 5000,
    })
app.use(Quasar, {
    lang: langRu,
    plugins: {
        Notify
    },
    config: {
        brand: {
            primary: '#f6fff6',
            secondary: '#ecf3ec',
            accent: '#1f82c0',
            dark: '#05250e',
            'dark-page': '#211e1e',
            positive: '#21BA45',
            negative: '#9b3520',
            info: '#31CCEC',
            warning: '#dc7500'
        }
    }
})
app.mount('#app')

export default app;
