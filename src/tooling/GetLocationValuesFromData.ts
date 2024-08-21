import fetchCovidData from "../api/covid_data";
type CoivdData = Record<string, string | number>
import { BovidData } from "../api/covid_data";
import geocodeCounty from "./GeocodeData";

export default async function GetLocationValuesFromData():Promise<[[]]> {
  const result = await fetchCovidData();
  const geocodePromises = result.map(item => geocodeCounty(item.county, item.state));
  const geocodeResults = await Promise.all(geocodePromises);
  console.log("geocodeResults", geocodeResults);
  return geocodeResults;
}