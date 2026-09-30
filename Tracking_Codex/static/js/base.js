(() => {
    const storageKey = 'tradetrack-theme';
    const root = document.documentElement;
    let theme = 'dark';

    // Storage may be unavailable; the toggle still works for this page.
    try {
        if (localStorage.getItem(storageKey) === 'light') theme = 'light';
    } catch {}

    root.dataset.theme = theme;

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.site-nav__theme');
        if (!toggle) return;
        const icon = toggle.querySelector('svg');

        function updateToggle() {
            const label = theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
            toggle.setAttribute('aria-label', label);
            toggle.title = label;
            // Show the theme that clicking the button will activate.
            if (icon) icon.innerHTML = theme === 'dark'
                ? '<circle cx="12" cy="12" r="4" /><path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.93 4.93l1.42 1.42 M17.65 17.65l1.42 1.42 M4.93 19.07l1.42-1.42 M17.65 6.35l1.42-1.42" />'
                : '<path d="M20.5 13.2A8.5 8.5 0 0 1 10.8 3.5a8.5 8.5 0 1 0 9.7 9.7Z" />';
        }

        updateToggle();
        toggle.addEventListener('click', () => {
            root.dataset.themeMotion = 'ready';
            theme = theme === 'dark' ? 'light' : 'dark';
            root.dataset.theme = theme;
            updateToggle();
            try {
                localStorage.setItem(storageKey, theme);
            } catch {}
        });
    });
})();
