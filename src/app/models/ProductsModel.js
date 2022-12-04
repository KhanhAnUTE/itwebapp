const db = require('../../config/db')

const Products = function(product){
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.qty_in_stock = product.qty_in_stock
    this.description = product.description
    this.brand_id = product.brand_id
    this.catalog_id = product.catalog_id
    this.gender_id = product.gender_id
    this.slug = product.slug
    this.origin = product.origin
    this.topic = product.topic
}

Products.getAllProducts = (callback) => {
    db.query("select * from products", (err, products) => {
        if (err){
            console.log(err)
            callback(null)
        }
        else{
            callback(products)
        }
    })
}

//select * from products, brands, genders, for_ages, catalogies where products.brand_id = brands.id and products.gender_id = genders.id and products.for_age_id = for_ages.id and products.catalog_id = catalogies.id and products.slug = ?;

Products.getProductDetailBySlug = (slug, callback) => {
    db.query("select * from products, brands, genders, for_ages, catalogies where products.brand_id = brands.id and products.gender_id = genders.id and products.for_age_id = for_ages.id and products.catalog_id = catalogies.id and products.slug = ?; select link from products, images where products.id = images.product_id and slug = ?" , [slug, slug], (err, product) => {
        if (err){
            console.log(err)
            callback(null)
        }
        else{
            callback(product)
        }
    })
}

module.exports = Products