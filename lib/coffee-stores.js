
    const getUrlForCoffeeStores = (latlong, limit, query) => {
       return `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`
    }

  export const fetchCoffeeStores = async (
    latLong = "42.26365865819473,-71.1775823586552", 
    limit = 6) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
          origin : '*',
          optionsSuccessStatus: 200,
        }
      };
      const response = await fetch(getUrlForCoffeeStores(latLong , limit , "coffee stores"), options);
      const data = await response.json();

      return data.results;
  }