import { addressToLocations, } from "@arcgis/core/rest/locator";
import getStateAbbreviation from "./GetStateAbbreviations";
// the issue here is that we might need to format it in "County, State" form
async function geocodeCounty(healthServiceAreaPropertyVal: string):Array {
  const geoCodingAPI = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  const geocodedLocationCovertedToCoordinates = [];

  if(healthServiceAreaPropertyVal) {
    try {
      // We need to change this to single line
      const geocodedLocationResults = await addressToLocations(geoCodingAPI,
        {
          address: {
            "SingleLine": healthServiceAreaPropertyVal
          }
        }
      )
      console.log("results from geocodeCounty", geocodedLocationResults);
      if(geocodedLocationResults.length > 0) {
        // Destructuring x and y properties from the location object
        const { x, y } = geocodedLocationResults[0].location;
        
        // Assuming geocodedLocationCovertedToCoordinates is an array
        geocodedLocationCovertedToCoordinates.push(x, y);
      }
    } catch(error) {
      console.log("This is the county it failed to fetch", healthServiceAreaPropertyVal);
      console.log("This is the reason the geocode api was unable to get the message", error as Error['message']);
    }
  } else {
    console.log("This county is undefined", healthServiceAreaPropertyVal);
  }
  return geocodedLocationCovertedToCoordinates;
}

export default geocodeCounty