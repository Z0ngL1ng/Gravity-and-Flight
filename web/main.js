/* Progressive enhancement: the complete English research narrative stays in HTML. */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));
  const dictionaries = window.GF_I18N || {};
  const research = window.GF_RESEARCH;
  // Every visit opens the public research narrative in English.
  let language = "en";
  const translate = (key) =>
    dictionaries[language]?.[key] || dictionaries.en?.[key] || "";
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function renderChart() {
    if (!research) return;
    const metric = $("#benchmark-select").value;
    const metricIndex = research.benchmarks.findIndex(
      (item) => item.id === metric,
    );
    const overall = metricIndex < 0;
    const models = (overall ? ["base", "stage1", "gf"] : ["base", "gf"]).map(
      (id) => research.models.find((model) => model.id === id),
    );
    const rows = models
      .filter(Boolean)
      .map((model) => {
        const value = overall ? model.overall : model.scores?.[metricIndex];
        if (!Number.isFinite(value)) return null;
        const row = element("div", "bar-row");
        const name =
          model.id === "base"
            ? "Qwen3.5-4B"
            : model.id === "stage1"
              ? "EoT-SFT"
              : "Gravity & Flight";
        const label = element("div", "bar-label", name);
        label.append(element("span", "", translate("chart." + model.id)));
        const track = element("div", "bar-track");
        const bar = element("span", "bar " + model.id);
        bar.style.width = `${value}%`;
        track.setAttribute("aria-hidden", "true");
        track.append(bar);
        row.append(label, track, element("strong", "", value.toFixed(2)));
        return row;
      })
      .filter(Boolean);
    const base = research.models.find((model) => model.id === "base");
    const gf = research.models.find((model) => model.id === "gf");
    const stage1 = research.models.find((model) => model.id === "stage1");
    const metricLabel = overall
      ? "Overall"
      : research.benchmarks[metricIndex].label;
    const gfScore = overall ? gf.overall : gf.scores[metricIndex];
    const baseScore = overall ? base.overall : base.scores[metricIndex];
    const [integer, fraction] = gfScore.toFixed(2).split(".");
    $("#selected-score").replaceChildren(
      document.createTextNode(integer),
      element("span", "", `.${fraction}`),
    );
    $("#score-context").textContent =
      `${translate("chart.context")} · ${metricLabel}`;
    $("#gain-base").textContent =
      `${gfScore >= baseScore ? "+" : ""}${(gfScore - baseScore).toFixed(2)}`;
    $("#gain-stage1").textContent =
      `+${(gf.overall - stage1.overall).toFixed(2)}`;
    $("#stage1-gain").hidden = !overall;
    $(".legend-stage1").hidden = !overall;
    $(".chart-top h3").textContent = overall
      ? translate("results.chartTitle")
      : `${translate("chart.metricTitle")} ${metricLabel}`;
    const chart = $("#benchmark-chart");
    chart.replaceChildren(...rows);
    chart.setAttribute(
      "aria-label",
      `${overall ? "Overall" : research.benchmarks[metricIndex].label}: ${models.map((model) => `${model.shortLabel} ${(overall ? model.overall : model.scores[metricIndex]).toFixed(2)}`).join(", ")}`,
    );
    $("#chart-note").textContent = translate(
      overall ? "results.chartNote" : "chart.metricNote",
    );
  }

  function renderAblations() {
    if (!research) return;
    const labels = {
      "without-flight": ["Without Flight", "移除 Flight"],
      "without-gravity": ["Without Gravity", "移除 Gravity"],
      "single-image": ["Single-image RL", "单图 RL"],
      "joint-input": ["Joint-input RL", "联合输入 RL"],
      gf: ["Full G&F", "完整 G&F"],
    };
    const rows = [
      "without-flight",
      "without-gravity",
      "single-image",
      "joint-input",
      "gf",
    ].map((id) => {
      const data = research.ablations.find((item) => item.id === id);
      const row = element("div", `mini-row${id === "gf" ? " ours" : ""}`);
      const track = element("div");
      const bar = element("i");
      bar.style.width = `${data.overall}%`;
      track.setAttribute("aria-hidden", "true");
      track.append(bar);
      row.append(
        element("span", "", labels[id][language === "zh" ? 1 : 0]),
        track,
        element("strong", "", data.overall.toFixed(2)),
        element(
          "span",
          "ablation-delta",
          id === "gf"
            ? translate("ablation.reference")
            : `−${(research.highlights.overall - data.overall).toFixed(2)}`,
        ),
      );
      return row;
    });
    $("#ablation-bars").replaceChildren(...rows);
  }

  function applyLanguage(next) {
    language = next;
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    $$("[data-i18n]").forEach((node) => {
      const value = translate(node.dataset.i18n);
      // Only repository-owned copy is allowed; no query/user input is rendered as HTML.
      if (value) node.innerHTML = value;
    });
    $$("[data-i18n-alt]").forEach((node) => {
      node.alt = translate(node.dataset.i18nAlt);
    });
    $$("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", translate(node.dataset.i18nAria));
    });
    document.title = translate("meta.title");
    $$('meta[name="description"], meta[property="og:description"]').forEach(
      (node) => {
        node.content = translate("meta.description");
      },
    );
    const toggle = $("#lang-toggle");
    toggle.textContent = next === "zh" ? "EN" : "中文";
    toggle.setAttribute(
      "aria-label",
      next === "zh" ? "EN — Switch to English" : "中文 — 切换到中文",
    );
    toggle.setAttribute("lang", next === "zh" ? "en" : "zh-CN");
    $("#benchmark-select").setAttribute(
      "aria-label",
      next === "zh" ? "选择评测项" : "Select evaluation metric",
    );
    $$(".desktop-nav, .mobile-nav, .chapter-nav").forEach((node) =>
      node.setAttribute(
        "aria-label",
        next === "zh" ? "页面章节" : "Page sections",
      ),
    );
    $(".reading-controls").setAttribute(
      "aria-label",
      next === "zh" ? "证据关系" : "Evidence relations",
    );
    $(".table-scroll").setAttribute(
      "aria-label",
      next === "zh"
        ? "港口评测结果，可横向滚动"
        : "Harbor results, scroll horizontally",
    );
    $("#copy-status").textContent = "";
    renderChart();
    renderAblations();
  }

  function setupMenu() {
    const button = $("#menu-toggle");
    const menu = $("#mobile-nav");
    button.hidden = false;
    const close = () => {
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    };
    button.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      button.setAttribute("aria-expanded", String(!menu.hidden));
    });
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) {
        close();
        button.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (!$("#topbar").contains(event.target)) close();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) close();
    });
  }

  function setupExample() {
    const controls = $(".reading-controls");
    const tabs = $$('[role="tab"]', controls);
    const panels = $$(".interpretation");
    const select = (tab, focus = false) => {
      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute(
          "aria-labelledby",
          panel.id.replace("panel-", "tab-"),
        );
        panel.tabIndex = 0;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (event) => {
        let next;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft")
          next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        select(tabs[next], true);
      });
    });
    select(tabs[0]);
    controls.hidden = false;
  }

  function setupScroll() {
    const links = $$(".desktop-nav a, .mobile-nav a, .chapter-nav a");
    const sections = $$(".chapter-nav a").map((link) =>
      $(link.getAttribute("href")),
    );
    let pending = false;
    function update() {
      pending = false;
      const header = $("#topbar").getBoundingClientRect().height;
      $("#topbar").classList.toggle("is-scrolled", window.scrollY > 24);
      const headerValue = `${header}px`;
      if (
        document.documentElement.style.getPropertyValue("--header-height") !==
        headerValue
      ) {
        document.documentElement.style.setProperty(
          "--header-height",
          headerValue,
        );
      }
      let current = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= header + 120)
          current = section.id;
      });
      if ($("#resources").getBoundingClientRect().top <= header + 120)
        current = "resources";
      links.forEach((link) => {
        if (
          link.getAttribute("href") === "#" + current ||
          (link.closest(".desktop-nav") &&
            ((current === "aero" && link.hash === "#method") ||
              (current === "analysis" && link.hash === "#results")))
        )
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      const total = document.documentElement.scrollHeight - window.innerHeight;
      $("#progress").style.transform =
        `scaleX(${Math.min(1, Math.max(0, window.scrollY / Math.max(1, total)))})`;
    }
    const request = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    if ("ResizeObserver" in window)
      new ResizeObserver(request).observe(document.body);
    update();
  }

  function setupCopy() {
    const button = $("#copy-link");
    button.hidden = false;
    button.addEventListener("click", async () => {
      button.disabled = true;
      try {
        if (!navigator.clipboard || !window.isSecureContext)
          throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(
          "https://github.com/Z0ngL1ng/Gravity-and-Flight",
        );
        $("#copy-status").textContent = translate("resources.copied");
      } catch {
        $("#copy-status").textContent = translate("resources.copyFailed");
      } finally {
        button.disabled = false;
      }
    });
  }

  function setupFigures() {
    const viewer = $("#figure-viewer");
    if (!viewer || typeof viewer.showModal !== "function") return;
    const image = $("#figure-viewer-image");
    const stage = $(".figure-viewer-stage", viewer);
    const zoom = $("#figure-zoom");
    let trigger;
    let previousOverflow = "";
    const resetZoom = () => {
      stage.classList.remove("is-zoomed");
      zoom.setAttribute("aria-pressed", "false");
      zoom.textContent = translate("figure.detail");
      stage.scrollTo(0, 0);
    };
    $$("[data-figure]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        trigger = link;
        const figure = link.closest("figure");
        const preview = $("img", figure);
        image.src = link.href;
        image.alt = preview.alt;
        image.width = Number(link.dataset.figureWidth);
        image.height = Number(link.dataset.figureHeight);
        image.style.setProperty("--figure-width", `${image.width}px`);
        $("#figure-viewer-title").textContent = $(
          "[data-figure-title]",
          figure,
        ).textContent;
        $("#figure-viewer-caption").textContent = $(
          ".paper-caption",
          figure,
        ).textContent;
        $("#figure-original").href = link.dataset.pdf;
        resetZoom();
        previousOverflow = document.body.style.overflow;
        viewer.showModal();
        document.body.style.overflow = "hidden";
      });
    });
    zoom.addEventListener("click", () => {
      const enlarged = stage.classList.toggle("is-zoomed");
      zoom.setAttribute("aria-pressed", String(enlarged));
      zoom.textContent = translate(enlarged ? "figure.fit" : "figure.detail");
      stage.scrollTo(0, 0);
    });
    $("#figure-close").addEventListener("click", () => viewer.close());
    viewer.addEventListener("click", (event) => {
      if (event.target === viewer) {
        const box = viewer.getBoundingClientRect();
        if (
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom
        )
          viewer.close();
      }
    });
    viewer.addEventListener("close", () => {
      document.body.style.overflow = previousOverflow;
      resetZoom();
      trigger?.focus({ preventScroll: true });
    });
  }

  function setupMotion() {
    // Content is visible by default; animation is never required to reveal it.
    if (!("IntersectionObserver" in window) || !Element.prototype.animate)
      return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet();
    const running = new Map();
    const targets = $$("[data-reveal]");
    const finish = (node) => {
      seen.add(node);
      running.get(node)?.cancel();
      running.delete(node);
    };
    let observer;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            observer.unobserve(target);
            if (seen.has(target)) return;
            seen.add(target);
            if (preference.matches || target.contains(document.activeElement))
              return;
            const animation = target.animate(
              [
                { opacity: 0.15, transform: "translateY(24px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 800,
                easing: "cubic-bezier(.16, 1, .3, 1)",
                fill: "none",
              },
            );
            running.set(target, animation);
            animation.onfinish = () => running.delete(target);
            animation.oncancel = () => running.delete(target);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -24px 0px" },
      );
      targets.forEach((node) => {
        if (node.getBoundingClientRect().top < window.innerHeight)
          seen.add(node);
        else observer.observe(node);
      });
    } catch {
      return;
    }
    document.addEventListener("focusin", (event) => {
      targets.forEach((node) => {
        if (node.contains(event.target)) finish(node);
      });
    });
    const cancelMotion = () => {
      if (preference.matches)
        running.forEach((animation, node) => finish(node));
    };
    preference.addEventListener?.("change", cancelMotion);
    window.addEventListener("beforeprint", () => {
      targets.forEach(finish);
      observer.disconnect();
    });
  }

  if (research) {
    const select = $("#benchmark-select");
    research.benchmarks.forEach(({ id, label }) => {
      const option = element("option", "", label);
      option.value = id;
      select.append(option);
    });
    select.disabled = false;
    select.addEventListener("change", renderChart);
  }
  if (dictionaries.en && dictionaries.zh) {
    applyLanguage(language);
    $("#lang-toggle").hidden = false;
    $("#lang-toggle").addEventListener("click", () =>
      applyLanguage(language === "en" ? "zh" : "en"),
    );
  } else {
    renderChart();
    renderAblations();
  }
  setupMenu();
  setupExample();
  setupScroll();
  setupCopy();
  setupFigures();
  setupMotion();
})();
