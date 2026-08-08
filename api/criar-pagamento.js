/**
 * POST /api/criar-pagamento
 *
 * Cria um link de Checkout Integrado no InfinitePay e devolve a URL para o
 * navegador redirecionar. O pagamento (cartão em até 12x, Pix, etc.) cai na
 * conta da Joyce, identificada pela InfiniteTag — sem token secreto.
 *
 * Entrada : { "id": 12 }
 * Saída   : { "url": "https://checkout.infinitepay.com.br/..." }
 *
 * Config opcional (Vercel -> Settings -> Environment Variables):
 *   INFINITEPAY_HANDLE = joyce_vitena_dos_santos   (sem o "$")
 *   Se ausente, usa o handle padrao abaixo.
 *
 * Docs: Central de Ajuda InfinitePay -> "Checkout Integrado".
 *   POST https://api.checkout.infinitepay.io/links
 *   body: { handle, order_nsu, redirect_url, webhook_url,
 *           items:[{ quantity, price, description }] }   // price em CENTAVOS
 *   resposta: { url }
 */

const { buscarPresente } = require('./_presentes.js');

const IP_API = 'https://api.checkout.infinitepay.io/links';
const HANDLE_PADRAO = 'joyce_vitena_dos_santos';

function origemDe(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${host}`;
}

// O InfinitePay só aceita ASCII na descrição — acentos e travessão (—) dão 400.
function soAscii(s) {
  return String(s)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')  // remove acentos
    .replace(/[–—]/g, '-')                    // en/em-dash -> hifen
    .replace(/[^\x20-\x7E]/g, '')                       // descarta qualquer outro nao-ASCII
    .trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  let corpo = req.body;
  if (typeof corpo === 'string') {
    try { corpo = JSON.parse(corpo); } catch { corpo = {}; }
  }

  const presente = buscarPresente(corpo && corpo.id);
  if (!presente) {
    return res.status(400).json({ erro: 'Presente não encontrado.' });
  }

  const origem = origemDe(req);
  const handle = process.env.INFINITEPAY_HANDLE || HANDLE_PADRAO;

  const payload = {
    handle,
    // order_nsu precisa ser numérico (só dígitos) — id da cota + timestamp
    order_nsu: `${presente.id}${Date.now()}`,
    redirect_url: `${origem}/obrigado.html`,
    webhook_url: `${origem}/api/webhook`,
    items: [
      {
        quantity: 1,
        // preço oficial, vindo do servidor, convertido para centavos
        price: Math.round(Number(presente.valor) * 100),
        // descrição em ASCII (InfinitePay rejeita acentos e travessão)
        description: soAscii(`${presente.nome} - Casamento Joyce Vitena e Pedro Henrique`),
      },
    ],
  };

  try {
    const resposta = await fetch(IP_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok || !dados.url) {
      console.error('[pagamento] InfinitePay recusou:', resposta.status, dados);
      return res.status(502).json({ erro: 'Não foi possível abrir o pagamento agora.' });
    }

    return res.status(200).json({ url: dados.url });
  } catch (err) {
    console.error('[pagamento] Falha ao chamar o InfinitePay:', err);
    return res.status(502).json({ erro: 'Não foi possível abrir o pagamento agora.' });
  }
};
