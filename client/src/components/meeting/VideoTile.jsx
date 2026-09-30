import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import {LoaderCircleIcon, MicOffIcon, UserIcon, VideoIcon, VideoOffIcon} from 'lucide-react'

const VideoTile = ({stream, name, isLocal = false, audioEnabled = true, videoEnabled = true, cameraError = '', onRetryVideo}) => {

    const videoRef = useRef(null)
    const [isRetrying, setIsRetrying] = useState(false)
    const showVideoPlaceholder = !videoEnabled || !stream

    const handleRetryVideo = async () => {
        if (!onRetryVideo || isRetrying) return

        setIsRetrying(true)
        try {
            await onRetryVideo()
        } finally {
            setIsRetrying(false)
        }
    }

    useEffect(()=>{
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    },[stream])


  return (
    <div className='group relative flex h-full min-h-50 w-full items-center justify-center
    overflow-hidden rounded-lg border border-white/10 bg-slate-950 shadow-lg'>
        {/* Video Element */}
        <video
        ref={videoRef} autoPlay playsInline muted={isLocal}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${videoEnabled && stream ?
        "opacity-100":"pointer-events-none opacity-0"} ${isLocal ? "-scale-x-100":""}`}/>

        {/* Video unavailable placeholder */}
        {showVideoPlaceholder && (
            <div className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4'>
                <div className='flex size-16 items-center justify-center rounded-full border border-indigo-300/20
                bg-indigo-400/10 text-2xl font-semibold uppercase text-indigo-100 shadow-inner sm:size-20'>
                    {name ? name.charAt(0): <UserIcon className='w-8 h-8'/>}
                </div>
                <span className='inline-flex items-center gap-2 rounded-full border border-white/10
                bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-lg backdrop-blur'>
                    <span className='flex size-5 items-center justify-center rounded-full bg-rose-500/15 text-rose-300'>
                        {videoEnabled ? <VideoIcon className='size-3.5'/> : <VideoOffIcon className='size-3.5'/>}
                    </span>
                    {cameraError ? 'Camera unavailable' : videoEnabled ? 'No video signal' : 'Camera off'}
                </span>
                {cameraError && (
                    <>
                        <p role='alert' className='max-w-sm text-center text-xs leading-relaxed text-slate-300'>
                            {cameraError}
                        </p>
                        {onRetryVideo && (
                            <button type='button' onClick={() => void handleRetryVideo()} disabled={isRetrying}
                            className='inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/15 disabled:cursor-wait disabled:opacity-70'>
                                {isRetrying && <LoaderCircleIcon aria-hidden='true' className='size-3.5 animate-spin' />}
                                {isRetrying ? 'Requesting camera...' : 'Retry camera access'}
                            </button>
                        )}
                    </>
                )}
            </div>
        )}

        {/* Bottom Info Bar Overlay */}
        <div className='pointer-events-none absolute bottom-3 left-3 right-3 z-20 flex items-center'>
            <div className='flex min-w-0 max-w-full items-center gap-2 rounded-lg border border-white/10
            bg-slate-950/80 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md'>
                <span className='min-w-0 truncate'>{name || 'Participant'}</span>
                {isLocal && (
                    <span className='shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-300'>
                        You
                    </span>
                )}
                {!audioEnabled && (
                    <span title='Muted' aria-label='Muted' className='flex size-6 shrink-0 items-center justify-center
                    rounded-md bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-400/20'>
                        <MicOffIcon className='size-3.5'/>
                    </span>
                )}

            </div>

        </div>

    </div>
  )
}

export default VideoTile