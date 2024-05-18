const reg=require('../Models/Reg')
const bcrypt=require('bcrypt')
//hash module nikalo for conversion

exports.registration=async(req,res)=>{
    try {
        const{username,password}=req.body
        //password conversion 
        const cpass=await bcrypt.hash(password,10)
        const usercheck= await reg.findOne({username:username})
        if(usercheck==null){
        const record=new reg({username:username,password:cpass})
        record.save()
        res.status(201).json({
            status:201,
            message:`${username} user created successfully`
        })}
        else{
            res.status(201).json({
                message:`${username} User already Registered`
            })
        }
    } catch (error) {
        res.status(400).json({
            status:400,
            message:error.message
        })
        
    }
}

exports.logincheck=async(req,res)=>{
    try{
    const{username,password}=req.body
    const record=await reg.findOne({username:username})
    if(record!==null){
        const cpass=await bcrypt.compare(password,record.password)
        if(cpass){
            res.status(200).json({
                status:200,
                apidata:record.username
            })

        }
       else{
        res.status(400).json({
            status:400,
            message:'Wrong Credentials'
        })

       }
       //isme render or redirect nhi krte , data bhejte h
    //    res.status(200).json({
    //     status:200,
    //     apidata:record.username
    //    })
    // }
    // else{
    //     res.status(400).json({
    //         status:400,
    //         message:'Wrong Credentials'
    //     })

    }
}
catch(error){
    res.status(400).json({
        status:400,
        message:error.message
    })

}

}





