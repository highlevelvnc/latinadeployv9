# 📸 Mapeamento de Assets Reais - Latina Grill

## Assets Utilizados na Homepage

### 🎬 **Hero Section**
- `header.mp4` - Vídeo principal do hero
- `logo.png` - Logo principal

---

### 🏆 **Logo Overlap Section**
- `logo.png` - Logo grande sobreposta

---

### 🍽️ **Menu Highlights (Destaques do Menu)**

**Pratos Reais Mapeados:**

1. **Tomahawk Premium**
   - Arquivo: `/tomahawkchamas.jpeg`
   - Categoria: Carnes
   - Descrição: Corte espetacular flamejante

2. **Tártaro de Lombos Nobres**
   - Arquivo: `/prato1.jpeg`
   - Categoria: Entradas
   - Descrição: Carne crua temperada artesanalmente

3. **Camarão Flambé**
   - Arquivo: `/camaraovgpronto.jpeg`
   - Categoria: Entradas Quentes
   - Descrição: Camarões jumbo flamejados

4. **Tataki de Kobe Japonês**
   - Arquivo: `/prato9.jpeg`
   - Categoria: Premium
   - Descrição: Wagyu selado com ponzu

5. **Chuleta Espanhola**
   - Arquivo: `/chuletaespanha.jpeg`
   - Categoria: Carnes
   - Descrição: Costela de vitela maturada

6. **Ribeye na Grelha**
   - Arquivo: `/ribeygrelha1.jpeg`
   - Categoria: Carnes
   - Descrição: Corte suculento selado

---

### 🔥 **Experience Section (Grelha & Espaço)**

**Imagens do Local:**

1. **Grelha Principal**
   - Arquivo: `/grelhan.jpeg`
   - Uso: Imagem grande principal
   - Mostra: Estação de grelha profissional

2. **Interior do Restaurante**
   - Arquivo: `/restaurantelocal.jpeg`
   - Uso: Grid pequeno (esquerda)
   - Mostra: Ambiente interno

3. **Área de Refeições**
   - Arquivo: `/restaurantelocal1.jpeg`
   - Uso: Grid pequeno (direita)
   - Mostra: Espaço premium

---

### 🥩 **Meat Section**
- Mantém `/bandejalatinatomahawk.jpeg` (já estava correto)

---

### 🍸 **Drinks Section**

**Cocktails Reais:**

1. **Martini Premium** (Imagem Principal Tall)
   - Arquivo: `/drinkmartini.jpeg`
   - Posição: Grande vertical

2. **Moscow Mule**
   - Arquivo: `/moscowmule.jpeg`
   - Posição: Superior direita

3. **Blackberry**
   - Arquivo: `/drinkblackberry.jpeg`
   - Posição: Inferior direita

**Drinks Mencionados no Texto:**
- Moscow Mule - `/moscowmule.jpeg`
- Blackberry - `/drinkblackberry.jpeg`
- Casamigos - `/drinkcasamigos.jpeg`
- Chocolate Martini - `/drinkchoco.jpeg`

---

### 🎉 **Events Section**
- Mantém imagens de eventos (já estavam corretas)

---

### 📸 **Premium Gallery (Curadoria)**

**8 Fotos Selecionadas:**

1. **Tomahawk Linda** (2x2)
   - Arquivo: `/tomahawklinda.jpeg`
   - Span: Grande destaque
   
2. **Ribeye Grelha**
   - Arquivo: `/ribeygrelha.jpeg`
   - Span: 1x1

3. **Costela Premium**
   - Arquivo: `/costela.jpeg`
   - Span: 1x1

4. **Ambiente Interior**
   - Arquivo: `/restaurantelocal3.jpeg`
   - Span: 1x1

5. **Petit Gateau**
   - Arquivo: `/petitgateau.jpeg`
   - Span: 1x1

6. **Interior Panorâmico** (2x1)
   - Arquivo: `/restaurantelocal2.jpeg`
   - Span: Horizontal

7. **Bandeja Latina**
   - Arquivo: `/bandejalatina1.jpeg`
   - Span: 1x1

8. **Sobremesa Trufa**
   - Arquivo: `/sobremesatrufa.jpeg`
   - Span: 1x1

---

## 📦 Assets Reserva (Disponíveis mas não usados)

### Carnes:
- `/carne.jpeg`
- `/carne3.jpeg`
- `/carnes5.jpeg`
- `/chapacarne.jpeg`
- `/chapacarne1.jpeg`
- `/espetocarne.jpeg`
- `/ribey.jpeg`
- `/tomahawk.jpeg`
- `/tomahawk1.jpeg`
- `/tomahawkprat.jpeg`
- `/tomahawklatina.jpeg`

### Drinks:
- `/drinks.jpeg`
- `/drinks1.jpeg`
- `/elpatronxocafe.jpeg`
- `/vinhopetrvs.jpeg`

### Entradas:
- `/bolinhodebacalhau.jpeg`
- `/camaraoprato.jpeg`
- `/camaraovg.jpeg`
- `/cheese.jpeg`
- `/entradasnaentrada.jpeg`
- `/trufanegra.jpeg`

### Sobremesas:
- `/bolo.jpeg`

### Local:
- `/restaurantelocal4.jpeg`
- `/restaurantelocal5.jpeg`
- `/restaurantelocal6.jpeg`
- `/restaurantelocal7.jpeg`
- `/mesavazia.jpeg`
- `/frigorifico1.jpeg`
- `/frigorifigo.jpeg`

### Eventos:
- `/aniversario.jpeg`
- `/aniversario1.jpeg`
- `/grupos.jpeg` (usado em Events)
- `/grupos1.jpeg` (usado em Events)
- `/clientes.jpeg`
- `/clientes1.jpeg`

### Outros:
- `/habanoscharuto.jpeg`

---

## 🎯 Critério de Seleção

### ✅ **Imagens USADAS:**
- Alta qualidade visual
- Representam pratos/drinks reais do menu
- Boa iluminação e composição
- Contam a história do restaurante
- Mostram a grelha, carnes, ambiente

### ❌ **Imagens NÃO USADAS:**
- Duplicadas
- Qualidade inferior
- Não adicionam valor visual
- Não são protagonistas

---

## 📝 Notas de Implementação

1. **Todos os paths são relativos a `/public`**
   - Exemplo: `/logo.png` = `/public/logo.png`

2. **Imagens otimizadas com Next.js Image**
   - Lazy loading automático
   - Responsive
   - WebP conversion

3. **Organização por Narrativa**
   - Hero → Vídeo imersivo
   - Logo → Transição visual
   - Menu → Pratos reais
   - Experiência → Grelha e espaço
   - Drinks → Cocktails autênticos
   - Galeria → Melhores momentos

4. **Mobile-First**
   - Todas as imagens adaptam para mobile
   - Grid responsivo
   - Performance otimizada

---

**Total de Assets Utilizados:** 23 arquivos
**Total de Assets Disponíveis:** 60+ arquivos
**Taxa de Aproveitamento:** ~38% (curadoria intencional)
