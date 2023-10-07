import * as JsonUtils from '../service/JsonUtils.js'

// {
//     "id": 15,
//     "name" : "Курица",
//     "description": "",
//     "deeds" : "",
//     "accommodations" : ""
// }

class Product {
    id = 0;
    name = "";
    description = "";
    deeds = "";
    accommodations = "";

    constructor(id, name, description, deeds, accommodations) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deeds = deeds;
        this.accommodations = accommodations;
    }
}

const animals = () => {
    return JsonUtils.getDateJson("animals.json");
}

export {animals};