import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth",
  description: "collage connect",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
        <html lang="en">
            <body className={`${inter.className} bg-purple-2`}>
            <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
        </html>
    </ClerkProvider>
  );
}
