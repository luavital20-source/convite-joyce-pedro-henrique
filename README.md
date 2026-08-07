# Convite — Joyce & Pedro Henrique

Convite de casamento em página única, com lista de presentes. Pagamento no
**cartão** (e outros meios) via **InfinitePay Checkout Integrado**, e **Pix**
com código "copia e cola" gerado no próprio navegador.

```
index.html              -> o convite (inclui a lista de presentes)
obrigado.html           -> página de retorno após o pagamento
musica.mp3              -> trilha do convite
presentes/01..30.jpg    -> fotos das cotas (padronizadas 4:5)
api/_presentes.js       -> tabela OFICIAL de preços (usada pelo servidor)
api/criar-pagamento.js  -> cria o link de checkout no InfinitePay
api/webhook.js          -> recebe as notificações de pagamento
```

## Colocar no ar (Vercel)

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
   Sem build: site estático + funções em `api/` (Framework Preset: **Other**).
2. (Opcional) Em **Settings -> Environment Variables**, defina
   `INFINITEPAY_HANDLE = joyce_vitena_dos_santos`. Se não definir, o código já
   usa esse handle por padrão. **Nenhum token secreto é necessário.**
3. Deploy. Os botões **Cartão** já abrem o checkout da InfinitePay da Joyce.

## Como funciona

- **Cartão:** o navegador chama `POST /api/criar-pagamento` mandando só o `id`
  da cota. O servidor pega o preço oficial em `api/_presentes.js`, cria o link
  no InfinitePay (`api.checkout.infinitepay.io/links`) e devolve a URL do
  checkout. O convidado paga e volta para `obrigado.html`.
  > O preço nunca vai pelo navegador — assim ninguém troca pelo DevTools.
  > **Ao mudar um preço, altere nos DOIS lugares:** `api/_presentes.js` e a
  > lista `PRESENTES` do `index.html`.

- **Pix:** o botão **Pix** abre um modal com o código **copia e cola** (BR Code)
  já com a chave e o **valor da cota** embutidos. Gerado no navegador, sem
  servidor e sem taxa de gateway. Dados no `CONFIG` do `index.html`:
  `pixChave` (chave aleatória), `pixTitular`, `pixBanco`, `pixCidade`.
