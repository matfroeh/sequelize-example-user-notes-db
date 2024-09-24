// models/Notes.js
import { DataTypes } from "sequelize"; // The library provides an object to help you  define types for your model attributes.
import User from "./User.js"; 

// Define the User model
export default (sequelize) => {
  const Note = sequelize.define("Note", {
    // Model attributes are defined here
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });
  return Note;
};
