# Latina Grill Cascais 🥩

Site premium trilíngue (PT/EN/FR) para o restaurante Latina Grill em Cascais, Portugal.

## 🎯 Características

- **Design Premium**: Estética "premium steakhouse" + energia latina
- **Trilíngue**: Português (PT-PT), Inglês (EN), Francês (FR) com SEO por idioma
- **Mobile-First**: Design responsivo impecável
- **Performance**: Next.js 14 + App Router, otimização de imagens
- **Animações**: Framer Motion com microinterações suaves
- **SEO**: Metadata avançada, Schema.org, sitemap, hreflang
- **Acessibilidade**: WCAG compliant, focus states, aria labels

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **TypeScript**: Tipagem forte
- **Styling**: TailwindCSS com design system custom
- **Animações**: Framer Motion
- **i18n**: next-intl (rotas por idioma)
- **Componentes**: shadcn/ui + Radix UI
- **Ícones**: lucide-react

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

Acesse: http://localhost:3000

## 🌍 Estrutura de Rotas

```
/pt          → Português (default)
/en          → English
/fr          → Français

/pt/menu     → Menu
/en/menu     → Menu
/fr/menu     → Menu

/pt/reservas        → Reservations
/en/reservations    → Reservations
/fr/reservation     → Réservation
```

## 📁 Estrutura do Projeto

```
latina-grill-cascais/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx           # Home
│   │   ├── menu/page.tsx      # Menu
│   │   ├── reservations/page.tsx
│   │   ├── contact/page.tsx
│   │   └── layout.tsx
│   ├── sitemap.ts
│   └── layout.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Highlights.tsx
│   ├── Gallery.tsx
│   ├── LiveMusic.tsx
│   ├── Testimonials.tsx
│   ├── ReservationForm.tsx
│   ├── Footer.tsx
│   ├── WhatsAppFloat.tsx
│   └── Preloader.tsx
├── messages/
│   ├── pt.json
│   ├── en.json
│   └── fr.json
├── lib/
│   └── utils.ts
├── i18n.ts
└── middleware.ts
```

## 🎨 Design System

### Cores

- **Anthracite**: #1a1a1a (Base dark)
- **Ruby**: #8B1E3F (Vermelho profundo)
- **Gold**: #D4AF37 (Dourado suave)
- **Cream**: #F5F3EF (Texto)

### Tipografia

- **Serif**: Playfair Display (Títulos)
- **Sans**: Inter (Corpo de texto)

## 🚀 Deploy

Para deploy em Vercel:

```bash
vercel
```

Ou conecte o repositório diretamente no dashboard da Vercel.

## 📝 Configurações Importantes

### SEO

- Metadata por idioma em cada página
- Schema.org JSON-LD para Restaurant + LocalBusiness
- Sitemap XML com hreflang
- OpenGraph + Twitter Cards

### Performance

- Otimização automática de imagens (next/image)
- Lazy loading
- Code splitting automático
- Font optimization

### Acessibilidade

- Contraste WCAG AA
- Focus states visíveis
- ARIA labels
- Keyboard navigation
- prefers-reduced-motion

## 🔧 Personalização

### Adicionar novo idioma

1. Criar `messages/{locale}.json`
2. Adicionar locale em `i18n.ts`
3. Atualizar `middleware.ts`

### Modificar cores

Editar `tailwind.config.ts`:

```typescript
colors: {
  anthracite: { ... },
  ruby: { ... },
  gold: { ... },
}
```

## 📞 Contactos

- **Instagram**: [@latina.grill](https://www.instagram.com/latina.grill/)
- **Localização**: Rua Frederico Arouca, 58, 2750-353 Cascais
- **Website**: https://latinagrill.pt

---

**Desenvolvido com ❤️ para Latina Grill Cascais**
