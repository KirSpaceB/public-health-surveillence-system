import fetchCovidData from "../api/covid_data";
type CoivdData = Record<string, string | number>
import { BovidData } from "../api/covid_data";
import geocodeCounty from "./GeocodeData";

// we await fetchVoidData from covid_data.ts
// then we pass each value from fetchVoidData to geocodeCounty
// then we use geocodeCounty in GetLocationValuesFromData
export default async function GetLocationValuesFromData():Promise<[[]]> {
  const result = await fetchCovidData();
  const geocodePromises = result.map(item => geocodeCounty(item.county, item.state));
  const geocodeResults = await Promise.all(geocodePromises);
  console.log("geocodeResults", geocodeResults);
  return geocodeResults;
}