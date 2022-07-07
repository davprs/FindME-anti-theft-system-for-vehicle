const mongoose = require('mongoose');
const BrandImageModel = require('../models/brandImageModel')(mongoose);

module.exports.getImageUrl = async (brandName) => {
    return await BrandImageModel.findOne({slug: brandName.toLowerCase()}, 'image.optimized')
        .then(path => path.image.optimized)
}

module.exports.getBrandNames = async () => {
    return await BrandImageModel.find({}, '-_id name')
        .then(paths => {
            let names = [];
            paths.forEach(path => names.push(path.name));
            return names;
        })
}