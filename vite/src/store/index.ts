import {defineStore} from "pinia";
import {ref} from "vue";


export const useMainStore = defineStore('main', () => {
    const authDialogVisible = ref(false);
    const authShake = ref(false);
    const panel = ref('');
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

    return {
        authDialogVisible,
        panel,
        showAuthorizationDialog,
        hideAuthorizationDialog,
        apiVersion,
        authShake,
        shakeAuthorizationDialog,
    };
});