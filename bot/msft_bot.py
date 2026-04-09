#!/usr/bin/env python3
"""
MSFT Research Bot
-----------------
- Sends a daily MSFT analysis to Telegram at 08:00 IST (02:30 UTC).
- Accepts free-form research questions from the whitelisted user and
  answers them via Claude (claude-sonnet-4-6).

Setup:
  1. Copy .env.example → .env and fill in your credentials.
  2. pip install -r requirements.txt
  3. python msft_bot.py
     (or run as a systemd service — see msft-bot.service)
"""

import logging
import os
from datetime import datetime, timedelta, timezone

from anthropic import AsyncAnthropic
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from dotenv import load_dotenv
from telegram import Update
from telegram.error import BadRequest
from telegram.ext import Application, MessageHandler, filters, ContextTypes

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

load_dotenv()

TELEGRAM_TOKEN: str = os.environ["TELEGRAM_TOKEN"]
TELEGRAM_CHAT_ID: int = int(os.environ["TELEGRAM_CHAT_ID"])
ANTHROPIC_API_KEY: str = os.environ["ANTHROPIC_API_KEY"]

# 08:00 IST = UTC+5:30 = 02:30 UTC
DAILY_HOUR_UTC = 2
DAILY_MINUTE_UTC = 30

IST = timezone(timedelta(hours=5, minutes=30))

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Claude client
# ---------------------------------------------------------------------------

claude = AsyncAnthropic(api_key=ANTHROPIC_API_KEY)

SYSTEM_PROMPT = (
    "You are a stock market research assistant specialising in equities analysis. "
    "Provide concise, factual, and well-structured analysis. "
    "When you are uncertain about current data, say so explicitly. "
    "Format responses for Telegram: use *bold* for section headers only, "
    "plain text for everything else. Keep replies under 450 words."
)

MSFT_DAILY_PROMPT = """\
Act as a stock market expert. Analyse MSFT for the most recent trading day and respond with \
three clearly labelled sections:

*Technical Movement* — Price action, volume, key intraday levels, and any notable candlestick \
patterns.

*Fundamental Events* — News, earnings updates, analyst actions, product announcements, or macro \
events that may have influenced MSFT yesterday.

*Long-Term Outlook* — Key support and resistance levels on the weekly/monthly chart. Where is \
MSFT likely heading, and why? Be specific about price levels.

Keep the total response concise and actionable. Use *bold* for the three section headers only.\
"""


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


async def ask_claude(prompt: str) -> str:
    """Send *prompt* to Claude and return the text response."""
    response = await claude.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text


async def safe_send(chat_id: int, text: str, app: Application) -> None:
    """Send *text* with Markdown; fall back to plain text on parse errors."""
    try:
        await app.bot.send_message(chat_id=chat_id, text=text, parse_mode="Markdown")
    except BadRequest:
        await app.bot.send_message(chat_id=chat_id, text=text)


# ---------------------------------------------------------------------------
# Scheduled job
# ---------------------------------------------------------------------------


async def send_msft_daily(app: Application) -> None:
    """Scheduled job: generate and push the daily MSFT brief."""
    logger.info("Running scheduled MSFT daily analysis…")
    try:
        summary = await ask_claude(MSFT_DAILY_PROMPT)
        now_ist = datetime.now(IST).strftime("%d %b %Y, %I:%M %p IST")
        message = f"📊 *MSFT Daily Brief* — {now_ist}\n\n{summary}"
        await safe_send(TELEGRAM_CHAT_ID, message, app)
        logger.info("Daily brief delivered.")
    except Exception:
        logger.exception("Failed to deliver daily MSFT brief")


# ---------------------------------------------------------------------------
# Interactive message handler
# ---------------------------------------------------------------------------


async def on_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Forward user messages to Claude and reply with the result."""
    chat_id = update.effective_chat.id

    # Whitelist check — only respond to the configured chat
    if chat_id != TELEGRAM_CHAT_ID:
        logger.warning("Rejected message from unknown chat_id=%s", chat_id)
        return

    user_text = update.message.text
    logger.info("User message: %s", user_text[:120])

    thinking_msg = await update.message.reply_text("Researching… ⏳")

    try:
        reply = await ask_claude(user_text)
        await thinking_msg.delete()
        await safe_send(chat_id, reply, context.application)
    except Exception:
        logger.exception("Claude API error while handling user message")
        await thinking_msg.edit_text("Something went wrong. Please try again.")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------


def main() -> None:
    app = Application.builder().token(TELEGRAM_TOKEN).build()
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_message))

    scheduler = AsyncIOScheduler()
    scheduler.add_job(
        send_msft_daily,
        CronTrigger(hour=DAILY_HOUR_UTC, minute=DAILY_MINUTE_UTC, timezone="UTC"),
        args=[app],
        id="msft_daily",
    )
    scheduler.start()
    logger.info(
        "Scheduler started — daily MSFT brief at 08:00 IST (%02d:%02d UTC)",
        DAILY_HOUR_UTC,
        DAILY_MINUTE_UTC,
    )

    logger.info("Bot polling for messages…")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
