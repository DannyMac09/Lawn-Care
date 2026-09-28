#!/usr/bin/env python3
"""Daily trend scan: asks Gemini for the 5 most timely lawn-care topics.

Writes agents/output/trends.md (latest run on top, short history below).
The content agent reads this file for topic ideas.

Output: agents/output/trends.md
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gemini_client import generate, today_et, fail_cleanly

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PATH = os.path.join(ROOT, "agents", "output", "trends.md")


@fail_cleanly
def main():
    day = today_et()
    prompt = f"""Today is {day.isoformat()}. You are a research analyst for a lawn-care content business serving US homeowners.

List the 5 most timely and trending lawn-care topics RIGHT NOW. Consider the season, weather patterns, and what homeowners are searching for and talking about this week.

For each topic give exactly:
## <n>. <Topic>
**Why it's trending:** <one line>
**Best content angle:** <one line>

Rules: topics must be specific and actionable (not "water your lawn"). No invented statistics. If you're unsure about a trend, say so in one line rather than guessing.
"""
    trends = generate(prompt, max_tokens=1024)

    previous = ""
    if os.path.exists(OUT_PATH):
        with open(OUT_PATH, encoding="utf-8") as f:
            old = f.read()
        # Drop the old header (title + "Last updated" lines); keep the rest as history.
        lines = old.splitlines()
        body = "\n".join(lines[2:]).strip()
        previous = body[-4000:]

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write("# Lawn-care topic trends\n")
        f.write(f"_Last updated: {day.isoformat()}_\n\n")
        f.write(trends.rstrip() + "\n")
        if previous:
            f.write("\n---\n\n## Previous runs\n\n" + previous.lstrip() + "\n")
    print(f"Wrote {OUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
