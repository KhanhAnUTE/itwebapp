const db = require('../../config/db')

const Brand = function(brand){
    this.id = brand.id
    this.name = brand.name
}

//"Select * from products, brands, catagories, genders, for_ages where product.brand_id = brands.id and product.cotagory_id = cotagories.id and product.gender_id = genders.id and product.for_age_id = for_ages.id "
Brand.getByID = (id, result) => {
    db.query("select * from products, brands, genders, for_ages, catalogies where products.brand_id = brands.id and products.id = 5 and products.gender_id = genders.id and products.for_age_id = for_ages.id and products.catalog_id = catalogies.id", function(err, brand){

        if (err){
            console.log(err)
            result(null)
        }
        else{
            result(brand)
        }
    })
}

module.exports = Brand