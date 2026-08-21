document.addEventListener('DOMContentLoaded', () => {
    // 获取挂载在 window 上的数据
    const fullData = window.portfolioData;
    
    // 语言切换逻辑，默认中文
    let currentLang = localStorage.getItem('portfolio_lang') || 'zh';
    const langToggleBtn = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');

    // 论文作者渲染：加粗本人姓名 (含英文别名)，
    // 前 equalContribution 位标注共一(†)，末位作者标注通讯(✉)
    const renderAuthors = (item, i18n) => {
        const names = item.authors.replace(/\s*&\s*/g, ', ').split(',').map(n => n.trim()).filter(Boolean);
        const equalCount = item.equalContribution || 0;
        return names.map((name, idx) => {
            let marked = /^(Shuai Chen|Shawn Chen|陈帅)$/.test(name)
                ? `<strong class="text-slate-900 font-semibold">${name}</strong>`
                : name;
            if (equalCount && idx < equalCount) {
                marked += `<sup class="text-indigo-500 font-semibold" title="${i18n.legend_equal}">†</sup>`;
            }
            if (idx === names.length - 1) {
                marked += `<sup class="text-indigo-500 font-semibold" title="${i18n.legend_corresponding}">✉</sup>`;
            }
            return marked;
        }).join(', ');
    };

    function renderPage(lang) {
        const data = fullData[lang];
        const i18n = fullData.i18n[lang];

        // 1. 渲染静态 UI 文字 (i18n)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[key]) {
                el.textContent = i18n[key];
            }
        });

        // 更新按钮文字
        langLabel.textContent = lang === 'zh' ? 'EN' : '中';
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        // 2. 渲染基本信息
        document.getElementById('nav-name').textContent = data.personal.name;
        document.getElementById('hero-name').textContent = data.personal.name;
        document.getElementById('hero-title').textContent = data.personal.title;
        document.getElementById('hero-bio').textContent = data.personal.bio;
        
        const avatarImg = document.getElementById('hero-avatar');
        if (avatarImg && data.personal.avatar) {
            avatarImg.src = data.personal.avatar;
        }

        document.getElementById('footer-name').textContent = data.personal.name;
        document.getElementById('year').textContent = new Date().getFullYear();

        // 渲染社交链接 (Hero 与页脚共用配置)
        const socials = [
            { key: 'email', icon: 'fa-solid fa-envelope', prefix: 'mailto:' },
            { key: 'github', icon: 'fa-brands fa-github', prefix: '' },
            { key: 'googleScholar', icon: 'fa-solid fa-graduation-cap', prefix: '' }
        ];

        ['hero-social', 'footer-social'].forEach(id => {
            const container = document.getElementById(id);
            if (!container) return;
            container.innerHTML = '';
            socials.forEach(s => {
                if (data.personal[s.key]) {
                    const a = document.createElement('a');
                    a.href = s.prefix + data.personal[s.key];
                    a.target = "_blank";
                    a.title = s.key;
                    a.className = "w-9 h-9 rounded-full flex items-center justify-center text-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/70 hover:-translate-y-0.5 transition-all duration-300";
                    a.innerHTML = `<i class="${s.icon}"></i>`;
                    container.appendChild(a);
                }
            });
        });

        // 3. 渲染教育背景 (带时间线样式)
        const eduContainer = document.getElementById('education-list');
        eduContainer.innerHTML = '';
        data.education.forEach(item => {
            const div = document.createElement('div');
            div.className = "relative group hover:-translate-y-1 transition-transform duration-300";
            
            let descHtml = '';
            if (item.description && item.description.trim() !== '') {
                descHtml = `<p class="text-slate-600 leading-relaxed text-sm font-light mt-2">${item.description}</p>`;
            }

            // 学校校徽（存在时置于卡片左侧）
            const logoHtml = item.logo
                ? `<div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 p-2.5 group-hover:scale-105 transition-transform duration-300">
                       <img src="${item.logo}" alt="${item.institution} logo" class="w-full h-full object-contain">
                   </div>`
                : '';
            const degreeLine = item.logo
                ? `<div class="text-sm text-indigo-600 font-medium">${item.degree}</div>`
                : `<div class="text-sm text-indigo-600 font-medium flex items-center gap-2"><i class="fa-solid fa-graduation-cap text-xs opacity-70"></i>${item.degree}</div>`;
            const locationHtml = item.location
                ? `<span class="text-xs text-slate-400 flex items-center gap-1"><i class="fa-solid fa-location-dot"></i>${item.location}</span>`
                : '';

            div.innerHTML = `
                <div class="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[25px] top-7 border-4 border-white shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                <div class="p-5 md:p-6 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm group-hover:shadow-md group-hover:border-indigo-200/80 transition-all duration-300">
                    <div class="flex items-center gap-4">
                        ${logoHtml}
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">${item.institution}</h4>
                                <span class="text-xs font-semibold text-slate-500 bg-slate-100/80 border border-slate-200 px-2.5 py-1 rounded-md">${item.year}</span>
                            </div>
                            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                                ${degreeLine}
                                ${locationHtml}
                            </div>
                            ${descHtml}
                        </div>
                    </div>
                </div>
            `;
            eduContainer.appendChild(div);
        });

        // 4. 渲染工作经历 (单列左侧时间轴)
        const expContainer = document.getElementById('experience-list');
        expContainer.innerHTML = '';
        data.experience.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = "relative group hover:-translate-y-1 transition-transform duration-300";

            // 公司 logo（存在时置于卡片左侧）
            const logoHtml = item.logo
                ? `<div class="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 p-2.5 group-hover:scale-105 transition-transform duration-300">
                       <img src="${item.logo}" alt="${item.company} logo" class="w-full h-full object-contain">
                   </div>`
                : '';
            const roleLine = item.logo
                ? `<h4 class="text-sm font-medium text-indigo-600 mt-1.5">${item.role}</h4>`
                : `<h4 class="text-sm font-medium text-indigo-600 flex items-center gap-2 mt-1.5"><i class="fa-solid fa-user-tie text-xs opacity-70"></i>${item.role}</h4>`;
            const tagsHtml = (item.tags && item.tags.length)
                ? `<div class="flex flex-wrap gap-2 mt-4">${item.tags.map(t => `<span class="text-xs px-2.5 py-1 rounded-md bg-slate-100/80 text-slate-500 border border-slate-200/70">${t}</span>`).join('')}</div>`
                : '';

            div.innerHTML = `
                <!-- 时间轴中心点 -->
                <div class="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[25px] top-6 border-4 border-white shadow-sm group-hover:scale-125 transition-transform duration-300 z-10"></div>

                <!-- 内容卡片 -->
                <div class="w-full p-6 md:p-8 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-200/80 transition-all duration-300">
                    <div class="flex items-center gap-5">
                        ${logoHtml}
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <h3 class="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">${item.company}</h3>
                                <span class="inline-flex items-center gap-1.5 bg-slate-100/80 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-semibold tracking-wide border border-slate-200">
                                    <i class="fa-regular fa-clock opacity-70"></i> ${item.year}
                                </span>
                            </div>
                            ${roleLine}
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
            `;
            expContainer.appendChild(div);
        });

        // 5. 渲染论文列表 (卡片样式，含录用/在投状态)
        const pubContainer = document.getElementById('publications-list');
        pubContainer.innerHTML = '';
        data.publications.forEach(item => {
            const isUnderReview = item.status === 'under_review';
            const div = document.createElement('div');
            div.className = `p-6 bg-white/80 backdrop-blur-sm border rounded-2xl transition-all duration-300 group ${isUnderReview
                ? 'border-dashed border-slate-300/90 hover:border-amber-300/90'
                : 'border-slate-200/60 shadow-sm hover:shadow-xl hover:border-indigo-200/80'}`;
            const statusBadge = isUnderReview
                ? `<span class="inline-flex items-center text-xs font-semibold text-amber-600 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-100"><i class="fa-solid fa-hourglass-half mr-2 opacity-70"></i> ${i18n.badge_under_review}</span>`
                : `<span class="inline-flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-100"><i class="fa-solid fa-circle-check mr-2 opacity-70"></i> ${i18n.badge_accepted}</span>`;
            div.innerHTML = `
                <h4 class="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-indigo-700 transition-colors">${item.title}</h4>
                <p class="text-slate-600 text-sm mb-4 font-light">${renderAuthors(item, i18n)}</p>
                <div class="flex flex-wrap items-center gap-3">
                    <div class="flex items-center text-xs font-semibold text-indigo-700 bg-indigo-50/80 px-3 py-1.5 rounded-lg border border-indigo-100">
                        <i class="fa-solid fa-bookmark mr-2 opacity-70"></i> ${item.venue}
                    </div>
                    ${statusBadge}
                    <div class="flex space-x-4 text-sm font-medium">
                        ${item.link && item.link !== '#' ? `<a href="${item.link}" target="_blank" class="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5"><i class="fa-solid fa-link"></i> ${i18n.btn_link}</a>` : ''}
                        ${item.pdf && item.pdf !== '#' ? `<a href="${item.pdf}" target="_blank" class="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5"><i class="fa-solid fa-file-pdf"></i> ${i18n.btn_pdf}</a>` : ''}
                        ${item.code && item.code !== '#' ? `<a href="${item.code}" target="_blank" class="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5"><i class="fa-brands fa-github"></i> ${i18n.btn_code}</a>` : ''}
                    </div>
                </div>
            `;
            pubContainer.appendChild(div);
        });

        // 共一/通讯符号图例 (仅在存在标注时显示)
        if (data.publications.some(p => p.equalContribution)) {
            const legend = document.createElement('p');
            legend.className = "mt-6 text-xs text-slate-400 flex flex-wrap items-center gap-x-5 gap-y-1";
            legend.innerHTML = `
                <span class="flex items-center gap-1"><sup class="text-indigo-500 font-semibold">†</sup> ${i18n.legend_equal}</span>
                <span class="flex items-center gap-1"><sup class="text-indigo-500 font-semibold">✉</sup> ${i18n.legend_corresponding}</span>
            `;
            pubContainer.appendChild(legend);
        }

        // 6. 渲染个人荣誉 (卡片网格样式 -> 横向滚动样式)
        const awardsContainer = document.getElementById('awards-list');
        awardsContainer.innerHTML = '';
        if (data.awards && data.awards.length > 0) {
            data.awards.forEach(item => {
                const div = document.createElement('div');
                div.className = "min-w-[280px] md:min-w-[320px] max-w-[320px] min-h-[200px] p-6 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col shrink-0 select-none";
                div.innerHTML = `
                    <div class="flex items-start justify-between mb-3 gap-2">
                        <h4 class="text-lg font-bold text-slate-900 leading-tight pointer-events-none">${item.title}</h4>
                        <span class="inline-flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100/50 shrink-0 pointer-events-none">
                            <i class="fa-regular fa-calendar-check mr-1.5 opacity-80"></i>${item.year}
                        </span>
                    </div>
                    <div class="text-sm text-indigo-600 font-medium mb-3 flex items-center gap-1.5 pointer-events-none">
                        <i class="fa-solid fa-award opacity-70"></i> ${item.organization}
                    </div>
                    <p class="text-slate-600 text-sm font-light leading-relaxed mt-auto pointer-events-none">${item.description || ''}</p>
                `;
                awardsContainer.appendChild(div);
            });

            // 添加鼠标拖拽滚动功能
            let isDown = false;
            let startX;
            let scrollLeft;

            awardsContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                awardsContainer.classList.add('active');
                startX = e.pageX - awardsContainer.offsetLeft;
                scrollLeft = awardsContainer.scrollLeft;
            });
            
            awardsContainer.addEventListener('mouseleave', () => {
                isDown = false;
                awardsContainer.classList.remove('active');
            });
            
            awardsContainer.addEventListener('mouseup', () => {
                isDown = false;
                awardsContainer.classList.remove('active');
            });
            
            awardsContainer.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - awardsContainer.offsetLeft;
                const walk = (x - startX) * 2; // 滚动速度倍率
                awardsContainer.scrollLeft = scrollLeft - walk;
            });

            // 添加边缘悬浮自动滚动功能
            const leftZone = document.getElementById('scroll-left-zone');
            const rightZone = document.getElementById('scroll-right-zone');
            let scrollInterval;
            const scrollSpeed = 5; // 自动滚动速度

            const startScroll = (direction) => {
                if (scrollInterval) clearInterval(scrollInterval);
                scrollInterval = setInterval(() => {
                    awardsContainer.scrollLeft += direction * scrollSpeed;
                }, 16); // ~60fps
            };

            const stopScroll = () => {
                if (scrollInterval) {
                    clearInterval(scrollInterval);
                    scrollInterval = null;
                }
            };

            if (leftZone && rightZone) {
                leftZone.addEventListener('mouseenter', () => startScroll(-1));
                leftZone.addEventListener('mouseleave', stopScroll);
                
                rightZone.addEventListener('mouseenter', () => startScroll(1));
                rightZone.addEventListener('mouseleave', stopScroll);
            }
        }
    }

    // 初始化渲染
    renderPage(currentLang);

    // 滚动渐入动画
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 导航栏滚动高亮 (Scrollspy)
    const navLinks = document.querySelectorAll('nav .nav-link');
    const linkById = {};
    navLinks.forEach(l => { linkById[l.getAttribute('href').slice(1)] = l; });
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && linkById[entry.target.id]) {
                navLinks.forEach(l => l.classList.remove('active'));
                linkById[entry.target.id].classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

    // 绑定切换事件
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('portfolio_lang', currentLang);
        renderPage(currentLang);
    });
});