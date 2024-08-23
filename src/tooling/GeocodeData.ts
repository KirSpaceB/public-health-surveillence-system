import { addressToLocations, } from "@arcgis/core/rest/locator";
import getStateAbbreviation from "./GetStateAbbreviations";
// the issue here is that we might need to format it in "County, State" form
async function geocodeCounty(county?:string, state?:string):Array {
  const url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  const geocodedLocationCovertedToCoordinates = [];

  if(county != undefined && state != undefined) {
    try {
      const stateAbbreviation = getStateAbbreviation(state);
      const results = await addressToLocations(url,
        {
          address: {
            "City": county,
            "State": stateAbbreviation
          }
        }
      )
      console.log("results from geocodeCounty", results);
      if(results.length > 0) {
        // Destructuring x and y properties from the location object
        const { x, y } = results[0].location;
        
        // Assuming geocodedLocationCovertedToCoordinates is an array
        geocodedLocationCovertedToCoordinates.push(x, y);
      }
    } catch(error) {
      console.log("This is the county it failed to fetch", county);
      console.log("This is the state it failed to fetch", state);
      console.log("This is the reason the geocode api was unable to get the message", error as Error['message']);
    }
  } else {
    console.log("This county is undefined", county);
    console.log("This state is undefined", state);
  }
  return geocodedLocationCovertedToCoordinates;
}

export default geocodeCounty