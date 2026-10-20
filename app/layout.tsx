import type { Metadata } from 'next';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './globals.css';
import './reference.css';
export const metadata: Metadata = { title: 'Mr. O School — Aprende el idioma. Encuentra tu voz.', description: 'Clases personalizadas de inglés y español con Jaime Ochoa. Preparación IELTS y TOEFL. En línea en todo el mundo.' };
export default function Layout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="es"><body>{children}</body></html> }
