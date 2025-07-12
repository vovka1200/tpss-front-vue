export interface State {
    socket: {
        isConnected: boolean,
        message: string,
        reconnectError: boolean,
        heartBeatInterval: number,
        heartBeatTimer: number
    }
    backEndConnected: boolean
    backEndVersion: string
}

export const state = {
    socket: {
        isConnected: false,
        message: "",
        reconnectError: false,
        heartBeatInterval: 5000,
        heartBeatTimer: 0
    },
    backEndVersion: "",
    backEndConnected: false,
}