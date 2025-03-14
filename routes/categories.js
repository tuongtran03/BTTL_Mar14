var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let categories = await categorySchema.find({});
    res.send(categories);
});

router.get('/:id', async function(req, res, next) {
    try {
        let category = await categorySchema.findById(req.params.id);
        res.send({
            success:true,
            data:category
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.post('/', async function(req, res, next) {
    try {
        let body = req.body;
        let newCategory = categorySchema({
            name:body.name,
            quantity:body.quantity?body.quantity:10,
        });
        await newCategory.save()
        res.status(200).send({
            success:true,
            data:newCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updatedObj = {}
        if(body.name){
            updatedObj.name = body.name
        }
        if(body.quantity){
            updatedObj.quantity = body.quantity
        }
        let updatedCategory =  await categorySchema.findByIdAndUpdate(req.params.id,updatedObj,{new:true})
        res.status(200).send({
            success:true,
            data:updatedCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});
router.delete('/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updatedCategory =  await categorySchema.findByIdAndUpdate(req.params.id,{
            isDeleted:true
        },{new:true})
        res.status(200).send({
            success:true,
            data:updatedCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

module.exports = router;