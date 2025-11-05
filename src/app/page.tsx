'use client';

import { useMemo, useState } from "react";
import {
  generateShortPlan,
  type Pace,
  type ShortPlan,
  type Tone,
} from "@/lib/shortsGenerator";

const toneOptions: { value: Tone; label: string }[] = [
  { value: "energetic", label: "Energetic" },
  { value: "educational", label: "Educational" },
  { value: "inspirational", label: "Inspirational" },
  { value: "humorous", label: "Humorous" },
  { value: "dramatic", label: "Dramatic" },
];

const paceOptions: { value: Pace; label: string; hint: string }[] = [
  { value: "hyper", label: "Hyper", hint: "15-30s, ultra-fast jump cuts" },
  { value: "fast", label: "Fast", hint: "30-45s, high energy narrative" },
  { value: "steady", label: "Steady", hint: "45-60s, story-driven pacing" },
];

const defaultDuration: Record<Pace, number> = {
  hyper: 30,
  fast: 45,
  steady: 60,
};

function copyToClipboard(payload: string) {
  if (typeof navigator === "undefined") return;
  navigator.clipboard?.writeText(payload).catch(() => {
    /* ignore clipboard errors */
  });
}

function formatPlanForCopy(plan: ShortPlan) {
  const beats = plan.narrativeBeats
    .map(
      (beat) =>
        `${beat.timestamp} — [${beat.label}]\nVoiceover: ${beat.voiceover}\nOn-screen: ${beat.onScreenText}\nVisual: ${beat.visual}`,
    )
    .join("\n\n");

  const editing = plan.editingNotes
    .map((note) => `- ${note.title}: ${note.detail}`)
    .join("\n");

  const prompts =
    plan.assetPrompts.length > 0
      ? `\n\nAI Prompts:\n${plan.assetPrompts
          .map((item) => `- ${item.type}: ${item.prompt}`)
          .join("\n")}`
      : "";

  return `🎬 ${plan.title}\nHook: ${plan.hook}\nCTA: ${plan.callToAction}\n\nNarrative Beats:\n${beats}\n\nCaption: ${plan.caption}\nHashtags: ${plan.hashtags.join(
    " ",
  )}\n\nEditing Notes:\n${editing}${prompts}`;
}

export default function Home() {
  const [topic, setTopic] = useState("Zero-cost growth hack for small brands");
  const [audience, setAudience] = useState("early-stage founders");
  const [tone, setTone] = useState<Tone>("energetic");
  const [pace, setPace] = useState<Pace>("fast");
  const [duration, setDuration] = useState(defaultDuration.fast);
  const [cta, setCta] = useState("Follow for weekly viral short formulas.");
  const [includePrompts, setIncludePrompts] = useState(true);
  const [plan, setPlan] = useState<ShortPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const paceHint = useMemo(
    () => paceOptions.find((item) => item.value === pace)?.hint ?? "",
    [pace],
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const result = generateShortPlan({
        topic,
        audience,
        tone,
        pace,
        duration,
        callToAction: cta,
        includeAiPrompts: includePrompts,
      });

      setPlan(result);
      setIsGenerating(false);
      setCopied(false);
    }, 120);
  };

  const handleCopy = () => {
    if (!plan) return;
    copyToClipboard(formatPlanForCopy(plan));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-16 lg:flex-row">
        <div className="w-full space-y-8 lg:max-w-sm">
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              <span>AI Shorts Architect</span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">
              Blueprint viral YouTube Shorts in seconds.
            </h1>
            <p className="text-sm text-zinc-400">
              Feed the builder a topic and it outputs a punchy hook, beat-by-beat
              voiceover script, editing directives, and AI-ready asset prompts.
            </p>
          </header>

          <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl shadow-emerald-500/10">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-zinc-400">
                Topic / Idea
              </label>
              <input
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Example: Turn one blog post into seven shorts"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-zinc-400">
                Primary Audience
              </label>
              <input
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Example: solo creators, indie devs, morning routine seekers"
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-zinc-400">
                Tone Palette
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {toneOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`rounded-xl border px-3 py-2 text-sm transition ${
                      tone === option.value
                        ? "border-emerald-500 bg-emerald-500/10 text-white"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-100"
                    }`}
                    onClick={() => setTone(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-zinc-400">
                <span>Pacing</span>
                <span className="text-[10px] text-zinc-500">{paceHint}</span>
              </div>
              <div className="mt-3 flex gap-2">
                {paceOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`flex-1 rounded-xl border px-2 py-2 text-xs font-medium transition ${
                      pace === option.value
                        ? "border-emerald-500 bg-emerald-500/10 text-white"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-100"
                    }`}
                    onClick={() => {
                      setPace(option.value);
                      setDuration(defaultDuration[option.value]);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-zinc-400">
                Target Duration (seconds)
              </label>
              <input
                type="number"
                min={15}
                max={75}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={duration}
                onChange={(event) => setDuration(Number(event.target.value))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-zinc-400">
                Call To Action
              </label>
              <input
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Example: Subscribe for more creator blueprints"
                value={cta}
                onChange={(event) => setCta(event.target.value)}
              />
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-zinc-300 hover:border-emerald-500/40">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-400"
                checked={includePrompts}
                onChange={(event) => setIncludePrompts(event.target.checked)}
              />
              Include AI-ready prompts for B-roll, thumbnail & voiceover
            </label>

            <button
              type="button"
              onClick={handleGenerate}
              className="relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
            >
              {isGenerating ? "Rendering Plan..." : "Generate Short Blueprint"}
              <span className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-400/0 via-emerald-300/30 to-emerald-500/0" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="rounded-3xl border border-zinc-800 bg-black/40 p-6 backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {plan?.title ?? "Your Shorts Plan will appear here"}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Ultra-specific hook, script beats, edit notes, and social copy
                  tuned for Shorts retention.
                </p>
              </div>
              <button
                type="button"
                className={`rounded-xl border px-4 py-2 text-sm transition ${
                  plan
                    ? "border-emerald-400/50 text-emerald-300 hover:border-emerald-300 hover:text-emerald-200"
                    : "border-zinc-800 text-zinc-600"
                }`}
                disabled={!plan}
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy Blueprint"}
              </button>
            </div>

            {plan ? (
              <div className="mt-6 space-y-6 text-sm text-zinc-100">
                <section className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                    Hook
                  </div>
                  <p className="text-base text-white">{plan.hook}</p>
                </section>

                <section className="grid gap-3 md:grid-cols-2">
                  {plan.narrativeBeats.map((beat) => (
                    <article
                      key={`${beat.timestamp}-${beat.label}`}
                      className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold uppercase text-emerald-200">
                        <span>{beat.label}</span>
                        <span className="text-zinc-500">{beat.timestamp}</span>
                      </div>
                      <p className="text-sm text-zinc-200">
                        <span className="font-semibold text-white">
                          Voiceover:
                        </span>{" "}
                        {beat.voiceover}
                      </p>
                      <p className="text-sm text-zinc-300">
                        <span className="font-semibold text-white">
                          On-screen:
                        </span>{" "}
                        {beat.onScreenText}
                      </p>
                      <p className="text-xs text-zinc-400">
                        <span className="font-semibold text-zinc-200">
                          Visual:
                        </span>{" "}
                        {beat.visual}
                      </p>
                    </article>
                  ))}
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                      CTA
                    </h3>
                    <p className="text-sm text-zinc-100">{plan.callToAction}</p>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                      Caption & Hashtags
                    </h3>
                    <p className="text-sm text-zinc-100">{plan.caption}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-emerald-200">
                      {plan.hashtags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-emerald-500/30 px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                    Editing Room Directives
                  </h3>
                  <div className="space-y-2">
                    {plan.editingNotes.map((note) => (
                      <div
                        key={note.title}
                        className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2"
                      >
                        <div className="text-xs font-semibold uppercase text-zinc-400">
                          {note.title}
                        </div>
                        <p className="text-sm text-zinc-100">{note.detail}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {plan.assetPrompts.length > 0 && (
                  <section className="space-y-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                      AI Asset Prompts
                    </h3>
                    <div className="space-y-3">
                      {plan.assetPrompts.map((asset) => (
                        <div
                          key={asset.type}
                          className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-3"
                        >
                          <div className="text-xs font-semibold uppercase text-zinc-400">
                            {asset.type}
                          </div>
                          <p className="text-sm text-zinc-100">
                            {asset.prompt}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <div className="mt-6 space-y-5 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-6 text-sm text-zinc-400">
                <p>
                  No plan generated yet. Add your topic, pick a tone, and tap{" "}
                  <span className="font-semibold text-emerald-200">
                    Generate Short Blueprint
                  </span>{" "}
                  to spin up a shot list with voiceover lines, captions, and
                  editing cues.
                </p>
                <ul className="space-y-2">
                  <li>• Hooks engineered for first 3-second retention</li>
                  <li>• Beat-by-beat VO with matching on-screen text</li>
                  <li>• Editing moves to keep audience glued</li>
                  <li>• Captions + hashtags optimized for Shorts</li>
                  <li>• Optional prompts ready for AI asset tools</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
