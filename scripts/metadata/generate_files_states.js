import { writeFileSync } from 'fs'
import us_states from "../utils/US_States.json" assert { type: 'json' };

let features = us_states.features

for (var i = 0; i < features.length; i++) {
    features[i].properties.id = i + 1;
    delete features[i].properties.density;
    delete features[i].id;

    writeFileSync(`utils/data/${i + 1}.json`, JSON.stringify(features[i]))
}