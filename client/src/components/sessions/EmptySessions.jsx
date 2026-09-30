import React from 'react'
import { ArrowRightIcon, SearchXIcon, VideoIcon } from 'lucide-react'

const EmptySessions = ({ hasFilters = false, onReset, onGoToDashboard }) => (
	<div className='col-span-full flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/70 px-5 py-12 text-center'>
		<span className='flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
			{hasFilters ? <SearchXIcon className='size-5' /> : <VideoIcon className='size-5' />}
		</span>
		<h2 className='mt-4 text-base font-semibold text-slate-900'>
			{hasFilters ? 'No matching sessions' : 'No sessions yet'}
		</h2>
		<p className='mt-1 max-w-sm text-sm text-slate-500'>
			{hasFilters
				? 'Try another search or clear your filters to see all sessions.'
				: 'Your meetings will appear here after you start or join one.'}
		</p>
		{hasFilters ? (
			<button
				type='button'
				onClick={onReset}
				className='mt-4 rounded-md px-3 py-2 text-xs font-semibold text-primary-hover transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'>
				Clear search and filters
			</button>
		) : (
			<button
				type='button'
				onClick={onGoToDashboard}
				className='mt-4 flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'>
				Go to dashboard <ArrowRightIcon className='size-3.5' />
			</button>
		)}
	</div>
)

export default EmptySessions
