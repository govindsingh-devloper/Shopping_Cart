const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    name:String,
    desc:String,
    mdesc:String,
    price:Number,
    img:String,
    status:{type:String,default:'IN-STOCK'},
    quantity:Number,
    postedDate:{type:Date,default:new Date()}
})

module.exports=mongoose.model('Product',ProductSchema)