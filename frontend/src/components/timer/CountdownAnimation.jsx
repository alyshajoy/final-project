import { useContext } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { TimerSettingsContext } from '../../contexts/TimerSettingsContext';


const CountdownAnimation = ({key = 1, timer = 20, animate = true, children }) => {
  
  const {stopTimer} = useContext(TimerSettingsContext)

  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={animate}
      duration={ timer * 60}
      colors={['#ffabab', 0.28]}
      strokeWidth={15}
      // Can be set to background color to make disappearing effect
      trailColor="#FFF"
      size={250}
      onComplete={ () => {
        stopTimer();
      }}
    >
      {children}
      </CountdownCircleTimer>
  )
}

export default CountdownAnimation;