import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeachMate",
  description: "Kaveesh Khattar",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  if (userId) {
    try {
      const user = await currentUser();
      const email = user?.emailAddresses?.[0]?.emailAddress ?? null;
      const unsafeMetadata = (user?.unsafeMetadata ?? {}) as Record<string, unknown>;
      const rawRole = unsafeMetadata.role ?? unsafeMetadata.ROLE;
      const resolvedRole =
        rawRole === "TEACHER" || rawRole === "STUDENT" ? rawRole : null;

      if (email) {
        await prisma.user.upsert({
          where: { clerkUserId: userId },
          update: {
            email,
            firstName: user?.firstName ?? null,
            lastName: user?.lastName ?? null,
            imageUrl: user?.imageUrl ?? null,
            role: resolvedRole,
          },
          create: {
            clerkUserId: userId,
            email,
            firstName: user?.firstName ?? null,
            lastName: user?.lastName ?? null,
            imageUrl: user?.imageUrl ?? null,
            role: resolvedRole,
          },
        });
      }
    } catch (error) {
      console.warn("RootLayout user sync skipped: failed to fetch Clerk user", error);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
