'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Send, X, Volume2 } from 'lucide-react'

interface VoiceRecorderProps {
  onVoiceMessage: (text: string, audioBlob?: Blob) => void
  onClose: () => void
}

export default function VoiceRecorder({ onVoiceMessage, onClose }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState('')

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recognitionRef = useRef<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript + interimTranscript)
      }

      recognitionRef.current.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`)
        setIsProcessing(false)
      }

      recognitionRef.current.onend = () => {
        setIsProcessing(false)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      setError('')
      setTranscript('')
      audioChunksRef.current = []

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Setup MediaRecorder for audio recording
      mediaRecorderRef.current = new MediaRecorder(stream)
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setAudioBlob(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      // Start recording
      mediaRecorderRef.current.start()
      setIsRecording(true)
      setIsProcessing(true)

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start()
      }

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (error) {
      setError('Microphone access denied. Please allow microphone access and try again.')
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setIsRecording(false)
    setIsProcessing(false)
  }

  const sendVoiceMessage = () => {
    if (transcript.trim()) {
      onVoiceMessage(transcript.trim(), audioBlob || undefined)
    } else {
      setError('No speech detected. Please try again.')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const playAudio = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob))
      audio.play()
    }
  }

  return (
    <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800">Voice Message</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Recording Status */}
      <div className="mb-4 text-center">
        {isRecording ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Recording... {formatTime(recordingTime)}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-600">
            {transcript ? 'Recording complete' : 'Click microphone to start'}
          </span>
        )}
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Transcript:</strong> {transcript}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        {!isRecording ? (
          <>
            <button
              onClick={startRecording}
              disabled={isProcessing}
              className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50"
            >
              <Mic className="w-6 h-6" />
            </button>
            
            {audioBlob && (
              <button
                onClick={playAudio}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
            
            {transcript && (
              <button
                onClick={sendVoiceMessage}
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </>
        ) : (
          <button
            onClick={stopRecording}
            className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <MicOff className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        {!isRecording && !transcript && (
          <p>Click the microphone to start voice recording and speech recognition</p>
        )}
        {isRecording && (
          <p>Speak clearly. Click stop when finished.</p>
        )}
        {transcript && !isRecording && (
          <p>Review your message and click send, or record again</p>
        )}
      </div>

      {/* Close overlay */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
    </div>
  )
}
