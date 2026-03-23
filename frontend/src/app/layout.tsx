import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { ReduxProvider } from '@/store/provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'POS System',
  description: 'Professional Point of Sale System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ReduxProvider>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
