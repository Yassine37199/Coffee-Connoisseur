import { useState } from "react";


const useTrackLocation = () => {

    const [locationError , setLocationError] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false)
    const [latLong, setLatLong] = useState('');


    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        setLatLong(`${latitude},${longitude}`);
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
    latLong,
    handleTrackLocation,
    locationError,
    isFindingLocation
  };
}

export default useTrackLocation;
