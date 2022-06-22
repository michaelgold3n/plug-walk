import { writeFileSync } from "fs"
import us_counties from "../../utils/US_Counties.json"

let features = us_counties.features

for (var i = 0; i < 100; i++) {
  features[i].properties.id = features[i].properties.COUNTY
  delete features[i].properties.CENSUSAREA
  delete features[i].properties.LSAD

  writeFileSync(
    `utils/data_counties/${i + 1}.json`,
    JSON.stringify(features[i])
  )
}
