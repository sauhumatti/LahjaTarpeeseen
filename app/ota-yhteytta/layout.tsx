import { ReactNode } from 'react';

export const metadata = {
  title: 'Ota yhteyttä - Lahjatarpeeseen',
  description: 'Ota yhteyttä meihin kysymysten, palautteen tai yhteistyöehdotusten merkeissä.',
};

interface ContactLayoutProps {
  children: ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
  return children;
}