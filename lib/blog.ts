import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import type { Element, ElementContent, Root as HastRoot, RootContent } from "hast";
import type { Root as MdastRoot } from "mdast";

// Every *.md file in /blogs is a post — dropping a file in is all it takes to publish one.
const BLOG_DIR = path.join(process.cwd(), "blogs");
const WORDS_PER_MINUTE = 220;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags: string[];
  readingMinutes: number;
  sectionCount: number;
  /** Position in the numbered series (from the filename prefix); null for standalone posts such as cheat sheets. */
  part: number | null;
  /** The description is the post's opening quote, which the post page already shows. */
  descriptionInBody: boolean;
};

export type TocEntry = { id: string; text: string };
export type Post = PostMeta & { html: string; toc: TocEntry[] };

type Source = PostMeta & { file: string; order: number | null; body: string };

/** "01-java-language-basics.md" → { order: 1, slug: "java-language-basics" } */
function parseFilename(file: string) {
  const base = file.replace(/\.md$/i, "");
  const m = base.match(/^(\d+)[-_.\s]+(.*)$/);
  const slug = (m ? m[2] : base)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return { order: m ? Number(m[1]) : null, slug };
}

/** Markdown lines outside fenced code blocks. */
function proseLines(body: string) {
  let fenced = false;
  return body.split(/\r?\n/).filter((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      return false;
    }
    return !fenced;
  });
}

/** Strips inline Markdown so a line reads as plain text. */
function plain(text: string) {
  return text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function clip(text: string, max = 180) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s—-]+$/, "")}…`;
}

/** First blockquote, else first paragraph — minus a "Quick Reference:" label and wrapping quotes. */
function inferDescription(lines: string[]): { text: string; fromQuote: boolean } {
  const quote: string[] = [];
  for (const line of lines) {
    if (line.startsWith(">")) quote.push(line.replace(/^>\s?/, ""));
    else if (quote.length) break;
  }
  const para = lines.find((l) => l.trim() && !/^(#|>|-{3,}|\||[-*+]\s|\d+\.\s)/.test(l.trim()));
  const text = plain(quote.length ? quote.join(" ") : (para ?? ""))
    .replace(/^quick reference:?\s*/i, "")
    .replace(/^["“](.*)["”]$/, "$1");
  return { text: clip(text), fromQuote: quote.length > 0 };
}

function toDateString(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : undefined;
}

function readSource(file: string): Source {
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
  const { order, slug } = parseFilename(file);
  const lines = proseLines(content);
  const h1 = lines.find((l) => /^#\s/.test(l));
  const fallbackTitle = slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  const words = content.split(/\s+/).filter(Boolean).length;
  const inferred = typeof data.description === "string" ? null : inferDescription(lines.filter((l) => l !== h1));

  return {
    file,
    order,
    body: content,
    slug,
    title: typeof data.title === "string" ? data.title : h1 ? plain(h1.slice(2)) : fallbackTitle,
    description: inferred ? inferred.text : (data.description as string),
    descriptionInBody: !!inferred?.fromQuote,
    part: order,
    date: toDateString(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    sectionCount: lines.filter((l) => /^##\s/.test(l)).length,
  };
}

/** Numbered files first (by number), then the rest by date (newest first), then title. */
function compare(a: Source, b: Source) {
  if (a.order !== null || b.order !== null) {
    if (a.order === null) return 1;
    if (b.order === null) return -1;
    if (a.order !== b.order) return a.order - b.order;
  }
  if (a.date !== b.date) return (b.date ?? "").localeCompare(a.date ?? "");
  return a.title.localeCompare(b.title);
}

const getSources = cache((): Source[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.md$/i.test(f) && !/^readme\.md$/i.test(f));
  const sources = files.map(readSource);

  const seen = new Map<string, string>();
  for (const s of sources) {
    const clash = seen.get(s.slug);
    if (clash) throw new Error(`blogs/${s.file} and blogs/${clash} both map to the slug "${s.slug}". Rename one.`);
    seen.set(s.slug, s.file);
  }
  return sources.sort(compare);
});

const toMeta = (s: Source): PostMeta => ({
  slug: s.slug,
  title: s.title,
  description: s.description,
  date: s.date,
  tags: s.tags,
  readingMinutes: s.readingMinutes,
  sectionCount: s.sectionCount,
  part: s.part,
  descriptionInBody: s.descriptionInBody,
});

export function getAllPosts(): PostMeta[] {
  return getSources().map(toMeta);
}

/** The post title already appears in the page header, so drop a leading `# Title`. */
function remarkDropTitle() {
  return (tree: MdastRoot) => {
    const first = tree.children[0];
    if (first?.type === "heading" && first.depth === 1) tree.children.shift();
  };
}

function textOf(node: ElementContent | RootContent): string {
  if (node.type === "text") return node.value;
  return "children" in node ? node.children.map(textOf).join("") : "";
}

/** Collects h2s for the TOC and wraps code blocks and tables in scrollable frames. */
function rehypeFrame(toc: TocEntry[]) {
  return (tree: HastRoot) => {
    const walk = (parent: HastRoot | Element) => {
      // Shiki swaps each <pre> for a nested root fragment; flatten those so the <pre> is a direct child.
      const children = (parent.children as (RootContent | HastRoot)[]).flatMap((c) =>
        c.type === "root" ? c.children : [c],
      ) as ElementContent[];
      parent.children = children.map((child) => {
        if (child.type !== "element") return child;
        if (child.tagName === "h2" && typeof child.properties.id === "string") {
          toc.push({ id: child.properties.id, text: textOf(child).trim() });
        }
        if (child.tagName === "pre") {
          const lang = String(child.properties.dataLang ?? "text");
          const frame: Element = {
            type: "element",
            tagName: "div",
            properties: { className: ["code"], dataLang: lang === "text" ? "code" : lang },
            children: [child],
          };
          return frame;
        }
        if (child.tagName === "table") {
          // A wide table scrolls sideways, so its frame takes keyboard focus and has a name.
          const properties = { className: ["table"], tabIndex: 0, role: "group", ariaLabel: "Table, scrolls sideways" };
          return { type: "element", tagName: "div", properties, children: [child] };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const source = getSources().find((s) => s.slug === slug);
  if (!source) return null;

  const toc: TocEntry[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDropTitle)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeShiki, {
      theme: "github-dark-default",
      defaultLanguage: "text",
      fallbackLanguage: "text",
      transformers: [
        {
          pre(node) {
            node.properties.dataLang = this.options.lang;
          },
        },
      ],
    })
    .use(rehypeFrame, toc)
    .use(rehypeStringify)
    .process(source.body);

  return { ...toMeta(source), html: String(file), toc };
});
