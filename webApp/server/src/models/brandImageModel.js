module.exports = (mongoose)=> {
    const Schema = mongoose.Schema;
    const BrandImageSchema = new Schema({
        name: String,
        slug: String,
        image: {
            localOptimized: String,
            localOriginal: String,
            localThumb: String,
            optimized: String,
            original: String,
            source: String,
            thumb: String
        }
    });
    return mongoose.model('car_logos', BrandImageSchema, 'car_logos');
};
