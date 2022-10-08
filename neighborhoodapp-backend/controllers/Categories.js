import Category from "../models/CategoryModel.js";

export const createCategory = async(req, res) => {
    return await Category.create({
        name: req.body.name
    }).then(function (categories) {
        if (categories) {
            res.send(categories);
        }else {
            res.status(400).send('Error in insert new record');
        }
    });
}