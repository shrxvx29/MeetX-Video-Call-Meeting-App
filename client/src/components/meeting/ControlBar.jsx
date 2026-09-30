import React from 'react'
import {
	MessageCircleIcon,
	MicIcon,
	MicOffIcon,
	PhoneOffIcon,
	UsersRoundIcon,
	VideoIcon,
	VideoOffIcon,
} from 'lucide-react'

const ControlBar = ({
	audioEnabled = true,
	videoEnabled = true,
	onToggleAudio = () => {},
	onToggleVideo = () => {},
	onToggleChat = () => {},
	onToggleParticipants = () => {},
	onLeaveMeeting = () => {},
	onEndMeeting = () => {},
	isHost = false,
	isChatOpen = false,
	isParticipantsOpen = false,
	unreadCount = 0,
	participantCount = 0,
}) => {
	const controlClass = 'relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80'
	const inactiveClass = 'bg-white/10 text-white/90 hover:bg-white/20'
	const activeClass = 'border-primary/40 bg-primary/75 text-white hover:bg-primary'
	const disabledClass = 'border-rose-300/20 bg-rose-500/80 text-white hover:bg-rose-500'

	return (
		<div className='pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center px-3'>
			<div role='toolbar' aria-label='Meeting controls' className='pointer-events-auto flex max-w-full items-center gap-2 overflow-x-auto rounded-2xl border border-white/20 bg-slate-900/45 px-3 py-2.5 shadow-[0_16px_48px_rgba(15,23,42,0.28)] ring-1 ring-white/10 backdrop-blur-2xl'>
				<button
					type='button'
					onClick={onToggleAudio}
					aria-label={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
					aria-pressed={!audioEnabled}
					title={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
					className={`${controlClass} ${audioEnabled ? inactiveClass : disabledClass}`}>
					{audioEnabled ? <MicIcon className='size-5'/> : <MicOffIcon className='size-5'/>}
				</button>
				<button
					type='button'
					onClick={onToggleVideo}
					aria-label={videoEnabled ? 'Turn camera off' : 'Turn camera on'}
					aria-pressed={!videoEnabled}
					title={videoEnabled ? 'Turn camera off' : 'Turn camera on'}
					className={`${controlClass} ${videoEnabled ? inactiveClass : disabledClass}`}>
					{videoEnabled ? <VideoIcon className='size-5'/> : <VideoOffIcon className='size-5'/>}
				</button>

				<span aria-hidden='true' className='mx-1 h-6 w-px shrink-0 bg-white/20'/>

				<button
					type='button'
					onClick={onToggleChat}
					aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
					aria-pressed={isChatOpen}
					title={isChatOpen ? 'Close chat' : 'Open chat'}
					className={`${controlClass} ${isChatOpen ? activeClass : inactiveClass}`}>
					<MessageCircleIcon className='size-5'/>
					{unreadCount > 0 && (
						<span className='absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-slate-900/70'>
							{unreadCount > 99 ? '99+' : unreadCount}
						</span>
					)}
				</button>
				<button
					type='button'
					onClick={onToggleParticipants}
					aria-label={isParticipantsOpen ? 'Close participants' : 'Open participants'}
					aria-pressed={isParticipantsOpen}
					title={`${isParticipantsOpen ? 'Close' : 'Open'} participants (${participantCount})`}
					className={`${controlClass} ${isParticipantsOpen ? activeClass : inactiveClass}`}>
					<UsersRoundIcon className='size-5'/>
					<span className='absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-slate-800 ring-2 ring-slate-900/70'>
						{participantCount}
					</span>
				</button>

				<span aria-hidden='true' className='mx-1 h-6 w-px shrink-0 bg-white/20'/>

				<button
					type='button'
					onClick={isHost ? onEndMeeting : onLeaveMeeting}
					aria-label={isHost ? 'End meeting' : 'Leave meeting'}
					title={isHost ? 'End meeting' : 'Leave meeting'}
					className='flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-rose-300/20 bg-rose-500/90 text-sm font-semibold text-white transition-colors hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:w-auto sm:px-3'>
					<PhoneOffIcon className='size-5'/>
					<span className='hidden sm:inline'>{isHost ? 'End' : 'Leave'}</span>
				</button>
			</div>
		</div>
	)
}

export default ControlBar
