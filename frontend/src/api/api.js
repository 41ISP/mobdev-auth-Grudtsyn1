import axios from "axios"
import { useUserStore } from "../store/useUserStore"

const apiInstance = axios.create({
    baseURL: "https://opulent-pancake-g9gwwpg44ggc9xp7-3001.app.github.dev/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

apiInstance.interceptors.request.use((config) => {
    const { session } = useUserStore.getState()

    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

const registerUser = async (user) => {
    const res = await apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login", user)
    return res
}

const getMessages = async () => {
    const res = await apiInstance.get("/messages")
    return res
}

const sendMessage = async (message) => {
    const res = await apiInstance.post("/messages", message)
    return res
}

const authMe = async () => {
    const res = await apiInstance.get("/auth/me")
    return res
}

const deleteMessage = async (id) => {
    const res = await apiInstance.delete(`/messages/${id}`)
    return res
}

const likeMessage = async (id) => {
    const res = await apiInstance.post(`/messages/${id}/like`)
    return res
}

const reportMessage = async (id) => {
    const res = await apiInstance.post(`/messages/${id}/report`)
    return res
}

const getStats = async () => {
    const res = await apiInstance.get(`/stats`)
    return res
}

const getMyMessages = async () => {
    const res = await apiInstance.get(`/my-messages`)
    return res
}

export const api = {
    getMyMessages,
    getStats,
    reportMessage,
    likeMessage,
    deleteMessage,
    registerUser,
    loginUser,
    getMessages,
    sendMessage,
    authMe,
}
