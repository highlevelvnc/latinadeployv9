# Email Templates — Latina Grill Cascais

Esta pasta tem **dois tipos** de templates. Não confundas:

## A. Transactionais — disparados automaticamente pelo site (NÃO subas ao Resend)

Estes são gerados pelo servidor a cada nova reserva. Os ficheiros aqui são apenas **previews visuais** com dados de exemplo, para tu veres como ficam.

| # | Ficheiro | Quando dispara | Vai para |
|---|----------|----------------|----------|
| 5 | [05-confirmacao-reserva-cliente.html](05-confirmacao-reserva-cliente.html) | Imediatamente após a reserva, **se o cliente forneceu email** | Cliente |
| 6 | [06-notificacao-reserva-restaurante.html](06-notificacao-reserva-restaurante.html) | Imediatamente após cada reserva | `latinagrill@icloud.com` |

Editar o visual destes templates → mexer em `app/api/reservations/route.ts` (e atualizar este preview para refletir).

## B. Broadcasts — campanhas sazonais (SUBIR ao Resend)

Estes são para tu disparares manualmente em datas específicas, via Resend → Broadcasts.

| # | Ficheiro | Quando enviar |
|---|----------|----------------|
| 1 | [01-dia-namorados.html](01-dia-namorados.html) | 3 semanas antes de 14 fev |
| 2 | [02-pascoa.html](02-pascoa.html) | 3 semanas antes do Domingo de Páscoa |
| 3 | [03-dia-mae.html](03-dia-mae.html) | 3 semanas antes do 1.º Domingo de Maio |
| 4 | [04-natal-reveillon.html](04-natal-reveillon.html) | 1.º de Novembro (reservas abertas) |

### Como subir um broadcast no Resend

1. **Painel Resend** → `Broadcasts` → `Templates` → `Create Template`
2. Modo `HTML` (não use o editor visual, use o **código fonte**)
3. Abre o ficheiro `.html`, copia tudo, cola no Resend
4. Antes de enviar, edita os pontos abaixo conforme a campanha

### O que editar antes de cada envio (broadcasts)

- **Preço** (ex: `95€`, `85€`, `150€`) — **valores atuais são placeholders, confirma antes de enviar**
  - `01-dia-namorados.html` — busca `95<span` (linha 51)
  - `04-natal-reveillon.html` — busca `85<span` (Consoada, linha 90) e `150<span` (Réveillon, linha 111)
- **Datas e horários** — atualizar ano se necessário
- **Imagem hero** — todas as URLs apontam para `https://latinagrill.pt/...` e usam fotos que já existem em `public/`. Para trocar, basta substituir o nome do ficheiro
- **CTA** aponta para `https://latinagrill.pt/#reservation` — mantém

### Variáveis dinâmicas Resend (broadcasts)

Apenas uma é usada:

- `{{{RESEND_UNSUBSCRIBE_URL}}}` — link de cancelamento de subscrição (obrigatório por lei e pela política do Resend para broadcasts)

## Compatibilidade (todos os templates)

- Outlook 2007+, Gmail (web/iOS/Android), Apple Mail, iCloud Mail, Yahoo
- Layout em tabelas (sem flexbox/grid) → renderiza igual em todos os clientes
- Largura máxima 600px, mobile-friendly
- Imagens com `width` explícito (Outlook exige)

## Boas práticas de envio (broadcasts)

- Envia entre **terça e quinta, 10h–11h** (PT) — abertura média 35–45%
- Lista limpa: remove bounces e quem não abriu nos últimos 6 envios
- Sem mais de 1 broadcast por semana — preserva engagement
- Subject curto (< 50 caracteres). Sugestões já no preview text de cada template
