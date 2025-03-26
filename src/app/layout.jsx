import localFont from "next/font/local";
import ApolloProviderWrapper from "./components/apollo_provider";
import Navbar from "./components/navbar";
import { LoggedProvider } from "./contexts/loggedincontext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Basic Next Template",
  description: "A basic setup for next.js projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloProviderWrapper>
          <LoggedProvider>
            <Navbar />
            {children}
          </LoggedProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
