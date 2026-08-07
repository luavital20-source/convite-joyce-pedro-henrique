/**
 * POST /api/webhook
 *
 * Recebe as notificações do InfinitePay (pagamento aprovado etc.).
 * Responde 200 rápido e registra em log (Vercel -> Logs).
 *
 * Obs.: a validação de assinatura do InfinitePay não está implementada aqui.
 * Os pagamentos também aparecem no app/painel da InfinitePay da Joyce.
 */

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  let corpo = req.body;
  if (typeof corpo === 'string') {
    try { corpo = JSON.parse(corpo); } catch { corpo = {}; }
  }
  corpo = corpo || {};

  // Responde já: qualquer trabalho extra não pode atrasar o 200.
  res.status(200).json({ recebido: true });

  try {
    console.log('[webhook] InfinitePay', JSON.stringify(corpo).slice(0, 2000));
  } catch (e) {}
};
