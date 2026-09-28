#!/usr/bin/env python3
"""Weekly SEO blog post writer for Actually Useful AI.

Picks a target beginner AI search query by rotating through a curated list
based on the ISO week number, then asks Gemini for an 800-1200 word post
in plain English with one natural product mention.

Output: agents/output/blog/YYYY-MM-DD-slug.md
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gemini_client import generate, today_et, fail_cleanly, PRODUCTS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "agents", "output", "blog")

TARGET_QUERIES = [
    "what is AI in simple terms",
    "how to use ChatGPT for beginners",
    "best AI prompts for everyday life",
    "is AI safe to use",
    "how to write a good AI prompt",
    "free AI tools for normal people",
    "how to use AI to save time at home",
    "can AI help me with my bills",
    "how to talk to AI like a person",
    "AI for seniors explained simply",
    "how to spot an AI scam",
    "how to use AI to plan meals",
]


def slugify(query):
    return re.sub(r"[^a-z0-9]+", "-", query.lower()).strip("-")


@fail_cleanly
def main():
    day = today_et()
    week = day.isocalendar()[1]
    query = TARGET_QUERIES[week % len(TARGET_QUERIES)]
    slug = slugify(query)
    catalog = "\n".join(
        f"- {p['name']} (${p['price']}): {p['blurb']}" for p in PRODUCTS.values()
    )

    prompt = f"""Write an SEO blog post targeting the search query: "{query}".

Audience: non-technical US adults - regular people curious about AI but overwhelmed by jargon.
Voice: plain English, friendly, patient, never condescending - like explaining to a smart friend.
Length: 800-1200 words.

Format:
# <compelling title built around the query idea>
*Meta description: <one sentence under 160 characters>*

Then the article using ## subheadings. Rules:
- Answer the query directly in the first 2-3 sentences, in plain English.
- Explain any AI term the moment you use it - assume zero prior knowledge.
- Give actionable steps a total beginner can actually follow today, for free.
- Mention exactly ONE of these products where it fits naturally (name and price, no hard sell):
{catalog}
- Never invent statistics, studies, or product claims.
- End with 3 quick takeaways.
"""
    post = generate(prompt, max_tokens=3000)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{day.isoformat()}-{slug}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(post.rstrip() + "\n")
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
