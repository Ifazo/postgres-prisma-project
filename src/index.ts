import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

// Create a new user
app.post("/users", async (req, res) => {
  const { name, email, password, role, contactNo, address, profileImg } =
    req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        contactNo,
        address,
        profileImg,
      },
    });
    res.json(newUser);
  } catch (error) {
    // res.status(500).json({ error: "Unable to create user" });
    res.send(error)
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    // res.status(500).json({ error: "Unable to fetch users" });
    res.send(error)
  }
});

// Create a new category
app.post('/categories', async (req, res) => {
  const { title } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        title,
      },
    });
    res.json(newCategory);
  } catch (error) {
    // res.status(500).json({ error: 'Unable to create category' });
    res.send(error)
  }
});

// Get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    // res.status(500).json({ error: 'Unable to fetch categories' });
    res.send(error);
  }
});

// Create a new book
app.post('/books', async (req, res) => {
  const { title, author, price, genre, publicationDate, categoryId } = req.body;
  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        price,
        genre,
        publicationDate,
        categoryId,
      },
    });
    res.json(newBook);
  } catch (error) {
    // res.status(500).json({ error: 'Unable to create book' });
    res.send(error)
  }
});

// Get all books with pagination and filtering
app.get('/books', async (req, res) => {
  const { page = 1, pageSize = 10, author, genre } = req.query;

  const filters: any = {};
  if (author) filters.author = { contains: author as string };
  if (genre) filters.genre = { contains: genre as string };

  try {
    const books = await prisma.book.findMany({
      where: filters,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
    });
    res.json(books);
  } catch (error) {
    res.send(error)
  }
});

// Test
app.get("/", (req, res) => {
  res.send("Hello Prisma World!");
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:5000 ⭐️`)
);
