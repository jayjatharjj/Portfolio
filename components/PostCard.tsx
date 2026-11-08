import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import Reveal from "./Reveal";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Reveal as="article" className="post-card">
      <Link href={`/blogs/${post.slug}`}>
        {/* Series posts show their part; standalone posts (the cheat sheets) show CS. */}
        <span className="badge">{post.part !== null ? String(post.part).padStart(2, "0") : "CS"}</span>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <div className="meta">
          <span>{post.readingMinutes} min read</span>
          <span>{post.sectionCount} sections</span>
          {post.date && <span>{post.date}</span>}
          <span className="go">Read →</span>
        </div>
      </Link>
    </Reveal>
  );
}
