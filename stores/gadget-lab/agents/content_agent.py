#!/usr/bin/env python3
"""Daily Shorts script writer for The Gadget Lab channel.

Reads agents/output/trends.md (if present) for timely topics, avoids topics
covered in the last 14 days, then asks Gemini for 3 Shorts scripts.

Brand tagline: "We test viral gadgets so you don't waste money."
Every script is a gadget TEST with an honest verdict angle.

Output: agents/output/shorts/YYYY-MM-DD.md
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gemini_client import generate, today_et, fail_cleanly

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "agents", "output", "shorts")
TRENDS_FILE = os.path.join(ROOT, "agents", "output", "trends.md")

SEASON_BY_MONTH = {
    12: "holiday gift crunch",
    1: "post-holiday returns and deals",
    2: "winter tech upgrades",
    3: "spring tech refresh",
    4: "spring tech refresh",
    5: "graduation gift season",
    6: "summer travel gadgets",
    7: "summer travel gadgets",
    8: "back-to-school gadgets",
    9: "early holiday gift scouting",
    10: "holiday gift shopping starts",
    11: "black friday and gift season",
}


def load_trends():
    if not os.path.exists(TRENDS_FILE):
        return ""
    with open(TRENDS_FILE, encoding="utf-8") as f:
        return f.read()[:1500]


def recent_titles(days=14):
    """Titles from the most recent shorts files, so we don't repeat topics."""
    titles = []
    if not os.path.isdir(OUT_DIR):
        return titles
    files = sorted(
        (f for f in os.listdir(OUT_DIR) if f.endswith(".md")), reverse=True
    )[:days]
    for fname in files:
        with open(os.path.join(OUT_DIR, fname), encoding="utf-8") as f:
            for line in f:
                m = re.match(r"## \d+\.\s+(.*)", line.strip())
                if m:
                    titles.append(m.group(1).strip())
    return titles


@fail_cleanly
def main():
    day = today_et()
    season = SEASON_BY_MONTH[day.month]
    trends = load_trends()
    recent = recent_titles()

    prompt = f"""You are the scriptwriter for "The Gadget Lab", a faceless YouTube Shorts channel about viral gadgets.
Brand tagline: "We test viral gadgets so you don't waste money."
Voice: plain English, zero jargon, skeptical-but-fair reviewer. Every video is a gadget TEST with an honest verdict - buy it or skip it. Audience: regular shoppers, not tech geeks.

Today is {day.isoformat()} ({season} in the US).

{f"Timely topics from the trend scan (use these for inspiration):\n{trends}\n" if trends else ""}\
{f"Topics already covered recently - do NOT repeat these: {', '.join(recent)}\n" if recent else ""}\
Write 3 YouTube Shorts scripts, each about testing ONE viral gadget or viral gadget category. For EACH script use exactly this format:

## <n>. <Short punchy title>
**Hook (on-screen text for the first second):** <under 8 words, gadget-TEST style, e.g. "I tested the viral X so you don't have to">
**Voiceover script (25-35 seconds, 70-90 words):** <the full spoken script>
**Caption cues (4-6 short phrases to highlight word-by-word with the voiceover):** <comma-separated phrases>

Rules:
- One gadget tested per video, ending with a clear verdict: worth buying or skip.
- The hook must create curiosity in the first second.
- Never invent brand endorsements, statistics, or review scores. If you name a real product, stick to publicly known facts about it - no fake test results.
- Keep every word shopper-plain. No spec-sheet jargon.
"""
    scripts = generate(prompt, max_tokens=2048)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{day.isoformat()}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"# The Gadget Lab Shorts - {day.isoformat()}\n\n")
        f.write(scripts.rstrip() + "\n")
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
