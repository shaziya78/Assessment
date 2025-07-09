import fs from 'fs';
import path from 'path';

export interface AuditLog {
  id: string;
  admin: string;
  action: string;
  listingId: string;
  timestamp: string;
}

const filePath = path.join(process.cwd(), 'audit.json');

export const readAuditLog = (): AuditLog[] => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as AuditLog[];
};

export const writeAuditLog = (data: AuditLog[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
