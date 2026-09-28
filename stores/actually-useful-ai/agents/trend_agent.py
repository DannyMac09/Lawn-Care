#!/usr/bin/env python3
"""Daily trend scan: asks Gemini for the 5 most timely AI topics that matter
to NORMAL people (not developers or enterprises).

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
    prompt = f"""Today is {day.isoformat()}. You are a research analyst for "Actually Useful AI", a channel that explains AI in plain English to everyday, non-technical adults.

List the 5 most timely and trending AI topics RIGHT NOW that matter to NORMAL people - not developers, not enterprises, not researchers.

Good examples: new free AI tools anyone can use, big AI news explained simply, viral everyday uses of AI (meal planning, birthday speeches, travel itineraries), AI safety stories ordinary people should know about, new AI features inside apps people already have (phones, email, Google).

Bad examples (do NOT include): model benchmark scores, API launches, developer frameworks, enterprise SaaS announcements, funding rounds, anything that requires code to understand.

For each topic give exactly:
## <n>. <Topic>
**Why it's trending:** <one line>
**Best content angle:** <one line, beginner-friendly and practical>

Rules: topics must be specific and actionable for a non-technical adult. No invented statistics. If you're unsure about a trend, say so in one line rather than guessing.
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
        f.write("# AI topics trending with normal people\n")
        f.write(f"_Last updated: {day.isoformat()}_\n\n")
        f.write(trends.rstrip() + "\n")
        if previous:
            f.write("\n---\n\n## Previous runs\n\n" + previous.lstrip() + "\n")
    print(f"Wrote {OUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
