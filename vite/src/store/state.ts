import {JSONRPCResponse} from "json-rpc-2.0";

export interface State {
    socket: {
        isConnected: boolean
        message: JSONRPCResponse | null
        reconnectError: boolean,
        heartBeatInterval: number
        heartBeatTimer: number
    }
    backEndConnected: boolean
    backEndVersion: string
    authDialogVisible: boolean
    apiVersion: string
    access: {
        username: string
        password: string
    }
}

export const defaultState: State = {
    socket: {
        isConnected: false,
        message: null,
        reconnectError: false,
        heartBeatInterval: 60000,
        heartBeatTimer: 0
    },
    backEndVersion: '',
    backEndConnected: false,
    authDialogVisible: false,
    apiVersion: '-',
    access: {
        username: '',
        password: '',
    }
}