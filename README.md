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
- Añadir futuros testimonios autorizados. Actualmente solo se muestra el de Samantha Fornaris, proporcionado por el usuario, completo en inglés y español, con acceso al original y opción de desplegarlo.

El carrusel de programas avanza cada 8 segundos y conserva el fondo claro. Se puede pausar y navegar manualmente; la reproducción se pausa al interactuar y cuando la pestaña está oculta. El carrusel de testimonios habilita la rotación cuando haya más de una opinión real. Se respeta la preferencia de movimiento reducido. Las imágenes de inglés y español fueron proporcionadas por el usuario.
- Conectar el Student Learning Hub existente o desarrollar su autenticación y contenidos.
- Confirmar tarifas y condiciones vigentes con Jaime antes de un lanzamiento público.

Las fotografías de los programas son ilustrativas. Los archivos están en `public/images`. La dirección visual de todas las páginas sigue la referencia proporcionada: Poppins local, botones redondeados, blanco cálido, anaranjado y secciones compactas.
