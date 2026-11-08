import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = "Jay Jathar — Full Stack Engineer";
const description =
  "Jay Jathar — Full Stack Java engineer building cloud-native microservices and agentic AI workflows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jayjatharjj.github.io/Portfolio/"),
  title,
  description,
  openGraph: { type: "website", siteName: "Jay Jathar", title, description },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = { themeColor: "#0b0b0f", colorScheme: "dark" };

// Marks the page as JS-enabled before first paint so scroll-reveal styles only
// apply when the reveal script can actually run (content stays visible otherwise).
// If React hasn't hydrated within 3s (slow or failed scripts), show everything rather than a blank page.
const jsFlag =
  "document.documentElement.classList.add('js');" +
  "setTimeout(function(){var d=document.documentElement;if(!d.hasAttribute('data-rv'))d.classList.add('rv-all')},3000)";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
