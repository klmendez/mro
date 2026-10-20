# Mr. O School

Sitio estático bilingüe con Next.js, React y TypeScript. Páginas: Inicio, Programas, Sobre Jaime, Precios y Plataforma.

## Desarrollo

`npm install`

`npm run dev`

`npm run typecheck`

`npm run build`

La exportación estática se genera en `out/`. Los recursos actuales están en `public/images/` y `public/videos/`.

## Verificación

Con el sitio disponible en `http://localhost:3000`:

`node scripts/verify.mjs`

`node scripts/verify-autoplay.mjs`

`node scripts/verify-resources.mjs`

Los scripts comprueban las cinco páginas en español e inglés, seis anchos de pantalla, recursos multimedia, navegación automática, línea de tiempo y acordeones móviles. Usan Chrome o Edge en Windows; se puede indicar otro ejecutable con `PLAYWRIGHT_CHROMIUM_EXECUTABLE` y otra URL con `SITE_TEST_URL`.

## Contenido actual

- Inicio: programas con selección automática, video `jaime-1020.mp4`, acceso a Sobre Jaime y testimonios. Samantha es el testimonio real; Laura y Daniel son ejemplos identificados como simulados.
- Programas: inglés, español e IELTS/TOEFL, con una línea de tiempo de las etapas de clase.
- Sobre Jaime: fotografía `jaime-about.png`, perfiles profesionales y QR de TED. El QR se puede regenerar sin dependencias con `python scripts/generate-ted-qr.py`.
- Precios: planes y paquetes en columnas en escritorio y acordeón en móvil. PayPal, Nequi y transferencia bancaria.
- Plataforma: acceso privado pendiente de conexión; contacto por WhatsApp.

Las traducciones generales están en `app/translations.json`; los componentes incluyen también textos bilingües propios. Todos los contactos usan `api.whatsapp.com`. Las tarifas, condiciones de paquetes y la conexión de la plataforma deben confirmarse antes del lanzamiento público.
