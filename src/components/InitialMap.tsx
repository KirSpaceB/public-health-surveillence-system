import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import fetchCovidData from "../api/covid_data";
import GetLocationValuesFromData from "../tooling/GetLocationValuesFromData";

export default function InitialMap() {
  const mapDiv = useRef<HTMLDivElement>(null);
  // This fetch covid data returns a promise from the cdc api
  // We can't just place this in
  fetchCovidData();

  useEffect(() => {
    if(mapDiv.current) {
      const map = new Map({
        basemap: 'streets-navigation-vector', // set the base map layer
      });

      const view = new MapView({
        container: mapDiv.current, // Reference to the DOM node that will contain the map
        map: map, // Reference to the Map object created before
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 3, // Zoom level
      });

      const graphicLayer = new GraphicLayer();
      map.add(graphicLayer);

      GetLocationValuesFromData().then((value) => {
        console.log("value in GetLocationValuesFromData", value)
        for(let i = 0; i < value.length; i++) {
          // Destructure the values from the inner arrays
          const [longitude, latitude] = value[i];
          //create new point for each coordinate
          const point = new Point({
            longitude:longitude,
            latitude: latitude
          });

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: {
              type: 'simple-marker',
              color: 'red',
              outline: {
                color: [233, 122, 200],
                width: 1
              }
            },
            attributes: {
              name: `Location ${i + 1}` // Example: naming each point
            },
            popupTemplate: {
              title: `Location ${i + 1}`,
              content: `Coordinates: (${latitude}, ${longitude})`
            }
          });
          
          graphicLayer.add(pointGraphic)
        }
      })

      // // we need to make the return value of geocodeCounty accessible
      // fetchGeoCode().then((value) => {
      //   let somevalue = value;
      //   console.log("if you dont output a value I will explode", somevalue);
      //   console.log("lat from geocodeCounty", somevalue?.latitude);
      //   console.log("long geocode county", somevalue?.longitude)
      //   // You can now use `somevalue` for further processing
      //   // The issue here is that that point is being used before the async function is setting its values.
      //   const point = new Point({
      //     longitude: somevalue?.longitude,
      //     latitude: somevalue?.latitude
      //   });

      //   const pointGraphic = new Graphic({
      //     geometry: point,
      //     symbol: {
      //       type: 'simple-marker',
      //       color: 'red',
      //       outline: {
      //         color:[255,255,255],
      //         width: 2
      //       }
      //     },
      //     attributes: {
      //       name: "Shawano County"
      //     },
      //     popupTemplate: {
      //       title: 'test',
      //       content: 'test2'
      //     }
      //   })

      //   graphicLayer.add(pointGraphic);

      // });

      return () => {
        if(view) {
          view.destroy();
        }
      };
    }
    
  }, [GetLocationValuesFromData()])

  return (
    <div
      style={{height:'100vh', width:'100%'}}
      ref={mapDiv}
    >
      Map
    </div>
  )
}
