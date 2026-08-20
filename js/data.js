window.portfolioData = {
    // 中文数据
    zh: {
        personal: {
            name: "王玥",
            title: "AI 工程师 / 研究者",
            bio: "我目前在华为担任工程师，主要从事基于昇腾硬件的推理引擎开发和模型性能调优工作。我毕业于上海交通大学人工智能专业，并获得硕士学位。我的研究兴趣主要集中在多模态学习与参数高效微调。在相关领域发表了多篇顶级AI会议论文，累计被引用达462次（h-index: 5）。我致力于探索和设计更高效、更具硬件亲和性且泛化能力卓越的基础模型与智能体系统。",
            avatar: "images/avatar.jpg",
            email: "nomewang@outlook.com",
            github: "https://github.com/nomewang",
            googleScholar: "https://scholar.google.com/citations?user=kxpuv3YAAAAJ&hl=en"
        },
        education: [
            {
                degree: "人工智能 硕士",
                institution: "上海交通大学",
                year: "2021.09 - 2024.03",
                description: "研究方向：多模态学习、参数高效微调。"
            },
            {
                degree: "地理信息科学 学士",
                institution: "中山大学",
                year: "2017.09 - 2021.06",
                description: ""
            }
        ],
        experience: [
            {
                role: "工程师",
                company: "华为",
                year: "2024.04 - 至今",
                achievements: [
                    "负责基于昇腾NPU的大模型推理引擎的开发与性能优化。作为模块MDE（Module Design Engineer），主导并参与了多项核心竞争力特性的设计与开发落地。",
                    "推出基于大规模AI服务器集群的并行推理方案，结合多种并行策略（DP/EP/TP/局部TP/CP等）充分利用算力、内存及多卡通信带宽，极致优化推理吞吐与时延。",
                    "主导多种先进 Attention 架构（如 MLA, DSA, NSA, GQA 等）在昇腾硬件上的部署落地与深度性能优化，显著提升主流开源大模型的推理效率。"
                ]
            },
            {
                role: "算法实习生",
                company: "腾讯",
                year: "2022.01 - 2023.01",
                achievements: [
                    "负责工业视觉质检与人脸表征学习方向的前沿算法研究，提出多模态混合融合异常检测与高质量人脸表征框架，相关成果发表于 CVPR 2023 及 ACM MM 2023，并成功应用于公司商业项目，共产出 2 篇顶会论文及 2 项专利。"
                ]
            }
        ],
        publications: [
            {
                title: "Multimodal industrial anomaly detection via hybrid fusion",
                authors: "Y Wang, J Peng, J Zhang, R Yi, Y Wang, C Wang",
                venue: "Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, 2023",
                link: "https://openaccess.thecvf.com/content/CVPR2023/html/Wang_Multimodal_Industrial_Anomaly_Detection_via_Hybrid_Fusion_CVPR_2023_paper.html",
                pdf: "#"
            },
            {
                title: "M3dm-nr: Rgb-3d noisy-resistant industrial anomaly detection via multimodal denoising",
                authors: "C Wang, H Zhu, J Peng, Y Wang, R Yi, Y Wu, L Ma, J Zhang",
                venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence, 2025",
                link: "https://ieeexplore.ieee.org/document/10834789/",
                pdf: "#"
            },
            {
                title: "Toward high quality facial representation learning",
                authors: "Y Wang, J Peng, J Zhang, R Yi, L Liu, Y Wang, C Wang",
                venue: "Proceedings of the 31st ACM International Conference on Multimedia, 2023",
                link: "https://dl.acm.org/doi/abs/10.1145/3581783.3611843",
                pdf: "#",
                code: "https://github.com/nomewang/MCF"
            },
            {
                title: "Ctlgan: Few-shot artistic portraits generation with contrastive transfer learning",
                authors: "Y Wang, R Yi, L Li, Y Tai, C Wang, L Ma",
                venue: "arXiv preprint arXiv:2203.08612, 2022",
                link: "https://arxiv.org/abs/2203.08612",
                pdf: "#"
            },
            {
                title: "Dropout mixture low-rank adaptation for visual parameters-efficient fine-tuning",
                authors: "Z Fang, Y Wang, R Yi, L Ma",
                venue: "European Conference on Computer Vision, 2024",
                link: "https://link.springer.com/chapter/10.1007/978-3-031-72995-9_22",
                pdf: "#"
            },
            {
                title: "AttentionPainter: an efficient and adaptive stroke predictor for scene painting",
                authors: "Y Tang, Y Wang, T Hu, R Yi, X Tan, L Ma, YK Lai, PL Rosin",
                venue: "IEEE Transactions on Visualization and Computer Graphics, 2025",
                link: "https://ieeexplore.ieee.org/document/10834790",
                pdf: "#"
            }
        ],
        awards: [
            {
                title: "国家奖学金",
                organization: "中华人民共和国教育部",
                year: "2023.12",
                description: "获得该项国家级最高荣誉。"
            },
            {
                title: "上海交通大学优秀毕业生",
                organization: "上海交通大学",
                year: "2023.12",
                description: "表彰在校期间在学术研究与社会实践中的突出表现。"
            },
            {
                title: "中国图象图形学学会优秀硕士学位论文激励计划提名",
                organization: "中国图象图形学学会",
                year: "2024.11",
                description: ""
            },
            {
                title: "上海市计算机学会优秀硕士学位论文奖",
                organization: "上海市计算机学会",
                year: "2025.04",
                description: ""
            }
        ]
    },
    
    // 英文数据
    en: {
        personal: {
            name: "Wang Yue",
            title: "AI Engineer / Researcher",
            bio: "Currently, I am working as an Engineer at Huawei, focusing on inference engine development and model performance tuning based on Ascend hardware. I received my Master's degree in Artificial Intelligence from Shanghai Jiao Tong University. My research interests primarily lie in Multimodal Learning and Parameter-Efficient Fine-Tuning. I have published several papers in these areas at top-tier AI conferences, with a total of 462 citations (h-index: 5). I am dedicated to exploring and designing foundation models and agent systems that are more efficient, hardware-friendly, and highly generalizable.",
            avatar: "images/avatar.jpg",
            email: "nomewang@outlook.com",
            github: "https://github.com/nomewang",
            googleScholar: "https://scholar.google.com/citations?user=kxpuv3YAAAAJ&hl=en"
        },
        education: [
            {
                degree: "Master of Artificial Intelligence",
                institution: "Shanghai Jiao Tong University",
                year: "2021.09 - 2024.03",
                description: "Research Area: Multimodal Learning, Parameter-Efficient Fine-Tuning."
            },
            {
                degree: "Bachelor of Geographic Information Science",
                institution: "Sun Yat-Sen University",
                year: "2017.09 - 2021.06",
                description: ""
            }
        ],
        experience: [
            {
                role: "Engineer",
                company: "Huawei",
                year: "2024.04 - Present",
                achievements: [
                    "Responsible for the development and performance optimization of a large model inference engine based on Ascend NPU. As a Module Design Engineer (MDE), led and participated in the design and development of multiple core competitive features.",
                    "Launched a parallel reasoning solution for large-scale AI server clusters, combining various parallel strategies (DP/EP/TP/Partial-TP/CP) to fully utilize compute, memory, and multi-GPU communication bandwidth, ultimately optimizing inference throughput and latency.",
                    "Led the deployment and deep performance optimization of multiple advanced Attention architectures (e.g., MLA, DSA, NSA, GQA) on Ascend hardware, significantly improving the inference efficiency of mainstream open-source LLMs."
                ]
            },
            {
                role: "Algorithm Intern",
                company: "Tencent",
                year: "2022.01 - 2023.01",
                achievements: [
                    "Conducted cutting-edge algorithm research in industrial visual inspection and facial representation learning. Proposed a multimodal hybrid fusion framework and a high-quality facial representation method, with results published in CVPR 2023 and ACM MM 2023. Successfully applied algorithms to commercial projects, producing 2 top-tier conference papers and 2 patents."
                ]
            }
        ],
        publications: [
            {
                title: "Multimodal industrial anomaly detection via hybrid fusion",
                authors: "Y Wang, J Peng, J Zhang, R Yi, Y Wang, C Wang",
                venue: "Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, 2023",
                link: "https://openaccess.thecvf.com/content/CVPR2023/html/Wang_Multimodal_Industrial_Anomaly_Detection_via_Hybrid_Fusion_CVPR_2023_paper.html",
                pdf: "#"
            },
            {
                title: "M3dm-nr: Rgb-3d noisy-resistant industrial anomaly detection via multimodal denoising",
                authors: "C Wang, H Zhu, J Peng, Y Wang, R Yi, Y Wu, L Ma, J Zhang",
                venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence, 2025",
                link: "https://ieeexplore.ieee.org/document/10834789/",
                pdf: "#"
            },
            {
                title: "Toward high quality facial representation learning",
                authors: "Y Wang, J Peng, J Zhang, R Yi, L Liu, Y Wang, C Wang",
                venue: "Proceedings of the 31st ACM International Conference on Multimedia, 2023",
                link: "https://dl.acm.org/doi/abs/10.1145/3581783.3611843",
                pdf: "#",
                code: "https://github.com/nomewang/MCF"
            },
            {
                title: "Ctlgan: Few-shot artistic portraits generation with contrastive transfer learning",
                authors: "Y Wang, R Yi, L Li, Y Tai, C Wang, L Ma",
                venue: "arXiv preprint arXiv:2203.08612, 2022",
                link: "https://arxiv.org/abs/2203.08612",
                pdf: "#"
            },
            {
                title: "Dropout mixture low-rank adaptation for visual parameters-efficient fine-tuning",
                authors: "Z Fang, Y Wang, R Yi, L Ma",
                venue: "European Conference on Computer Vision, 2024",
                link: "https://link.springer.com/chapter/10.1007/978-3-031-72995-9_22",
                pdf: "#"
            },
            {
                title: "AttentionPainter: an efficient and adaptive stroke predictor for scene painting",
                authors: "Y Tang, Y Wang, T Hu, R Yi, X Tan, L Ma, YK Lai, PL Rosin",
                venue: "IEEE Transactions on Visualization and Computer Graphics, 2025",
                link: "https://ieeexplore.ieee.org/document/10834790",
                pdf: "#"
            }
        ],
        awards: [
            {
                title: "China National Scholarship",
                organization: "Ministry of Education of the People's Republic of China",
                year: "2023.12",
                description: ""
            },
            {
                title: "Outstanding Graduate of Shanghai Jiao Tong University",
                organization: "Shanghai Jiao Tong University",
                year: "2023.12",
                description: ""
            },
            {
                title: "Nomination for Master's Degree Thesis Incentive Program of Chinese Society of Image and Graphics",
                organization: "Chinese Society of Image and Graphics",
                year: "2024.11",
                description: ""
            },
            {
                title: "Shanghai Computer Society Outstanding Master's Degree Thesis Award",
                organization: "Shanghai Computer Society",
                year: "2025.04",
                description: ""
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