# Mr. O School

Sitio multipágina con Next.js App Router, React, TypeScript y Tailwind CSS. Diseño adaptable con tres variantes anaranjadas, programas por pestañas, precios COP/USD y contacto por WhatsApp.

El selector ES/EN del navbar traduce todas las páginas y conserva la preferencia localmente. Las traducciones se editan en `app/translations.json`; `app/language.tsx` gestiona el contexto, el idioma del documento y el contacto. Los precios mantienen su selector de moneda independiente. El logo proporcionado se usa en navbar y footer. La burbuja de WhatsApp está disponible en todas las páginas.

## Desarrollo

`npm install`

`npm run dev`

## Verificación y exportación

`npm run typecheck`

`npm run build`

El sitio estático se genera en `out/`.

## Material pendiente

- Incorporar el video de presentación. La imagen de Jaime proporcionada por el usuario está en `public/images/hero.png` y se utiliza en Inicio y Sobre Jaime.
- Añadir futuros testimonios autorizados al carrusel. El testimonio de Samantha Fornaris fue proporcionado por el usuario y se conserva completo en inglés, con traducción al español y acceso al original.
- Conectar el Student Learning Hub existente o desarrollar su autenticación y contenidos.
- Confirmar tarifas y condiciones vigentes con Jaime antes de un lanzamiento público.

Las fotografías de los programas son ilustrativas. Los archivos están en `public/images`. La dirección visual de todas las páginas sigue la referencia proporcionada: Poppins local, botones redondeados, blanco cálido, anaranjado y secciones compactas.
