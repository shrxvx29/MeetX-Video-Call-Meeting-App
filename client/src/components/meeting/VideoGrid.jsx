import React from 'react'
import VideoTile from './VideoTile'

const VideoGrid = ({localStream, localUser, remoteUsers, audioEnabled, videoEnabled, cameraError, retryCamera}) => {
    const totalParticipants = 1 + remoteUsers.length


    const getGridClass = ()=>{
        if(totalParticipants === 1) return "grid-cols-1 max-w-4xl"
        if(totalParticipants === 2) return "grid-cols-1 md:grid-cols-2 max-w-5xl"
        if(totalParticipants <= 4) return "grid-cols-1 sm:grid-cols-2 max-w-5xl"
        if(totalParticipants <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl"
        return "grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 max-w-7xl"
    }

  return (
    <div className='min-h-0 min-w-0 flex-1 flex items-center justify-center overflow-y-auto px-4 pb-24 pt-4 sm:pb-20'>
        <div className={`w-full grid gap-4 ${getGridClass()} aspect-video max-h-[calc(100vh-140px)] transition-all duration-300`}>
            {/* Local user Title */}
            <VideoTile stream={localStream}
            name={localUser?.name || "YOU"}
            isLocal={true}
            audioEnabled={audioEnabled}
            videoEnabled={videoEnabled}
            cameraError={cameraError}
            onRetryVideo={retryCamera}/>

            {/* Remote Users Tile  */}
            {remoteUsers.map((remote)=>{
                return <VideoTile
                key={remote.socketId}
                stream={remote.stream}
                name={remote.userName}
                isLocal={false}
                audioEnabled={remote.audioEnabled}
                videoEnabled={remote.videoEnabled}
                />
            })}
        </div>
    </div>
  )
}

export default VideoGrid