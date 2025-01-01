//product section
const schemaproductfertilizer = mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String
})
const productfertilizerModel = mongoose.model("product",schemaproductfertilizer)