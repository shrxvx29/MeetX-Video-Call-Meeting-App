import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { dummySessions } from '../assets/asset'
import EmptySessions from '../components/sessions/EmptySessions'
import SessionCard from '../components/sessions/SessionCard'
import SessionDetailModal from '../components/sessions/SessionDetailModal'

const filters = [
  { id: 'all', label: 'All sessions' },
  { id: 'active', label: 'Active' },
  { id: 'ended', label: 'Ended' },
]

const Sessions = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSession, setSelectedSession] = useState(null)
  const [copiedSessionId, setCopiedSessionId] = useState(null)

  const sessions = [...dummySessions].sort((first, second) => {
    const activeFirst = Number(second.status === 'active') - Number(first.status === 'active')
    return activeFirst || new Date(second.createdAt) - new Date(first.createdAt)
  })
  const query = searchQuery.trim().toLowerCase()
  const matchesSearch = (session) => [session.title, session.meetingId, session.host?.name || '']
    .some((value) => value.toLowerCase().includes(query))
  const visibleSessions = sessions.filter((session) => {
    const matchesFilter = activeFilter === 'all' || session.status === activeFilter
    return matchesFilter && matchesSearch(session)
  })
  const filterCount = (filterId) => sessions.filter((session) =>
    (filterId === 'all' || session.status === filterId) && matchesSearch(session),
  ).length
  const hasActiveFilters = Boolean(query) || activeFilter !== 'all'

  const handleCopyId = async (session) => {
    try {
      await navigator.clipboard.writeText(session.meetingId)
      setCopiedSessionId(session.id)
      toast.success('Meeting ID copied')
      window.setTimeout(() => setCopiedSessionId(null), 1500)
    } catch {
      toast.error('Could not copy meeting ID')
    }
  }

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 md:py-10 lg:px-10'>
      <section className='mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
        <div>
          <p className='mb-2 text-xs font-semibold uppercase text-primary'>Meeting history</p>
          <h1 className='text-3xl font-semibold text-slate-900'>Sessions</h1>
          <p className='mt-2 max-w-xl text-sm text-slate-600'>Browse your recent calls, participants, and shared notes.</p>
        </div>
        <dl className='flex flex-wrap gap-x-7 gap-y-3 border-t border-slate-200 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0'>
          <div>
            <dt className='text-xs text-slate-500'>Total sessions</dt>
            <dd className='mt-1 text-lg font-semibold text-slate-900'>{dummySessions.length}</dd>
          </div>
          <div>
            <dt className='text-xs text-slate-500'>Active</dt>
            <dd className='mt-1 text-lg font-semibold text-emerald-700'>
              {dummySessions.filter((session) => session.status === 'active').length}
            </dd>
          </div>
          <div>
            <dt className='text-xs text-slate-500'>Ended</dt>
            <dd className='mt-1 text-lg font-semibold text-slate-700'>
              {dummySessions.filter((session) => session.status === 'ended').length}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-label='Filter sessions' className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <label className='relative block w-full sm:max-w-sm'>
          <SearchIcon aria-hidden='true' className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
          <span className='sr-only'>Search sessions</span>
          <input
            type='search'
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder='Search title, host, or meeting ID'
            className='w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10'
          />
        </label>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='flex w-full gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-1 sm:w-auto' role='group' aria-label='Session status'>
            {filters.map((filter) => {
              const isActiveFilter = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type='button'
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActiveFilter}
                  className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${isActiveFilter ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                  {filter.label}
                  <span className={`min-w-5 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${isActiveFilter ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {filterCount(filter.id)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-label='Session list' className='grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {visibleSessions.length ? visibleSessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            isCopied={copiedSessionId === session.id}
            onCopy={() => handleCopyId(session)}
            onViewDetails={() => setSelectedSession(session)}
            onJoin={() => navigate(`/meeting/${encodeURIComponent(session.meetingId)}`)}
          />
        )) : (
          <EmptySessions
            hasFilters={hasActiveFilters}
            onReset={() => { setSearchQuery(''); setActiveFilter('all') }}
            onGoToDashboard={() => navigate('/dashboard')}
          />
        )}
      </section>
      {selectedSession && (
        <SessionDetailModal session={selectedSession} onClose={() => setSelectedSession(null)} />
      )}
    </main>
  )
}

export default Sessions