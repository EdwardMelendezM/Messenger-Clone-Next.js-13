import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getSession() {
  // Con esto obtenemos la session
  return await getServerSession(authOptions);
}