import CountdownAnimation from "./CountdownAnimation";
import SetPomodoro from "./SetPomodoro";

const FocusTimer = () => {
  return (
    <div className="container">
      <h1>Pomodoro</h1>
      <small>Be Productive the right way.</small>
      {/* <SetPomodoro /> */}
      <CountdownAnimation />
    </div>
  );
}

export default FocusTimer
