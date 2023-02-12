
    const getUrlForCoffeeStores = (latlong, limit, query) => {
       return `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`
    }

  export const fetchCoffeeStores = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.FOURSQUARE_API_KEY,
          origin: '*',
          optionsSuccessStatus: 200,
        }
      };
      console.log()
      const response = await fetch(getUrlForCoffeeStores("36.7978152,10.1832781" , 6 , "coffee stores"), options);
      const data = await response.json();

      return data.results;
  }