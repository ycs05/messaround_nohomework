(function() {
    const html = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    const getPreferredTheme = () => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    const setTheme = (theme, animate = true) => {
        if (!animate) html.classList.add('theme-transitioning');
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        label.textContent = theme === 'dark' ? '暗黑模式' : '明亮模式';
        icon.classList.add('spin');
        setTimeout(() => icon.classList.remove('spin'), 400);
        if (!animate) {
            void html.offsetHeight;
            html.classList.remove('theme-transitioning');
        }
    };
    setTheme(getPreferredTheme(), false);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light', true);
        }
    });
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme') || 'light';
        setTheme(current === 'light' ? 'dark' : 'light', true);
    });
})();