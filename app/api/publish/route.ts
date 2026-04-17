import { NextResponse } from "next/server";
import { publishEverywherePossible } from "@/server/actions/publish";

export async function POST() {
  const results = await publishEverywherePossible();

  return NextResponse.json({
    data: results,
    summary: {
      published: results.filter((result) => result.status === "published").length,
      manual: results.filter((result) => result.status === "manual_action_needed")
        .length,
      failed: results.filter((result) => result.status === "failed").length
    }
  });
}
