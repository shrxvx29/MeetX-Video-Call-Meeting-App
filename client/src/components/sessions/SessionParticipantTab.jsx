import React from 'react'

const SessionParticipantTab = ({ participants = [], hostId }) => (
	<ul className='divide-y divide-slate-100 rounded-lg border border-slate-200 px-3'>
		{participants.length ? participants.map((participant) => {
			const name = participant.name || 'Participant'
			const initials = name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
			const isHost = participant.user?.id === hostId

			return (
				<li key={participant.user?.id || name} className='flex items-center justify-between gap-3 py-3'>
					<div className='flex min-w-0 items-center gap-3'>
						<span aria-hidden='true' className='flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary-hover'>
							{initials}
						</span>
						<div className='min-w-0'>
							<p className='truncate text-sm font-medium text-slate-800'>{name}</p>
							<p className='truncate text-xs text-slate-500'>{participant.user?.email || 'No email available'}</p>
						</div>
					</div>
					<span className='flex shrink-0 items-center gap-2 text-[11px] text-slate-500'>
						{isHost && <span className='rounded-full bg-primary/10 px-2 py-1 font-semibold text-primary-hover'>Host</span>}
						{participant.leftAt ? 'Attended' : 'In meeting'}
					</span>
				</li>
			)
		}) : (
			<li className='py-8 text-center text-sm text-slate-500'>No participants recorded.</li>
		)}
	</ul>
)

export default SessionParticipantTab
