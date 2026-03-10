const TOTAL_WEEKS = 16;
const WEEK_TOPICS = [
  "Abertura e Primeiros Passos",
  "Navegação e Requisitos",
  "UX/UI e Prototipação",
  "Lógica Condicional e Modelagem de Dados",
  "Formulários e Validação",
  "CRUD Completo",
  "Listas Dinâmicas e Mapeamento de Telas",
  "Identidade Visual e Multimídia",
  "Segurança com Firestore Security Rules",
  "Integrações e APIs",
  "Notificações e Funcionalidades Avançadas",
  "Tratamento de Erros e Preparação para Publicação",
  "Privacidade, LGPD e Acessibilidade",
  "Build e Documentação Final",
  "Apresentação e Pitch",
  "Apresentação Final e Encerramento",
];
const WEEK_INFOGRAPHICS = [
  "infograficos/Semana01-Infografico-Abertura.png",
  "infograficos/Semana02-Infografico-Requisitos.png",
  "infograficos/Semana03-Infografico-Prototipagem.png",
  "infograficos/Semana04-Infografico-Modelagem.png",
  "infograficos/Semana05-Infografico-Dados.png",
  "infograficos/Semana06-Infografico-FlutterFlow_CRUD.png",
  "infograficos/Semana07-Infografico-Navegacao.png",
  "infograficos/Semana08-Infografico-IdentidadeVisual.png",
  "infograficos/Semana09-Infografico-FirestoreSecurity.png",
  "infograficos/Semana10-Infografico-IntegracaoAPI.png",
  "infograficos/Semana11-Infografico-Notificacoes.png",
  "infograficos/Semana12-Infografico-Erro.png",
  "infograficos/Semana13-Infografico-Privacidade.png",
  "infograficos/Semana14-Infografico-Build.png",
  "infograficos/Semana15-Infografico-Pitch.png",
  "infograficos/Semana16-Infografico-Encerramento.png",
];
const WEEK_PODCASTS = [
  "podcasts/Semana01-PodCast-Abertura.m4a",
  "podcasts/Semana02-PodCast-Requisitos.m4a",
  "podcasts/Semana03-Podcast-Prototipagem.m4a",
  "podcasts/Semana04-PodCast-Modelagem.m4a",
  "podcasts/Semana05-PodCast-Dados.m4a",
  "podcasts/Semana06-PodCast-FlutterFlow_CRUD.m4a",
  "podcasts/Semana07-PodCast-Navegacao.m4a",
  "podcasts/Semana08-PodCast-IdentidadeVisual.m4a",
  "podcasts/Semana09-PodCast-FirestoreSecurity.m4a",
  "podcasts/Semana10-PodCast-IntegracaoAPI.m4a",
  "podcasts/Semana11-PodCast-Notificacoes.m4a",
  "podcasts/Semana12-PodCast-Erro.m4a",
  "podcasts/Semana13-PosCast-Privacidade.m4a",
  "podcasts/Semana14-PodCast-Build.m4a",
  "podcasts/Semana15-PodCast-Pitch.m4a",
  "podcasts/Semana16-PodCast-Encerramento.m4a",
];
const WEEK_SLIDES = [
  "slides/Semana01-Slides-Abertura.pdf",
  "slides/Semana02-Slides-Requisitos.pdf",
  "slides/Semana03-Slides-Prototipagem.pdf",
  "slides/Semana04-Slides-Modelagem.pdf",
  "slides/Semana05-Slides-Dados.pdf",
  "slides/Semana06-Slides-FlutterFlow_CRUD.pdf",
  "slides/Semana07-Slides-Navegacao.pdf",
  "slides/Semana08-Slides-IdentidadeVisual.pdf",
  "slides/Semana09-Slides-FirestoreSecurity.pdf",
  "slides/Semana10-Slides-IntegracaoAPI.pdf",
  "slides/Semana11-Slides-Notificacoes.pdf",
  "slides/Semana12-Slides-Erro.pdf",
  "slides/Semana13-Slides-Privacidade.pdf",
  "slides/Semana14-Slides-Build.pdf",
  "slides/Semana15-Slides-Pitch.pdf",
  "slides/Semana16-Slides-Encerramento.pdf",
];
const WEEK_VIDEOS = [
  "videos/Semana01-Video-Abertura.mp4",
  "videos/Semana02-Video-Requisitos.mp4",
  "videos/Semana03-Video-Prototipagem.mp4",
  "videos/Semana04-Video-Modelagem.mp4",
  "videos/Semana05-Video-Dados.mp4",
  "videos/Semana06-Video-FlutterFlow_CRUD.mp4",
  "videos/Semana07-Video-Navegacao.mp4",
  "videos/Semana08-Video-IdentidadeVisual.mp4",
  "videos/Semana09-Video-FirestoreSecurity.mp4",
  "videos/Semana10-Video-IntegracaoAPI.mp4",
  "videos/Semana11-Video-Notificacoes.mp4",
  "videos/Semana12-Video-Erro.mp4",
  "videos/Semana13-Video-Privacidade.mp4",
  "videos/Semana14-Video-Build.mp4",
  "videos/Semana15-Video-Pitch.mp4",
  "videos/Semana16-Video-Encerramento.mp4",
];

function padWeek(num) {
  return String(num).padStart(2, "0");
}

function createWeekChapter(week) {
  const code = padWeek(week);
  const topic = WEEK_TOPICS[week - 1] || "Conteúdo da semana";
  const weekLabel = `${topic}`;
  const infographicPath = WEEK_INFOGRAPHICS[week - 1];
  const podcastPath = WEEK_PODCASTS[week - 1];
  const slidePath = WEEK_SLIDES[week - 1];
  const videoPath = WEEK_VIDEOS[week - 1];
  return {
    id: `cap-${week}`,
    title: weekLabel,
    fullTitle: `Sem ${week} — ${topic}`,
    contentUrl: `https://ravarmes.github.io/book-appcliks-integrador/OEBPS/text/sem${code}.html`,
    caseStudyUrl: `estudodecaso/sem${padWeek(week)}.html`,
    infographic: infographicPath
      ? `
      <h3>Infográfico</h3>
      <div class="infographic-container">
        <img class="infographic-img" src="${infographicPath}" alt="Infográfico - Sem ${week}: ${topic}" loading="lazy" />
      </div>
    `
      : "",
    podcast: podcastPath
      ? `
      <h3>Podcast</h3>
      <div class="podcast-container">
        <audio controls class="podcast-player">
          <source src="${podcastPath}" type="audio/mp4">
          Seu navegador não suporta o elemento de áudio. <a href="${podcastPath}" target="_blank" rel="noopener">Baixe o podcast</a>.
        </audio>
      </div>
    `
      : "",
    slides: slidePath
      ? `
      <h3>Slides</h3>
      <iframe class="slides-iframe" src="${slidePath}#toolbar=0&navpanes=0&view=FitH" width="100%" style="border:0;" loading="lazy"></iframe>
      <p class="note">Seu navegador não embute PDF. <a href="${slidePath}" target="_blank" rel="noopener">Abra/baixe o arquivo</a>.</p>
    `
      : "",
    video: videoPath
      ? `
      <h3>Vídeo</h3>
      <div class="video-container">
        <video controls class="video-player" preload="metadata">
          <source src="${videoPath}" type="video/mp4">
          Seu navegador não suporta o elemento de vídeo. <a href="${videoPath}" target="_blank" rel="noopener">Baixe o vídeo</a>.
        </video>
      </div>
    `
      : "",
  };
}

const chapters = Array.from({ length: TOTAL_WEEKS }, (_, index) => createWeekChapter(index + 1));

const layoutEl = document.getElementById("layout");
const sidebarEl = document.getElementById("sidebar");
const listEl = document.getElementById("chapter-list");
const contentEl = document.getElementById("content");
const titleEl = document.getElementById("chapter-title");
const menuBtn = document.getElementById("menu-btn");
const collapseBtn = document.getElementById("collapse-sidebar-btn");

function buildSidebar() {
  const frag = document.createDocumentFragment();
  chapters.forEach((ch) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${ch.id}`;
    a.className = "chapter-link";
    a.textContent = ch.title;
    a.setAttribute("data-id", ch.id);
    li.appendChild(a);
    frag.appendChild(li);
  });
  listEl.innerHTML = "";
  listEl.appendChild(frag);
}

function wireSlidesPanel(panelEl) {
  const iframes = Array.from(panelEl.querySelectorAll(".slides-iframe"));
  if (!iframes.length) return;

  iframes.forEach((iframe) => {
    const baseSrc = (iframe.getAttribute("src") || "").split("#")[0];
    const isGoogle = /-Google\.pdf$/i.test(baseSrc);
    const presBtn = document.createElement("button");
    presBtn.className = "present-btn";
    presBtn.textContent = isGoogle ? "Apresentação (Google)" : "Apresentação";
    panelEl.insertBefore(presBtn, iframe);

    let loaded = false;
    iframe.addEventListener("load", () => {
      loaded = true;
    });

    const setHeight = () => {
      iframe.style.height = Math.max(600, window.innerHeight - 180) + "px";
    };
    setHeight();
    window.addEventListener("resize", setHeight);

    presBtn.addEventListener("click", () => {
      const url = `${baseSrc}#page=1&view=FitH`;
      const win = window.open(url, "_blank");
      if (!win) {
        alert("Permita pop-ups para abrir a apresentação em nova aba.");
      } else {
        try {
          win.focus();
        } catch (e) {
        }
      }
    });

    setTimeout(() => {
      if (loaded) return;
      const warning = document.createElement("div");
      warning.className = "note";
      warning.textContent = "Não foi possível embutir os slides (bloqueado pelo domínio). Use o link abaixo.";
      const fallback = iframe.nextElementSibling;
      if (fallback && fallback.classList.contains("note")) {
        panelEl.insertBefore(warning, fallback);
      } else {
        panelEl.appendChild(warning);
      }
    }, 3000);
  });
}

function wireVideosPanel(panelEl) {
  const isFile = window.location.protocol === "file:";
  if (!isFile) return;

  panelEl.querySelectorAll(".youtube-iframe").forEach((iframe) => {
    iframe.style.display = "none";
  });
  panelEl.querySelectorAll(".youtube-link").forEach((link) => {
    link.innerHTML = `${link.innerHTML} <span>(para embutir, abra o site via http://)</span>`;
  });
}

function renderChapter(chapterId) {
  const chapter = chapters.find((c) => c.id === chapterId) || chapters[0];
  titleEl.textContent = chapter.fullTitle || chapter.title;

  document.querySelectorAll(".chapter-link").forEach((a) => {
    const isActive = a.getAttribute("data-id") === chapter.id;
    a.classList.toggle("active", isActive);
  });

  const tabs = [
    { key: "infographics", label: "Infográficos" },
    { key: "contents", label: "Conteúdos" },
    { key: "slides", label: "Slides" },
    { key: "podcasts", label: "Podcasts" },
    { key: "videos", label: "Vídeos" },
    { key: "casestudy", label: "Estudo de Caso" },
  ];

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  const fsBtn = document.createElement("button");
  fsBtn.textContent = "Tela cheia";
  fsBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      contentEl.requestFullscreen?.();
      fsBtn.textContent = "Sair da tela cheia";
    } else {
      document.exitFullscreen?.();
      fsBtn.textContent = "Tela cheia";
    }
  });
  toolbar.appendChild(fsBtn);

  const tabbar = document.createElement("div");
  tabbar.className = "tabbar";
  const panels = document.createElement("div");

  tabs.forEach(({ key, label }, idx) => {
    const t = document.createElement("button");
    t.className = "tab" + (idx === 0 ? " active" : "");
    t.setAttribute("data-key", key);
    t.textContent = label;
    tabbar.appendChild(t);

    const p = document.createElement("div");
    p.className = "panel" + (idx === 0 ? " active" : "");
    p.setAttribute("data-key", key);

    if (key === "infographics") {
      p.innerHTML = chapter.infographic || "<p>Sem infográfico disponível.</p>";
    } else if (key === "podcasts") {
      p.innerHTML = chapter.podcast || "<p>Sem podcast disponível.</p>";
    } else if (key === "videos") {
      p.innerHTML = chapter.video || "<p>Sem vídeo disponível.</p>";
      wireVideosPanel(p);
    } else if (key === "casestudy") {
      if (chapter.caseStudyUrl) {
        p.innerHTML = `
          <h3>Estudo de Caso</h3>
          <p class="open-practice"><a href="${chapter.caseStudyUrl}" target="_blank" rel="noopener">Abrir estudo de caso em nova aba</a></p>
          <iframe class="practice-iframe" src="${chapter.caseStudyUrl}" width="100%" style="border:0;" loading="lazy"></iframe>
        `;
        const iframe = p.querySelector(".practice-iframe");
        const setHeight = () => {
          iframe.style.height = Math.max(700, window.innerHeight - 180) + "px";
        };
        setHeight();
        window.addEventListener("resize", setHeight);
      } else {
        p.innerHTML = "<h3>Estudo de Caso</h3><p>Estudo de caso será adicionado em breve.</p>";
      }
    } else if (key === "contents") {
      if (chapter.contentUrl) {
        p.innerHTML = `
          <h3>Conteúdos</h3>
          <iframe class="content-iframe" src="${chapter.contentUrl}" width="100%" style="border:0;" loading="lazy"></iframe>
        `;
        const iframe = p.querySelector(".content-iframe");
        const setHeight = () => {
          iframe.style.height = Math.max(700, window.innerHeight - 180) + "px";
        };
        setHeight();
        window.addEventListener("resize", setHeight);
      } else {
        p.innerHTML = "<h3>Conteúdos</h3><p>Sem conteúdos por enquanto.</p>";
      }
    } else if (key === "slides") {
      p.innerHTML = chapter.slides || "<p>Sem slides disponíveis.</p>";
      wireSlidesPanel(p);
    }

    panels.appendChild(p);
  });

  contentEl.innerHTML = "";
  contentEl.appendChild(toolbar);
  contentEl.appendChild(tabbar);
  contentEl.appendChild(panels);

  tabbar.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".tab");
    if (!btn) return;
    const key = btn.getAttribute("data-key");
    tabbar.querySelectorAll(".tab").forEach((b) => b.classList.toggle("active", b === btn));
    panels.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.getAttribute("data-key") === key));
  });

  if (window.innerWidth <= 960) {
    sidebarEl.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
}

function parseHash() {
  const hash = window.location.hash.replace("#", "");
  const chapterId = hash || (chapters[0] && chapters[0].id);
  return { chapterId };
}

function renderFromHash() {
  const { chapterId } = parseHash();
  renderChapter(chapterId);
}

window.addEventListener("hashchange", renderFromHash);
menuBtn.addEventListener("click", () => {
  const isOpen = sidebarEl.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});
collapseBtn.addEventListener("click", () => {
  const collapsed = layoutEl.classList.toggle("collapsed");
  collapseBtn.textContent = collapsed ? "Mostrar barra" : "Esconder barra";
  collapseBtn.setAttribute("aria-expanded", String(!collapsed));
});

document.addEventListener("fullscreenchange", () => {
  const isTarget = document.fullscreenElement === contentEl;
  contentEl.style.height = isTarget ? "100vh" : "";
  contentEl.style.overflow = isTarget ? "auto" : "";
});

function createLightbox() {
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fechar">&times;</button>
    <img class="lightbox-img" src="" alt="" />
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector(".lightbox-img");
  const closeBtn = overlay.querySelector(".lightbox-close");

  function open(src, alt) {
    img.src = src;
    img.alt = alt || "";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) close();
  });

  return { open, close };
}

const lightbox = createLightbox();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("infographic-img") || e.target.classList.contains("zoomable-img")) {
    lightbox.open(e.target.src, e.target.alt);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  buildSidebar();
  renderFromHash();
});
