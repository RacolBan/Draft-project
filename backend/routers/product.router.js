const express = require("express");
const router = express.Router();
const BookModel = require ("../models/book-model");
const { verifyTok} = require("../middleware/auth");
const { isMember ,isAdmin} = require("../middleware/permission");
const faker = require("@faker-js/faker").faker;


// API get all users
router.get("/", verifyTok, isMember, async (req, res) => {
  try {
    const books = await BookModel.findAll();
    if(books) {
      return res.status(200).json(books);
    }
      res.status(404).json({message: "Not Found data"})
  } catch (error) {
    res.status(500).json({message: "server error"})
  }
});

// API create new book
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    
    const book = await BookModel.create(data);
    if (book) {
      return res.status(201).json(book);
    }
      res.status(401).json({message: "failed"})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

router.get("/pagination", async (req, res) => {
  // get param from pagination url
  try {

  let { page, size } = req.query;

  page = typeof page === "string" ? parseInt(page) : page;
  size = typeof size === "string" ? parseInt(size) : size;

  let { count, rows } = await BookModel.findAndCountAll({
    limit: size,
    offset: size * page,
  });

  // transform rows
  // rows = rows.map((singleRow) => {
  //   return singleRow.dataValues;
  // });

  // const books = await BookModel.findAll();
  return res.status(200).json({
    count,
    limit: size,
    offset: size * page,
    rows,
  });
} catch (error) {
  res.status(500).json({message: error.message})
  
}
  
});

// function create fake book
const createFakeBook = (size) => {
  let result = [];
  for( let i = 0; i < size; i++ ) {
    const book = ()=>{
      return {
        name: faker.name.findName(),
        author: faker.name.findName()
      }
    }
    result.push(book());
    
  };
  return result;
}


router.post("/fake", async(req, res) =>{
  try {
    const books = await BookModel.bulkCreate(createFakeBook(100));
    res.status(201).json({message :"generate book succesfully! "});
  } catch (error) {
    res.status(500).json({message: error});
    
  }
  
});



module.exports = router;
