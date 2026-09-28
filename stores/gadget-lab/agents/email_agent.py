#!/usr/bin/env python3
"""Weekly seasonal marketing email drafter.

Picks the season's product from the catalog (gift guide Oct-Dec, upgrades
guide the rest of the year), then asks Gemini for a subject line + preheader
+ plain-English email body with one clear call to action.

Output: agents/output/email/YYYY-MM-DD.md
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gemini_client import generate, today_et, fail_cleanly, PRODUCTS, product_for_month

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "agents", "output", "email")

SEASON_ANGLE = {
    1: "new-year tech refresh deals",
    2: "valentine's tech gifts",
    3: "spring tech upgrades",
    4: "spring cleaning your desk setup",
    5: "graduation gift season",
    6: "father's day gadget gifts",
    7: "summer travel tech",
    8: "back-to-school gadgets",
    9: "early holiday gift scouting",
    10: "holiday gift guide season kicks off",
    11: "black friday and holiday gift rush",
    12: "last-minute christmas gift crunch",
}


@fail_cleanly
def main():
    day = today_et()
    product = PRODUCTS[product_for_month(day.month)]
    angle = SEASON_ANGLE[day.month]

    prompt = f"""Write a marketing email for a viral-gadgets digital product business.

Product: {product['name']} (${product['price']}) - {product['blurb']}.
Seasonal angle: {angle} (today is {day.isoformat()}).
Audience: US shoppers on our email list. Voice: plain English, friendly, helpful - never hypey. The brand voice of The Gadget Lab: "We test viral gadgets so you don't waste money."

Format exactly:
Subject: <under 50 characters, curiosity-driven>
Preheader: <one supporting line>
Body:
<150-250 words. Open with the seasonal problem, give one genuinely useful tip for free, then pitch the product as the full guide. One clear call to action naming the product and price. Sign off as "The Gadget Lab".>

Rules: no fake urgency, no invented testimonials, no discount claims, no invented statistics or review scores.
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
