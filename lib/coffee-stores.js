
    const getUrlForCoffeeStores = (latlong, limit, query) => {
       return `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`
    }

  export const fetchCoffeeStores = async (latLong) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
          origin : '*',
          optionsSuccessStatus: 200,
        }
      };
      console.log()
      const response = await fetch(getUrlForCoffeeStores(latLong , 6 , "coffee stores"), options);
      const data = await response.json();

      return data.results;
  }