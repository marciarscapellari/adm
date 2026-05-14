import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prontidão para Inovação e Empreendedorismo',
  description:
    'Avalie seu perfil de prontidão para inovação e empreendedorismo com base no framework Liderança 4.0.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 antialiased">{children}</body>
    </html>
  );
}
