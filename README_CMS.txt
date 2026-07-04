ROSIVAN BEZERRA ADVOCACIA - SITE COM PAINEL DE ARTIGOS

Esta versão inclui:
- Site institucional atualizado;
- Página /artigos.html para listar publicações;
- Página /artigo.html para leitura individual;
- Pasta /admin com Decap CMS para painel administrativo;
- Arquivo content/artigos.json, onde os artigos ficam armazenados.

ATENÇÃO IMPORTANTE:
Para o painel /admin funcionar publicando diretamente pelo navegador, o projeto precisa estar conectado a um repositório GitHub/GitLab e usar Netlify Identity + Git Gateway.
O deploy feito apenas por Netlify Drop não permite que o painel salve alterações, porque não há repositório onde gravar os artigos.

PASSOS NA NETLIFY:
1. Subir esta versão do site normalmente para testar.
2. Criar um repositório GitHub com estes arquivos.
3. Na Netlify, conectar o site ao repositório.
4. Em Site configuration > Identity, habilitar Identity.
5. Em Identity > Services, habilitar Git Gateway.
6. Convidar seu e-mail como usuário.
7. Acessar: https://bezerraesilvaadvocacia.adv.br/admin
8. Fazer login e publicar artigos.

COMO O ARTIGO APARECE:
O painel edita o arquivo content/artigos.json.
A página artigos.html lê esse arquivo e mostra as publicações automaticamente.

CONTATO CONFIGURADO:
WhatsApp: (84) 98816-1000
E-mail: rosivanbezerra@bezerraesilvaadvocacia.adv.br
OAB/RN nº 16.941
