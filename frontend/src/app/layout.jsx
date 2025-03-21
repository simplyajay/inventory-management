import "@/globals.css";
import Providers from "./providers";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import Navbar from "@/components/navigation/navbar/Navbar";
import { cookies, headers } from "next/headers";
import { getFetchOptions } from "@/services/options";
import { getAuthenticatedUser } from "@/services/api/user/authentication";
import ToastProvider from "@/components/toast/ToastProvider";
import { SkeletonTheme } from "react-loading-skeleton";

export const metadata = {
  title: "Inventory Management System",
  description: "Generated by create next app",
};

const getAuth = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get(process.env.NEXT_PUBLIC_TOKEN);
  if (token) {
    const fetchOptions = getFetchOptions("GET", null, false, true, token.value);
    const { _orgId, _id, username } = await getAuthenticatedUser(fetchOptions);
    return {
      user: { orgId: _orgId, id: _id, username: username },
      isAuthenticated: true,
    };
  }
  return { isAuthenticated: false, user: {} };
};

const RootLayout = async ({ children }) => {
  const currentPath = headers().get("currentPath") || "/";
  const publicPaths = ["/", "/register"];

  const { isAuthenticated, user } = await getAuth();

  let initialState = {};

  if (isAuthenticated) {
    initialState.authentication = user;
  }

  return (
    <SkeletonTheme baseColor="#d1e0e0" highlightColor="#edf7f6">
      <Providers initialState={initialState}>
        <html lang="en">
          <body className="antialiased w-screen h-screen m-0 p-0 flex flex-col">
            <Navbar />
            <main className="flex flex-1 h-[90%]">
              {isAuthenticated && !publicPaths.includes(currentPath) ? (
                <ProtectedLayout> {children}</ProtectedLayout>
              ) : (
                <>{children}</>
              )}
            </main>
            <ToastProvider />
            <footer></footer>
          </body>
        </html>
      </Providers>
    </SkeletonTheme>
  );
};

export default RootLayout;
