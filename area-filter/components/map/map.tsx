import React from "react"
import { Map, TileLayer, FeatureGroup } from "react-leaflet"

//@ts-ignore
import { EditControl,  } from "react-leaflet-draw"
import type { LatLngExpression, LatLng, LocationEvent, LayerEvent } from "leaflet"


type MapConfigTypes = {
  center: LatLngExpression
  zoom: number
  scrollWheelZoom: boolean
  style: any
}
const LeafletMap = () => {
 

  const onCreate = (e: LocationEvent) => {   
    let vertices: LatLng[] = e.layer._latlngs[0]
    let arrVertices = vertices.map(vertex => [vertex.lat, vertex.lng])
    alert(`Created: ${arrVertices[0]}, ${arrVertices[2]}`)
    //if (!FGRef ) return
    //FGRef.leafletElement.toGeoJSON()
  }
  const onEdit = (e: any) => {   
    e.layers.eachLayer(a => {
      console.log(a.toGeoJSON())
    })
    let vertices: LatLng[] = e. layer._latlngs[0]
    let arrVertices = vertices.map(vertex => [vertex.lat, vertex.lng])
    alert(`Edited: ${arrVertices[0]}, ${arrVertices[2]}`)
    //if (!FGRef ) return
    //FGRef.leafletElement.toGeoJSON()
  }

  const mapConfig: MapConfigTypes = {
    center: [36.1, -115.1],
    zoom: 8,
    scrollWheelZoom: true,
    style: {
      height: "1000px"
    }
  }

  //on map interaction event, add a draggable marker for the vertex 
  return (
    <Map {...mapConfig}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onEdited={onEdit}
          onCreated={onCreate} 
          draw={{
            polyline: false,
            polygon: false,
            circle: false,
            marker: false,
            circlemarker: false,
            rectangle: true
          }}
        />
      </FeatureGroup>
    </Map>
  )
}

export default LeafletMap
