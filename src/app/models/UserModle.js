const db = require('../../config/db')

const Users = function(user){   
}

Users.deleteById = (addr_id, user_id, callback)=>{
    var sqlDelete = "Delete from addresses where addr_id = " + addr_id + " and user_id = " + user_id
    db.query(sqlDelete, (err, flag)=>{
        if (err){
            console.log(err)
            callback(err)
            return 
        }
        callback(flag)
    })
}

Users.updateAddr = (addr, user_id, callback)=>{

    if (addr.addr_id)
        var sqlUpdateAddr = "Update addresses set own_name = '" + addr.own_name + "', addr_phone = '" + addr.addr_phone + "', city = '" + addr.city + "', district = '" + addr.district + "', ward = '" + addr.ward + "', street = '" + addr.street +  "' where user_id = " + user_id + " and addr_id =" + addr.addr_id
    else
        var sqlUpdateAddr = "Insert into addresses (own_name, addr_phone, city, district, ward, street, user_id) values ('" + addr.own_name + "', '" + addr.addr_phone + "', '" + addr.city + "', '" + addr.district + "', '" + addr.ward + "', '" + addr.street + "', " + user_id + ")"
    
    db.query(sqlUpdateAddr, (err, flag)=>{
        if (err){
            console.log(err)
            callback(err)
            return 
        }
        
        callback(flag)
    })


}

Users.getAddrById = (addr_id, user_id, callback)=>{
    var sqlGetAddr = "select * from addresses where addr_id = " + addr_id + " and user_id = " + user_id
    var sqlgetUserInfo = "select * from users where user_id = " + user_id
    var sqlGetCountCart = "select count(user_id) as count from carts where user_id = " + user_id + " group by user_id"
    var sqlGetCatalog = "select catalogies.catalog_id, catagory, cata_link, count(products.product_id) as count from catalogies, products where catalogies.catalog_id = products.catalog_id group by catalogies.catalog_id, catagory, cata_link"
    db.query(sqlGetAddr + "; " + sqlgetUserInfo + ";" + sqlGetCountCart + "; " + sqlGetCatalog, (err, items)=>{
        if (err){
            console.log(err)
            callback(err)
            return 
        }
        
        callback(items)
    })
}

Users.getAddr = (user_id, callback)=>{
    var sqlGetAddr = "select * from users, addresses where users.user_id = addresses.user_id and users.user_id = " + user_id
    var sqlgetUserInfo = "select * from users where user_id = " + user_id
    var sqlGetCountCart = "select count(user_id) as count from carts where user_id = " + user_id + " group by user_id"
    var sqlGetCatalog = "select catalogies.catalog_id, catagory, cata_link, count(products.product_id) as count from catalogies, products where catalogies.catalog_id = products.catalog_id group by catalogies.catalog_id, catagory, cata_link"
    db.query(sqlGetAddr + "; " + sqlgetUserInfo + ";" + sqlGetCountCart + "; " + sqlGetCatalog, (err, items)=>{
        if (err){
            console.log(err)
            callback(err)
            return 
        }
        
        callback(items)
    })
}

Users.getUserInfo = (user_id, callback)=>{
    
    var sqlgetUserInfo = "select * from users where user_id = " + user_id
    var sqlGetCountCart = "select count(user_id) as count from carts where user_id = " + user_id + " group by user_id"
    var sqlGetCatalog = "select catalogies.catalog_id, catagory, cata_link, count(products.product_id) as count from catalogies, products where catalogies.catalog_id = products.catalog_id group by catalogies.catalog_id, catagory, cata_link"    

    db.query(sqlgetUserInfo + "; " + sqlGetCountCart + "; " + sqlGetCatalog, (err, items)=>{
        if (err){
            console.log(err)
            callback(err)
            return 
        }
        
        callback(items)
    })
}

Users.updateUser = (user, user_id, callback)=>{
    var sqlUpdateUser = "Update users set email = '" + user.email + "', name = '" + user.name + "', phone_number = '" + user.phone_number + "' where user_id = " + user_id 

    db.query(sqlUpdateUser, (err, flag)=>{
        if (err){
            console.log(err)
            callback(err)
            return 
        }
        flag = true
        callback(flag)
    })
}


module.exports = Users;