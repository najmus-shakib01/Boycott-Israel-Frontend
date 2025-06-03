import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <RouterProvider router={Routes}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;