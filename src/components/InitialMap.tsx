import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import fetchCovidData from "../api/covid_data";
import geocodeCounty from "../tooling/GeocodeData";

const latitudeAndLongitude = async () => {
  return geocodeCounty();
}

const fetchGeoCode = async () => {
  const location = await geocodeCounty();
  if (location != null || location != undefined) {
    return location;
  } else {
    alert("something went wrong in fetchGeoCode")
  }
}

export default function InitialMap() {
  const mapDiv = useRef<HTMLDivElement>(null);
  const locationRef = useRef<Record<string, number>>(null)
  fetchCovidData();
  geocodeCounty();

  console.log("lat and long", latitudeAndLongitude)
  

  useEffect(() => {
    if(mapDiv.current) {
      const map = new Map({
        basemap: 'streets-navigation-vector', // set the base map layer
      });

      const view = new MapView({
        container: mapDiv.current, // Reference to the DOM node that will contain the map
        map: map, // Reference to the Map object created before
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
      });

      const graphicLayer = new GraphicLayer();
      map.add(graphicLayer);

      // we need to make the return value of geocodeCounty accessible
      fetchGeoCode().then((value) => {
        let somevalue = value;
        console.log("if you dont output a value I will explode", somevalue);
        console.log("lat", somevalue?.latitude);
        console.log("long", somevalue?.longitude)
        // You can now use `somevalue` for further processing
        // The issue here is that that point is being used before the async function is setting its values.
        const point = new Point({
          longitude: somevalue?.longitude,
          latitude: somevalue?.latitude
        });

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: {
            type: 'simple-marker',
            color: 'red',
            outline: {
              color:[255,255,255],
              width: 2
            }
          },
          attributes: {
            name: "Shawano County"
          },
          popupTemplate: {
            title: 'test',
            content: 'test2'
          }
        })

        graphicLayer.add(pointGraphic);

      });

      return () => {
        if(view) {
          view.destroy();
        }
      };
    }
  }, [])

  return (
    <div
      style={{height:'100vh', width:'100%'}}
      ref={mapDiv}
    >
      Map
    </div>
  )
}
