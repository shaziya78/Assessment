import type { NextApiRequest, NextApiResponse } from "next";
import { listings } from "./data/listings";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET') {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = (req.query.status as string)?.toLowerCase();

    let filtered = listings;
    if (status && status !== 'all') {
      filtered = listings.filter((item) => item.status.toLowerCase() === status);
    }

    const start = (page - 1) * limit;
    const paginatedData = filtered.slice(start, start + limit);

    return res.status(200).json({
      data: paginatedData,
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    });
  }

  if (req.method === 'PATCH') {
    const { id, action } = req.body;
    const index = listings.findIndex((item) => item.id === id);
    if (index !== -1) {
      listings[index].status = action === 'Approve' ? 'Approved' : 'Rejected';
    }
    return res.status(200).json({ message: "Status updated" });
  }
  

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
