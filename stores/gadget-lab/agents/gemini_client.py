#!/usr/bin/env python3
"""Shared helper for the Gadget Lab agent crew.

- generate(): calls the Gemini API (model gemini-3.8-flash) with the key read
  from the GEMINI_API_KEY environment variable. The key is never hardcoded.
- today_et(): current date in America/New_York, used for output filenames.
- PRODUCTS / product_for_month(): the product catalog and seasonal mapping
  used by the seo and email agents.
"""
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

MODEL = "gemini-3.8-flash"
API_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    f"{MODEL}:generateContent"
)

PRODUCTS = {
    "christmas-gadget-guide": {
        "name": "2026 Christmas Gadget Gift Guide",
        "price": 9,
        "blurb": "the season's best tech gifts under $50: what to buy, what to skip, and honest verdicts on the viral ones",
    },
    "tech-upgrades-guide": {
        "name": "Everyday Tech Upgrades Guide",
        "price": 12,
        "blurb": "cheap tech upgrades that actually make daily life better - our tested picks under $50",
    },
}


def product_for_month(month):
    """Pick the most relevant product for a calendar month (1-12)."""
    if month in (10, 11, 12):
        return "christmas-gadget-guide"
    return "tech-upgrades-guide"


class GeminiError(Exception):
    """Raised for any clean, user-facing Gemini failure (no tracebacks)."""


def generate(prompt, max_tokens=2048):
    """Send a prompt to Gemini and return the text response.

    Raises GeminiError with a plain-English message on any failure.
    """
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        raise GeminiError(
            "GEMINI_API_KEY is not set. Set the GEMINI_API_KEY environment variable "
            "(in GitHub: repo Settings -> Secrets and variables -> Actions -> "
            "New repository secret, name GEMINI_API_KEY)."
        )
    body = json.dumps(
        {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"maxOutputTokens": max_tokens},
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={"Content-Type": "application/json", "x-goog-api-key": key},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        try:
            detail = e.read().decode("utf-8", "replace")[:300]
        except Exception:
            detail = ""
        raise GeminiError(
            f"Gemini API request failed (HTTP {e.code}). "
            f"Check that GEMINI_API_KEY is valid. Detail: {detail}"
        )
    except urllib.error.URLError as e:
        raise GeminiError(f"Network error reaching the Gemini API: {e.reason}")
    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, TypeError):
        raise GeminiError("Gemini API returned an unexpected response shape.")


def _eastern_utc_offset(now_utc):
    """UTC offset for America/New_York (-4 in DST, -5 otherwise), stdlib only."""
    y = now_utc.year
    mar1 = datetime(y, 3, 1)
    # Second Sunday of March (DST starts)
    dst_start = mar1 + timedelta(days=(6 - mar1.weekday()) % 7 + 7)
    nov1 = datetime(y, 11, 1)
    # First Sunday of November (DST ends)
    dst_end = nov1 + timedelta(days=(6 - nov1.weekday()) % 7)
    naive_utc = now_utc.replace(tzinfo=None)
    if dst_start <= naive_utc < dst_end:
        return -4
    return -5


def today_et():
    """Current date in America/New_York."""
    now_utc = datetime.now(timezone.utc)
    return (now_utc + timedelta(hours=_eastern_utc_offset(now_utc))).date()


def fail_cleanly(fn):
    """Decorator for agent main() functions: print GeminiError cleanly
    (no traceback) and exit non-zero so the workflow step visibly fails."""

    def wrapper():
        try:
            return fn()
        except GeminiError as e:
            print(f"Error: {e}", file=sys.stderr)
            return 1

    return wrapper
