import React, { useEffect, useRef, useState } from 'react'
import { CalendarDaysIcon, Clock3Icon, MessageSquareIcon, UsersIcon, XIcon } from 'lucide-react'
import SessionParticipantTab from './SessionParticipantTab'

const formatDateTime = (value) => new Intl.DateTimeFormat(undefined, {
	dateStyle: 'medium',
	timeStyle: 'short',
}).format(new Date(value))

const formatMessageTime = (value) => new Intl.DateTimeFormat(undefined, {
	hour: 'numeric',
	minute: '2-digit',
}).format(new Date(value))

const SessionDetailModal = ({ session, onClose }) => {
	const dialogRef = useRef(null)
	const closeButtonRef = useRef(null)
	const tabRefs = useRef({})
	const [activeTab, setActiveTab] = useState('participants')
	const participants = session.participants || []
	const messages = session.messages || []
	const durationMinutes = session.endedAt
		? Math.max(0, Math.round((new Date(session.endedAt) - new Date(session.createdAt)) / 60000))
		: null
	const duration = durationMinutes === null
		? 'In progress'
		: durationMinutes >= 60
			? `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`
			: `${durationMinutes}m`
	const handleTabKeyDown = (event, currentTab) => {
		const tabs = ['participants', 'messages']
		const currentIndex = tabs.indexOf(currentTab)
		let nextIndex

		switch (event.key) {
			case 'ArrowRight':
				nextIndex = (currentIndex + 1) % tabs.length
				break
			case 'ArrowLeft':
				nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
				break
			case 'Home':
				nextIndex = 0
				break
			case 'End':
				nextIndex = tabs.length - 1
				break
			default:
				return
		}

		event.preventDefault()
		const nextTab = tabs[nextIndex]
		setActiveTab(nextTab)
		tabRefs.current[nextTab]?.focus()
	}

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return undefined

		dialog.showModal()
		closeButtonRef.current?.focus()
		return () => dialog.close()
	}, [])

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby='session-detail-title'
			onCancel={(event) => { event.preventDefault(); onClose() }}
			onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
			className='fixed left-1/2 top-1/2 m-0 max-h-[90dvh] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border-0 bg-white p-0 text-slate-900 shadow-2xl shadow-slate-900/20 backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm'>
			<header className='sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-5 py-5 backdrop-blur sm:px-7'>
				<div className='min-w-0'>
					<div className='mb-3 flex flex-wrap items-center gap-2'>
						<p className='text-[11px] font-semibold uppercase text-primary'>Session details</p>
						<span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-semibold ${session.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
							<span className={`size-1.5 rounded-full ${session.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
							{session.status === 'active' ? 'Active' : 'Ended'}
						</span>
					</div>
					<h2 id='session-detail-title' className='text-xl font-semibold text-slate-900 sm:text-2xl'>{session.title}</h2>
					<p className='mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500'>
						<span>Meeting ID</span>
						<span className='rounded bg-slate-100 px-2 py-1 font-mono text-slate-700'>{session.meetingId}</span>
					</p>
				</div>
				<button
					ref={closeButtonRef}
					type='button'
					onClick={onClose}
					aria-label='Close session details'
					className='flex size-9 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
					<XIcon className='size-4' />
				</button>
			</header>

			<div className='space-y-6 px-5 py-6 sm:px-7'>
				<dl className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
					<div className='rounded-lg border border-slate-200 p-3.5'>
						<dt className='flex items-center gap-2 text-xs text-slate-500'><CalendarDaysIcon className='size-4 text-primary' />Started</dt>
						<dd className='mt-2 text-sm font-semibold text-slate-800'>{formatDateTime(session.createdAt)}</dd>
					</div>
					<div className='rounded-lg border border-slate-200 p-3.5'>
						<dt className='flex items-center gap-2 text-xs text-slate-500'><Clock3Icon className='size-4 text-primary' />Duration</dt>
						<dd className='mt-2 text-sm font-semibold text-slate-800'>{duration}</dd>
					</div>
					<div className='col-span-2 rounded-lg border border-slate-200 p-3.5 sm:col-span-1'>
						<dt className='flex items-center gap-2 text-xs text-slate-500'><UsersIcon className='size-4 text-primary' />Participants</dt>
						<dd className='mt-2 text-sm font-semibold text-slate-800'>{participants.length} people</dd>
					</div>
				</dl>

				<section>
					<div role='tablist' aria-label='Session details' className='flex gap-5 border-b border-slate-200'>
						<button
							type='button'
							role='tab'
							ref={(element) => { tabRefs.current.participants = element }}
							id='participants-tab'
							aria-selected={activeTab === 'participants'}
							aria-controls='session-tab-panel'
							tabIndex={activeTab === 'participants' ? 0 : -1}
							onKeyDown={(event) => handleTabKeyDown(event, 'participants')}
							onClick={() => setActiveTab('participants')}
							className={`flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${activeTab === 'participants' ? 'border-primary text-primary-hover' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
							<UsersIcon className='size-4' />Participants <span className='text-xs font-normal'>{participants.length}</span>
						</button>
						<button
							type='button'
							role='tab'
							ref={(element) => { tabRefs.current.messages = element }}
							id='messages-tab'
							aria-selected={activeTab === 'messages'}
							aria-controls='session-tab-panel'
							tabIndex={activeTab === 'messages' ? 0 : -1}
							onKeyDown={(event) => handleTabKeyDown(event, 'messages')}
							onClick={() => setActiveTab('messages')}
							className={`flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${activeTab === 'messages' ? 'border-primary text-primary-hover' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
							<MessageSquareIcon className='size-4' />Messages <span className='text-xs font-normal'>{messages.length}</span>
						</button>
					</div>

					<div id='session-tab-panel' role='tabpanel' tabIndex={0} aria-labelledby={`${activeTab}-tab`} className='pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
						{activeTab === 'participants' ? (
							<SessionParticipantTab participants={participants} hostId={session.host?.id} />
						) : messages.length ? (
							<ul className='max-h-80 space-y-3 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/60 p-3'>
								{messages.map((message) => (
									<li key={message.id} className='rounded-lg border border-slate-100 bg-white p-3 shadow-sm shadow-slate-900/2'>
										<div className='flex items-baseline justify-between gap-3'>
											<span className='truncate text-xs font-semibold text-slate-800'>{message.senderName}</span>
											<time dateTime={message.timestamp} className='shrink-0 text-[11px] text-slate-500'>
												{formatMessageTime(message.timestamp)}
											</time>
										</div>
										<p className='mt-2 text-sm leading-relaxed text-slate-600'>{message.text}</p>
									</li>
								))}
							</ul>
						) : (
							<p className='rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500'>No messages in this session.</p>
						)}
					</div>
				</section>
			</div>
		</dialog>
	)
}

export default SessionDetailModal
