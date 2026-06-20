# EVNTA - Marketplace de Eventos

## Configuracion para Vercel

### 1. Variables de Entorno

En Vercel Dashboard -> Settings -> Environment Variables, agrega:

```
VITE_SUPABASE_URL=https://vjniwcvjulljbqbdnhuj.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```


Obtén tu ANON_KEY en: Supabase Dashboard -> Project Settings -> API -> anon public

### 2. Configurar Supabase

1. Ve a tu proyecto en Supabase
2. Abre el SQL Editor
3. Copia todo el contenido de `supabase/schema.sql`
4. Ejecuta el SQL

Esto creara:
- 8 tablas con Row Level Security
- 10 proveedores de demostracion
- Auth triggers automaticos

### 3. Configurar Auth URLs

En Supabase -> Authentication -> URL Configuration:

- Site URL: `https://tu-dominio.vercel.app`
- Redirect URLs: `https://tu-dominio.vercel.app/**`

### 4. Deploy

```bash
npm install
npm run build
```

## Cambios en esta version

- [x] Auth real con Supabase (registro/login/logout)
- [x] Tablas en PostgreSQL (no localStorage)
- [x] Protected Routes (redireccion si no hay sesion)
- [x] Flujo: Cliente -> /cliente/dashboard, Proveedor -> /proveedor/dashboard
- [x] Logo PNG transparente sin fondo
- [x] EVNTA en negro con A estilizada (sin barra) + punto rosa
- [x] Modo demo eliminado completamente
- [x] 10 categorias de proveedores con 91 subcategorias
- [x] 17 tipos de evento
