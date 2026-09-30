import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

const ChatPanel = ({isOpen, onClose, messages, onSendMessage, currentUser}) => {

const[text,setText]=useState("");
const messagesEndRef = useRef(null)
const messageInputRef = useRef(null)

useEffect(()=>{
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
},[messages, isOpen])

useEffect(()=>{
    if (isOpen) messageInputRef.current?.focus()
},[isOpen])

const handleSubmit=(e)=>{
    e.preventDefault();
    if (text.trim()) {
        onSendMessage(text);
        setText("")
    }
}

  return (
        <aside id='meeting-chat-panel' aria-label='Meeting chat' aria-hidden={!isOpen} inert={!isOpen}
        className={`absolute inset-y-0 right-0 z-30 flex h-full min-h-0 w-full flex-col overflow-hidden border-l border-slate-200
        bg-white shadow-2xl transition-[transform,opacity,width] duration-300 ease-out motion-reduce:transition-none
        sm:relative sm:inset-auto sm:shrink-0 sm:translate-x-0 sm:transition-[width,opacity]
        ${isOpen ? 'translate-x-0 opacity-100 sm:w-80' : 'pointer-events-none translate-x-full opacity-0 sm:w-0'}`}>
        {/* header */}
        <div className='flex items-center justify-between border-b border-slate-200 px-4 py-3'>
            <h3 className='flex items-center gap-2.5 text-base font-semibold text-slate-900'>
                <span className='flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                    <MessageCircleIcon className='size-4'/>
                </span>
                Chat
            </h3>
            <button onClick={onClose}
            aria-label='Close chat'
            className='flex size-9 items-center justify-center rounded-lg text-slate-500
            transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer'>
                <XIcon className='size-4'/>
            </button>
        </div>
        {/* Messages Container */}
        <div role='log' aria-live='polite' aria-relevant='additions' className='min-h-0 flex-1 space-y-4 overflow-y-auto p-4'>
            {messages.length === 0 ?(
                <div className='flex h-full flex-col items-center justify-center px-4 text-center text-sm text-slate-400'>
                    <p className='font-medium text-slate-600'>No messages yet</p>
                    <p className='mt-1 text-xs leading-relaxed'>Send a message to start chatting with participants.</p>
                </div>
            ):(
                messages.map((msg, index)=>{
                    const isMe = msg.senderId === currentUser?.id;
                    return(
                        <div key={msg.id || index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <div className='mb-1 flex items-center gap-2 px-1'>
                                <span className='text-xs font-semibold text-slate-600'>
                                    {isMe ? "YOU" : msg.senderName}
                                </span>
                                <span className='text-[10px] text-slate-400'>{msg.time}</span>
                            </div>
                            <div className={`max-w-[85%] break-words whitespace-pre-wrap rounded-2xl px-3.5 py-2.5
                            text-sm leading-relaxed shadow-xs ${isMe
                                ? 'rounded-tr-none bg-primary font-medium text-white'
                                : 'rounded-tl-none border border-slate-200 bg-slate-100 font-medium text-slate-800'}`}>
                                {msg.text}

                            </div>
                        </div>
                    )
                })
            )}
            <div ref={messagesEndRef}/>

        </div>
        {/* send form */}
            <form onSubmit={handleSubmit}
            className='flex items-center gap-2 border-t border-slate-200 bg-slate-50 p-3'>
                <input type="text"
                placeholder='Type a message...'
                aria-label='Message'
                ref={messageInputRef}
                value={text}
                onChange={(e)=> setText(e.target.value)}
                className='h-10 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3
                text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400
                focus:border-primary focus:ring-2 focus:ring-primary/15' />
                <button
                type='submit'
                disabled={!text.trim()}
                aria-label='Send message'
                className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white
                shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40'>
                    <SendIcon className='size-4'/>
                </button>

            </form>
    </aside>
  )
}

export default ChatPanel