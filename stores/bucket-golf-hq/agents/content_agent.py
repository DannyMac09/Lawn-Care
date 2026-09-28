#!/usr/bin/env python3
"""Daily Shorts script writer for the Bucket Golf HQ channel.

Reads agents/output/trends.md (if present) for timely topics, avoids topics
covered in the last 14 days, then asks Gemini for 3 Shorts scripts.

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

# Bucket golf is a spring/summer/fall game; winter is the offseason
# (indoor practice, planning, and gifting).
SEASON_BY_MONTH = {
    12: "early winter (offseason)",
    1: "deep winter (offseason)",
    2: "late winter (pre-season planning)",
    3: "early spring (season kickoff)",
    4: "mid spring",
    5: "late spring",
    6: "early summer",
    7: "mid summer",
    8: "late summer",
    9: "early fall",
    10: "mid fall (playoff season)",
    11: "late fall (championship season)",
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

    prompt = f"""You are the scriptwriter for "Bucket Golf HQ", a faceless YouTube Shorts channel about bucket golf - the backyard chipping game where you chip golf balls into buckets.
Voice: plain English, zero jargon, tailgate energy. Audience: backyard game fans, tailgaters, and families, not golf snobs.

Today is {day.isoformat()} ({season} in the northeastern US).

{f"Timely topics from the trend scan (use these for inspiration):\n{trends}\n" if trends else ""}\
{f"Topics already covered recently - do NOT repeat these: {', '.join(recent)}\n" if recent else ""}\
Write 3 YouTube Shorts scripts about bucket golf. Mix up the angle across these ideas: trick shots, chipping tips, course setup ideas, funny moments, league hype.

For EACH script use exactly this format:

## <n>. <Short punchy title>
**Hook (on-screen text for the first second):** <under 8 words, curiosity or contrarian>
**Voiceover script (25-35 seconds, 70-90 words):** <the full spoken script>
**Caption cues (4-6 short phrases to highlight word-by-word with the voiceover):** <comma-separated phrases>

Rules:
- One clear, fun, actionable idea per video.
- The hook must create curiosity in the first second.
- Never invent statistics, product claims, or brand endorsements.
- Keep every word backyard-plain. No golf-pro jargon unless you immediately translate it.
- In the offseason (winter), favor indoor practice drills, league planning, gifting, and funny throwback moments.
"""
    scripts = generate(prompt, max_tokens=2048)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{day.isoformat()}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"# Bucket Golf HQ Shorts - {day.isoformat()}\n\n")
        f.write(scripts.rstrip() + "\n")
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
