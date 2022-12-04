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
    db.query("select * from products, images where products.id = images.product_id and images.isdefault = 1; select * from genders; select * from brands; select * from for_ages", (err, items) => {
        if (err){
            console.log(err)
            callback(null)
        }
        else{
            callback(items)
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

Products.getFilter = (filter, callback) => {
    const show = 9
    const sort = filter.sort || 'asc';
    const page = (filter.page - 1) * show || 0;
    
    var sqlQuery1 = "select * from products, images, brands, genders, for_ages, catalogies where products.id = images.product_id and products.brand_id = brands.id and products.gender_id = genders.id and products.for_age_id = for_ages.id and products.catalog_id = catalogies.id and images.isdefault = 1"
    var sqlQuery2 = ";select * from genders; select * from brands; select * from for_ages; select * from catalogies;"
    
    if (filter.brandsId){
        brandList = filter.brandsId.join(", ")
        sqlQuery1 += " and brands.id in (" + brandList + ")"
    }
    if (filter.gendersId){
        genderList = filter.gendersId.join(", ")
        sqlQuery1 += " and genders.id in (" + genderList + ")"
    }
    if (filter.for_agesId){
        for_ageList = filter.for_agesId.join(", ")
        sqlQuery1 += " and for_ages.id in (" + for_ageList + ")"
    }
    if (filter.catalog){
        sqlQuery1 += " and products.catalog_id = " + filter.catalog
    }

    sqlQuery1 += " Order by price " + sort
    sqlQuery1 += " Limit " + show + " Offset " + page

    console.log(page)
    console.log(sqlQuery1)
    db.query(sqlQuery1 + sqlQuery2, (err, items) => {
        if (err){
            console.log(err)
            callback(null)
        }
        else{
            callback(items)
        }
    })
}

module.exports = Products