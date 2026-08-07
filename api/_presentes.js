/**
 * Tabela OFICIAL de presentes (fonte de verdade dos preços).
 *
 * O valor cobrado no cartão vem SEMPRE daqui — nunca do navegador.
 * Isso impede que alguém altere o preço pelo DevTools e pague R$ 1
 * por uma cota de R$ 2.300.
 *
 * Ao alterar um preço, altere também na lista PRESENTES do index.html
 * (aquela é só para exibição).
 */

const PRESENTES = [
  { id: 1, nome: 'Conjunto de Panelas 10 Peças Tramontina', valor: 320, foto: 'presentes/01.jpg' },
  { id: 2, nome: 'Jogo de Taças de Vinho — 4 Peças', valor: 180, foto: 'presentes/02.jpg' },
  { id: 3, nome: 'Jogo para Churrasco — 3 Peças', valor: 175, foto: 'presentes/03.jpg' },
  { id: 4, nome: '2 Cobertores Queen (Toque Aveludado)', valor: 120, foto: 'presentes/04.jpg' },
  { id: 5, nome: 'Geladeira pra aposentar a velha guerreira', valor: 1950, foto: 'presentes/05.jpg' },
  { id: 6, nome: 'Aparelho de Jantar', valor: 190, foto: 'presentes/06.jpg' },
  { id: 7, nome: '2 controles de videogame pra não ter briga', valor: 350, foto: 'presentes/07.jpg' },
  { id: 8, nome: 'Ajuda para a aposentadoria dos noivos', valor: 1200, foto: 'presentes/08.jpg' },
  { id: 9, nome: 'Tampão de ouvido pra noiva (enquanto o noivo ronca)', valor: 120, foto: 'presentes/09.jpg' },
  { id: 10, nome: 'Taxa pra noiva não jogar o buquê pra sua namorada', valor: 150, foto: 'presentes/10.jpg' },
  { id: 11, nome: 'Apoio psicológico pro casal comer mais saudável', valor: 150, foto: 'presentes/11.jpg' },
  { id: 12, nome: 'Pra não dizer que não dei nada', valor: 90, foto: 'presentes/12.jpg' },
  { id: 13, nome: 'Ajuda para a lua de mel', valor: 225, foto: 'presentes/13.jpg' },
  { id: 14, nome: 'Taxa para dar pitacos', valor: 730, foto: 'presentes/14.jpg' },
  { id: 15, nome: 'Deus tocou no meu coração', valor: 110, foto: 'presentes/15.jpg' },
  { id: 16, nome: 'Psicólogo pros noivos não surtarem nos preparativos', valor: 250, foto: 'presentes/16.jpg' },
  { id: 17, nome: 'Cota Especial Padrinhos Favoritos', valor: 850, foto: 'presentes/17.jpg' },
  { id: 18, nome: 'Jogo de Cama Queen', valor: 165, foto: 'presentes/18.jpg' },
  { id: 19, nome: 'Cortina Blackout em Linho', valor: 110, foto: 'presentes/19.jpg' },
  { id: 20, nome: 'Nosso primeiro ar-condicionado', valor: 1750, foto: 'presentes/20.jpg' },
  { id: 21, nome: 'Batedeira', valor: 90, foto: 'presentes/21.jpg' },
  { id: 22, nome: 'Frigideira Antiaderente', valor: 120, foto: 'presentes/22.jpg' },
  { id: 23, nome: 'Ferro de Passar Roupa', valor: 88, foto: 'presentes/23.jpg' },
  { id: 24, nome: 'Jogo de Tapete', valor: 55, foto: 'presentes/24.jpg' },
  { id: 25, nome: 'Jogo Americano (mesa posta)', valor: 60, foto: 'presentes/25.jpg' },
  { id: 26, nome: 'Cafeteira em Cápsula', valor: 440, foto: 'presentes/26.jpg' },
  { id: 27, nome: 'Vale-Presente', valor: 70, foto: 'presentes/27.jpg' },
  { id: 28, nome: 'Vale-Presente', valor: 140, foto: 'presentes/28.jpg' },
  { id: 29, nome: 'Vale-Presente', valor: 180, foto: 'presentes/29.jpg' },
  { id: 30, nome: 'Vale-Presente', valor: 100, foto: 'presentes/30.jpg' },
];

function buscarPresente(id) {
  const n = Number(id);
  if (!Number.isInteger(n)) return null;
  return PRESENTES.find((p) => p.id === n) || null;
}

module.exports = { PRESENTES, buscarPresente };
