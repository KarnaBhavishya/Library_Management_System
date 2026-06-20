const dotenv = require("dotenv");
const { sequelize } = require("./config/db");
const Student = require("./models/Student");
const Book = require("./models/Book");
const Library = require("./models/Library");

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log("Connecting to PostgreSQL...");
    await sequelize.sync({ force: true });
    console.log("Connected to PostgreSQL and synced models.");

    const studentsData = [
      { name: "John Doe", className: "10th Grade" },
      { name: "Jane Smith", className: "11th Grade" },
      { name: "Alice Johnson", className: "12th Grade" },
      { name: "Bob Brown", className: "10th Grade" },
      { name: "Charlie Davis", className: "9th Grade" },
      { name: "Emily Wilson", className: "11th Grade" },
      { name: "Frank Miller", className: "12th Grade" },
      { name: "Grace Lee", className: "10th Grade" },
      { name: "Henry Taylor", className: "9th Grade" },
      { name: "Ivy Anderson", className: "11th Grade" }
    ];

    const createdStudents = await Student.bulkCreate(studentsData, { returning: true });
    console.log(`Inserted ${createdStudents.length} students.`);

    const booksData = [
      { name: "The Great Gatsby", author: "F. Scott Fitzgerald", publication: "Scribner", year: "1925-04-10" },
      { name: "To Kill a Mockingbird", author: "Harper Lee", publication: "J. B. Lippincott & Co.", year: "1960-07-11" },
      { name: "1984", author: "George Orwell", publication: "Secker & Warburg", year: "1949-06-08" },
      { name: "Pride and Prejudice", author: "Jane Austen", publication: "T. Egerton", year: "1813-01-28" },
      { name: "The Catcher in the Rye", author: "J.D. Salinger", publication: "Little, Brown", year: "1951-07-16" },
      { name: "The Hobbit", author: "J.R.R. Tolkien", publication: "George Allen & Unwin", year: "1937-09-21" },
      { name: "Fahrenheit 451", author: "Ray Bradbury", publication: "Ballantine Books", year: "1953-10-19" },
      { name: "Moby-Dick", author: "Herman Melville", publication: "Harper & Brothers", year: "1851-10-18" },
      { name: "Jane Eyre", author: "Charlotte Brontë", publication: "Smith, Elder & Co.", year: "1847-10-16" },
      { name: "Brave New World", author: "Aldous Huxley", publication: "Chatto & Windus", year: "1932-01-01" }
    ];

    const createdBooks = await Book.bulkCreate(booksData, { returning: true });
    console.log(`Inserted ${createdBooks.length} books.`);

    const libraryData = [];
    const today = new Date();

    for (let i = 0; i < 10; i++) {
      const issueDate = new Date(today);
      issueDate.setDate(today.getDate() - Math.floor(Math.random() * 10));
      const returnDate = new Date(issueDate);
      returnDate.setDate(issueDate.getDate() + 14);

      libraryData.push({
        studentId: createdStudents[i].id,
        bookId: createdBooks[i].id,
        startDate: issueDate,
        endDate: returnDate,
      });
    }

    const createdIssues = await Library.bulkCreate(libraryData, { returning: true });
    console.log(`Inserted ${createdIssues.length} library records.`);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
