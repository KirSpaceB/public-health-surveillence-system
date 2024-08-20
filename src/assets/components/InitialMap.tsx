import { useEffect, useRef } from "react"
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView"
export default function InitialMap() {
  const mapDiv = useRef<HTMLDivElement>(null);

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
