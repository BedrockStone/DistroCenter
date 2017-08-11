exports.removeEmptyValues = (Item) => {
    Object.keys(Item).forEach((key) => {
        if (Item[key] === undefined || Item[key] === null || Item[key].toString() === "") {
            delete Item[key];
        } else {
            if (typeof(Item[key]) === typeof({})) {
                Item[key] = exports.removeEmptyValues(Item[key]);
            }
        }
    });
    return Item;
};