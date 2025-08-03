import {defineStore} from "pinia";
import {ref} from "vue";
import {JSONRPCResponse} from "json-rpc-2.0";


export const useMainStore = defineStore('main', () => {
    const authDialogVisible = ref(false);
    const authShake = ref(false);
    const apiVersion = ref('');

    function showAuthorizationDialog() {
        authDialogVisible.value = true;
    }

    function hideAuthorizationDialog() {
        authDialogVisible.value = false;
    }

    function shakeAuthorizationDialog() {
        authShake.value = true;
        setTimeout(() => {
            authShake.value = false;
        }, 1000);
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.version) {
            apiVersion.value = msg.result?.version;
        }
    }

    return {
        authDialogVisible,
        showAuthorizationDialog,
        hideAuthorizationDialog,
        apiVersion,
        authShake,
        shakeAuthorizationDialog,
        onLoad,
    };
});