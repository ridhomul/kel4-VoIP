import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";
import { CallProvider } from "../context/CallContext";
import Navigation from "../components/Navigation";
import Footer from "../components/footer";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VoIP Integration App",
  description: "Web application integrated with Kamailio VoIP server",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          <CallProvider>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ToastContainer position="top-right" autoClose={5000} />
            </div>
          </CallProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
