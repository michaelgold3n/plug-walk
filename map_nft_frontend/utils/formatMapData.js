export const formatMapData = (mapData, images) => {
  if (images != []) {
    mapData.forEach((coordData, index, mapData) => {
      mapData[index].properties.image_url =
        images[index] === undefined ? "" : images[index]
      mapData[index].properties.image_id =
        mapData[index].properties.id.toString()
    })
  }

  const combinedMapData = {
    type: "FeatureCollection",
  }
  combinedMapData.features = mapData

  // console.log(combinedMapData)
  return combinedMapData
}
