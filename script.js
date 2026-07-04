const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('active'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('active')));
}

function formatarData(data) {
  if (!data) return '';
  const partes = data.split('-');
  if (partes.length !== 3) return data;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function escaparHTML(texto) {
  return String(texto || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function markdownSimples(texto) {
  const seguro = escaparHTML(texto || '');
  return seguro
    .split(/\n{2,}/)
    .map(bloco => {
      const b = bloco.trim();
      if (!b) return '';
      if (b.startsWith('### ')) return `<h3>${b.slice(4)}</h3>`;
      if (b.startsWith('## ')) return `<h2>${b.slice(3)}</h2>`;
      if (b.startsWith('# ')) return `<h1>${b.slice(2)}</h1>`;
      return `<p>${b.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

async function obterArtigos() {
  const resposta = await fetch('content/artigos.json', { cache: 'no-store' });
  if (!resposta.ok) throw new Error('Não foi possível carregar os artigos.');
  const dados = await resposta.json();
  return (dados.artigos || []).sort((a, b) => String(b.data || '').localeCompare(String(a.data || '')));
}

async function carregarArtigos(elementId, todos = false) {
  const container = document.getElementById(elementId);
  if (!container) return;
  try {
    const artigos = await obterArtigos();
    const lista = todos ? artigos : artigos.slice(0, 3);
    container.innerHTML = lista.map(artigo => `
      <article>
        <span class="article-meta">${escaparHTML(artigo.categoria)} • ${formatarData(artigo.data)}</span>
        <h3>${escaparHTML(artigo.titulo)}</h3>
        <p>${escaparHTML(artigo.resumo)}</p>
        <a class="read-more" href="artigo.html?slug=${encodeURIComponent(artigo.slug)}">Ler publicação</a>
      </article>
    `).join('');
  } catch (erro) {
    container.innerHTML = '<p>As publicações não puderam ser carregadas no momento.</p>';
  }
}

async function carregarArtigoDetalhe(elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  try {
    const artigos = await obterArtigos();
    const artigo = artigos.find(item => item.slug === slug) || artigos[0];
    if (!artigo) throw new Error('Artigo não encontrado.');
    document.title = `${artigo.titulo} | Rosivan Bezerra Advocacia`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', artigo.resumo || 'Conteúdo jurídico de Rosivan Bezerra Advocacia.');
    container.innerHTML = `
      <p class="eyebrow">${escaparHTML(artigo.categoria)}</p>
      <h1>${escaparHTML(artigo.titulo)}</h1>
      <p class="article-date">Publicado em ${formatarData(artigo.data)}</p>
      <div class="article-body">${markdownSimples(artigo.conteudo)}</div>
      <div class="article-back"><a class="btn primary" href="artigos.html">Voltar aos artigos</a></div>
    `;
  } catch (erro) {
    container.innerHTML = '<h1>Publicação não encontrada.</h1><p>Volte para a página de artigos e tente novamente.</p><a class="btn primary" href="artigos.html">Ver artigos</a>';
  }
}
