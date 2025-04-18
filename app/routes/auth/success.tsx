import { redirect, useLoaderData } from "react-router";
import { auth } from "~/lib/auth";
import { useEffect, useState } from "react";
import type { Route } from "./+types/success";
import { AuthCard } from "~/components/AuthCard";

// Loader to verify authentication and get user info
export async function loader({ request }: Route.LoaderArgs) {
  const authData = await auth(request);

  // If not authenticated, redirect to login
  if (!authData.user) {
    return redirect("/auth/login");
  }

  // If admin, redirect to admin dashboard
  if (authData.user.role === "admin") {
    return redirect("/admin");
  }

  // Return user email for display
  return { userEmail: authData.user.email };
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login Successful - RoboLike" },
    {
      name: "description",
      content: "You have successfully logged in to RoboLike",
    },
  ];
}

export default function Success() {
  const { userEmail } = useLoaderData<typeof loader>();
  const [timeLeft, setTimeLeft] = useState(5);

  // Set up auto-redirect after 5 seconds using window.location
  // to avoid client-side routing which might cause circular references
  useEffect(() => {
    if (timeLeft <= 0) {
      // Use window.location directly to avoid client-side routing issues
      window.location.href = "/u/profile";
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <AuthCard title="LOGIN SUCCESSFUL">

      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p className="text-lg mb-2 font-semibold">You're logged in!</p>
        <p>
          Redirecting to your profile in {timeLeft} second
          {timeLeft !== 1 ? "s" : ""}...
        </p>
      </div>

      <div className="mb-6 text-center">
        <p
          className="text-gray-600 dark:text-gray-300"
          style={{
            fontFamily: 'var(--body-font, "Chakra Petch", sans-serif)',
          }}
        >
          Logged in as: <span className="font-semibold">{userEmail}</span>
        </p>
      </div>

      <div className="text-center flex gap-4 justify-center">
        <a
          href="/u/profile"
          className="inline-block py-2 px-4 bg-[#07b0ef] text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          style={{
            fontFamily: 'var(--subheading-font, "Orbitron", sans-serif)',
          }}
        >
          GO TO PROFILE
        </a>
        <a
          href="/"
          className="inline-block py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
          style={{
            fontFamily: 'var(--subheading-font, "Orbitron", sans-serif)',
          }}
        >
          HOMEPAGE
        </a>
      </div>
    </AuthCard>
  );
}
