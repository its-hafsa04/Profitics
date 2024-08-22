import Head from "next/head";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
  return (
    <div>
    <Head>
      <title>Profitics</title>
    </Head>

    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-10">Profitics</h1>
      <ChatAssistant/>
    </main>
  </div>
  );
}
