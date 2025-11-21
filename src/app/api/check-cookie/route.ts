import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token_partner")?.value;

  return Response.json({ valid: !!token });
}
