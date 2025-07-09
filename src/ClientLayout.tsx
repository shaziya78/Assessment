"use client";

import { FeedbackProvider } from "../FeedbackContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <FeedbackProvider>
      {children}
    </FeedbackProvider>
  );
}
