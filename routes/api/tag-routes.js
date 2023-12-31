const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model:Product}]
    })
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{model:Product}]
    })
    res.status(200).json(tagData)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
        })
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{model:Product}]
    })
    res.status(200).json(tagData)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
    })
    await tagData.setProducts([])
    await tagData.destroy()
    res.status(200).json("Category Deleted.")
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  // delete on tag by its `id` value
});

module.exports = router;
