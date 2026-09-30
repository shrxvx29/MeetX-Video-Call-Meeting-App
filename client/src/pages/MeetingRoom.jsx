import React, { useCallback, useState } from 'react'
import {useNavigate, useParams,} from 'react-router-dom'
import { dummyMeetingDetails, dummyUser } from '../assets/asset';
import VideoGrid from '../components/meeting/VideoGrid';
import useWebRTC from '../hooks/useWebRTC';
import ChatPanel from '../components/meeting/ChatPanel';
import ParticipantList from '../components/meeting/ParticipantList';
import ControlBar from '../components/meeting/ControlBar';
import { useChat } from '../hooks/useChat';
import { CheckIcon, CopyIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const MeetingRoom = () => {
const {meetingId} = useParams();
const navigate = useNavigate();
const userdata = dummyUser;

const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
const [roomIdCopied, setRoomIdCopied] = useState(false);
const roomId = meetingId || dummyMeetingDetails.meetingId;

const handleMeetingEnded = useCallback(()=>{
  navigate('/dashboard')
},[navigate])

//Initialize WebRTC
const {localStream, remoteUsers, audioEnabled, videoEnabled, cameraError, retryCamera, toggleAudio, toggleVideo, endMeeting}
    = useWebRTC(meetingId, userdata, handleMeetingEnded)

const mediaStatus = cameraError
  ? 'Camera unavailable'
  : !localStream
    ? 'Starting camera'
    : videoEnabled
      ? 'Camera ready'
      : 'Camera off';
const mediaStatusClass = cameraError
  ? 'bg-rose-50 text-rose-700'
  : !localStream
    ? 'bg-amber-50 text-amber-700'
    : videoEnabled
      ? 'bg-emerald-50 text-emerald-700'
      : 'bg-slate-100 text-slate-600';

const {messages, sendMessage, unreadCount, isChatOpen, toggleChat}= useChat(meetingId, userdata)

const isHost = true;
const participants = [
  {
    socketId: 'local-participant',
    userId: userdata.id,
    userName: userdata.name || userdata.fullName,
    imageUrl: userdata.imageUrl,
    isLocal: true,
    isHost,
    audioEnabled,
    videoEnabled,
  },
  ...(Array.isArray(remoteUsers) ? remoteUsers : []),
];

const handleToggleChat = () => {
  if (!isChatOpen) setIsParticipantsOpen(false);
  toggleChat();
};

const handleToggleParticipants = () => {
  if (!isParticipantsOpen && isChatOpen) toggleChat();
  setIsParticipantsOpen((isOpen) => !isOpen);
};

const handleLeaveMeeting = () => {
  toast("You Left the Meeting")
  navigate('/dashboard')
}
const handleEndMeeting = ()=>{
  endMeeting();
  toast("Meeting ended for All Participants")
}
const handleCopyRoomId = async () => {
  try {
    await navigator.clipboard.writeText(roomId)
    setRoomIdCopied(true)
    toast.success('Room ID copied')
    window.setTimeout(() => setRoomIdCopied(false), 1500)
  } catch {
    setRoomIdCopied(false)
    toast.error('Could not copy room ID')
  }
}

  return (
  
    <div className='h-screen w-screen bg-slate-100 text-slate-900 flex flex-col overflow-hidden relative font-sans'>
      {/* TopBar */}
      <header className='w-full bg-white/90 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between z-30 shadow-xs sm:px-6'>
        <div className='flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1'>
          <h2>{dummyMeetingDetails.title}</h2>
          <span className='text-sm text-slate-600'>Room ID: <span className='font-mono font-medium text-slate-900'>{roomId}</span></span>
          <button
            type='button'
            onClick={handleCopyRoomId}
            aria-label={roomIdCopied ? 'Room ID copied' : 'Copy room ID'}
            title={roomIdCopied ? 'Room ID copied' : 'Copy room ID'}
            className='flex size-8 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500'>
            {roomIdCopied ? <CheckIcon className='size-4'/> : <CopyIcon className='size-4'/>}
          </button>
          <span role='status' aria-live='polite' className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${mediaStatusClass}`}>
            <span className={`size-1.5 rounded-full ${cameraError ? 'bg-rose-500' : !localStream ? 'animate-pulse bg-amber-500' : videoEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            {mediaStatus}
          </span>
        </div>
      </header>
      {/* Main Content Area */}
      <div className='relative flex min-h-0 flex-1 overflow-hidden'>
        <div className='relative flex min-h-0 min-w-0 flex-1 flex-col'>
          <VideoGrid
          localStream={localStream}
          localUser={userdata}
          remoteUsers={remoteUsers}
          audioEnabled={audioEnabled}
          videoEnabled={videoEnabled}
          cameraError={cameraError}
          retryCamera={retryCamera}
          />
          <ControlBar
          audioEnabled={audioEnabled}
          videoEnabled={videoEnabled}
          onToggleAudio={toggleAudio}
          onToggleVideo={toggleVideo}
          onToggleChat={handleToggleChat}
          onToggleParticipants={handleToggleParticipants}
          onLeaveMeeting={handleLeaveMeeting}
          onEndMeeting={handleEndMeeting}
          isHost={isHost}
          isChatOpen={isChatOpen}
          isParticipantsOpen={isParticipantsOpen}
          unreadCount={unreadCount}
          participantCount={participants.length}
          />
        </div>

        {/* in-Metting Chat Drawer */}
        <ChatPanel 
        isOpen={isChatOpen}
        onClose={handleToggleChat}
        messages={messages}
        onSendMessage={sendMessage}
        currentUser={userdata}
        />

        <ParticipantList
        isOpen={isParticipantsOpen}
        onClose={() => setIsParticipantsOpen(false)}
        participants={participants}
        />

        {/* Participant Drawer */}

        {/* Bottom floating Control Bar */}
      </div>

    </div>
  )
}

export default MeetingRoom