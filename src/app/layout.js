// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.layer.css';
import { ColorSchemeScript } from '@mantine/core';

import { Poppins } from "next/font/google";
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add required weights
  variable: "--font-poppins", // Define a CSS variable
});

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${poppins.variable}`}>
        <ToastContainer/>
        {children}
      </body>
    </html>
  );
}