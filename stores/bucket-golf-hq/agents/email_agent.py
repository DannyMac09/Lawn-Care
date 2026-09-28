#!/usr/bin/env python3
"""Weekly seasonal marketing email drafter.

Picks the season's product from the catalog, then asks Gemini for a
subject line + plain-English email body with one clear call to action.

Output: agents/output/email/YYYY-MM-DD.md
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gemini_client import generate, today_et, fail_cleanly, PRODUCTS, product_for_month

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "agents", "output", "email")

# Bucket golf's year: spring = start your league, summer = tournament time,
# fall = championship, winter = gift the rulebook.
SEASON_ANGLE = {
    1: "winter offseason - gift the rulebook",
    2: "late winter - start planning your league season",
    3: "spring - start your league",
    4: "spring - league formation season",
    5: "late spring - league season is underway",
    6: "early summer - tournament time",
    7: "mid summer - tournament season",
    8: "late summer - final summer tournaments",
    9: "early fall - championship push",
    10: "mid fall - playoff season",
    11: "late fall - championship season finale",
    12: "winter offseason - gift the rulebook for the holidays",
}


@fail_cleanly
def main():
    day = today_et()
    product = PRODUCTS[product_for_month(day.month)]
    angle = SEASON_ANGLE[day.month]

    prompt = f"""Write a marketing email for a bucket-golf digital product business.

Product: {product['name']} (${product['price']}) - {product['blurb']}.
Seasonal angle: {angle} (today is {day.isoformat()}).
Audience: backyard-game fans, tailgaters, and families on our email list. Voice: plain English, friendly, helpful, tailgate energy - never hypey.

Format exactly:
Subject: <under 50 characters, curiosity-driven>
Preheader: <one supporting line>
Body:
<150-250 words. Open with the seasonal hook, give one genuinely useful bucket-golf tip for free, then pitch the product as the full system. One clear call to action naming the product and price. Sign off as "The Caddy".>

Rules: no fake urgency, no invented testimonials, no discount claims.
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
