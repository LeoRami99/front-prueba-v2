# Front Prueba V2

Frontend para una prueba tecnica con catalogo de productos y flujo de compra con tarjeta.

## Funcionalidades

- Catalogo paginado con estados de carga/errores.
- Modal de compra en 3 pasos: monto + aceptacion de terminos, tokenizacion de tarjeta, confirmacion y compra.
- Resumen e invoice de transaccion en `app/(pages)/transaction/[idInternalTransaction]`.
- Calculo de impuesto fijo del 19% para el total.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 + DaisyUI (tema custom)
- React Query, React Hook Form, Zustand
- Axios, React Hot Toast, React Icons

## Variables de entorno

Crea `.env.local` en la raiz:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_KEY=pub_test_xxx
```

`NEXT_PUBLIC_API_BASE_URL` define la base de la API para productos y transacciones.  
`NEXT_PUBLIC_KEY` es la public key de (sandbox) para obtener el acceptance token.

## API esperada

Estos endpoints deben existir en el backend configurado en `NEXT_PUBLIC_API_BASE_URL`:

- `GET /products?page=&pageSize=&filter=`
- `POST /cards/token`
- `POST /transactions`
- `GET /transactions/internal/:id`

Para los terminos y condiciones se consulta:

- `GET https://api-sandbox.co.uat.wompi.dev/v1/merchants/{NEXT_PUBLIC_KEY}`

## Scripts

```bash
npm run dev    # desarrollo
npm run build  # build
npm run start  # produccion
npm run lint   # lint
```

## Estructura rapida

- `app/components`: UI y pasos del flujo de compra
- `app/services`: llamadas HTTP
- `app/hooks`: hooks de React Query
- `app/stores`: estado global con Zustand
