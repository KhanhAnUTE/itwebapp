const db = require('../../config/db')

const Sites = function(site){

}

Sites.homeDetail = (user_id, callback)=>{
    var sqlGetCountCart = "select count(user_id) as count from carts where user_id = " + user_id + " group by user_id"
    var sqlGetCatalog = "select catalogies.id, catagory, cata_link, count(products.id) as count from catalogies, products where catalogies.id = products.catalog_id group by catalogies.id, catagory, cata_link"
    var sqlBestSeller = "select * from products, images where products.id = images.product_id and images.isdefault = 1 LIMIT 4"

    db.query(sqlGetCountCart + "; " + sqlGetCatalog + "; " + sqlBestSeller, (err, items)=>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        if (items!=null && items.length != 0)
            callback(items)
        else
            callback(null)
    })
}

//GET /{site}
Sites.getElements = (user_id, callback)=>{
    var sqlGetCountCart = "select count(user_id) as count from carts where user_id = " + user_id + " group by user_id"
    var sqlGetCatalog = "select * from catalogies"

    db.query(sqlGetCountCart + "; " + sqlGetCatalog, (err, items)=>{
        if (err){
            console.log(err)
            callback(null)
            return
        }
        if (items!=null && items.length != 0)
            callback(items)
        else
            callback(null)
    })
}

module.exports = Sites