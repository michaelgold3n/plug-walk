import Map, { Source, Layer } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useCallback, useRef } from "react"

const MapElement = ({ nftBounds }) => {
  const mapRef = useRef()

  const loadImages = useCallback(() => {
    if (nftBounds) {
      nftBounds.features.forEach((feature) => {
        // console.log("Loading ", feature.properties.image_url)
        try {
          mapRef.current.loadImage(
            feature.properties.image_url,
            (error, image) => {
              if (!error) {
                mapRef.current.addImage(feature.properties.image_id, image)
              }
            }
          )
        } catch (e) {
          console.error(e)
        }
      })
    }
  }, [nftBounds])

  const geoJSON = {
    type: "geojson",
    data: nftBounds,
  }

  const colorLayer = {
    id: "colorLayer",
    type: "fill",
    source: geoJSON,
    paint: {
      "fill-color": "#9043ca",
      "fill-opacity": 0.8,
    },
  }

  // const imageLayer = {
  //   id: "imageLayer",
  //   type: "fill",
  //   source: geoJSON,
  //   paint: {
  //     "fill-pattern": ["get", "image_id"],
  //     "fill-opacity": 1,
  //   },
  // }

  const symbolLayer = {
    id: "symbolLayer",
    type: "symbol",
    source: geoJSON,
    layout: {
      "icon-image": ["get", "image_id"],
      "icon-size": [
        "interpolate",
        ["exponential", 4],
        ["zoom"],
        1,
        0.2,
        3,
        0.3,
        5,
        0.75,
      ],
    },
  }

  return (
    <Map
      ref={mapRef}
      onLoad={loadImages}
      initialViewState={{
        latitude: 38.8951,
        longitude: -77.0364,
        zoom: 3,
      }}
      maxZoom={5}
      style={{ width: "100vw", height: "80vh" }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v10"
    >
      <Source id="nft-data" type="geojson" data={nftBounds}>
        <Layer {...colorLayer} />
        {/* <Layer {...imageLayer} /> */}
        <Layer {...symbolLayer} />
      </Source>
    </Map>
  )
}

export default MapElement
