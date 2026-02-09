import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'Decentralized Voting',
  description: 'On-chain voting on Sepolia',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
