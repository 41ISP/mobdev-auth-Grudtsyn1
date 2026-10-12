import { useUserStore } from "../store/useUserStore"
import {api} from '../api/api'
import { useEffect } from "react"

const MessageCard = ({ id, userId, likes, likedBy, content, username, createdAt }) => {
    const {session} = useUserStore()
    const handleLike = async() => {
        await api.likeMessage(id)
    }
    const handleDelete = async() => {
        await api.deleteMessage(id)
    }
    const handleReport = async() => {
        await api.reportMessage(id)
    }
    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">@{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
               {session?.user && (
                <>
                <button className="action-button" onClick={handleLike}>
                    <span>{likes} {likedBy.includes(session.user.id) ? "💗" : "🤍"}</span>
                    <span>Нравится</span>
                </button>
                <button className="action-button" onClick={handleReport}>
                    <span>🚩</span>
                    <span>Пожаловаться</span>
                </button>
                </>
                )}
                {userId === session?.user.id && (
                <button className="action-button delete" onClick={handleDelete}>
                    <span>❌</span>
                    <span>Удалить</span>
                </button>
                )}
            </div>
        </div>
    )
}

export default MessageCard
