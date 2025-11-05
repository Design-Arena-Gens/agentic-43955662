export type Tone =
  | "energetic"
  | "educational"
  | "inspirational"
  | "humorous"
  | "dramatic";

export type Pace = "hyper" | "fast" | "steady";

export interface GenerationOptions {
  topic: string;
  audience: string;
  tone: Tone;
  pace: Pace;
  duration: number;
  callToAction?: string;
  includeAiPrompts: boolean;
}

export interface ScriptBeat {
  label: string;
  timestamp: string;
  voiceover: string;
  onScreenText: string;
  visual: string;
}

export interface EditingNote {
  title: string;
  detail: string;
}

export interface AssetPrompt {
  type: string;
  prompt: string;
}

export interface ShortPlan {
  title: string;
  hook: string;
  narrativeBeats: ScriptBeat[];
  callToAction: string;
  caption: string;
  hashtags: string[];
  editingNotes: EditingNote[];
  assetPrompts: AssetPrompt[];
}

const toneDescriptors: Record<Tone, string[]> = {
  energetic: [
    "high-energy jump cuts",
    "bold text animations",
    "quick zoom transitions",
    "punchy sound effects",
  ],
  educational: [
    "clean overlays with icons",
    "clear lower-third graphics",
    "infographic inspired shots",
    "annotation pop-ups",
  ],
  inspirational: [
    "cinematic slow push-ins",
    "soft ambient lighting overlays",
    "motivational typography",
    "sweeping aerial B-roll",
  ],
  humorous: [
    "memetic reaction cuts",
    "comic zoom-ins and punchlines",
    "caption pops with emojis",
    "unexpected sound effects",
  ],
  dramatic: [
    "moody lighting overlays",
    "slow-motion emphasis shots",
    "tight reaction shots",
    "impact transitions with bass hits",
  ],
};

const toneHooks: Record<Tone, string[]> = {
  energetic: [
    "Stop scrolling—here’s the {topic} hack you can’t miss!",
    "You’ve never seen {topic} explained this fast.",
    "{audience}, this will 10x your {topic} game—watch.",
  ],
  educational: [
    "In 45 seconds, you’ll know exactly how to nail {topic}.",
    "Let’s break down {topic} like you’ve never heard before.",
    "{audience}, here’s the science behind {topic}.",
  ],
  inspirational: [
    "If {audience} knew this about {topic}, everything would change.",
    "This {topic} mindset shift turned everything around for me.",
    "Here’s the {topic} story that keeps me moving.",
  ],
  humorous: [
    "So apparently {topic} is wild—and you need to see this.",
    "{audience}, we need to talk about how chaotic {topic} really is.",
    "I tried {topic} so you don’t have to, and it went like this.",
  ],
  dramatic: [
    "The truth behind {topic}? It’s not what you think.",
    "{audience}, the {topic} moment nobody saw coming… until now.",
    "This {topic} secret nearly got buried—until today.",
  ],
};

const toneClosers: Record<Tone, string[]> = {
  energetic: [
    "Do this today and tag a friend who needs it.",
    "Screenshot this, try it, and come back with results.",
    "Smash that save button—your {topic} upgrade starts now.",
  ],
  educational: [
    "Save this so you can revisit these steps later.",
    "Give this a shot and share what surprised you most.",
    "Drop a comment if you want the deep-dive version.",
  ],
  inspirational: [
    "Pass this on to someone chasing their next breakthrough.",
    "Save this for the day you need the reminder most.",
    "When you try it, let me know how it shifts your {topic}.",
  ],
  humorous: [
    "Send this to that friend who’s chaos when it comes to {topic}.",
    "Save this as a reminder of the mess you avoided.",
    "Comment your funniest {topic} fail—I need to feel better.",
  ],
  dramatic: [
    "Remember this moment—{topic} doesn’t wait.",
    "Keep this close, you’ll want the receipts later.",
    "If you’re ready to act, save this and step in.",
  ],
};

const defaultCallToAction = "Subscribe for more shorts like this!";

const toneCaptions: Record<Tone, string[]> = {
  energetic: [
    "45 seconds to revolutionize your {topic}. Let’s go.",
    "Short, sharp, unstoppable—{topic} is yours.",
    "When {audience} meet momentum, nothing slows down.",
  ],
  educational: [
    "Breaking down {topic} so you can build it up.",
    "{topic} decoded—keep this in your back pocket.",
    "Three steps, one short, {topic} solved.",
  ],
  inspirational: [
    "The {topic} spark that keeps me chasing the next win.",
    "Hold on to this when {topic} feels heavy.",
    "{audience}, this one’s for your comeback story.",
  ],
  humorous: [
    "I can’t believe {topic} did me like this 😂",
    "{audience}, we’re in the same chaotic boat.",
    "POV: you tried {topic} and survived.",
  ],
  dramatic: [
    "This {topic} moment changed everything.",
    "When the stakes are high, {topic} won’t wait.",
    "They tried to hide this {topic} angle.",
  ],
};

const tonePrompts: Record<Tone, string[]> = {
  energetic: [
    "Dynamic montage of {topic} transformations with neon overlays",
    "Fast-paced urban shots that mirror rapid progress",
    "Close-up shots of tools, devices, or hands executing {topic} steps",
  ],
  educational: [
    "Clean macro shots illustrating each step of {topic}",
    "Minimalist desk setup with motion graphics on screen",
    "Split-screen infographic style showcasing before/after of {topic}",
  ],
  inspirational: [
    "Golden hour footage symbolizing a fresh start with {topic}",
    "Slow-motion shots of determined faces in action around {topic}",
    "Abstract visuals representing momentum and growth",
  ],
  humorous: [
    "Sketched doodle animation reacting to {topic} mishaps",
    "Over-the-top reenactments with comedic timing",
    "Unexpected B-roll juxtaposing serious {topic} advice with playful visuals",
  ],
  dramatic: [
    "High-contrast lighting emphasizing stakes around {topic}",
    "Slow motion reaction shots building tension",
    "Moody cinematic sequences signaling the reveal",
  ],
};

const paceDurations: Record<Pace, string[]> = {
  hyper: ["0:00", "0:03", "0:06", "0:09", "0:12", "0:15"],
  fast: ["0:00", "0:04", "0:08", "0:12", "0:16", "0:20", "0:24"],
  steady: ["0:00", "0:05", "0:10", "0:15", "0:20", "0:25", "0:30", "0:35"],
};

const beatLabels = [
  "Hook",
  "Set The Stakes",
  "Value Drop",
  "Proof Moment",
  "Breakdown",
  "Twist/Reframe",
  "CTA",
];

const onScreenTextFragments = [
  "Step {index}",
  "Remember this",
  "Pro move",
  "Insider tip",
  "Watch this part",
  "Drop it in",
  "Save this clip",
];

const transitionNotes = [
  "Use a swipe-cut synced to a snare hit.",
  "Stagger captions with pulse animation.",
  "Add a bass whoosh to amplify the reveal.",
  "Match cut with a bright flash transition.",
  "Layer quick b-roll to keep momentum high.",
  "Punch in 15% to emphasize the reaction.",
  "Overlay kinetic typography for the keyword.",
];

const soundDesignNotes = [
  "Start with a rising riser that peaks at the hook.",
  "Drop the beat right after the hook lands.",
  "Use a filtered sweep to build tension before the reveal.",
  "Layer subtle riser underneath the proof moment.",
  "Cut the music for half a beat to let the reaction land.",
  "Stack a bass drop to emphasize the CTA.",
];

const editingAnchors = [
  "Flash brightest keyword in sync with the beat.",
  "Add micro-jump cuts to remove all dead air.",
  "Color-code captions to separate hook/value/CTA.",
  "Use speed-ramping to glide into the proof clip.",
  "Highlight ROI number with animated underline.",
  "Pair B-roll with screen recorded overlays.",
];

const hashtagBase = [
  "#Shorts",
  "#YouTubeShorts",
  "#ViralShorts",
  "#ShortsStrategy",
  "#ContentCreator",
];

function interpolate(template: string, topic: string, audience: string) {
  return template
    .replace(/{topic}/gi, topic.trim())
    .replace(/{audience}/gi, audience.trim() || "creators");
}

function pickRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function buildTimestampIndex(options: GenerationOptions) {
  const total = Math.max(30, Math.min(75, Math.round(options.duration)));
  const stepCount = paceDurations[options.pace].length;
  const perSegment = total / Math.max(stepCount - 1, 1);

  return Array.from({ length: stepCount }, (_, index) => {
    const seconds = Math.min(total, Math.round(index * perSegment));
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(1, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  });
}

function buildNarrativeBeats(options: GenerationOptions): ScriptBeat[] {
  const timestamps = buildTimestampIndex(options);
  const beats = beatLabels.slice(0, timestamps.length);
  const fragments = [...onScreenTextFragments];
  const topicKeyword = options.topic.split(" ").slice(0, 2).join(" ");

  return beats.map((label, index) => {
    const voiceover = generateVoiceoverLine(label, options);
    const rawFragment =
      fragments.splice(
        Math.floor(Math.random() * Math.max(fragments.length, 1)),
        1,
      )[0] ?? "Beat {index}";
    const onScreenText = rawFragment
      .replace("{index}", `${index + 1}`)
      .replace("{topic}", topicKeyword || options.topic);
    const visual = generateVisualCue(label, options);

    return {
      label,
      timestamp: timestamps[index] ?? "0:00",
      voiceover,
      onScreenText,
      visual,
    };
  });
}

function generateVoiceoverLine(label: string, options: GenerationOptions) {
  const { topic, audience, tone } = options;
  const normalizedTopic = topic.trim();
  const normalizedAudience = audience.trim() || "creators";

  const valuePhrases = [
    `Here’s the {topic} move nobody shares with {audience}.`,
    `{audience}, screenshot this ${tone === "educational" ? "framework" : "play"} before it disappears.`,
    `Because the clock is ticking on your {topic}, here’s what to fix now.`,
    `You can steal this {topic} flow and have results tonight.`,
    `This {topic} shift flips your results faster than you think.`,
  ];

  const hookLines = [
    `If {audience} miss this {topic} cue, they stay stuck.`,
    `This is the exact {topic} opener I used to break 1M views.`,
    `Picture this: {topic} without the guesswork.`,
    `Here’s how {topic} hits before the three-second drop-off.`,
  ];

  const proofLines = [
    `Real receipts: watch the chart spike as soon as this clip lands.`,
    `Cut to the dashboard—check the curve right after the third beat.`,
    `Overlay the testimonial snippet while I say this line.`,
    `Show the before/after while we hold that beat.`,
  ];

  const ctaLines = toneClosers[tone];

  const mapping: Record<string, string[]> = {
    Hook: hookLines,
    "Set The Stakes": [
      `Miss this and your {topic} caps out at 1k views.`,
      `Every {audience} wastes hours here—don’t be them.`,
      `This is the choke point in every {topic} attempt.`,
    ],
    "Value Drop": valuePhrases,
    "Proof Moment": proofLines,
    Breakdown: [
      `Step one: lock your scroll-stopping opener. I’ll show you mine.`,
      `Then layer this visual anchor—it keeps retention above 65%.`,
      `Swap in contrasting b-roll to reset attention right here.`,
    ],
    "Twist/Reframe": [
      `Here’s the twist—what if you flip {topic} like this?`,
      `Everyone teaches {topic} the slow way. We remix it.` ,
      `The unlock is blending this with viewer tension.`,
    ],
    CTA: ctaLines,
  };

  const lineList = mapping[label] ?? valuePhrases;
  return interpolate(pickRandom(lineList), normalizedTopic, normalizedAudience);
}

function generateVisualCue(label: string, options: GenerationOptions) {
  const { tone, topic } = options;
  const base = interpolate(pickRandom(tonePrompts[tone]), topic, options.audience);

  const overlays = [
    "Overlay bold keywords with glitch effect.",
    "Cut to split-screen screen recording and reaction shot.",
    "Add super-speed montage with motion blur.",
    "Use vertical text reveal to underline the takeaway.",
    "Layer subtle particle texture for depth.",
  ];

  if (label === "Proof Moment") {
    return `${base}. Include live metric overlay or testimonial pull-quote.`;
  }

  if (label === "CTA") {
    return `Center frameless portrait shot. ${toneDescriptors[tone][0]}.`
      + " Trigger animated subscribe + bell icons.";
  }

  return `${base}. ${pickRandom(overlays)}`;
}

function buildEditingNotes(): EditingNote[] {
  return [
    {
      title: "Transitions",
      detail: pickRandom(transitionNotes),
    },
    {
      title: "Sound Design",
      detail: pickRandom(soundDesignNotes),
    },
    {
      title: "Visual Anchor",
      detail: pickRandom(editingAnchors),
    },
  ];
}

function buildAssetPrompts(options: GenerationOptions): AssetPrompt[] {
  if (!options.includeAiPrompts) {
    return [];
  }

  return [
    {
      type: "B-roll",
      prompt: interpolate(
        `Ultra crisp vertical 9:16 b-roll capturing {topic} workflow with depth and motion`,
        options.topic,
        options.audience,
      ),
    },
    {
      type: "Thumbnail",
      prompt: interpolate(
        `Dynamic split-face thumbnail: creator reacting to {topic} chart spike, bold headline text with neon outline`,
        options.topic,
        options.audience,
      ),
    },
    {
      type: "Voiceover",
      prompt: interpolate(
        `Energetic yet clear narration, Gen-Z creator tone, 120 words per minute, leaning into {topic} stakes for {audience}`,
        options.topic,
        options.audience,
      ),
    },
  ];
}

function buildHashtags(options: GenerationOptions) {
  const topicSlug = options.topic
    .split(" ")
    .slice(0, 3)
    .map((word) => `#${word.replace(/[^a-z0-9]/gi, "")}`)
    .filter(Boolean);

  const toneTag =
    {
      energetic: "#CreatorEnergy",
      educational: "#LearnIn60",
      inspirational: "#MindsetShift",
      humorous: "#RelatableReels",
      dramatic: "#StoryDrop",
    }[options.tone] ?? "#CreatorPlay";

  return Array.from(new Set([...topicSlug, toneTag, ...hashtagBase])).slice(
    0,
    8,
  );
}

function buildTitle(options: GenerationOptions) {
  const baseTitles = [
    "The {topic} Snap Blueprint",
    "From Scroll to Hook: {topic} in :45",
    "{audience} Need This {topic} Fix",
    "POV: {topic} Finally Clicks",
    "This {topic} Shift Hits Different",
  ];

  return interpolate(pickRandom(baseTitles), options.topic, options.audience);
}

export function generateShortPlan(options: GenerationOptions): ShortPlan {
  const safeTopic = options.topic.trim() || "Your Idea";
  const safeAudience = options.audience.trim() || "creators";
  const normalized: GenerationOptions = {
    ...options,
    topic: safeTopic,
    audience: safeAudience,
    callToAction: options.callToAction?.trim() || defaultCallToAction,
  };

  const hook = interpolate(
    pickRandom(toneHooks[normalized.tone]),
    normalized.topic,
    normalized.audience,
  );

  const plan: ShortPlan = {
    title: buildTitle(normalized),
    hook,
    narrativeBeats: buildNarrativeBeats(normalized),
    callToAction: normalized.callToAction ?? defaultCallToAction,
    caption: interpolate(
      pickRandom(toneCaptions[normalized.tone]),
      normalized.topic,
      normalized.audience,
    ),
    hashtags: buildHashtags(normalized),
    editingNotes: buildEditingNotes(),
    assetPrompts: buildAssetPrompts(normalized),
  };

  return plan;
}
