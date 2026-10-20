"use strict";
/* Para ativar o WhatsApp, coloque o número com DDI e DDD, só dígitos. Ex.: "5571999999999" */
const WHATSAPP = "";
const EMAIL = "engenharia@nesiak.com.br";

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
  const url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá, NESIAK! Vim pelo site e gostaria de um orçamento.');
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
  const body = `Nome: ${d.nome}\nEmpresa: ${d.empresa || '-'}\nE-mail: ${d.email}\nTelefone: ${d.telefone || '-'}\nAssunto: ${d.assunto}\n\n${d.mensagem}`;
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Orçamento pelo site - ' + d.assunto)}&body=${encodeURIComponent(body)}`;
});
