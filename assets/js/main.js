"use strict";
/* Para ativar o WhatsApp, coloque o número com DDI e DDD, só dígitos. Ex.: "5571999999999" */
const WHATSAPP = "";
const EMAIL = "engenharia@nesiak.com.br";

const LANG = (document.documentElement.lang || "pt").slice(0, 2);
const I18N = {
  pt: { wa: "Olá, NESIAK! Vim pelo site e gostaria de um orçamento.", subject: "Orçamento pelo site - ",
        labels: ["Nome", "Empresa", "E-mail", "Telefone", "Assunto"] },
  en: { wa: "Hello, NESIAK! I found you through your website and would like a quote.", subject: "Quote request from website - ",
        labels: ["Name", "Company", "Email", "Phone", "Subject"] },
  es: { wa: "¡Hola, NESIAK! Llegué por el sitio web y me gustaría un presupuesto.", subject: "Presupuesto desde el sitio - ",
        labels: ["Nombre", "Empresa", "Correo", "Teléfono", "Asunto"] }
}[LANG] || null;

document.getElementById('y').textContent = new Date().getFullYear();
const header = document.querySelector('header');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 30);
addEventListener('scroll', onScroll, {passive:true}); onScroll();

// menu mobile
const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  burger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.menu a').forEach(a => a.addEventListener('click', () => {
  document.body.classList.remove('nav-open'); burger.setAttribute('aria-expanded', false);
}));

// animações de entrada
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold:.15, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal, #steps').forEach(el => io.observe(el));

// link ativo no menu
const links = [...document.querySelectorAll('.menu a[href^="#"]')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
}), {rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// abas de inspeção
const tabs = [...document.querySelectorAll('.tab')];
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => { x.setAttribute('aria-selected', x === t); const p = document.getElementById(x.getAttribute('aria-controls')); p.hidden = x !== t; p.classList.remove('show'); });
  const p = document.getElementById(t.getAttribute('aria-controls')); void p.offsetWidth; p.classList.add('show');
}));

// WhatsApp (só aparece com número configurado)
if (WHATSAPP) {
  const url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(I18N.wa);
  document.querySelectorAll('.wa-float, .wa-link').forEach(a => { a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.hidden = false; });
  document.querySelector('.wa-float').style.display = 'grid';
  document.querySelector('.wa-num').textContent = '+' + WHATSAPP.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '$1 ($2) $3-$4');
}

// formulário -> e-mail
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  if (!f.reportValidity()) return;
  const d = Object.fromEntries(new FormData(f));
  const [lN, lE, lM, lT, lA] = I18N.labels;
  const body = `${lN}: ${d.nome}\n${lE}: ${d.empresa || '-'}\n${lM}: ${d.email}\n${lT}: ${d.telefone || '-'}\n${lA}: ${d.assunto}\n\n${d.mensagem}`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(I18N.subject + d.assunto)}&body=${encodeURIComponent(body)}`;
});

// seletor de idioma
const langs = [...document.querySelectorAll('.lang')];
const closeLangs = except => langs.forEach(l => { if (l !== except) { l.querySelector('.lang-menu').hidden = true; l.querySelector('.lang-btn').setAttribute('aria-expanded', 'false'); } });
langs.forEach(l => {
  const btn = l.querySelector('.lang-btn'), menu = l.querySelector('.lang-menu');
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = menu.hidden;
    closeLangs(l);
    menu.hidden = !open; btn.setAttribute('aria-expanded', String(open));
  });
  // mantém a seção atual ao trocar de idioma
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (location.hash) a.href = a.getAttribute('href') + location.hash;
  }));
});
document.addEventListener('click', e => { if (!e.target.closest('.lang')) closeLangs(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLangs(); });
