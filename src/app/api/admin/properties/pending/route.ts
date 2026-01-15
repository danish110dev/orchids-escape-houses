import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { properties } from "../../../../../../drizzle/schema";
import { count, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });
    
    if (!session?.user || (session.user as any).role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Get property status counts
    const pendingCount = await db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.status, "pending"));

    const approvedCount = await db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.status, "approved"));

    const rejectedCount = await db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.status, "rejected"));

    const allCount = await db.select({ count: count() }).from(properties);

    const statusCounts = {
      pending: pendingCount[0]?.count || 0,
      approved: approvedCount[0]?.count || 0,
      rejected: rejectedCount[0]?.count || 0,
      all: allCount[0]?.count || 0,
    };

    return Response.json({ statusCounts });
  } catch (error) {
    console.error("Error fetching property status:", error);
    return Response.json(
      { error: "Failed to fetch property status" },
      { status: 500 }
    );
  }
}
