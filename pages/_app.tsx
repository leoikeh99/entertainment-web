import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/UserContext";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ToastContainer theme="dark" />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
