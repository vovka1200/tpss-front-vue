import {InjectionKey} from 'vue'
import {createStore, mapActions, Store, useStore as baseUseStore} from 'vuex'
import {state, State} from "./state";
import * as actions from './actions';
import * as mutations from './mutations';


export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: state,
    actions: actions,
    mutations: mutations,
});

export function useStore() {
    return baseUseStore(key)
}
