
function createStore(...models) {
    let store = {};
    for (let model of models) {
        store[model.__proto__.constructor.name] = model;
    }
    return store;
}

export class BaseModel {
    data = {};
    constructor(data) {
        this.data = data;
    }
}

export default createStore;

