"use client";
import { useEffect, useState } from "react";

interface AuditLog {
  id: string;
  admin: string;
  action: string;
  listingId: string;
  timestamp: string;
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    fetch("/api/audit")
      .then((res) => res.json())
      .then((data) => {
        console.log("logs from API:", data);
        setLogs(Array.isArray(data) ? data : [data]);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Audit Trail</h1>
      <div className="rounded-2xl border overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-sm">
              <th className="border p-2">ID</th>
              <th className="border p-2">Admin</th>
              <th className="border p-2">Action</th>
              <th className="border p-2">Listing ID</th>
              <th className="border p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="text-center text-sm">
                <td className="border p-2">{log?.id ?? "-"}</td>
                <td className="border p-2">{log?.admin ?? "-"}</td>
                <td className="border p-2">{log?.action ?? "-"}</td>
                <td className="border p-2">{log?.listingId ?? "-"}</td>
                <td className="border p-2">
                  {typeof window !== "undefined" && log?.timestamp
                    ? new Date(log.timestamp).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
