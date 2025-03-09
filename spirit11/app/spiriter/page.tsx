import { Suspense } from 'react';
import Chatbotpage from '../ui/chatbot';

export default function ChatBot() {
  return (
    <div>
      <Suspense>
        <Chatbotpage/>
      </Suspense>
    </div>
  );
}