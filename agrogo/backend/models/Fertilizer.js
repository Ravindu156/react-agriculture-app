//product section
const schemaProduct = mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String
})
const productModel = mongoose.model("product",schemaProduct)