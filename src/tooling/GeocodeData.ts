import { addressToLocations, locationToAddress, } from "@arcgis/core/rest/locator";
import getStateAbbreviation from "./GetStateAbbreviations";
// the issue here is that we might need to format it in "County, State" form
async function geocodeCounty(county?:string, state?:string):Array {
  const url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
  const geocodedLocationCovertedToCoordinates = [];
  console.log("county from geocodeCounty", typeof(county), county);
  console.log("state from geocodeCounty", state)

  if(county != undefined) {
    try {
      const results = await addressToLocations(
          url,
          {
            // We need to make this function dynamic
            address: {
              "SingleLine": county
            },
            // changing max locatio doesn't do anything from my experience
            maxLocations: 25
          },
      );
      console.log("results from geocodeCounty", results);
      if(results.length > 0) {
        // Destructuring x and y properties from the location object
        const { x, y } = results[0].location;
        
        // Assuming geocodedLocationCovertedToCoordinates is an array
        geocodedLocationCovertedToCoordinates.push(x, y);
      }
    } catch(error) {
      console.log("This is the county it failed to fetch", county);
      console.log("This is the error message from catch block", error as Error['message']);
      try {
        const stateAbbreviation = getStateAbbreviation(state);
        const resultsUsingCountyAndState = await addressToLocations(url,
          {
            address: {
              "City": county,
              "State": stateAbbreviation
            }
          }
        )
        console.log("resultsUsingCountyAndState", resultsUsingCountyAndState)
        if(resultsUsingCountyAndState.length > 0) {
          const {x,y} = resultsUsingCountyAndState[0].location;
          geocodedLocationCovertedToCoordinates.push(x,y)
        }
      } catch(error) {
        console.log("Something went wrong")
      }
    }
  } else {
    console.log("This county is undefined", county);
  }
  return geocodedLocationCovertedToCoordinates;
}

export default geocodeCounty