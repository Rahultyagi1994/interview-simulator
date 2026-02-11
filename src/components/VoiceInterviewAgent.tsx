import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic, MicOff, Volume2, VolumeX, Play, SkipForward,
  User, Bot, MessageSquare, Clock, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, RotateCcw, Home, Sparkles, AlertCircle
} from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Question } from '@/data/questions';

interface VoiceInterviewAgentProps {
  questions: Question[];
  companyName: string;
  onComplete: (results: VoiceInterviewResult[]) => void;
  onExit: () => void;
}

export interface VoiceInterviewResult {
  question: Question;
  candidateAnswer: string;
  feedback: {
    score: number;
    strengths: string[];
    improvements: string[];
    sampleAnswer: string;
  };
  duration: number;
}

type InterviewPhase = 'intro' | 'question' | 'listening' | 'processing' | 'feedback' | 'complete';

interface Message {
  role: 'agent' | 'candidate';
  text: string;
  timestamp: Date;
}

// Premium voice preferences in order of priority
const PREMIUM_VOICE_NAMES = [
  'Microsoft Zira',
  'Microsoft Mark',
  'Google UK English Female',
  'Google UK English Male',
  'Google US English',
  'Samantha',
  'Karen',
  'Daniel',
  'Moira',
  'Tessa',
  'Alex',
  'Victoria',
];

// Get time limit based on question category/difficulty
const getTimeLimit = (question: Question): number => {
  const baseTime = question.difficulty === 'Hard' ? 180 : question.difficulty === 'Medium' ? 120 : 90;
  
  switch (question.category) {
    case 'System Design':
      return 180; // 3 minutes for system design
    case 'Behavioral':
      return 120; // 2 minutes for behavioral (STAR method)
    case 'Technical':
      return 150; // 2.5 minutes for technical
    case 'Problem Solving':
      return 150;
    case 'Leadership':
      return 120;
    case 'Situational':
      return 90; // 1.5 minutes for situational
    default:
      return baseTime;
  }
};

export function VoiceInterviewAgent({ questions, companyName, onComplete, onExit }: VoiceInterviewAgentProps) {
  const [phase, setPhase] = useState<InterviewPhase>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [results, setResults] = useState<VoiceInterviewResult[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [expandedFeedback, setExpandedFeedback] = useState<number | null>(null);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  const [shouldListen, setShouldListen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isStarting, setIsStarting] = useState(false); // Prevent double clicks

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const finalTranscriptRef = useRef<string>('');
  const isSpeakingRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoSubmitRef = useRef<boolean>(false);

  // Timer countdown effect
  useEffect(() => {
    if (phase === 'listening' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Auto-submit when time runs out
            autoSubmitRef.current = true;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, timeRemaining]);

  // Auto-submit when timer reaches 0
  useEffect(() => {
    if (autoSubmitRef.current && timeRemaining === 0 && phase === 'listening') {
      autoSubmitRef.current = false;
      handleAutoSubmit();
    }
  }, [timeRemaining, phase]);

  // Handle auto-submit
  const handleAutoSubmit = useCallback(() => {
    if (finalTranscriptRef.current.trim()) {
      // Stop listening first
      setShouldListen(false);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
      setIsListening(false);
      
      // Trigger submit
      const answer = finalTranscriptRef.current.trim();
      processAnswer(answer);
    }
  }, []);

  // Check for browser support and load voices
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || !window.speechSynthesis) {
      setVoiceSupported(false);
      return;
    }

    // Load available voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        
        // Find the best premium voice
        let bestVoice: SpeechSynthesisVoice | null = null;
        
        // First priority: Premium/Neural voices
        for (const prefName of PREMIUM_VOICE_NAMES) {
          const found = voices.find(v => v.name.includes(prefName));
          if (found) {
            bestVoice = found;
            break;
          }
        }
        
        // Second priority: Any English female voice (tends to sound clearer)
        if (!bestVoice) {
          bestVoice = voices.find(v => 
            v.lang.startsWith('en') && 
            (v.name.toLowerCase().includes('female') || 
             v.name.includes('Samantha') ||
             v.name.includes('Karen') ||
             v.name.includes('Victoria'))
          ) || null;
        }
        
        // Third priority: Any English voice
        if (!bestVoice) {
          bestVoice = voices.find(v => v.lang.startsWith('en-US')) || 
                      voices.find(v => v.lang.startsWith('en')) || 
                      voices[0];
        }
        
        setSelectedVoice(bestVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition with improved settings
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      
      // Improved recognition settings
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 3;

      recognition.onresult = (event) => {
        // CRITICAL: Ignore results if AI is speaking to prevent capturing AI voice
        if (isSpeakingRef.current) {
          console.log('Ignoring speech - AI is speaking');
          return;
        }

        let finalText = '';
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          
          if (result.isFinal) {
            finalText += transcript + ' ';
          } else {
            interimText = transcript;
          }
        }

        // Update final transcript only when AI is NOT speaking
        if (finalText.trim() && !isSpeakingRef.current) {
          finalTranscriptRef.current += finalText;
          setCurrentTranscript(finalTranscriptRef.current.trim());
        }
        
        // Show interim results only when AI is NOT speaking
        if (!isSpeakingRef.current) {
          if (interimText) {
            setInterimTranscript(interimText);
          } else {
            setInterimTranscript('');
          }
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        switch (event.error) {
          case 'not-allowed':
            setMicError('Microphone access denied. Please allow microphone access and refresh.');
            setIsListening(false);
            setShouldListen(false);
            break;
          case 'no-speech':
            // Don't stop - just means silence, which is fine
            break;
          case 'audio-capture':
            setMicError('No microphone found. Please connect a microphone.');
            setIsListening(false);
            setShouldListen(false);
            break;
          case 'network':
            setMicError('Network error. Please check your connection.');
            break;
          default:
            // Try to recover from other errors only if we should be listening and AI is not speaking
            if (shouldListen && !isSpeakingRef.current) {
              setTimeout(() => {
                try {
                  recognition.start();
                } catch {
                  // Ignore if already started
                }
              }, 100);
            }
        }
      };

      recognition.onend = () => {
        // Restart only if we should be listening and AI is NOT speaking
        if (shouldListen && !isSpeakingRef.current) {
          setTimeout(() => {
            try {
              recognition.start();
            } catch {
              // Already started or other issue
            }
          }, 100);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
      window.speechSynthesis.cancel();
    };
  }, [shouldListen]);

  // Speak text using Web Speech API with premium voice
  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (isMuted || !window.speechSynthesis) {
      onEnd?.();
      return;
    }

    // CRITICAL: Stop listening before AI speaks to prevent capturing AI voice
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }
    setIsListening(false);
    setShouldListen(false);
    isSpeakingRef.current = true;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use selected premium voice or find best available
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      const voices = window.speechSynthesis.getVoices();
      const premiumVoice = voices.find(v => 
        PREMIUM_VOICE_NAMES.some(name => v.name.includes(name))
      ) || voices.find(v => v.lang.startsWith('en'));
      
      if (premiumVoice) {
        utterance.voice = premiumVoice;
      }
    }
    
    // Natural speech settings
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0; // Natural pitch
    utterance.volume = 1.0;

    utterance.onstart = () => {
      isSpeakingRef.current = true;
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      // Add delay before calling onEnd to prevent echo capture
      setTimeout(() => {
        onEnd?.();
      }, 500);
    };
    
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      setTimeout(() => {
        onEnd?.();
      }, 300);
    };

    synthesisRef.current = utterance;
    
    // Chrome bug fix: speech synthesis stops after ~15 seconds
    // Use chunking for long texts
    if (text.length > 200) {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      let index = 0;
      
      const speakNext = () => {
        if (index < sentences.length) {
          const chunk = new SpeechSynthesisUtterance(sentences[index]);
          if (selectedVoice) chunk.voice = selectedVoice;
          chunk.rate = 0.95;
          chunk.pitch = 1.0;
          chunk.volume = 1.0;
          
          chunk.onstart = () => {
            isSpeakingRef.current = true;
            setIsSpeaking(true);
          };
          
          chunk.onend = () => {
            index++;
            if (index < sentences.length) {
              speakNext();
            } else {
              isSpeakingRef.current = false;
              setIsSpeaking(false);
              // Add delay before calling onEnd
              setTimeout(() => {
                onEnd?.();
              }, 500);
            }
          };
          
          chunk.onerror = () => {
            isSpeakingRef.current = false;
            setIsSpeaking(false);
            setTimeout(() => {
              onEnd?.();
            }, 300);
          };
          
          window.speechSynthesis.speak(chunk);
        }
      };
      
      speakNext();
    } else {
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted, selectedVoice]);

  // Add agent message
  const addAgentMessage = useCallback((text: string) => {
    setMessages(prev => [...prev, { role: 'agent', text, timestamp: new Date() }]);
  }, []);

  // Add candidate message
  const addCandidateMessage = useCallback((text: string) => {
    setMessages(prev => [...prev, { role: 'candidate', text, timestamp: new Date() }]);
  }, []);

  // Process the answer (used by both manual submit and auto-submit)
  const processAnswer = useCallback((answer: string) => {
    addCandidateMessage(answer);
    setPhase('processing');

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Calculate duration
    const duration = questionStartTime 
      ? Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000)
      : 0;

    // Generate AI feedback
    setTimeout(() => {
      const question = questions[currentQuestionIdx];
      const feedback = generateFeedback(question, answer);
      
      const result: VoiceInterviewResult = {
        question,
        candidateAnswer: answer,
        feedback,
        duration,
      };

      setResults(prev => [...prev, result]);
      setPhase('feedback');

      // Provide verbal feedback
      const feedbackText = `Thank you for your answer. ${getFeedbackSummary(feedback.score)}`;
      addAgentMessage(feedbackText);
      
      speak(feedbackText, () => {
        // Move to next question or complete
        setTimeout(() => {
          if (currentQuestionIdx < questions.length - 1) {
            askQuestionByIndex(currentQuestionIdx + 1);
          } else {
            completeInterview();
          }
        }, 1000);
      });
    }, 1500);
  }, [questionStartTime, currentQuestionIdx, questions, addCandidateMessage]);

  // Start listening immediately
  const startListeningNow = useCallback(() => {
    if (isSpeakingRef.current) return;
    
    setShouldListen(true);
    setMicError(null);
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        // Already started, try restart
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            try {
              recognitionRef.current?.start();
              setIsListening(true);
            } catch {}
          }, 50);
        } catch {}
      }
    }
  }, []);

  // Ask a question by index
  const askQuestionByIndex = useCallback((idx: number) => {
    const question = questions[idx];
    if (!question) return;

    // Stop any listening
    setShouldListen(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsListening(false);

    setPhase('question');
    setCurrentQuestionIdx(idx);
    
    // Reset all transcripts
    finalTranscriptRef.current = '';
    setCurrentTranscript('');
    setInterimTranscript('');

    // Set timer based on question type
    const timeLimit = getTimeLimit(question);
    setTimeRemaining(timeLimit);

    const questionText = `Question ${idx + 1} of ${questions.length}. ${question.question}`;
    addAgentMessage(question.question);
    
    speak(questionText, () => {
      // AI finished speaking - start listening immediately
      setPhase('listening');
      setQuestionStartTime(new Date());
      
      // Very short delay then start listening
      setTimeout(() => {
        startListeningNow();
      }, 200);
    });
  }, [questions, speak, addAgentMessage, startListeningNow]);

  // Start the interview
  const startInterview = useCallback(() => {
    if (isStarting) return; // Prevent double clicks
    setIsStarting(true);
    
    const intro = `Hello! Welcome to your ${companyName} interview simulation. I'm your AI interviewer today. I'll be asking you ${questions.length} questions. Take your time with each answer, and speak naturally. Let's begin with your first question.`;
    
    addAgentMessage(intro);
    speak(intro, () => {
      setIsStarting(false);
      askQuestionByIndex(0);
    });
  }, [companyName, questions.length, speak, addAgentMessage, isStarting, askQuestionByIndex]);

  // Stop listening
  const stopListening = useCallback(() => {
    setShouldListen(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      setIsListening(false);
      setInterimTranscript('');
    }
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Submit answer and get feedback
  const submitAnswer = useCallback(() => {
    stopListening();
    
    const answer = currentTranscript.trim() || finalTranscriptRef.current.trim();
    if (!answer) {
      // If no answer, prompt to try again
      speak("I didn't catch your response. Could you please try answering again?", () => {
        setCurrentTranscript('');
        finalTranscriptRef.current = '';
        startListeningNow();
      });
      return;
    }

    processAnswer(answer);
  }, [currentTranscript, stopListening, speak, startListeningNow, processAnswer]);

  // Generate feedback based on answer
  const generateFeedback = (question: Question, answer: string): VoiceInterviewResult['feedback'] => {
    const wordCount = answer.split(/\s+/).length;
    const hasStructure = answer.toLowerCase().includes('first') || 
                         answer.toLowerCase().includes('then') ||
                         answer.toLowerCase().includes('finally') ||
                         answer.toLowerCase().includes('because');
    const hasExamples = answer.toLowerCase().includes('example') ||
                        answer.toLowerCase().includes('instance') ||
                        answer.toLowerCase().includes('when i') ||
                        answer.toLowerCase().includes('in my experience');
    const mentionsMetrics = /\d+%|\d+ percent|\d+ million|\d+ thousand/i.test(answer);

    // Calculate score based on various factors
    let score = 50; // Base score
    
    if (wordCount > 30) score += 10;
    if (wordCount > 60) score += 10;
    if (wordCount > 100) score += 5;
    if (hasStructure) score += 10;
    if (hasExamples) score += 10;
    if (mentionsMetrics) score += 5;

    // Cap at 95
    score = Math.min(95, score);

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (wordCount > 50) {
      strengths.push('Provided a detailed and comprehensive response');
    } else {
      improvements.push('Try to elaborate more on your answers with specific details');
    }

    if (hasStructure) {
      strengths.push('Well-structured answer with clear logical flow');
    } else {
      improvements.push('Consider using a structured approach (e.g., STAR method for behavioral questions)');
    }

    if (hasExamples) {
      strengths.push('Included relevant examples from experience');
    } else {
      improvements.push('Include specific examples from your past experience');
    }

    if (mentionsMetrics) {
      strengths.push('Quantified impact with specific metrics');
    } else {
      improvements.push('Add quantifiable metrics to demonstrate impact');
    }

    if (strengths.length === 0) {
      strengths.push('Addressed the question directly');
    }

    return {
      score,
      strengths,
      improvements,
      sampleAnswer: question.sampleAnswer || 'No sample answer available.',
    };
  };

  // Get feedback summary text
  const getFeedbackSummary = (score: number): string => {
    if (score >= 85) return "Excellent response! You demonstrated strong communication and provided specific examples.";
    if (score >= 70) return "Good answer. You covered the key points well. Consider adding more specific examples next time.";
    if (score >= 55) return "Decent response. Try to structure your answer more clearly and include concrete examples.";
    return "There's room for improvement. Focus on being more specific and using the STAR method for behavioral questions.";
  };

  // Complete the interview
  const completeInterview = useCallback(() => {
    setPhase('complete');
    
    const avgScore = results.length > 0 
      ? Math.round(results.reduce((acc, r) => acc + r.feedback.score, 0) / results.length)
      : 0;

    const closingText = `That concludes our interview. Your overall performance score is ${avgScore} percent. Thank you for your time today. You can now review your detailed feedback for each question.`;
    
    addAgentMessage(closingText);
    speak(closingText);
  }, [results, addAgentMessage, speak]);

  // Toggle mute
  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

  // Skip current speech
  const skipSpeech = () => {
    window.speechSynthesis.cancel();
    isSpeakingRef.current = false;
    setIsSpeaking(false);
  };

  if (!voiceSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-8 max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Voice Not Supported</h2>
          <p className="text-slate-400 mb-6">
            Your browser doesn't support the Web Speech API required for voice interviews. 
            Please use Chrome, Edge, or Safari for the best experience.
          </p>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Test voice function
  const testVoice = (voice: SpeechSynthesisVoice) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("Hello, I'm your AI interviewer. Let's begin the interview.");
    utterance.voice = voice;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Intro screen
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-8 max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Interview Agent</h2>
          <p className="text-slate-400 mb-6">
            You're about to start a voice-based interview simulation for <span className="text-indigo-400 font-medium">{companyName}</span>. 
            The AI agent will ask you {questions.length} questions and provide real-time feedback.
          </p>
          
          <div className="bg-slate-900/50 rounded-xl p-4 mb-6 text-left">
            <h3 className="text-sm font-medium text-white mb-2">How it works:</h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li className="flex items-start gap-2">
                <Volume2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <span>The agent will speak each question aloud</span>
              </li>
              <li className="flex items-start gap-2">
                <Mic className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Speak your answer naturally - it will be transcribed</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>Receive AI-powered feedback after each answer</span>
              </li>
            </ul>
          </div>

          {/* Voice Selector */}
          <div className="mb-6">
            <button
              onClick={() => setShowVoiceSelector(!showVoiceSelector)}
              className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mx-auto"
            >
              <Volume2 className="w-4 h-4" />
              {showVoiceSelector ? 'Hide voice options' : 'Choose interviewer voice'}
              {showVoiceSelector ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showVoiceSelector && (
              <div className="mt-3 bg-slate-900/70 rounded-xl p-3 max-h-48 overflow-y-auto">
                <div className="space-y-1">
                  {availableVoices
                    .filter(v => v.lang.startsWith('en'))
                    .slice(0, 10)
                    .map((voice, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedVoice(voice);
                          testVoice(voice);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                          selectedVoice?.name === voice.name
                            ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                            : "hover:bg-slate-800 text-slate-300"
                        )}
                      >
                        <span>{voice.name.replace('Microsoft ', '').replace('Google ', '')}</span>
                        {selectedVoice?.name === voice.name && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                        )}
                      </button>
                    ))}
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Click a voice to preview it
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onExit}
              disabled={isStarting}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={startInterview}
              disabled={isStarting}
              className={cn(
                "flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                isStarting 
                  ? "opacity-80 cursor-wait" 
                  : "hover:from-indigo-500 hover:to-purple-500"
              )}
            >
              {isStarting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Interview
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Complete screen
  if (phase === 'complete') {
    const avgScore = results.length > 0 
      ? Math.round(results.reduce((acc, r) => acc + r.feedback.score, 0) / results.length)
      : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Interview Complete!</h1>
            <p className="text-slate-400">Here's your detailed performance analysis</p>
          </div>

          {/* Overall Score */}
          <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Overall Score</h2>
              <span className={cn(
                "text-3xl font-bold",
                avgScore >= 80 ? "text-green-400" :
                avgScore >= 60 ? "text-yellow-400" : "text-red-400"
              )}>
                {avgScore}%
              </span>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  avgScore >= 80 ? "bg-gradient-to-r from-green-500 to-emerald-400" :
                  avgScore >= 60 ? "bg-gradient-to-r from-yellow-500 to-amber-400" :
                  "bg-gradient-to-r from-red-500 to-orange-400"
                )}
                style={{ width: `${avgScore}%` }}
              />
            </div>
          </div>

          {/* Question Results */}
          <div className="space-y-4 mb-8">
            {results.map((result, idx) => (
              <div key={idx} className="bg-slate-800/70 border border-slate-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFeedback(expandedFeedback === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-medium">
                      {idx + 1}
                    </span>
                    <span className="text-white font-medium text-left">{result.question.question.slice(0, 60)}...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      result.feedback.score >= 80 ? "bg-green-500/20 text-green-400" :
                      result.feedback.score >= 60 ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    )}>
                      {result.feedback.score}%
                    </span>
                    {expandedFeedback === idx ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {expandedFeedback === idx && (
                  <div className="px-4 pb-4 space-y-4">
                    {/* Your Answer */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 mb-2">Your Answer:</h4>
                      <p className="text-white bg-slate-900/50 rounded-lg p-3 text-sm">
                        {result.candidateAnswer || 'No response recorded'}
                      </p>
                    </div>

                    {/* Strengths */}
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">✓ Strengths:</h4>
                      <ul className="space-y-1">
                        {result.feedback.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-green-400">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div>
                      <h4 className="text-sm font-medium text-amber-400 mb-2">→ Areas for Improvement:</h4>
                      <ul className="space-y-1">
                        {result.feedback.improvements.map((s, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-amber-400">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sample Answer */}
                    <div>
                      <h4 className="text-sm font-medium text-indigo-400 mb-2">💡 Sample Answer:</h4>
                      <p className="text-sm text-slate-300 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3">
                        {result.feedback.sampleAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onExit}
              className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
            <button
              onClick={() => onComplete(results)}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              New Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main interview UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">
      {/* Top bar */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-white">AI Interview Agent</span>
              <span className="text-xs text-slate-400 block">{companyName}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Progress */}
            <span className="text-sm text-slate-400 mr-4">
              Question {currentQuestionIdx + 1} of {questions.length}
            </span>
            
            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isMuted ? "bg-red-500/20 text-red-400" : "bg-slate-700 text-slate-300 hover:text-white"
              )}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Skip speech */}
            {isSpeaking && (
              <button
                onClick={skipSpeech}
                className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Skip speech"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            )}

            {/* Exit */}
            <button
              onClick={() => setShowExitConfirm(true)}
              className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex gap-3",
                msg.role === 'candidate' ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'agent' 
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600" 
                  : "bg-gradient-to-br from-emerald-500 to-teal-600"
              )}>
                {msg.role === 'agent' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                msg.role === 'agent'
                  ? "bg-slate-800 border border-slate-700/50 rounded-tl-sm"
                  : "bg-indigo-600/90 rounded-tr-sm"
              )}>
                <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                <span className="text-xs text-slate-400 mt-1 block">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Processing indicator */}
          {phase === 'processing' && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom control area */}
      <div className="bg-slate-800/50 border-t border-slate-700/50 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Microphone error message */}
          {micError && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium text-sm">{micError}</p>
                <button 
                  onClick={() => {
                    setMicError(null);
                    window.location.reload();
                  }}
                  className="text-xs text-red-300 underline mt-1"
                >
                  Refresh page
                </button>
              </div>
            </div>
          )}

          {/* Timer Display */}
          {phase === 'listening' && timeRemaining > 0 && (
            <div className="mb-4 flex items-center justify-center">
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-semibold",
                timeRemaining <= 10 ? "bg-red-500/20 text-red-400 animate-pulse" :
                timeRemaining <= 30 ? "bg-amber-500/20 text-amber-400" :
                "bg-slate-700/50 text-slate-300"
              )}>
                <Clock className="w-5 h-5" />
                <span>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
                <span className="text-xs text-slate-500 ml-2">remaining</span>
              </div>
            </div>
          )}

          {/* Auto-submit warning */}
          {phase === 'listening' && timeRemaining <= 10 && timeRemaining > 0 && (
            <div className="mb-4 text-center">
              <span className="text-amber-400 text-sm animate-pulse">
                ⚠️ Time almost up! Your answer will be auto-submitted.
              </span>
            </div>
          )}

          {/* Current transcript */}
          {(phase === 'listening' || isListening) && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">Your response:</span>
                </div>
                {currentTranscript && (
                  <span className="text-xs text-slate-500">
                    {currentTranscript.split(/\s+/).filter(Boolean).length} words
                  </span>
                )}
              </div>
              <div className="bg-slate-900/50 rounded-xl p-4 min-h-[100px] border border-slate-700/50">
                {currentTranscript || interimTranscript ? (
                  <p className="text-white text-sm leading-relaxed">
                    {currentTranscript}
                    {interimTranscript && (
                      <span className="text-indigo-400 opacity-70"> {interimTranscript}</span>
                    )}
                  </p>
                ) : (
                  <p className="text-slate-500 italic text-sm">
                    🎤 Start speaking... your words will appear here in real-time
                  </p>
                )}
              </div>
              {isListening && (
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Tip: Speak clearly and at a normal pace. Click "Submit Answer" when finished.
                </p>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {phase === 'listening' && (
              <>
                <button
                  onClick={() => {
                    if (isListening) {
                      stopListening();
                    } else {
                      startListeningNow();
                    }
                  }}
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                    isListening 
                      ? "bg-red-500 hover:bg-red-400 animate-pulse" 
                      : "bg-indigo-600 hover:bg-indigo-500"
                  )}
                >
                  {isListening ? <MicOff className="w-7 h-7 text-white" /> : <Mic className="w-7 h-7 text-white" />}
                </button>

                <button
                  onClick={submitAnswer}
                  disabled={!currentTranscript.trim()}
                  className={cn(
                    "px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2",
                    currentTranscript.trim()
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-slate-700 text-slate-500 cursor-not-allowed"
                  )}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Submit Answer
                </button>
              </>
            )}

            {phase === 'question' && isSpeaking && (
              <div className="flex items-center gap-2 text-slate-400">
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span className="text-sm">Interviewer is speaking...</span>
              </div>
            )}

            {phase === 'processing' && (
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-5 h-5 animate-spin" />
                <span className="text-sm">Analyzing your response...</span>
              </div>
            )}

            {phase === 'feedback' && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Moving to next question...</span>
              </div>
            )}
          </div>

          {/* Listening indicator */}
          {isListening && (
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-indigo-500 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
              <span className="text-xs text-indigo-400 ml-2">Listening...</span>
            </div>
          )}
        </div>
      </div>

      {/* Exit confirmation modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Exit Interview?</h3>
            <p className="text-sm text-slate-400 mb-6">
              Your progress will be lost. Are you sure you want to exit?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Continue
              </button>
              <button
                onClick={onExit}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
