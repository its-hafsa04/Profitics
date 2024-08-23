"use client";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "./components/header";
import Footer from "./components/footer";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/chat-assistant");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div>
      <Head>
        <title>Profitics</title>
      </Head>
      <Header />
      <hr className="bg-slate-100" />
      <main
        className="flex flex-col items-center justify-center py-2"
        style={{
          backgroundImage: "url('https://i.redd.it/s5pw7nzd8i9b1.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold capitalize mt-[100px] md:mt-[200px] text-center text-gray-200">
          Welcome to <TipsAndUpdatesIcon className="ml-3 font-medium" />{" "}
          Profitics
        </h1>
        <h5 className="p-5 sm:p-5 mt-3 mx-5 sm:mx-10 md:mx-20 lg:mx-[200px] xl:mx-[300px] font-semibold text-gray-100">
          Hey there! I’m your friendly assistant bot. Need a hand finding the
          perfect professor, leaving a review, or navigating our site? I’m here
          to help! Just ask away.
          <br />
          <br />
          I’m still learning, but I’m getting better at understanding your
          questions and providing helpful answers. So, don’t be afraid to ask me
          anything. Let’s make your Rate My Professor experience as smooth as
          possible!
        </h5>
        <button
          className="bg-gray-300 text-black p-4 rounded-full font-bold mt-2 mb-[200px]"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </main>
      <Footer />
    </div>
  );
}
