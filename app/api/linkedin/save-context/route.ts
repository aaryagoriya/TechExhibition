import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { bb } from "@/lib/browserbase";
import { createInsforgeServer } from "@/lib/insforge-server";
import { trackPostHogEvent } from "@/lib/posthog-server";

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    const body = await req.json();
    const { contextId, sessionId } = body as {
      contextId?: string;
      sessionId?: string;
    };

    if (!contextId) {
      return NextResponse.json(
        { success: false, error: "contextId is required" },
        { status: 400 },
      );
    }

    const insforge = await createInsforgeServer();

    const { error } = await insforge.database
      .from("profiles")
      .update({ linkedin_context_id: contextId, linkedin_connected: true })
      .eq("id", user.id);

    if (error) {
      console.error("[api/linkedin/save-context]", error);
      return NextResponse.json(
        { success: false, error: "Failed to save LinkedIn context" },
        { status: 500 },
      );
    }

    // Release the Browserbase session now that the context is persisted
    if (sessionId) {
      await bb.sessions
        .update(sessionId, { status: "REQUEST_RELEASE" })
        .catch((err) =>
          console.error("[api/linkedin/save-context] session release", err),
        );
    }

    await trackPostHogEvent({
      event: "linkedin_connected",
      properties: { userId: user.id },
    });

    revalidatePath("/profile");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/linkedin/save-context]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
