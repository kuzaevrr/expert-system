import * as JsonUtils from '../service/JsonUtils'

class Product {
    id = 0;
    description = "";
    characteristics = new ProductCharacteristic();

    constructor(id, description, characteristic) {
        this.id = id;
        this.description = description;
        this.characteristics = characteristic;
    }
}

class ProductCharacteristic {
    model = "";
    cpu = "";
    ram = 0;
    rom = 0;
    gpu = "";
    sizeScreen = 14.0;

    constructor(model, cpu, ram, rom, gpu, sizeScreen) {
        this.model = model;
        this.cpu = cpu;
        this.ram = ram;
        this.rom = rom;
        this.gpu = gpu;
        this.sizeScreen = sizeScreen;
    }
}

const products = () => {
    return JsonUtils.getDateJson("products.json");

    // return [
    //     new Product(23, "Apple Macbook",
    //         new ProductCharacteristic("Pro 16 2021", "Apple Silicon M1 Max", 32, 1024, "Apple Silicon 32 Unit", 16.1)
    //     ),
    //     new Product(24, "Apple Macbook",
    //         new ProductCharacteristic("Pro 16 2023", "Apple Silicon M2 Max", 64, 2048, "Apple Silicon 38 Unit", 16.1)
    //     ),
    // ];
}

export {products};