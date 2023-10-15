import * as JsonUtils from '../service/JsonUtils.js'

// {
//     "id": 15,
//     "name" : "Курица",
//     "description": ""
// }

class Dog {
    id = 0;
    name = "";
    description = "";
    nutrition = '';

    constructor(id, name, description, nutrition) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.nutrition = nutrition;
    }
}

const animals = () => {
    return JsonUtils.getDateJson("animals.json");
}

export {animals};