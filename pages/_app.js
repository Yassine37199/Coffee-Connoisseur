import { createContext, useReducer } from 'react'
import '../styles/globals.css'

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG : 'SET_LAT_LONG',
  SET_COFFEE_STORES : 'SET_COFFEE_STORES'
}

const StoreReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LONG : {
        return {
          ...state,
          latlong : action.payload
        }
    }

    case ACTION_TYPES.SET_COFFEE_STORES : {
      return {
      ...state,
      coffeeStores : action.payload }
    }

    default : throw new Error(`Unhandled Action Type : ${action.type}`)
  }
}

const StoreProvider = ({children}) => {
  const initialState = {
    latlong : '',
    coffeeStores : []
  }

  const [state, dispatch] = useReducer(StoreReducer, initialState)

  return (
  <StoreContext.Provider value={{state, dispatch}}>
    {children}
  </StoreContext.Provider> )
}

export default function App({ Component, pageProps }) {
  return (
  <>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
   
  </>
  
  
  )
}
