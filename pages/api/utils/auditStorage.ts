import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'audit.json');

export const readAuditLog = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export const writeAuditLog = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
