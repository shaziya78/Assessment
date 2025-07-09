import type { NextApiRequest, NextApiResponse } from "next";
import { readAuditLog } from "./utils/auditStorage";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = readAuditLog();
    return res.status(200).json(data); 
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
