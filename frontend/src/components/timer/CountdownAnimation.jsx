import { useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { TimerSettingsContext } from '../../context/TimerSettingsContext';

const CountdownAnimation = ({key = 1, timer = 20, animate = true, children }) => {
  const {stopTimer} = useContext(TimerSettingsContext)
  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={animate}
      duration={ timer * 60}
      colors={['#fe6f6b', 0.33]}
      strokeWidth={6}
      // Can be set to background color to make disappearing effect
      trailColor="#151932"
      onComplete={ () => {
        stopTimer();
      }}
    >
      {children}
      </CountdownCircleTimer>
  )
}

export default CountdownAnimation;