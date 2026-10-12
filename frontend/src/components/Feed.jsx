import { useMessageStore } from "../store/useMessageStore"
import MessageCard from "./MessageCard"
import { useEffect, useState } from "react"
import { useUserStore } from "../store/useUserStore"

const Feed = ({ title = "Сообщения", showOn = false }) => {
    const { messages, getMessages } = useMessageStore()
    const { session } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [timerId, setTimerId] = useState(undefined)

    useEffect(() => {
        const load = async () => {
            setIsLoading(true)
            try {
                await getMessages()
            } catch (error) {
                console.error(error)
                setError(error.message || "Something went wrong")
            } finally {
                setIsLoading(false)
            }
        }
        load()
        setTimerId(setInterval(() => {
            try {
                getMessages()
            } catch(error) {

            }
        }, 10000))
        return() =>{ 
            clearInterval(timerId)
        }
    }, [])
    return (
        <>
            <div className="messages-section">
                <div className="container">
                    <h2 className="section-title">{title}</h2>
                    {isLoading && <p>Загрузка...</p>}
                    {!isLoading && error && <p>{error}</p>}
                    { !isLoading && !error && messages && <div className="messages-grid">
                        {showOn ? messages.filter(e => e.userId === session?.user.id).map((message, i) => (
                            <MessageCard key={message.id} {...message} />
                        ))
                            : messages.map((message, i) => (
                                <MessageCard key={message.id} {...message} />
                            ))}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Feed
