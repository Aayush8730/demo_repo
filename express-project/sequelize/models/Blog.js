export default (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull : false
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
    db.User.hasMany(db.Blog, { foreignKey: "userId" , onDelete : "CASCADE" });
    db.Blog.belongsTo(db.User, { foreignKey: "userId" });
  };

  return Blog;
};
