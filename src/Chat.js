import { IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import "./Chat.css"
import MicNoneIcon from "@material-ui/icons/MicNone"
import db, { auth } from './firebase';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import Message from './Message';
import { selectChatId, selectChatName } from './features/chatSlice';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';


function Chat() {
    const user = useSelector(selectUser);



    const [input, setInput] = useState(" ")
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatId) {
            db.collection('chats')
            .doc(chatId)
            .collection("messages")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        }
    }, [chatId])

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("chats").doc(chatId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            uid:user.uid,
            photo: user.photo,
            email: user.email,
            displayName : user.displayName,
        })

        setInput("");
    };

    return (
        <div className='chat'>

            {/* <chatHeader />  */}
            <div className="chat__header">
                <h4>To: <span className='chat__name'>{chatName}</span></h4>
                {/* <strong>Details</strong> */}
                <strong className="chat__header__details"
                    onClick={() => auth.signOut()}
                >Logout</strong>


            </div>

            {/* Chat Messages */}
            <div className="chat__messages">
                <FlipMove>

                {messages.map(({id, data}) => (
                <Message key={id} contents={data} />
                ))}
                </FlipMove>
            </div>

            {/* Chat input */}
            <div className="chat__input">
                <form>
                    <input value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="iMessage"
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </form>

                <IconButton>
                    <MicNoneIcon className="chat__mic" />
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
