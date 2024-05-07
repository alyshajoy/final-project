import { createContext } from "react";

export const TimerSettingsContext = createContext()

const TimerSettingsContextProvider = () => {
  return (
    <div>
      <TimerSettingsContext.Provider value={{}}>

      </TimerSettingsContext.Provider>
    </div>
  )
}
export default TimerSettingsContextProvider;