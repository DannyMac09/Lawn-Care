#!/usr/bin/env python3
"""Weekly marketing email drafter for Actually Useful AI.

Picks the week's product from the catalog via the week-number rotation,
picks a rotating beginner-friendly angle, then asks Gemini for a subject
line + plain-English email body with one clear call to action.

Output: agents/output/email/YYYY-MM-DD.md
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gemini_client import (
    generate, today_et, fail_cleanly, PRODUCTS, product_for_week,
)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "agents", "output", "email")

# Rotating weekly angles for non-technical adults. Rotates by ISO week number.
ANGLES = [
    "beginner wins",
    "time-saving",
    "money-saving",
    "family uses",
    "work uses",
    "safety",
]


@fail_cleanly
def main():
    day = today_et()
    week = day.isocalendar()[1]
    product = PRODUCTS[product_for_week(week)]
    angle = ANGLES[week % len(ANGLES)]

    prompt = f"""Write a marketing email for a plain-English AI guide business.

Product: {product['name']} (${product['price']}) - {product['blurb']}.
Angle for this week: "{angle}" (today is {day.isoformat()}).
Audience: non-technical adults on our email list - curious about AI, wary of jargon. Voice: warm, plain English, helpful like a patient friend - never hypey.

Format exactly:
Subject: <under 50 characters, curiosity-driven>
Preheader: <one supporting line>
Body:
<150-250 words. Open with a relatable everyday situation tied to the angle, give one genuinely useful free AI tip, then pitch the product as the friendly way to learn more. One clear call to action naming the product and price. Sign off as "Your AI Buddy".>

Rules: no fake urgency, no invented testimonials, no discount claims, no tech jargon.
"""
    email = generate(prompt, max_tokens=1024)

    os.makedirs(OUT_DIR, exist_ok=True)
    out_path = os.path.join(OUT_DIR, f"{day.isoformat()}.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"# Marketing email - {day.isoformat()} ({product['name']})\n\n")
        f.write(email.rstrip() + "\n")
    print(f"Wrote {out_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
