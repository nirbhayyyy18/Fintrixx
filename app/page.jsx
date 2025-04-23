import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Finance Tracker</h1>
        <p className="text-xl text-gray-600">
          Track your expenses, manage budgets, and stay on top of your finances
        </p>
        <div className="pt-4">
          <a
            href="/sign-in"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
} 