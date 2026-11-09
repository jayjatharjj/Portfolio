"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";

// Web3Forms emails each submission to the address registered with the access key.
// The key is public by design; restrict allowed domains in the Web3Forms dashboard.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Optional; tagged onto the email subject so client leads stand out from job enquiries.
const TOPICS = ["Job / role", "Website or web app for my business", "Something else"] as const;

type Status = { kind: "idle" | "sending" | "ok" | "bad"; msg: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle", msg: "" });
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const topic = String(data.get("topic") ?? "");

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email.";
    if (message.length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    const invalid = (["name", "email", "message"] as const).find((k) => next[k]);
    if (invalid) {
      form.querySelector<HTMLElement>(`[name="${invalid}"]`)?.focus();
      return;
    }

    if (data.get("botcheck")) return; // honeypot: silently drop bots

    setStatus({ kind: "sending", msg: "Sending…" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `${topic ? `[${topic}] ` : ""}Portfolio message from ${name}`,
          from_name: "Portfolio contact form",
          name,
          email,
          topic: topic || "Not specified",
          message,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || !json.success) throw new Error(json.message || "Request failed");
      form.reset();
      setStatus({ kind: "ok", msg: "Thanks! Your message was sent — I’ll reply soon." });
    } catch {
      setStatus({
        kind: "bad",
        msg: `Couldn’t send right now. Please email ${profile.email} directly.`,
      });
    }
  }

  // No key configured (e.g. local dev): keep the page useful with a plain mail link.
  if (!ACCESS_KEY) {
    return (
      <div className="cta">
        <a className="btn primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </div>
    );
  }

  const sending = status.kind === "sending";
  return (
    <>
      <form className="form" onSubmit={onSubmit} noValidate>
        <fieldset className="topic">
          <legend>What&apos;s this about?</legend>
          {TOPICS.map((t) => (
            <label className="choice" key={t}>
              <input type="radio" name="topic" value={t} /> {t}
            </label>
          ))}
        </fieldset>
        <label>
          Name
          <input name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="e-name" />
          <span className="err" id="e-name" aria-live="polite">{errors.name}</span>
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" spellCheck={false} aria-invalid={!!errors.email} aria-describedby="e-email" />
          <span className="err" id="e-email" aria-live="polite">{errors.email}</span>
        </label>
        <label>
          Message
          <textarea name="message" aria-invalid={!!errors.message} aria-describedby="e-message" />
          <span className="err" id="e-message" aria-live="polite">{errors.message}</span>
        </label>
        <div className="hp" aria-hidden="true" inert>
          <label>
            Leave empty
            <input name="botcheck" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button className="btn primary" type="submit" disabled={sending} aria-busy={sending}>
          {sending && <span className="spin" aria-hidden="true" />}
          Send message →
        </button>
        <p className={`status ${status.kind === "ok" ? "ok" : status.kind === "bad" ? "bad" : ""}`} role="status" aria-live="polite">
          {status.msg}
        </p>
      </form>
      <p className="or">
        or reach out directly: <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
    </>
  );
}
