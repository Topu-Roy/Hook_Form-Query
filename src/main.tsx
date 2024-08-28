import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "@/pages//NotFoundPage";
import Register from "@/components/register";
import SignIn from "@/components/sign-in";
import Dashboard from "@/pages//Dashboard";
import { AuthProvider } from "@/context/auth-context-provider";
import AuthenticationLayout from "./layouts/authLayout";
import ProtectedLayout from "./layouts/protectedLayout";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    children: [
      { path: "/auth/sign-in", element: <SignIn /> },
      { path: "/auth/register", element: <Register /> },
    ],
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
