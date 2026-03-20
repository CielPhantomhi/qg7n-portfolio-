const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

function openLightbox(card) {
  document.getElementById('lbTitle').textContent = card.dataset.title;
  document.getElementById('lbDesc').textContent = card.dataset.desc;
  const img = card.querySelector('img');
  const video = card.querySelector('video');
  const media = document.getElementById('lbMedia');
  if (video) {
    media.innerHTML = '';
    const v = document.createElement('video');
    v.src = video.src; v.controls = false; v.autoplay = true; v.muted = true;
    media.appendChild(v);
  } else if (img) {
    media.innerHTML = '';
    const i = document.createElement('img');
    i.src = img.src; i.alt = card.dataset.title;
    media.appendChild(i);
  } else {
    media.innerHTML = '<span class="lb-ph">Add your image to this project</span>';
  }
  document.getElementById('lightbox').classList.add('open');
}

document.addEventListener('click', e => {
  const card = e.target.closest('.work-card');
  if (card) openLightbox(card);
});

document.getElementById('lbClose').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('open');
});

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('open');
});

function handleForm(e) {
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const discord = document.getElementById('fdiscord').value;
  const type = document.getElementById('ftype').value;
  const msg = document.getElementById('fmsg').value;
  const body = `Name: ${name}\nDiscord: ${discord}\nService: ${type}\n\n${msg}`;
  window.location.href = `mailto:qg7n_development@email.com?subject=Portfolio enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
  const m = document.getElementById('form-msg');
  m.style.opacity = '1';
  setTimeout(() => m.style.opacity = '0', 4000);
}
