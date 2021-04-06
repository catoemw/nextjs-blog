import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fileName) => {
    // Remove '.md' from file name to get id
    const id = fileName.replace(/\.md$/, "");
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // use gray-matter to parse the post metadata section
    const { data } = matter(fileContents);
    // Combine the data with the id
    return {
      id,
      ...data,
    };
  });
  // Sort posts by date
  return allPostData.sort((a, b) => (a.date < b.date ? 1 : -1));
};
