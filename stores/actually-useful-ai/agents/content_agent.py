#!/usr/bin/env python3
"""Daily Shorts script writer for the Actually Useful AI channel.

Reads agents/output/trends.md (if present) for timely topics, avoids topics
covered in the last 14 days, then asks Gemini for 3 Shorts scripts: one
beginner-friendly AI tip per script.

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

# Tip categories rotate by day-of-year so every week covers fresh ground.
TIP_CATEGORIES = [
    "asking better questions",
    "saving time",
    "money help",
    "family & home",
    "work wins",
    "fun stuff",
    "safety basics",
]


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
    category = TIP_CATEGORIES[day.timetuple().tm_yday % len(TIP_CATEGORIES)]
    trends = load_trends()
    recent = recent_titles()

    prompt = f"""You are the scriptwriter for "Actually Useful AI", a faceless YouTube Shorts channel that explains AI in plain English to normal, non-technical people.
Voice: warm, patient, never condescending, zero tech jargon. Audience: everyday adults who have heard of AI but aren't sure how to use it. Explain every AI term the moment you use it.

Today is {day.isoformat()}. Today's tip category: "{category}".

{f"Timely topics from the trend scan (use these for inspiration):\n{trends}\n" if trends else ""}\
{f"Topics already covered recently - do NOT repeat these: {', '.join(recent)}\n" if recent else ""}\
Write 3 YouTube Shorts scripts, each teaching ONE beginner-friendly AI tip from today's category. For EACH script use exactly this format:

## <n>. <Short punchy title>
**Hook (on-screen text for the first second):** <under 8 words, curiosity or relatable pain>
**Voiceover script (25-35 seconds, 70-90 words):** <the full spoken script>
**Caption cues (4-6 short phrases to highlight word-by-word with the voiceover):** <comma-separated phrases>

Rules:
- One clear, actionable tip per video. Assume the viewer is a total beginner.
- The hook must create curiosity in the first second.
- Every tip must be something a normal person can try free, right now, on their phone.
- Never invent statistics, product claims, or brand endorsements.
- Keep every word plain English. No tech degree required.
"""
    scripts = generate(prompt, max_tokens=2048)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{day.isoformat()}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"# Actually Useful AI Shorts - {day.isoformat()} ({category})\n\n")
        f.write(scripts.rstrip() + "\n")
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
