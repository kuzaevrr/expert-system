import * as JsonUtils from '../service/JsonUtils.js'

class Product {
    id = 0;
    description = "";
    characteristics = new ProductCharacteristic();
    imageId = 0;

    constructor(id, description, characteristic, linkWeb, imageId) {
        this.id = id;
        this.description = description;
        this.characteristics = characteristic;
        this.linkWeb = linkWeb;
        this.imageId = imageId;
    }
}

class ProductCharacteristic {
    model = "";
    cpu = "";
    countCoreCpu = 0;
    countThreadCpu = 0;
    ram = 0;
    rom = 0;
    gpu = "";
    sizeScreen = 14.0;
    resolutionScreen = "";
    typeScreen = "";
    frequencyScreen = "";

    constructor(model, cpu, countCoreCpu, countThreadCpu, ram, rom, gpu, sizeScreen, resolutionScreen, typeScreen, frequencyScreen) {
        this.model = model;
        this.cpu = cpu;
        this.countCoreCpu = countCoreCpu;
        this.countThreadCpu = countThreadCpu;
        this.ram = ram;
        this.rom = rom;
        this.gpu = gpu;
        this.sizeScreen = sizeScreen;
        this.resolutionScreen = resolutionScreen;
        this.typeScreen = typeScreen;
        this.frequencyScreen = frequencyScreen;
    }
}

const products = () => {
    return JsonUtils.getDateJson("products.json");
}

export {products};