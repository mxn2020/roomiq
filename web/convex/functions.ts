import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const saveScan = mutation({
  args: { items: v.array(v.object({ name: v.string(), category: v.string(), estimatedPrice: v.string(), buyLink: v.optional(v.string()), style: v.string() })), roomStyle: v.string(), suggestions: v.array(v.string()) },
  handler: async (ctx, args) => await ctx.db.insert("scans", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("scans").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
