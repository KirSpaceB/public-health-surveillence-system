import { addressToLocations, locationToAddress, } from "@arcgis/core/rest/locator";


async function geocodeCounty() {
  const url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  try {
    const results = await addressToLocations(
        url,
        {
          address: {
            "SingleLine": "Shawano County, WI"
          },
          maxLocations: 1
        },
    );

    if(results.length > 0) {
      const {location} = results[0];
      console.log('Latitude', location.y, 'Logitutde: ', location.x)
      return location;
    }
  } catch(error) {
    console.log(error as Error['message'])
  }
}

export default geocodeCounty