import { Fragment } from "react";
import Link from "next/link";
import Contact from "@/components/Contact";
import PostCard from "@/components/PostCard";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import FreelanceCard from "@/components/FreelanceCard";
import HowIWork from "@/components/HowIWork";
import JobDetails from "@/components/JobDetails";
// import WorkCard from "@/components/WorkCard";
import WorkflowCanvas from "@/components/WorkflowCanvas";
import {
  achievements,
  certifications,
  education,
  freelance,
  howIWork,
  jobs,
  profile,
  stack,
  // work,
} from "@/data/profile";
import { getAllPosts } from "@/lib/blog";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** The ↗ is decoration; screen readers hear that the link opens a new tab instead. */
function NewTab() {
  return (
    <>
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

function Rows({ title, rows }: { title: string; rows: { name: string; date: string }[] }) {
  return (
    <Reveal className="list">
      <h3>{title}</h3>
      {rows.map((r) => (
        <div className="row" key={r.name}>
          <div>{r.name}</div>
          <span>{r.date}</span>
        </div>
      ))}
    </Reveal>
  );
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <SiteNav />

      <main id="main">
        <header className="wrap hero" id="top">
          <div className="hero-top">
            <div className="hero-copy">
              <Reveal className="pill">
                <span className="dot" aria-hidden="true" /> Open to opportunities · {profile.location}
              </Reveal>
              <Reveal as="p" className="hi">
                Hi, I&apos;m Jay
              </Reveal>
              <Reveal as="h1">
                {profile.headline.lead} <span>{profile.headline.accent}</span>
              </Reveal>
              <Reveal as="p">{profile.intro}</Reveal>
              <Reveal className="cta">
                <a className="btn primary" href="#freelance">
                  See my work
                </a>
                {profile.resume && (
                  <a className="btn" href={`${base}/${profile.resume}`} download>
                    Download résumé ↓
                  </a>
                )}
                <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub <NewTab />
                </a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <NewTab />
                </a>
              </Reveal>
            </div>
            <Reveal className="portrait">
              {/* Plain <img>: static export with unoptimized images, so next/image adds nothing. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${base}/portrait.webp`}
                alt={`${profile.name} sitting with a laptop`}
                width={800}
                height={1200}
                fetchPriority="high"
              />
            </Reveal>
          </div>
          <Reveal>
            <WorkflowCanvas />
          </Reveal>
          <Stats />
        </header>

        <section id="work">
          <div className="wrap">
            <Reveal className="eyebrow">Experience</Reveal>
            <Reveal as="h2">Where I&apos;ve shipped.</Reveal>

            {jobs.map((job, i) => (
              <Fragment key={job.company}>
                {job.internship && !jobs[i - 1]?.internship && (
                  <Reveal className="subhead">
                    <div className="eyebrow">Early career</div>
                    <h3>Internships &amp; apprenticeship</h3>
                  </Reveal>
                )}
              <Reveal className="job">
                <div className="when">
                  <strong>{job.when}</strong>
                  {job.where}
                  {job.current && (
                    <>
                      <br />
                      <span className="tag">
                        <span aria-hidden="true">● </span>Current
                      </span>
                    </>
                  )}
                </div>
                <JobDetails>
                  <h3>{job.company}</h3>
                  <div className="role">{job.role}</div>
                  {job.bullets && (
                    <ul className="job-more">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {job.chips && (
                    <div className="chips">
                      {job.chips.map((c) => (
                        <span className="chip" key={c}>
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  {job.projects?.map((p) => (
                    <div className="proj job-more" key={p.name}>
                      <h4>
                        {p.name} <small>{p.sub}</small>
                      </h4>
                      <ul>
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </JobDetails>
              </Reveal>
              </Fragment>
            ))}
          </div>
        </section>

        <section id="stack">
          <div className="wrap">
            <Reveal className="eyebrow">Toolbox</Reveal>
            <Reveal as="h2">The stack.</Reveal>
            <div className="stack">
              {stack.map((g) => (
                <Reveal className="group" key={g.title}>
                  <h3>{g.title}</h3>
                  <div className="chips" style={{ margin: 0 }}>
                    {g.items.map((i) => (
                      <span className="chip" key={i}>
                        {i}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="proof">
          <div className="wrap">
            <Reveal className="eyebrow">Credentials</Reveal>
            <Reveal as="h2">Proof, not promises.</Reveal>
            <div className="two">
              <Rows title="Certifications" rows={certifications} />
              <Rows title="Achievements" rows={achievements} />
            </div>
            <Reveal className="list">
              <h3>Education</h3>
              <div className="row">
                <div>
                  {education.name}
                  <br />
                  <small style={{ color: "var(--mute)" }}>{education.note}</small>
                </div>
                <span>{education.date}</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="freelance">
          <div className="wrap">
            <Reveal className="eyebrow">Freelance</Reveal>
            <Reveal as="h2">Client work.</Reveal>
            <Reveal as="p" className="lead">
              End-to-end websites and web apps for businesses: I take the requirements, understand what the business needs, design it, build it with AI engineering and deploy it on the cloud. Alongside my full-time role, plus many one-off landing pages.
            </Reveal>
            <Reveal className="process">
              <HowIWork>
                <ol className="steps">
                  {howIWork.map((s, i) => (
                    <li className="step" key={s.title}>
                      <span className="num">{String(i + 1).padStart(2, "0")}</span>
                      <h4>{s.title}</h4>
                      <p>{s.text}</p>
                    </li>
                  ))}
                </ol>
              </HowIWork>
            </Reveal>
            <Reveal as="h3" className="flabel">
              Client projects
            </Reveal>
            <div className="clients">
              {freelance.map((c) => (
                <FreelanceCard client={c} key={c.name} />
              ))}
            </div>
            <Reveal as="p" className="more">
              …and many more landing pages for small businesses.
            </Reveal>
          </div>
        </section>

        {/*<section id="projects">*/}
        {/*  <div className="wrap">*/}
        {/*    <Reveal className="eyebrow">Selected work</Reveal>*/}
        {/*    <Reveal as="h2">Things I&apos;m proud of.</Reveal>*/}
        {/*    <Reveal as="p" className="lead">*/}
        {/*      A few systems where architecture decisions mattered most.*/}
        {/*    </Reveal>*/}
        {/*    <div className="grid">*/}
        {/*      {work.map((w) => (*/}
        {/*        <WorkCard item={w} key={w.num} />*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {posts.length > 0 && (
          <section id="writing">
            <div className="wrap">
              <Reveal className="eyebrow">Writing</Reveal>
              <Reveal as="h2">Notes from the work.</Reveal>
              <div className="posts">
                {posts.slice(0, 3).map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              <Reveal className="cta">
                <Link className="btn" href="/blogs">
                  All {posts.length} posts →
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        <section id="contact" style={{ paddingTop: 20 }}>
          <div className="wrap">
            <Reveal className="contact">
              <div className="eyebrow" style={{ justifyContent: "center" }}>
                Contact
              </div>
              <h2>Have something worth building?</h2>
              <p className="lead" style={{ margin: "0 auto" }}>
                Hiring for a Java or cloud role, or need a website or web app built for your business, from requirements to cloud deployment? Let&apos;s talk.
              </p>
              <Contact />
              <div className="cta">
                <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <NewTab />
                </a>
                <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
                  GitHub <NewTab />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
