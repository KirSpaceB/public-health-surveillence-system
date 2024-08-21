import { addressToLocations, locationToAddress, } from "@arcgis/core/rest/locator";
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
            maxLocations: 5
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
      console.log(error as Error['message'])
    }
  }
  return geocodedLocationCovertedToCoordinates;
}

export default geocodeCounty