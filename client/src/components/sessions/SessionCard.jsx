import React from 'react'
import {
	ArrowUpRightIcon,
	CalendarDaysIcon,
	CheckIcon,
	Clock3Icon,
	CopyIcon,
	MessageSquareIcon,
	UsersIcon,
} from 'lucide-react'

const formatDate = (value) => new Intl.DateTimeFormat(undefined, {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
	hour: 'numeric',
	minute: '2-digit',
}).format(new Date(value))

const formatDuration = ({ createdAt, endedAt }) => {
	if (!endedAt) return 'In progress'

	const minutes = Math.max(0, Math.round((new Date(endedAt) - new Date(createdAt)) / 60000))
	const hours = Math.floor(minutes / 60)
	const remainingMinutes = minutes % 60
	return hours ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`
}

const SessionCard = ({ session, isCopied = false, onCopy, onViewDetails, onJoin }) => {
	const isActive = session.status === 'active'
	const participantCount = session.participants?.length ?? 0
	const messageCount = session.messages?.length ?? 0

	return (
		<article className={`flex min-h-60 flex-col rounded-lg border p-4 shadow-sm shadow-slate-900/2 transition-shadow hover:shadow-md hover:shadow-slate-900/6 ${isActive ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 bg-white'}`}>
			<div className='flex items-start justify-between gap-3'>
				<div className='min-w-0'>
					<span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-semibold ${isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
						<span className={`size-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
							{isActive ? 'Live now' : 'Ended'}
					</span>
					<h2 className='mt-3 line-clamp-2 text-base font-semibold text-slate-900'>{session.title}</h2>
				</div>
				<button
					type='button'
					onClick={onCopy}
					aria-label={`Copy meeting ID ${session.meetingId}`}
					title={isCopied ? 'Meeting ID copied' : 'Copy meeting ID'}
					className='flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
					{isCopied ? <CheckIcon className='size-4 text-emerald-600' /> : <CopyIcon className='size-4' />}
				</button>
			</div>

			<p className='mt-3 truncate font-mono text-xs text-slate-500'>{session.meetingId}</p>
			<p className='mt-1 truncate text-xs text-slate-600'>Hosted by {session.host?.name || 'Unknown host'}</p>

			<div className='mt-4 grid grid-cols-2 gap-y-3 border-t border-slate-100 pt-4 text-xs text-slate-500'>
				<span className='inline-flex items-center gap-1.5'><Clock3Icon className='size-3.5' />{formatDuration(session)}</span>
				<span className='inline-flex items-center gap-1.5'><UsersIcon className='size-3.5' />{participantCount} people</span>
				<span className='inline-flex items-center gap-1.5'><CalendarDaysIcon className='size-3.5' />{formatDate(session.createdAt)}</span>
				<span className='inline-flex items-center gap-1.5'><MessageSquareIcon className='size-3.5' />{messageCount} messages</span>
			</div>

			<div className='mt-auto flex items-center gap-2 border-t border-slate-100 pt-4'>
				<button
					type='button'
					onClick={onViewDetails}
					className='h-9 rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
					View details
				</button>
				{isActive && (
					<button
						type='button'
						onClick={onJoin}
						className='ml-auto flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-semibold text-white transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'>
						Join meeting <ArrowUpRightIcon className='size-3.5' />
					</button>
				)}
			</div>
		</article>
	)
}

export default SessionCard
