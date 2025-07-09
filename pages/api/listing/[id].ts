/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from "next";
import { listings } from "../data/listings";
import { writeAuditLog } from "../utils/auditStorage";

const getAdminUser = (req: NextApiRequest) => {
  return req.headers["x-admin-user"] as string || "unknown";
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const parsedId = parseInt(id as string);

  if (req.method === 'GET') {
    const item = listings.find((item) => item.id === parsedId);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(item);
  }

  if (req.method === 'PUT') {
    const updatedItem = req.body;

    const index = listings.findIndex((item) => item.id === parsedId);
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    listings[index] = { ...listings[index], ...updatedItem };
    writeAuditLog({
      id: Date.now(),
      admin: getAdminUser(req),
      action: "Edit",
      listingId: parsedId,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ message: "Updated", item: listings[index] });
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
