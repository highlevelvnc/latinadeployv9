# 📦 Guia de Assets - Latina Grill

## Como Adicionar os Assets ao Projeto

### Opção 1: Download Manual do GitHub

1. Acesse: https://github.com/highlevelvnc/latinagrill/tree/main/public
2. Baixe cada arquivo necessário
3. Coloque todos na pasta `/public` do projeto

### Opção 2: Clone do Repositório

```bash
# Clone o repositório
git clone https://github.com/highlevelvnc/latinagrill.git temp-assets

# Copie a pasta public
cp -r temp-assets/public/* /seu-projeto/public/

# Remova o temporário
rm -rf temp-assets
```

### Opção 3: Download via Script

Crie um arquivo `download-assets.sh`:

```bash
#!/bin/bash

# Lista de assets necessários
ASSETS=(
  "header.mp4"
  "logo.png"
  "restaurante.jpeg"
  "restaurante1.jpeg"
  "clientes.jpeg"
  "clientes1.jpeg"
  "bandejalatinatomahawk.jpeg"
  "carnes5.jpeg"
  "carne3.jpeg"
  "costela.jpeg"
  "drinks.jpeg"
  "drinks1.jpeg"
  "drinks2.jpeg"
  "aniversario.jpeg"
  "aniversario1.jpeg"
  "grupos.jpeg"
  "grupos1.jpeg"
  "sobremesa.jpeg"
  "sobremesa1.jpeg"
)

BASE_URL="https://raw.githubusercontent.com/highlevelvnc/latinagrill/main/public"

# Criar pasta public se não existir
mkdir -p public

# Download de cada asset
for asset in "${ASSETS[@]}"
do
  echo "Downloading $asset..."
  curl -L "$BASE_URL/$asset" -o "public/$asset"
done

echo "✅ Todos os assets foram baixados!"
```

Execute:
```bash
chmod +x download-assets.sh
./download-assets.sh
```

## 🎯 Checklist de Assets

Verifique se todos os arquivos estão na pasta `/public`:

### Essenciais (Críticos)
- [ ] `header.mp4` (vídeo do hero)
- [ ] `logo.png` (logo principal)

### Experiência/Ambiente
- [ ] `restaurante.jpeg`
- [ ] `restaurante1.jpeg`
- [ ] `clientes.jpeg`
- [ ] `clientes1.jpeg`

### Carnes Premium
- [ ] `bandejalatinatomahawk.jpeg`
- [ ] `carnes5.jpeg`
- [ ] `carne3.jpeg`
- [ ] `costela.jpeg`

### Drinks & Bar
- [ ] `drinks.jpeg`
- [ ] `drinks1.jpeg`
- [ ] `drinks2.jpeg`

### Eventos
- [ ] `aniversario.jpeg`
- [ ] `aniversario1.jpeg`
- [ ] `grupos.jpeg`
- [ ] `grupos1.jpeg`

### Sobremesas
- [ ] `sobremesa.jpeg`
- [ ] `sobremesa1.jpeg`

## 🔍 Verificação

Após adicionar os assets, verifique:

```bash
# Listar arquivos na pasta public
ls -la public/

# Contar assets
ls -1 public/ | wc -l
# Deve mostrar pelo menos 19 arquivos
```

## ⚠️ Troubleshooting

### Vídeo não carrega
- Verifique se `header.mp4` está em `/public/header.mp4`
- Teste o caminho: http://localhost:3000/header.mp4
- Formato suportado: MP4 (H.264)

### Imagens não aparecem
- Verificar se Next.js está servindo a pasta `/public`
- Limpar cache: `rm -rf .next && npm run dev`
- Verificar console do navegador para erros 404

### Logo não aparece
- Caminho correto: `/logo.png`
- Formato: PNG com transparência
- Tamanho recomendado: 512x512px ou maior

## 📐 Otimização de Assets (Opcional)

### Comprimir Vídeo
```bash
# Usando ffmpeg
ffmpeg -i header.mp4 -c:v libx264 -crf 28 -preset slow header-optimized.mp4
```

### Comprimir Imagens
```bash
# Usando imagemagick
mogrify -quality 85 -resize 2000x2000\> *.jpeg
```

### Converter para WebP
```bash
# Para melhor performance
for img in *.jpeg; do
  cwebp -q 85 "$img" -o "${img%.jpeg}.webp"
done
```

## 🎬 Requisitos do Vídeo

- **Formato**: MP4 (H.264)
- **Duração**: 10-30 segundos (loop)
- **Resolução**: Mínimo 1920x1080
- **Tamanho**: Máximo 10MB (idealmente 3-5MB)
- **FPS**: 24 ou 30
- **Aspect Ratio**: 16:9

## 🖼️ Requisitos das Imagens

- **Formato**: JPEG ou WebP
- **Resolução**: Mínimo 1200px (largura)
- **Qualidade**: 80-90
- **Aspect Ratio**: Variável (grid CSS se adapta)

---

**Nota**: Todos os caminhos de assets no código usam paths relativos à pasta `/public`, exemplo:
- `/header.mp4` = `/public/header.mp4`
- `/logo.png` = `/public/logo.png`
