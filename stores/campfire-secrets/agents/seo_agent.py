#!/usr/bin/env python3
"""Weekly SEO blog post writer.

Picks a target camping/fishing search query by rotating through a curated
list based on the ISO week number, then asks Gemini for an 800-1200 word
post in plain English with one natural product mention.

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
    "campfire cooking for beginners",
    "camping packing list",
    "fishing knots for beginners",
    "how to start a campfire in the rain",
    "camping meals for two",
    "camping with kids checklist",
    "how to keep food cold while camping",
    "best camping stoves for beginners",
    "fishing gear checklist for beginners",
    "how to clean a fish after catching",
    "tent camping tips for beginners",
    "campfire safety rules",
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

Audience: US campers and anglers, mostly beginners. Voice: plain English, friendly expert, zero jargon.
Length: 800-1200 words.

Format:
# <compelling title built around the query idea>
*Meta description: <one sentence under 160 characters>*

Then the article using ## subheadings. Rules:
- Answer the query directly in the first 2-3 sentences.
- Give actionable steps a camper or angler can actually follow.
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
