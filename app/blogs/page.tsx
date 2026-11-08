import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getAllPosts } from "@/lib/blog";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Blog — ${profile.short}`,
  description: "Notes on Java, Spring Boot and the cloud — written while building real systems.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const minutes = posts.reduce((sum, p) => sum + p.readingMinutes, 0);

  return (
    <>
      <SiteNav />
      <main id="main">
        <header className="wrap blog-hero">
          <Reveal className="eyebrow">Writing</Reveal>
          <Reveal as="h1">
            Notes from building <span>with Java.</span>
          </Reveal>
          <Reveal as="p">
            Deep dives on the language, OOP, concurrency, collections and modern Java — the reference I wish I
            had when I started.
          </Reveal>
          <Reveal className="blog-stats">
            <span>
              <b>{posts.length}</b> {posts.length === 1 ? "post" : "posts"}
            </span>
            <span>
              <b>{minutes}</b> min of reading
            </span>
          </Reveal>
        </header>

        <section className="wrap blog-list" aria-labelledby="all-posts">
          <h2 className="sr-only" id="all-posts">
            All posts
          </h2>
          {posts.length ? (
            <div className="posts">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="lead">No posts yet — add a Markdown file to the blogs folder.</p>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
