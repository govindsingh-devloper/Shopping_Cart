const { json } = require('express')
const Product=require('../Models/Product')

exports.addproduct=(req,res)=>{
   // console.log(req.body)
   // console.log(req.file)
   try{
   const{name,desc,mdesc,price,quantity,img}=(req.body)
   const filename=req.file.filename
   const record=new Product({ name:name,desc:desc,mdesc:mdesc,price:price, img:filename,quantity:quantity,})
   record.save()
   res.status(201).json({
    status:201,
    message:'Product has been added'
   })
   }
   catch(error){  
    res.status(400).json({
        status:400,
        message:error.message
    })

   }

}

exports.alldata=async(req,res)=>{
    try {
        const record=await Product.find()
        res.status(200).json({
            status:200,
            apidata:record
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message:error.message

        })
        
    }
    
}
exports.singledata=async(req,res)=>{
    try{
        const id=req.params.id
    const record=await Product.findById(id)
    res.status(200).json({
        status:200,
        apidata:record
    })
    }
    
    catch(error){
        res.status(500).json({
            status:500,
            message:error.message
        })

    }
}

exports.dataupdate=async(req,res)=>{
    // console.log(req.params.id)
    // console.log(req.body)
    // console.log(req.file)
try{
    const id=req.params.id
    const{name,desc,mdesc,price,quantity,status,image}=req.body
    if(req.file){
    const filename=req.file.filename
    await Product.findByIdAndUpdate(id,{name:name,desc:desc,mdesc:mdesc,price:price,quantity:quantity,status:status,image:filename})
    }else{
        await Product.findByIdAndUpdate(id,{name:name,desc:desc,mdesc:mdesc,price:price,quantity:quantity,status:status})
    }
    res.status(200).json({
        status:200,
        message:"Successfully Updated"
    })

}
catch(error){
    res.status(400).json({
        status:400,
        message:error.message
    })

}
}

exports.productinstock=async(req,res)=>{
   try {
    const record=await Product.find({status:'IN-STOCK'})
    res.status(200).json({
        status:200,
        apidata:record
    })
   } catch (error) {
    res.status(500).json({
        status:500,
        message:error.message
    })
    
   }

}

exports.cartdata=async(req,res)=>{
    //Multiple id nikalni h because cart m bht itmes ho skte h different kind 
    //We use $in
    //console.log(req.body)
    try{
        const{ids}=req.body
        const record=await Product.find({_id:{$in:ids}})
        res.status(200).json({
            status:200,
            apidata:record
        })
    }
    catch(error){
      res.status(400).json({
        status:400,
        message:error.message
      })
    }
   
}

exports.myorders=async(req,res)=>{
    try {
        const username=(req.params.username)
        const record=await Product.find({username:username}).sort({postedDate:-1})
        res.status(200).json({
            status:200,
            apidata:record
        })
    } catch (error) {
        res.status(500).json({
            status:500,
            message:error.message
        })
        
    }
}