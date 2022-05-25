import { useState, useMemo, useRef } from "react"
import { Map as LMap, TileLayer, FeatureGroup, Rectangle, Tooltip, } from "react-leaflet"
import axios from "axios"

//@ts-ignore
import { EditControl, } from "react-leaflet-draw"
import { LatLngExpression, LatLng, LocationEvent, LayerEvent } from "leaflet"
import { flushSync } from "react-dom"


type MapConfigType = {
  center: LatLngExpression
  zoom: number
  scrollWheelZoom: boolean
  style: any
}

type FeatureType = {
  id?: string
  name: string
  vertices: number[][]
}

const LeafletMap = () => {
  const filterDupeFeatures = (arr: FeatureType[]) => {
    let flatArr:any[] = [];
    arr.forEach(x => {flatArr.push(x.vertices.flat(Infinity).sort())})
    return arr.filter(a=>flatArr.indexOf(a.vertices.flat().sort()) != -1 )
  }

  const [features, setFeatures] = useState<FeatureType[]>([]) 

  let FGRef: any = null

  const onCreate = (e: LocationEvent) => {
    let vertices: LatLng[] = e.layer._latlngs[0]
    let arrVertices = vertices.map(vertex => [vertex.lat, vertex.lng])
    let locationName = prompt("please name this location")
    e.layer.bindTooltip(locationName ?? "unnamed location")
    let newRect: FeatureType = {
      name: locationName ?? "unnamed location",
      vertices: [arrVertices[0], arrVertices[2]]
    }

    flushSync(() => { 
      setFeatures(prev => filterDupeFeatures([...prev, newRect]))
    }) 
    axios.post(`http://localhost:8000/bounds`, newRect) 
  }
  const onEdit = (e: any) => {
    Object.keys(e.layers._layers).forEach(key => {
      let layer = e.layers._layers[key]
      let tooltipText = layer._tooltip._content 
      let arrVertices = [layer._bounds._northEast, layer._bounds._southWest].map(vertex => [vertex.lat, vertex.lng])
      let locationName = prompt(`(optional) please enter a new name for location with bounds: ${arrVertices[0]}, ${arrVertices[1]}`)
      layer.bindTooltip((locationName || tooltipText) ?? "unnamed location")
    })
  }

  const onFeatureGroupReady = (reactFGref: any) => {
    FGRef = reactFGref
  }

  const mapConfig: MapConfigType = {
    center: [36.1, -115.1],
    zoom: 8,
    scrollWheelZoom: true,
    style: {
      height: "1000px"
    }
  }

  //on map interaction event, add a draggable marker for the vertex 
  return (
    <LMap {...mapConfig}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* @ts-ignore */}
      <FeatureGroup ref={onFeatureGroupReady}>
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
    </LMap>
  )
}

export default LeafletMap
