window.portfolioData = {
    // 中文数据
    zh: {
        personal: {
            name: "陈帅",
            title: "AIGC Researcher",
            bio: "我本科毕业于大连理工大学计算机科学与技术专业，目前就读于中国科学技术大学软件工程专业。我的研究兴趣主要集中在AIGC领域，包括多模态生成与理解，视频生成以及世界模型。我致力实现AGI，我认为AGI必然需要大模型的视觉能力。",
            avatar: "images/avatar.jpg",
            email: "shuaichen703@gmail.com",
            github: "https://github.com/shuaichen703",
            googleScholar: "https://scholar.google.com/citations?user=RE4jQBAAAAAJ&hl=zh-CN"
        },
        education: [
            {
                degree: "软件工程 硕士",
                institution: "中国科学技术大学",
                year: "2025.09 - 至今",
                description: "研究方向：视觉语言预训练、图像视频生成、世界模型。"
            },
            {
                degree: "计算机科学与技术 学士",
                institution: "大连理工大学",
                year: "2021.09 - 2025.06",
                description: ""
            }
        ],
        experience: [
            {
                role: "视觉基座实习生",
                company: "理想汽车",
                year: "2026.06 - 至今",
                achievements: [
                    "公司车载端侧视觉编码器开发工作，参与公司混合架构网络LiAuto-MindViT及系列变体的设计及其预训练，在保持高准确率的同时将超高清场景下的推理延时压至20ms，部分成果整理成文投稿AAAI，其变体应用于端侧推理模型。",
                    "以第一作者完成一篇CCF-A级论文。"
                ]
            },
            {
                role: "AIGC算法实习生",
                company: "阿里巴巴-高德地图",
                year: "2026.02 - 2026.06",
                achievements: [
                    "参与公司AI编辑器工作。我们基于Qwen3-VL-2B-Instruct 构建了一个编辑器产品，利用Gemini-3-pro-preview构造8万条高质量数据对来微调Qwen 模型，在实现97%良品率同时将推理毛刺压至0.258s，极大保证了C端用户秒级出图的体感。",
                    "以第一作者完成两篇CCF-A级论文。"
                ]
            }
        ],
        publications: [
            {
                title: "SCALAR++: Extensible and Efficient Controllable Generation for Autoregressive Modeling",
                authors: "Ryan Xu, Dongyang Jin, Shawn Chen, Yancheng Bai, Jingzhe Ma, Rui Lan, Jianhao Zeng, Yunyang Ge, Mingzhe Zheng, Lei Sun & Xiangxiang Chu",
                venue: "International Journal of Computer Vision, 2026",
                link: "https://link.springer.com/article/10.1007/s11263-026-02984-z",
                pdf: "https://www.researchgate.net/publication/401644219"
            },
            {
                title: "EventGait: Towards Robust Gait Recognition with Event Streams",
                authors: "Senyan Xu, Shuai Chen, Chuanfu Shen, Kean Liu, Zhijing Sun, Chengzhi Cao, Xueyang Fu",
                venue: "Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, 2026",
                link: "https://cvpr.thecvf.com/virtual/2026/poster/38188",
                pdf: "https://arxiv.org/pdf/2605.22139"
            }
        ],
        awards: [
            {
                title: "国家励志奖学金",
                organization: "中华人民共和国教育部",
                year: "2022.12",
                description: "获得该项国家级最高荣誉。"
            }
        ]
    },
    
    // 英文数据
    en: {
        personal: {
            name: "Shuai Chen",
            title: "AIGC Researcher",
            bio: "I received my Bachelor's degree in Computer Science and Technology from Dalian University of Technology, and I am currently pursuing a Master's degree in Software Engineering at the University of Science and Technology of China. My research interests primarily lie in the field of AIGC, including multimodal generation and understanding, video generation, and world models. I am committed to realizing AGI, and I believe that AGI inevitably requires the visual capabilities of large models.",
            avatar: "images/avatar.jpg",
            email: "shuaichen703@gmail.com",
            github: "https://github.com/shuaichen703",
            googleScholar: "https://scholar.google.com/citations?user=RE4jQBAAAAAJ&hl=en"
        },
        education: [
            {
                degree: "Master of Software Engineering",
                institution: "University of Science and Technology of China",
                year: "2025.09 - Present",
                description: "Research Area: Vision-Language Pre-training, Image & Video Generation, World Models."
            },
            {
                degree: "Bachelor of Computer Science and Technology",
                institution: "Dalian University of Technology",
                year: "2021.09 - 2025.06",
                description: ""
            }
        ],
        experience: [
            {
                role: "Vision Foundation Model Intern",
                company: "Li Auto",
                year: "2026.06 - Present",
                achievements: [
                    "Worked on the development of an in-vehicle edge-side visual encoder. Participated in the design and pre-training of the company's hybrid-architecture network LiAuto-MindViT and its series of variants, reducing the inference latency in ultra-high-definition scenarios to 20ms while maintaining high accuracy. Part of the results has been written up and submitted to AAAI, and its variants have been applied to edge-side reasoning models.",
                    "Completed one CCF-A paper as the first author."
                ]
            },
            {
                role: "AIGC Algorithm Intern",
                company: "Alibaba - AMap",
                year: "2026.02 - 2026.06",
                achievements: [
                    "Participated in the company's AI editor project. We built an editor product based on Qwen3-VL-2B-Instruct, and used Gemini-3-pro-preview to construct 80,000 high-quality data pairs to fine-tune the Qwen model, achieving a 97% success rate while reducing inference latency to 0.258s, greatly ensuring a second-level image generation experience for end users.",
                    "Completed two CCF-A papers as the first author."
                ]
            }
        ],
        publications: [
            {
                title: "SCALAR++: Extensible and Efficient Controllable Generation for Autoregressive Modeling",
                authors: "Ryan Xu, Dongyang Jin, Shawn Chen, Yancheng Bai, Jingzhe Ma, Rui Lan, Jianhao Zeng, Yunyang Ge, Mingzhe Zheng, Lei Sun & Xiangxiang Chu",
                venue: "International Journal of Computer Vision, 2026",
                link: "https://link.springer.com/article/10.1007/s11263-026-02984-z",
                pdf: "https://www.researchgate.net/publication/401644219"
            },
            {
                title: "EventGait: Towards Robust Gait Recognition with Event Streams",
                authors: "Senyan Xu, Shuai Chen, Chuanfu Shen, Kean Liu, Zhijing Sun, Chengzhi Cao, Xueyang Fu",
                venue: "Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, 2026",
                link: "https://cvpr.thecvf.com/virtual/2026/poster/38188",
                pdf: "https://arxiv.org/pdf/2605.22139"
            }
        ],
        awards: [
            {
                title: "National Endeavor Scholarship",
                organization: "Ministry of Education of the People's Republic of China",
                year: "2022.12",
                description: "Received this national-level highest honor."
            }
        ]
    },

    // 静态多语言配置 (UI文字)
    i18n: {
        zh: {
            nav_about: "关于我",
            nav_education: "教育背景",
            nav_experience: "工作经历",
            nav_publications: "学术研究",
            nav_awards: "个人荣誉",
            title_education: "教育背景",
            title_experience: "工作经历",
            title_publications: "学术研究",
            title_awards: "个人荣誉",
            btn_link: "链接",
            btn_pdf: "PDF",
            btn_code: "代码"
        },
        en: {
            nav_about: "About Me",
            nav_education: "Education",
            nav_experience: "Experience",
            nav_publications: "Publications",
            nav_awards: "Awards",
            title_education: "Education",
            title_experience: "Experience",
            title_publications: "Publications",
            title_awards: "Honors & Awards",
            btn_link: "Link",
            btn_pdf: "PDF",
            btn_code: "Code"
        }
    }
};