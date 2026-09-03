/* MOVIFLEX — script commun site vitrine (site public uniquement).
   N'a AUCUN lien avec l'application PWA (/app) : gère uniquement le
   menu mobile, l'accordéon FAQ, et l'effet de header au scroll. */

function toggleMenu() {
  var m = document.getElementById('mobileMenu'), btn = document.querySelector('.menu-toggle');
  var isOpen = m.classList.toggle('open');
  if (btn) { btn.classList.toggle('open', isOpen); btn.setAttribute('aria-expanded', isOpen); }
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  var m = document.getElementById('mobileMenu');
  if (m) m.classList.remove('open');
  var btn = document.querySelector('.menu-toggle');
  if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  document.body.style.overflow = '';
}

function openModal(id) {
  var m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
  var m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

function toggleFaq(el) {
  var item = el.parentElement, isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function (i) {
    i.classList.remove('open');
    var q = i.querySelector('.faq-question');
    if (q) q.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) { item.classList.add('open'); el.setAttribute('aria-expanded', 'true'); }
}

document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(q); }
    });
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
});
