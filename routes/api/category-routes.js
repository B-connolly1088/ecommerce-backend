const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model:Product}]
    })
    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{model:Product}]
    })
    res.status(200).json(categoryData)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
    })
    res.status(200).json(categoryData)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
    })
    await categoryData.setProducts([])
    await categoryData.destroy()
    res.status(200).json("Category Deleted.")
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // delete a category by its `id` value
});

module.exports = router;
