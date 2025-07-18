import {JSONRPCResponse} from "json-rpc-2.0";

export interface Rule {
    object: string
    method: string
}

export interface User {
    id: string
    name: string
    groups: string[]
}

export interface Group {
    id: string
    name: string
}

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
    panel: string,
    access: {
        account: {
            id: string
            username: string
            password: string
            name: string
        },
        matrix: Rule[]
    },
    settings: {
        access: {
            users: {
                list: User[]
            }
            groups: {
                list: Group[]
            }
        }
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
    panel: '',
    access: {
        account: {
            id: '',
            name: '',
            username: '',
            password: '',
        },
        matrix: [],
    },
    settings: {
        access: {
            users: {
                list: []
            },
            groups: {
                list: []
            },
        }
    }
}