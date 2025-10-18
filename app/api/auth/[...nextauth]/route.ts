import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// Force dynamic rendering - don't try to statically generate this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';