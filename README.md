# NESIAK — site institucional

Site institucional da **NESIAK** (Engenharia • Inspeção • Serviço), publicado em https://nesiak.com.br via GitHub Pages.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Página única do site (HTML + CSS) |
| `assets/js/main.js` | Menu, animações de rolagem, abas de inspeção, formulário e WhatsApp |
| `assets/img/` | Favicon, ícones do app e imagem de compartilhamento (og-image) |
| `404.html` | Página de erro personalizada |
| `robots.txt` / `sitemap.xml` | Indexação no Google |
| `CNAME` | Domínio próprio `nesiak.com.br` |
| `.well-known/security.txt` | Contato para relatos de segurança |
| `.nojekyll` | Publica os arquivos como estão (inclui a pasta `.well-known`) |

## Ativar o WhatsApp

Em `assets/js/main.js`, preencha o número com DDI e DDD, só dígitos:

```js
const WHATSAPP = "5571999999999";
```

O botão flutuante e o contato na seção final aparecem automaticamente.

## Segurança

- Content-Security-Policy no `<meta>`: só carrega scripts do próprio site e fontes do Google Fonts.
- Nenhum script inline, nenhuma dependência de terceiros além das fontes.
- HTTPS obrigatório (ativar **Enforce HTTPS** em *Settings > Pages*).

## DNS (no registrador do domínio)

Registros **A** para `nesiak.com.br`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Registro **CNAME** para `www` apontando para `<usuario>.github.io`.
