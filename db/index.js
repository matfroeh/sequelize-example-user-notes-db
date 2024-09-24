import UserModel from "../models/User.js";
import NoteModel from "../models/Note.js";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Create a new instance of Sequelize with the connection string
// console.log(process.env.PG_URI);

const sequelize = new Sequelize(process.env.PG_URI);
// console.log(sequelize);

const User = UserModel(sequelize);
const Note = NoteModel(sequelize);

User.hasMany(Note, {
  foreignKey: "userId",
});
Note.belongsTo(User, {
  foreignKey: "userId",
});

try {
  await sequelize.sync();
  console.log("Database synchronized");
} catch (error) {
  console.log("An error occurred while synchronizing the database", error);
}

// Export the instance so we can use it in other files
export { sequelize, User, Note };
