import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../pages/_app";


const useTrackLocation = () => {

    const [locationError , setLocationError] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false)
    
    const {state, dispatch} = useContext(StoreContext)

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        dispatch({
            type : ACTION_TYPES.SET_LAT_LONG,
            payload : `${latitude},${longitude}`
        })
        setLocationError('');
        setIsFindingLocation(false)
    }

    const error = () => {
        setLocationError('Unable to retrieve location')
        setIsFindingLocation(false)
    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true)
        if(!navigator.geolocation){
            setLocationError("Geolocation is not supported by your browser");
            setIsFindingLocation(false)
        } else {
            navigator.geolocation.getCurrentPosition(success, error)
            
        }

      

    }

  return {
    handleTrackLocation,
    locationError,
    isFindingLocation
  };
}

export default useTrackLocation;
