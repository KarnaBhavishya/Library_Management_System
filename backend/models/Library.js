const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Student = require("./Student");
const Book = require("./Book");

const Library = sequelize.define(
  "Library",
  {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: "id",
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Student.hasMany(Library, { foreignKey: "studentId" });
Library.belongsTo(Student, { foreignKey: "studentId" });
Book.hasMany(Library, { foreignKey: "bookId" });
Library.belongsTo(Book, { foreignKey: "bookId" });

Library.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id;
  if (this.Student) {
    values.studentId = this.Student.toJSON();
  }
  if (this.Book) {
    values.bookId = this.Book.toJSON();
  }
  return values;
};

module.exports = Library;
