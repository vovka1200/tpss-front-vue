import {InjectionKey} from 'vue'
import {createStore, Store, useStore as baseUseStore} from 'vuex'
import {defaultState, State} from "./state";
import * as actions from '@/store/actions';
import * as mutations from '@/store/mutations';


export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: defaultState,
    actions: actions,
    mutations: mutations,
});

export function useStore() {
    return baseUseStore(key)
}
