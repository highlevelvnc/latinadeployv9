# Guia Técnico - Latina Grill Cascais

## 🎯 Visão Geral

Este é um site premium Next.js 14 trilíngue para o restaurante Latina Grill em Cascais. O projeto foi desenvolvido seguindo as melhores práticas de 2026 com foco em performance, SEO e experiência do usuário.

## 🏗️ Arquitetura

### App Router (Next.js 14)

```
app/
├── [locale]/          # Rotas dinâmicas por idioma
│   ├── layout.tsx     # Layout com fontes e providers
│   ├── page.tsx       # Home page
│   ├── menu/
│   ├── reservations/
│   └── contact/
├── api/               # API Routes
│   └── reservations/
├── sitemap.ts         # Sitemap dinâmico
└── layout.tsx         # Root layout
```

### Internacionalização (i18n)

**Biblioteca**: `next-intl`

**Estrutura**:
- `i18n.ts` - Configuração principal
- `middleware.ts` - Roteamento automático por idioma
- `messages/{locale}.json` - Traduções

**Rotas suportadas**:
- `/pt` (Português - default)
- `/en` (English)
- `/fr` (Français)

### Componentes

Todos os componentes são **Client Components** (com `'use client'`) para suportar animações e interatividade:

1. **Preloader**: Animação de carregamento inicial com touro minimalista
2. **Header**: Navegação sticky com language switcher
3. **Hero**: Section principal com imagem de fundo e CTAs
4. **Highlights**: Grid editorial das especialidades
5. **Gallery**: Grid masonry com lightbox premium
6. **LiveMusic**: Section com vibe noturna
7. **Testimonials**: Depoimentos dos clientes
8. **ReservationForm**: Formulário com validação e WhatsApp fallback
9. **Footer**: Rodapé com links e informações
10. **WhatsAppFloat**: Botão flutuante de contato

## 🎨 Design System

### Cores (Tailwind Config)

```typescript
anthracite: {
  DEFAULT: '#1a1a1a',  // Base dark
  light: '#2a2a2a',
  dark: '#0f0f0f',
}
ruby: {
  DEFAULT: '#8B1E3F',  // Vermelho profundo
  light: '#A52A4A',
  dark: '#6B1730',
}
gold: {
  DEFAULT: '#D4AF37',  // Dourado suave
  light: '#E8C468',
  dark: '#B8941F',
}
cream: {
  DEFAULT: '#F5F3EF',  // Texto principal
  dark: '#E8E6E2',
}
```

### Tipografia

```typescript
font-serif: Playfair Display (títulos, hero, headings)
font-sans: Inter (corpo de texto, UI)
```

### Animações (Framer Motion)

- **Fade In**: Entrada suave de elementos
- **Slide Up**: Elementos sobem ao entrar no viewport
- **Hover States**: Transições suaves em cards e botões
- **Scroll Animations**: `useInView` para animações ao scroll

## 🔧 Configurações Críticas

### 1. Metadata & SEO

Cada página tem `generateMetadata` assíncrono:

```typescript
export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://latinagrill.pt/${locale}`,
      languages: {
        'pt-PT': 'https://latinagrill.pt/pt',
        'en': 'https://latinagrill.pt/en',
        'fr': 'https://latinagrill.pt/fr',
      },
    },
    // ... OpenGraph, Twitter, etc.
  };
}
```

### 2. Schema.org (JSON-LD)

Implementado na home page para SEO local:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Latina Grill Cascais",
  "servesCuisine": ["Steakhouse", "Latin American"],
  "address": { ... },
  "openingHoursSpecification": [ ... ]
}
```

### 3. Imagens

**Otimização automática** com `next/image`:

```typescript
<Image
  src="https://cdn.website.dish.co/..."
  alt="Description"
  fill
  priority  // Para hero images
  quality={90}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 4. Language Switcher

Mantém a mesma página ao trocar idioma:

```typescript
<Link href={`/${lang.code}`}>
  {lang.label}
</Link>
```

## 📱 Responsividade

### Breakpoints (Tailwind)

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Padrão Mobile-First

```typescript
className="text-base md:text-lg lg:text-xl"  // Crescendo
className="grid md:grid-cols-2 lg:grid-cols-4"  // Layout
className="hidden lg:flex"  // Desktop only
```

## 🚀 Performance

### Core Web Vitals

1. **LCP (Largest Contentful Paint)**:
   - Hero image com `priority`
   - Fontes com `display: swap`
   - Preload de recursos críticos

2. **FID (First Input Delay)**:
   - Code splitting automático
   - Lazy loading de componentes não-críticos

3. **CLS (Cumulative Layout Shift)**:
   - Dimensões explícitas em imagens
   - Skeleton states durante loading

### Otimizações

```typescript
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [...]
}
```

## 🔐 Acessibilidade

### WCAG 2.1 AA Compliance

1. **Contraste**: Todas as combinações de cores passam WCAG AA
2. **Focus States**: `focus-visible` customizado
3. **ARIA**: Labels e roles adequados
4. **Keyboard Navigation**: Tab order lógico
5. **Reduced Motion**: Respeita `prefers-reduced-motion`

```typescript
// Exemplo no Preloader
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

## 📊 Monitoramento

### Métricas Recomendadas

1. **Google Analytics 4**
2. **Google Search Console**
3. **Vercel Analytics**
4. **Sentry** (error tracking)

### Eventos para Track

- Reservations submitted
- WhatsApp clicks
- Menu views
- Language switches
- Page views by locale

## 🛠️ Desenvolvimento

### Scripts

```bash
npm run dev      # Desenvolvimento (port 3000)
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # ESLint
```

### Variáveis de Ambiente (opcional)

```env
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=351XXXXXXXXX
RESEND_API_KEY=  # Para emails de reserva
```

## 🚢 Deploy

### Vercel (Recomendado)

1. Conectar repositório GitHub
2. Configurações automáticas detectadas
3. Deploy em cada push

### Outras Plataformas

- **Netlify**: Funciona out-of-the-box
- **Railway**: Suporta Next.js
- **AWS Amplify**: Requer configuração adicional

## 📝 Manutenção

### Adicionar Nova Página

1. Criar em `app/[locale]/nova-pagina/page.tsx`
2. Adicionar traduções em `messages/*.json`
3. Adicionar no sitemap (`app/sitemap.ts`)
4. Adicionar link no Header/Footer

### Atualizar Conteúdo

1. **Textos**: Editar `messages/{locale}.json`
2. **Imagens**: Atualizar URLs ou adicionar em `/public`
3. **Menu**: Editar arrays diretamente em `menu/page.tsx`

### Integrar Sistema de Reservas Real

Substituir em `ReservationForm.tsx`:

```typescript
// De:
await new Promise(resolve => setTimeout(resolve, 1500));

// Para:
const response = await fetch('/api/reservations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

E implementar em `app/api/reservations/route.ts`:
- Integração com SendGrid/Resend
- Salvar em database (Prisma, Supabase)
- Notificar restaurante via email/SMS

## 🐛 Troubleshooting

### Problema: Fontes não carregam

**Solução**: Verificar que `next/font` está configurado no layout:

```typescript
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
```

### Problema: Imagens não aparecem

**Solução**: Adicionar domínio em `next.config.js`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'seu-dominio.com',
    },
  ],
}
```

### Problema: Rotas i18n não funcionam

**Solução**: Verificar `middleware.ts` está no root:

```typescript
export const config = {
  matcher: ['/', '/(pt|en|fr)/:path*']
};
```

## 📞 Suporte

Para questões técnicas ou dúvidas sobre implementação, consultar:

- [Next.js Docs](https://nextjs.org/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Desenvolvido em 2026 com Next.js 14, TypeScript, TailwindCSS e ❤️**
