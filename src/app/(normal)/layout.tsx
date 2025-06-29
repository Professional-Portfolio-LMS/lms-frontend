import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMS",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        {auth || (
          <AuthProvider>
            <Sidebar />
            <div className="w-full overflow-x-auto">
              <Header />
              <div className="sm:h-[calc(99vh-88px)] overflow-auto ">
                <div className="w-full flex justify-center mx-auto overflow-auto h-[calc(100vh - 100px)] overflow-y-auto relative">
                  <div className="w-full md:max-w-6xl">{children}</div>
                </div>
              </div>
            </div>
            <Toaster reverseOrder={false} position="top-center" />
          </AuthProvider>
        )}
      </body>
    </html>
  );
}
