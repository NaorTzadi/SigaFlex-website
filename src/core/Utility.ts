/**
 * General helpers that more than one class needs. No state, no side effects
 * beyond what the caller asks for.
 */

/** Joins class names, dropping anything falsy. */
export function cx(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(" ");
}

/** Honours the reader's OS-level motion setting. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scrolls to a home-page section and moves keyboard focus there, so the jump
 * works for a screen reader and not only for the eye.
 */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start"
  });

  const hadTabIndex = target.hasAttribute("tabindex");
  if (!hadTabIndex) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
}

export function revealOnScroll(): () => void {
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const show = (element: HTMLElement) => element.setAttribute("data-reveal", "shown");

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach(show);
    return () => {};
  }

  document.documentElement.classList.add("has-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -5% 0px", threshold: 0 }
  );

  targets.forEach((target) => observer.observe(target));

  return () => {
    observer.disconnect();
    document.documentElement.classList.remove("has-reveal");
    targets.forEach(show);
  };
}

/**
 * A deliberately loose address check: something, an @, something with a dot.
 * Anything stricter rejects valid addresses. The server decides for real.
 */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
