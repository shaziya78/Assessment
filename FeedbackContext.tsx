'use client';
import { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext<any>(null);

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <FeedbackContext.Provider value={{ message, showMessage }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {message}
        </div>
      )}
    </FeedbackContext.Provider>
  );
}

export const useFeedback = () => useContext(FeedbackContext);
