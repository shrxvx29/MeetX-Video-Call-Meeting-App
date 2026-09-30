import React, { useCallback, useEffect, useState, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { dummyRemoteParticipants } from '../assets/asset.js';

const useWebRTC = (_roomId, user, onMeetingEnded, _enabled = true) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteUsers, setRemoteUsers] = useState(dummyRemoteParticipants);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [cameraError, setCameraError] = useState('');

    const localStreamRef = useRef(null)

    // initialize local camera stream if available in browser
    const initLocalStream = useCallback(async () => {
        if (!navigator?.mediaDevices?.getUserMedia) {
            setCameraError('Camera access is unavailable in this browser or page context.');
            return null;
        }

        try {
            let stream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
            } catch (combinedError) {
                console.warn('Camera and microphone request failed; retrying with camera only.', combinedError);
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setAudioEnabled(false);
            }

            localStreamRef.current = stream;
            setLocalStream(stream);
            setCameraError('');
            if (stream.getAudioTracks().length > 0) setAudioEnabled(true);
            return stream;
        } catch (error) {
            console.error('Unable to access the camera.', error);
            if (error?.name === 'NotAllowedError' || error?.name === 'SecurityError') {
                setCameraError('Camera permission is blocked. Allow camera access in your browser and try again.');
            } else if (error?.name === 'NotFoundError' || error?.name === 'DevicesNotFoundError') {
                setCameraError('No camera was found. Connect a camera and try again.');
            } else if (error?.name === 'NotReadableError' || error?.name === 'TrackStartError') {
                setCameraError('The camera may be in use by another app. Close it and try again.');
            } else {
                setCameraError('Could not start the camera. Check your device and browser permissions.');
            }
            return null;
        }
    },[])

    useEffect(()=>{
        initLocalStream()

        return ()=>{
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track)=>track.stop())
            }
        }
    },[initLocalStream])

    // Toggle Local Mic
    const toggleAudio = () =>{
        const newState = !audioEnabled;
        setAudioEnabled(newState);
        if(localStreamRef.current){
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if(audioTrack) audioTrack.enabled = newState;
        }
        toast(newState ? "Microphone Turned On" : "Microphone Muted",{
            icon: newState ? "🎤" : "🔇",
        })
    }

    // Toggle Local Camera
    const toggleVideo = () =>{
        const newState = !videoEnabled;
        setVideoEnabled(newState);
        if(localStreamRef.current){
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if(videoTrack) videoTrack.enabled = newState;
        }
        toast(newState ? "Camera Turned On" : "Camera Turned Off",{
            icon: newState ? "📹" : "📸",
        })
    }

    // End Meeting for Everone
    const endMeeting = useCallback(()=>{
        if(onMeetingEnded){
            onMeetingEnded("Meeting Ended")
        }
    },[onMeetingEnded])

  return {
    localStream,
    remoteUsers,
    audioEnabled,
    videoEnabled,
    cameraError,
    retryCamera: initLocalStream,
    toggleAudio,
    toggleVideo,
    endMeeting
  }
}

export default useWebRTC