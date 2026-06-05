import { chromium } from "playwright-core";
import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { bb } from "@/lib/browserbase";

async function waitForRunning(
  sessionId: string,
  maxAttempts = 10,
  intervalMs = 500,
): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    const s = await bb.sessions.retrieve(sessionId);
    if (s.status === "RUNNING") return;
    if (s.status === "ERROR" || s.status === "TIMED_OUT" || s.status === "COMPLETED") {
      throw new Error(`Session ended unexpectedly with status: ${s.status}`);
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error("Session did not reach RUNNING state in time");
}

export async function POST() {
  try {
    await requireUser();

    const projectId = process.env.BROWSERBASE_PROJECT_ID!;

    const context = await bb.contexts.create({ projectId });

    const session = await bb.sessions.create({
      projectId,
      keepAlive: true,
      browserSettings: {
        viewport: { width: 1920, height: 1080 },
        context: {
          id: context.id,
          persist: true,
        },
      },
    });

    await waitForRunning(session.id);

    // Navigate to LinkedIn login so the user lands there directly
    const browser = await chromium.connectOverCDP(session.connectUrl);
    try {
      const page = browser.contexts()[0]?.pages()[0] ?? await browser.contexts()[0].newPage();
      await page.goto("https://www.linkedin.com/login", { waitUntil: "domcontentloaded" });
    } finally {
      await browser.close();
    }

    const { debuggerFullscreenUrl } = await bb.sessions.debug(session.id);

    return NextResponse.json({
      success: true,
      data: {
        contextId: context.id,
        sessionId: session.id,
        liveViewUrl: debuggerFullscreenUrl,
      },
    });
  } catch (error) {
    console.error("[api/linkedin/connect]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create LinkedIn session" },
      { status: 500 },
    );
  }
}
