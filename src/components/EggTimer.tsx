import { useState, useEffect, useRef } from 'react';
import './EggTimer.css';

type EggType = 'soft' | 'medium' | 'hard';

const EGG_TIMES: Record<EggType, number> = {
  soft: 6 * 60, // 6 minutes
  medium: 8 * 60, // 8 minutes
  hard: 10 * 60, // 10 minutes
};

export const EggTimer = () => {
  const alertSoundUrl = new URL('../assets/notification-bell.mp3', import.meta.url).href;
  const [selectedType, setSelectedType] = useState<EggType>('medium');
  const [timeLeft, setTimeLeft] = useState<number>(EGG_TIMES.medium);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAlertSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.loop = false;
      audioRef.current.currentTime = 0;
    }
  };

  const handleEggTypeChange = (type: EggType) => {
    console.log('Changing egg type to:', type);
    console.log('New time will be:', EGG_TIMES[type]);
    setSelectedType(type);
    setTimeLeft(EGG_TIMES[type]);
    console.log('Time updated to:', EGG_TIMES[type]);
    setIsComplete(false);
    stopAlertSound();
  };

  useEffect(() => {
    let timer: number | undefined;

    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsComplete(true);
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play();
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    stopAlertSound();
    setTimeLeft(EGG_TIMES[selectedType]);
    setIsRunning(true);
    setIsComplete(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    stopAlertSound();
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(EGG_TIMES[selectedType]);
    stopAlertSound();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const eggTimerClass = `egg-timer ${isRunning ? 'running' : ''} ${isComplete ? 'complete' : ''}`;

  return (
    <div className={eggTimerClass}>
      <h1>Egg Timer</h1>

      <div className="time-info">
        <div className="timer-display">{formatTime(timeLeft)}</div>
      </div>

      <div className="egg-type-selector">
        <button
          className={selectedType === 'soft' ? 'active' : ''}
          onClick={() => {
            console.log('Soft button clicked');
            handleEggTypeChange('soft');
          }}
          disabled={isRunning}
        >
          Soft Boiled
        </button>
        <button
          className={selectedType === 'medium' ? 'active' : ''}
          onClick={() => {
            console.log('Medium button clicked');
            handleEggTypeChange('medium');
          }}
          disabled={isRunning}
        >
          Medium Boiled
        </button>
        <button
          className={selectedType === 'hard' ? 'active' : ''}
          onClick={() => {
            console.log('Hard button clicked');
            handleEggTypeChange('hard');
          }}
          disabled={isRunning}
        >
          Hard Boiled
        </button>
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={handleStart} className="start-btn">
            Start
          </button>
        ) : (
          <button onClick={handleStop} className="stop-btn">
            Stop
          </button>
        )}
        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </div>

      <audio
        ref={audioRef}
        src={alertSoundUrl}
        preload="auto"
      />
    </div>
  );
};
