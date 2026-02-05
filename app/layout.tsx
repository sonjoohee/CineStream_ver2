import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import StyledComponentsRegistry from '@/registry';
import { GlobalStyle } from '@/global-style';
import Nav from "@/components/nav"; 

export const metadata: Metadata = {
  title: "CineStream",
  description: "Movie Streaming Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Nav /> 
          <main>
            {children}
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}