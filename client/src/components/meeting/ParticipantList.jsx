import React from 'react'
import { CrownIcon, MicIcon, MicOffIcon, UserIcon, UsersRoundIcon, VideoIcon, VideoOffIcon, XIcon } from 'lucide-react'
import { dummyRemoteParticipants, dummyUser } from '../../assets/asset.js'

const fallbackParticipants = [
	{
		...dummyUser,
		userId: dummyUser.id,
		userName: dummyUser.name,
		isLocal: true,
		isHost: true,
		audioEnabled: true,
		videoEnabled: true,
	},
	...dummyRemoteParticipants,
]

const ParticipantList = ({ isOpen, onClose, participants: participantData }) => {
	const participants = Array.isArray(participantData)
		? participantData
		: Array.isArray(participantData?.participants)
			? participantData.participants
			: Array.isArray(participantData?.data)
				? participantData.data
				: fallbackParticipants

	return (
		<aside
			id='meeting-participants-panel'
			aria-label='Meeting participants'
			aria-hidden={!isOpen}
			inert={!isOpen}
			className={`absolute inset-y-0 right-0 z-30 flex h-full min-h-0 w-full flex-col overflow-hidden border-l border-slate-200
			bg-white shadow-2xl transition-[transform,opacity,width] duration-300 ease-out motion-reduce:transition-none
			sm:relative sm:inset-auto sm:shrink-0 sm:translate-x-0 sm:transition-[width,opacity]
			${isOpen ? 'translate-x-0 opacity-100 sm:w-80' : 'pointer-events-none translate-x-full opacity-0 sm:w-0'}`}>
			<div className='flex items-center justify-between border-b border-slate-200 px-4 py-3'>
				<div className='flex items-center gap-3'>
					<span className='flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
						<UsersRoundIcon className='size-4'/>
					</span>
					<div>
						<h2 className='text-sm font-semibold text-slate-900'>Participants</h2>
						<p className='text-xs text-slate-500'>{participants.length} in this meeting</p>
					</div>
				</div>
				<button
					type='button'
					onClick={onClose}
					aria-label='Close participants'
					className='flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900'>
					<XIcon className='size-4'/>
				</button>
			</div>

			<div className='min-h-0 flex-1 overflow-y-auto p-3'>
				{participants.length === 0 ? (
					<div className='flex h-full flex-col items-center justify-center text-center'>
						<span className='mb-3 flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
							<UserIcon className='size-5'/>
						</span>
						<p className='text-sm font-medium text-slate-700'>No participants yet</p>
					</div>
				) : (
					<ul className='space-y-1'>
						{participants.map((participant, index) => {
							const person = participant && typeof participant === 'object' ? participant : {}
							const user = person.user && typeof person.user === 'object' ? person.user : {}
							const media = person.media && typeof person.media === 'object' ? person.media : {}
							const name = person.userName || person.name || person.fullName || user.name || user.fullName || 'Participant'
							const isLocal = person.isLocal ?? (person.userId || person.id) === dummyUser.id
							const isHost = person.isHost ?? person.role === 'host'
							const audioEnabled = person.audioEnabled ?? person.isAudioEnabled ?? media.audioEnabled ?? true
							const videoEnabled = person.videoEnabled ?? person.isVideoEnabled ?? media.videoEnabled ?? true
							const imageUrl = person.imageUrl || person.avatarUrl || user.imageUrl || user.avatarUrl
							const key = person.socketId || person.userId || person.id || user.id || index

							return (
								<li key={key} className='flex items-center gap-3 rounded-lg px-2.5 py-3 transition-colors hover:bg-slate-50'>
									<span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold uppercase text-indigo-700 ring-1 ring-inset ring-indigo-100'>
										{imageUrl
											? <img src={imageUrl} alt='' className='size-full rounded-full object-cover'/>
											: name.charAt(0)}
									</span>
									<span className='min-w-0 flex-1'>
										<span className='flex min-w-0 items-center gap-1.5'>
											<span className='truncate text-sm font-semibold text-slate-800'>{name}</span>
											{isLocal && <span className='shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-slate-500'>You</span>}
											{isHost && <CrownIcon aria-label='Host' className='size-3.5 shrink-0 text-amber-500'/>}
										</span>
										<span className='mt-1 block text-xs text-slate-500'>
											{isLocal ? 'In this meeting' : 'Participant'}
										</span>
									</span>
									<span role='img' className='flex shrink-0 items-center gap-1.5' aria-label={`${audioEnabled ? 'Microphone on' : 'Microphone muted'}, ${videoEnabled ? 'Camera on' : 'Camera off'}`}>
										{audioEnabled
											? <MicIcon className='size-4 text-slate-400'/>
											: <MicOffIcon className='size-4 text-rose-500'/>}
										{videoEnabled
											? <VideoIcon className='size-4 text-slate-400'/>
											: <VideoOffIcon className='size-4 text-rose-500'/>}
									</span>
								</li>
							)
						})}
					</ul>
				)}
			</div>
		</aside>
	)
}

export default ParticipantList
