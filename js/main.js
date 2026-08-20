document.addEventListener('DOMContentLoaded', () => {
    // 获取挂载在 window 上的数据
    const fullData = window.portfolioData;
    
    // 语言切换逻辑，默认改为英文
    let currentLang = localStorage.getItem('portfolio_lang') || 'en';
    const langToggleBtn = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');

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

        // 渲染社交链接 (先清空)
        const socialContainer = document.getElementById('hero-social');
        socialContainer.innerHTML = '';
        const socials = [
            { key: 'email', icon: 'fa-solid fa-envelope', prefix: 'mailto:' },
            { key: 'github', icon: 'fa-brands fa-github', prefix: '' },
            { key: 'googleScholar', icon: 'fa-solid fa-graduation-cap', prefix: '' }
        ];

        socials.forEach(s => {
            if (data.personal[s.key]) {
                const a = document.createElement('a');
                a.href = s.prefix + data.personal[s.key];
                a.target = "_blank";
                a.className = "hover:text-indigo-600 transition-colors duration-200 text-2xl text-slate-400";
                a.innerHTML = `<i class="${s.icon}"></i>`;
                socialContainer.appendChild(a);
            }
        });

        // 3. 渲染教育背景 (带时间线样式)
        const eduContainer = document.getElementById('education-list');
        eduContainer.innerHTML = '';
        data.education.forEach(item => {
            const div = document.createElement('div');
            div.className = "relative group hover:-translate-y-1 transition-transform duration-300";
            
            let descHtml = '';
            if (item.description && item.description.trim() !== '') {
                descHtml = `<p class="text-slate-600 leading-relaxed text-sm font-light">${item.description}</p>`;
            }

            div.innerHTML = `
                <div class="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[25px] top-1.5 border-4 border-white shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                <h4 class="text-lg font-bold text-slate-900">${item.degree}</h4>
                <div class="text-sm text-indigo-600 font-medium mt-1.5 mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-building-columns text-xs opacity-70"></i>
                    ${item.institution} <span class="text-slate-300">|</span> <i class="fa-regular fa-calendar text-xs opacity-70"></i> ${item.year}
                </div>
                ${descHtml}
            `;
            eduContainer.appendChild(div);
        });

        // 4. 渲染工作经历 (单列左侧时间轴)
        const expContainer = document.getElementById('experience-list');
        expContainer.innerHTML = '';
        data.experience.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = "relative group hover:-translate-y-1 transition-transform duration-300";
            
            let achivementsHtml = '<ul class="list-disc list-outside ml-4 space-y-2.5 text-slate-600 text-sm mt-5 font-light">';
            item.achievements.forEach(ach => {
                achivementsHtml += `<li>${ach}</li>`;
            });
            achivementsHtml += '</ul>';

            div.innerHTML = `
                <!-- 时间轴中心点 -->
                <div class="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[25px] top-6 border-4 border-white shadow-sm group-hover:scale-125 transition-transform duration-300 z-10"></div>

                <!-- 内容卡片 -->
                <div class="w-full p-6 md:p-8 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-200/80 transition-all duration-300">
                    <div class="flex flex-col sm:flex-row justify-between sm:items-start mb-2 gap-3">
                        <h3 class="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">${item.role}</h3>
                        <span class="inline-flex items-center gap-1.5 bg-slate-100/80 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-semibold tracking-wide border border-slate-200">
                            <i class="fa-regular fa-clock opacity-70"></i> ${item.year}
                        </span>
                    </div>
                    <h4 class="text-sm font-medium text-indigo-600 flex items-center gap-2 mb-4">
                        <i class="fa-solid fa-building"></i>${item.company}
                    </h4>
                    <div class="h-px bg-gradient-to-r from-slate-200/80 to-transparent my-4"></div>
                    ${achivementsHtml}
                </div>
            `;
            expContainer.appendChild(div);
        });

        // 5. 渲染论文列表 (卡片样式)
        const pubContainer = document.getElementById('publications-list');
        pubContainer.innerHTML = '';
        data.publications.forEach(item => {
            const div = document.createElement('div');
            div.className = "p-6 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-200/80 transition-all duration-300 group";
            div.innerHTML = `
                <h4 class="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-indigo-700 transition-colors">${item.title}</h4>
                <p class="text-slate-600 text-sm mb-4 font-light">${item.authors}</p>
                <div class="flex flex-wrap items-center gap-4">
                    <div class="flex items-center text-xs font-semibold text-indigo-700 bg-indigo-50/80 px-3 py-1.5 rounded-lg border border-indigo-100">
                        <i class="fa-solid fa-bookmark mr-2 opacity-70"></i> ${item.venue}
                    </div>
                    <div class="flex space-x-4 text-sm font-medium">
                        ${item.link && item.link !== '#' ? `<a href="${item.link}" target="_blank" class="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5"><i class="fa-solid fa-link"></i> ${i18n.btn_link}</a>` : ''}
                        ${item.pdf && item.pdf !== '#' ? `<a href="${item.pdf}" target="_blank" class="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5"><i class="fa-solid fa-file-pdf"></i> ${i18n.btn_pdf}</a>` : ''}
                        ${item.code && item.code !== '#' ? `<a href="${item.code}" target="_blank" class="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5"><i class="fa-brands fa-github"></i> ${i18n.btn_code}</a>` : ''}
                    </div>
                </div>
            `;
            pubContainer.appendChild(div);
        });

        // 6. 渲染个人荣誉 (卡片网格样式 -> 横向滚动样式)
        const awardsContainer = document.getElementById('awards-list');
        awardsContainer.innerHTML = '';
        if (data.awards && data.awards.length > 0) {
            data.awards.forEach(item => {
                const div = document.createElement('div');
                div.className = "min-w-[280px] md:min-w-[320px] max-w-[320px] p-6 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full shrink-0 select-none";
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

    // 绑定切换事件
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('portfolio_lang', currentLang);
        renderPage(currentLang);
    });
});