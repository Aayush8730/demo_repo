export default (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  // Associations will be added later in index.js
  Blog.associate = (db) => {
    db.User.hasMany(db.Blog, { foreignKey: "userID" , onDelete : "CASCADE" });
    db.Blog.belongsTo(db.User, { foreignKey: "userID" });
  };

  return Blog;
};
