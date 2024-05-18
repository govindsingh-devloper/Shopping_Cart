const router=require("express").Router()

const regc=require('../Controllers/regcontrollers')
const ProductCont=require('../Controllers/ProductController')
const Upload=require('../Helpers/multer')

router.post('/reg',regc.registration)
router.post('/logincheck',regc.logincheck)
router.post('/addproduct',Upload.single('image'),ProductCont.addproduct)
//Ab Data admin ko dikhana jo add hua h to uske lyie get api
router.get('/alldata',ProductCont.alldata)
//Data nikalne on the basis of Id
router.get('/singledata/:id',ProductCont.singledata)
//For Updation use PUT
router.put('/dataupdate/:id',Upload.single('image'),ProductCont.dataupdate)

router.get('/productinstock',ProductCont.productinstock)
router.post('/cart',ProductCont.cartdata)
router.get('/myorders/:username',ProductCont.myorders)




module.exports=router