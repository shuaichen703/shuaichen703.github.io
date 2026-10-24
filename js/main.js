document.addEventListener('DOMContentLoaded', () => {
    const fullData = window.portfolioData;
    const savedLang = localStorage.getItem('portfolio_lang');
    let currentLang = ['zh', 'en'].includes(savedLang) ? savedLang : 'zh';
    const langToggle = document.getElementById('lang-toggle');
    const navToggle = document.getElementById('nav-toggle');
    const navPanel = document.getElementById('nav-panel');
    const icon = name => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
    const externalLink = (url, iconName, label) => url && url !== '#'
        ? `<a class="publication-link" href="${url}" target="_blank" rel="noopener noreferrer">${icon(iconName)}<span>${label}</span></a>`
        : '';

    const renderAuthors = (item, i18n) => {
        const names = item.authors.replace(/\s*&\s*/g, ', ').split(',').map(name => name.trim()).filter(Boolean);
        return names.map((name, index) => {
            let marked = /^(Shuai Chen|Shawn Chen|陈帅)$/.test(name) ? `<strong>${name}</strong>` : name;
            if (item.equalContribution && index < item.equalContribution) {
                marked += `<sup class="author-mark" title="${i18n.legend_equal}">†</sup>`;
            }
            if (index === names.length - 1) {
                marked += `<sup class="author-mark" title="${i18n.legend_corresponding}">✉</sup>`;
            }
            return marked;
        }).join(', ');
    };

    const renderRecord = (item, type) => {
        const organization = type === 'education' ? item.institution : item.company;
        const role = type === 'education' ? item.degree : item.role;
        const location = item.location
            ? `<span class="record-location">${icon('location')}${item.location}</span>` : '';
        const description = item.description ? `<p class="record-description">${item.description}</p>` : '';
        const tags = item.tags?.length
            ? `<div class="record-tags">${item.tags.map(tag => `<span class="record-tag">${tag}</span>`).join('')}</div>` : '';
        return `
            <article class="record-item">
                <time class="record-date">${item.year}</time>
                <div class="record-main">
                    <div class="record-logo"><img src="${item.logo}" alt="${organization} logo" loading="lazy"></div>
                    <div class="record-content">
                        <div class="record-heading"><h3>${organization}</h3>${location}</div>
                        <p class="record-role">${role}</p>
                        ${description}${tags}
                    </div>
                </div>
            </article>`;
    };

    const renderSocials = (personal, containerId, className) => {
        const socials = [
            { key: 'email', label: 'Email', icon: 'mail', prefix: 'mailto:' },
            { key: 'github', label: 'GitHub', icon: 'github', prefix: '' },
            { key: 'googleScholar', label: 'Google Scholar', icon: 'scholar', prefix: '' }
        ];
        document.getElementById(containerId).innerHTML = socials.filter(social => personal[social.key]).map(social => {
            const external = social.prefix ? '' : 'target="_blank" rel="noopener noreferrer"';
            return `<a class="${className}" href="${social.prefix}${personal[social.key]}" ${external} aria-label="${social.label}" title="${social.label}">${icon(social.icon)}</a>`;
        }).join('');
    };

    function renderPage(lang) {
        const data = fullData[lang];
        const i18n = fullData.i18n[lang];
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.title = `${data.personal.name} | AIGC Researcher`;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const value = i18n[element.dataset.i18n];
            if (value) element.textContent = value;
        });

        document.getElementById('lang-label').textContent = lang === 'zh' ? 'EN' : '中';
        langToggle.setAttribute('aria-label', i18n.language_toggle);
        document.getElementById('nav-name').textContent = data.personal.name;
        document.getElementById('hero-name').textContent = data.personal.name;
        document.getElementById('hero-title').textContent = data.personal.title;
        document.getElementById('hero-bio').textContent = data.personal.bio;
        document.getElementById('footer-name').textContent = data.personal.name;
        document.getElementById('footer-copyright-name').textContent = data.personal.name;
        const avatar = document.getElementById('hero-avatar');
        avatar.src = data.personal.avatar;
        avatar.alt = `${data.personal.name} — ${data.personal.title}`;

        document.getElementById('stat-publications').textContent = String(data.publications.length).padStart(2, '0');
        document.getElementById('stat-experience').textContent = String(data.experience.length).padStart(2, '0');
        document.getElementById('stat-awards').textContent = String(data.awards.length).padStart(2, '0');
        renderSocials(data.personal, 'hero-social', 'social-link');
        renderSocials(data.personal, 'footer-social', 'footer-social-link');
        document.getElementById('education-list').innerHTML = data.education.map(item => renderRecord(item, 'education')).join('');
        document.getElementById('experience-list').innerHTML = data.experience.map(item => renderRecord(item, 'experience')).join('');

        document.getElementById('publications-list').innerHTML = data.publications.map((item, index) => {
            const review = item.status === 'under_review';
            const status = review ? 'review' : 'accepted';
            const statusText = review ? i18n.badge_under_review : i18n.badge_accepted;
            return `
                <article class="publication-item">
                    <span class="publication-number">${String(index + 1).padStart(2, '0')}</span>
                    <div>
                        <h3 class="publication-title">${item.title}</h3>
                        <p class="publication-authors">${renderAuthors(item, i18n)}</p>
                        <div class="publication-meta">
                            <span class="publication-venue">${icon('bookmark')}${item.venue}</span>
                            <span class="status-badge status-${status}">${icon(review ? 'hourglass' : 'check')}${statusText}</span>
                            <div class="publication-links">
                                ${externalLink(item.link, 'arrow-up-right', i18n.btn_link)}
                                ${externalLink(item.pdf, 'file', i18n.btn_pdf)}
                                ${externalLink(item.code, 'code', i18n.btn_code)}
                            </div>
                        </div>
                    </div>
                </article>`;
        }).join('') + `
            <p class="publication-legend">
                <span><sup class="author-mark">†</sup> ${i18n.legend_equal}</span>
                <span><sup class="author-mark">✉</sup> ${i18n.legend_corresponding}</span>
            </p>`;

        document.getElementById('awards-list').innerHTML = data.awards.map((item, index) => `
            <article class="award-item">
                <div class="award-topline"><span>${String(index + 1).padStart(2, '0')}</span><time class="award-year">${item.year}</time></div>
                <h3>${item.title}</h3>
                <p class="award-organization">${item.organization}</p>
                <p class="award-description">${item.description || ''}</p>
            </article>`).join('');
    }

    function setNavOpen(open) {
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', fullData.i18n[currentLang][open ? 'nav_close' : 'nav_open']);
        navPanel.classList.toggle('is-open', open);
    }

    renderPage(currentLang);
    const currentYear = new Date().getFullYear();
    document.getElementById('year').textContent = currentYear;
    document.getElementById('portrait-year').textContent = currentYear;

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('portfolio_lang', currentLang);
        renderPage(currentLang);
    });
    navToggle.addEventListener('click', () => setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true'));
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => setNavOpen(false)));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setNavOpen(false);
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px' });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

    const navLinks = [...document.querySelectorAll('.nav-link')];
    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
        });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => spy.observe(section));

    const updateScrollUI = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        document.getElementById('site-header').classList.toggle('is-scrolled', window.scrollY > 12);
        document.getElementById('scroll-progress').style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
    };
    window.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('resize', updateScrollUI);
    updateScrollUI();
});
