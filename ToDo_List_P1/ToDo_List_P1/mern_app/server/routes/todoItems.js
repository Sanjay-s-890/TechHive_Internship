const router = require('express').Router();

const todoItemsModel = require('../models/todoItems')


router.post('/api/item', async (req,res)=> {
    try{
        const newItem = new todoItemsModel({
            item: req.body.item,
            discription:req.body.discription 
        })
        const saveItem = await newItem.save()
        console.log(saveItem);
        res.status(200).json(saveItem)
    }catch(err){
        res.json(err);
    }
})

//get data from db
router.get('/api/items', async (req, res)=> {
    try{
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    }catch(err){
        res.join(err)
    }
})

//update item
router.put('/api/item/:id', async (req, res)=>{
    try{
      //find the item by its id and update it
      const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.status(200).json(updateItem);
    }catch(err){
      res.json(err);
    }
})

//Delete item from database
router.delete('/api/item/:id', async (req, res)=>{
    try{
      //find the item by its id and delete it
      const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Item Deleted');
    }catch(err){
      res.json(err);
    }
  })


module.exports = router;