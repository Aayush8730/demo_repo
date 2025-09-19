import db from '../sequelize/models/index.js'


const {Blog ,User} = db;

export async function createBlog(req,res){
  try{
  const {title , content , img} = req.body;
  if(!title || !content){
    return res.status(400).json({ message: "Title and content are required" });
  }
  console.log(req.user.id);
  const blog  = await Blog.create({
    title,
    content,
    img,
    userId : req.user.id
  })
  
  
   res.status(201).json({ message: "Blog created", blog });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

export async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User, // we need to include the model to perform join operation 
          attributes: ["id", "username", "email"], // and attributes of user model that we want
        },
      ],
      order: [["createdAt", "DESC"]], // order by createdAt desc : latest
    });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getBlogById(req,res) {
  try{
    const blog_id = req.params.id;
    const blog = await Blog.findByPk(blog_id, {
      include : [
        {
        model: User,
        attributes : ["id","username","email"],
        }
      ]
    })

    if(!blog) res.status(404).json({msg: "Blog not found."})
    res.status(200).json(blog);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

export async function updateBlog(req, res) {
  try {
    const { title, content, img } = req.body;
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Only allow owner to update
    if (blog.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.img = img || blog.img;

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteBlog(req,res) {
   try{
      const blog_id = req.params.id;
      const blog = await Blog.findByPk(blog_id)
      if(!blog)res.status(404).json({msg : "Blog Not Found"});

      await blog.destroy();
      res.json({ message: "Blog deleted" });
   }catch(err){
    res.status(500).json({ error: err.message });
   }
}