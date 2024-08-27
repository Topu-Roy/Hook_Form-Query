import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/Authentication";
import NotFoundPage from "@/pages//NotFoundPage";
import Register from "@/components/register";
import SignIn from "@/components/sign-in";
import Authentication from "@/pages//Authentication";
import Dashboard from "@/pages//Dashboard";
import { AuthProvider } from "@/context/auth-context-provider";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      { path: "/auth/sign-in", element: <SignIn /> },
      { path: "/auth/register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
