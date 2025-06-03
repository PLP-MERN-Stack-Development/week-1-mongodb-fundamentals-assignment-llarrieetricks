// Task 2: Basic CRUD Operations

// Find all books in a specific genre
db.books.find({ genre: "Programming" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

// Find books by a specific author
db.books.find({ author: "Emily Zhang" })

// Update the price of a specific book
db.books.updateOne({ title: "Devil's Curse" }, { $set: { price: 550 } })

// Delete a book by its title
db.books.deleteOne({ title: "Repairs & Maintenance" })


// Task 3: Advanced Queries

// Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection - return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sorting by price ascending
db.books.find().sort({ price: 1 })

// Sorting by price descending
db.books.find().sort({ price: -1 })

// Pagination - limit 5, skip 0 (Page 1)
db.books.find().limit(5).skip(0)

// Pagination - limit 5, skip 5 (Page 2)
db.books.find().limit(5).skip(5)


// Task 4: Aggregation Pipeline

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  }
])


// Task 5: Indexing

// Create index on title
db.books.createIndex({ title: 1 })

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Use explain to analyze performance
db.books.find({ title: "Data Structures & Algorithms" }).explain("executionStats")

