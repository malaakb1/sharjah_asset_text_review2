export interface SubCategory {
  title: string;
  eligibility: string;
  requirements?: string[];
  note?: string;
}

export interface CriteriaItem {
  name: string;
  points?: string;
  description: string;
  subItems?: string[];
}

export interface CategoryContent {
  title: string;
  overview: string;
  targetAudience?: string;
  criteriaTitle: string;
  criteriaDescription?: string;
  criteriaItems: CriteriaItem[];
  rewards: string[];
  note?: string;
  subcategories?: SubCategory[];
}

type Lang = "ar" | "en";

export const categoryContent: Record<string, Record<Lang, CategoryContent>> = {
  department: {
    en: {
      title: "The Distinguished Department Category",
      overview:
        "The Distinguished Department Award recognizes organizational units under the Sharjah Asset Management portfolio that demonstrate excellence in performance. Excellence is defined as surpassing peers in delivering products and services efficiently and effectively, exceeding the expectations of customers and stakeholders.",
      targetAudience:
        "This category is open to organizational units across all Departments and Subsidiaries of Sharjah Asset Management.",
      criteriaTitle: "Assessment Criteria (EFQM 2025 Model - RADAR)",
      criteriaDescription:
        "The assessment focuses on how the department develops, implements, and reviews its operational plans to align with SAM\u2019s strategic plan.",
      criteriaItems: [
        {
          name: "Plan",
          points: "200 Points",
          description:
            "Does the organizational unit develop, implement, and review its operational plan in line with stakeholder needs and expectations, ensuring alignment of its operations and structure with SAM's strategic plan?",
        },
        {
          name: "Resources & Assets",
          points: "300 Points",
          description:
            "How does the organizational unit meet stakeholder perceptions and attitudes through effective management of business processes and long-term stakeholder relationships to create sustainable value?",
        },
        {
          name: "Human Resources",
          points: "200 Points",
          description:
            "What does the organizational unit achieve regarding its employees?",
        },
        {
          name: "Results",
          points: "300 Points",
          description:
            "What does the organizational unit achieve in terms of results — driving performance and transformation?",
        },
      ],
      rewards: [
        "Certificate of Appreciation and Trophy for the department.",
        "Appreciation medal and Financial Reward for each employee in the winning department.",
      ],
    },
    ar: {
      title: "فئة الإدارة المتميز",
      overview:
        "تكرّم جائزة الإدارة المتميزة الوحدات التنظيمية ضمن محفظة الشارقة لإدارة الأصول التي تُظهر تميّزاً في الأداء. يُعرّف التميّز بأنه التفوق على الأقران في تقديم المنتجات والخدمات بكفاءة وفعالية، وتجاوز توقعات العملاء وأصحاب المصلحة.",
      targetAudience:
        "هذه الفئة مفتوحة للوحدات التنظيمية في جميع إدارات وشركات الشارقة لإدارة الأصول.",
      criteriaTitle: "معايير التقييم (نموذج EFQM 2025 - RADAR)",
      criteriaDescription:
        "يركّز التقييم على كيفية تطوير القسم وتنفيذ ومراجعة خططه التشغيلية بما يتماشى مع الخطة الاستراتيجية لسام.",
      criteriaItems: [
        {
          name: "التخطيط",
          points: "200 نقطة",
          description:
            "هل تقوم الوحدة التنظيمية بتطوير وتنفيذ ومراجعة خطتها التشغيلية بما يتوافق مع احتياجات وتوقعات أصحاب المصلحة وبما يضمن توافق عملياتها وهيكلها مع الخطة الاستراتيجية لـ SAM؟",
        },
        {
          name: "الموارد والأصول",
          points: "300 نقطة",
          description:
            "كيف تلبي الوحدة التنظيمية تصورات ومواقف أصحاب المصلحة من خلال الإدارة الفعالة لعمليات الأعمال وعلاقات أصحاب المصلحة على المدى الطويل وتخلق قيمة مستدامة؟",
        },
        {
          name: "الموارد البشرية",
          points: "200 نقطة",
          description:
            "ما الذي تحققه الوحدة التنظيمية فيما يتعلق بموظفيها؟",
        },
        {
          name: "النتائج",
          points: "300 نقطة",
          description:
            "ما الذي تحققه الوحدة التنظيمية من نتائج — دفع الأداء والتحول؟",
        },
      ],
      rewards: [
        "شهادة تقدير وكأس للقسم.",
        "ميدالية تقدير ومكافأة مالية لكل موظف في القسم الفائز.",
      ],
    },
  },

  project: {
    en: {
      title: "The Distinguished Project / Initiative Category",
      overview:
        "This category recognizes significant achievements in specific projects or initiatives. Nominations must demonstrate a clear charter, detailed plans/schedules, status reports, and key performance indicator (KPI) results backed by objective evidence.",
      criteriaTitle: "Assessment Criteria",
      criteriaItems: [
        {
          name: "Design & Development",
          points: "20 Points",
          description: "Evaluates the design and development phase of the project/initiative in terms of concept, objectives, planning, and strategic alignment.",
          subItems: [
            "Developing the idea/concept and setting SMART objectives",
            "Aligning the project/initiative with organizational strategy",
            "Identifying stakeholders and innovation level",
            "Conducting feasibility study and alternatives analysis",
            "Identifying and allocating required resources",
            "Preparing a detailed execution plan",
          ],
        },
        {
          name: "Execution",
          points: "30 Points",
          description: "Evaluates the execution phase in terms of efficiency, monitoring, financial control, and change management.",
          subItems: [
            "Ensuring execution efficiency and adequate resource allocation",
            "Monitoring execution progress and preparing periodic performance reports",
            "Controlling financial performance",
            "Promoting innovative use of project resources",
            "Using modern scientific methods and techniques in execution",
            "Managing change effectively",
            "Proactively identifying and overcoming difficulties and constraints",
            "Fostering a positive and motivating team environment",
          ],
        },
        {
          name: "Results & Positive Impact",
          points: "50 Points",
          description: "Evaluates results in terms of achieving objectives, ROI, and sustainable impact.",
          subItems: [
            "Fully achieving project/initiative objectives",
            "Demonstrating clear ROI or added economic value",
            "Achieving measurable performance improvements",
            "Stakeholder satisfaction with results",
            "Sustainability of impact and replicability",
          ],
        },
      ],
      rewards: [
        "Certificate of Appreciation and Trophy for the Project/Initiative.",
        "Appreciation medal and Financial Reward for each member of the Project Team.",
      ],
    },
    ar: {
      title: "فئة المشروع / المبادرة المتميزة",
      overview:
        "تكرّم هذه الفئة الإنجازات المهمة في مشاريع أو مبادرات محددة. يجب أن تُظهر الترشيحات ميثاقاً واضحاً وخططاً/جداول زمنية مفصلة وتقارير حالة ونتائج مؤشرات أداء رئيسية مدعومة بأدلة موضوعية.",
      criteriaTitle: "معايير التقييم",
      criteriaItems: [
        {
          name: "التصميم والتطوير",
          points: "20 نقطة",
          description: "يقيّم مرحلة تصميم وتطوير المشروع/المبادرة من حيث المفهوم والأهداف والتخطيط والمواءمة الاستراتيجية.",
          subItems: [
            "تطوير الفكرة/المفهوم ووضع أهداف SMART",
            "مواءمة المشروع/المبادرة مع الاستراتيجية المؤسسية",
            "تحديد أصحاب المصلحة ومستوى الابتكار",
            "إجراء دراسة جدوى وتحليل البدائل",
            "تحديد وتخصيص الموارد المطلوبة",
            "إعداد خطة تنفيذ تفصيلية",
          ],
        },
        {
          name: "التنفيذ",
          points: "30 نقطة",
          description: "يقيّم مرحلة تنفيذ المشروع/المبادرة من حيث الكفاءة والمتابعة والتحكم المالي وإدارة التغيير.",
          subItems: [
            "ضمان كفاءة عمليات التنفيذ وكفاية تخصيص الموارد",
            "متابعة تقدم التنفيذ وإعداد تقارير أداء دورية",
            "التحكم في الأداء المالي",
            "تعزيز الاستخدام المبتكر لموارد المشروع",
            "استخدام أساليب وتقنيات علمية حديثة في التنفيذ",
            "إدارة التغيير بفعالية",
            "تحديد الصعوبات والقيود والتغلب عليها بشكل استباقي",
            "تعزيز بيئة فريق إيجابية ومحفزة",
          ],
        },
        {
          name: "النتائج والأثر الإيجابي",
          points: "50 نقطة",
          description: "يقيّم نتائج المشروع/المبادرة من حيث تحقيق الأهداف والعائد على الاستثمار والأثر المستدام.",
          subItems: [
            "تحقيق أهداف المشروع/المبادرة بالكامل",
            "إظهار عائد واضح على الاستثمار أو قيمة اقتصادية مضافة",
            "تحقيق تحسينات قابلة للقياس في الأداء",
            "رضا أصحاب المصلحة عن النتائج",
            "استدامة الأثر وإمكانية التكرار",
          ],
        },
      ],
      rewards: [
        "شهادة تقدير وكأس للمشروع/المبادرة.",
        "ميدالية تقدير ومكافأة مالية لكل عضو في فريق المشروع.",
      ],
    },
  },

  green: {
    en: {
      title: "The Green Practices Category",
      overview:
        "This award recognizes departments that implement environmentally friendly practices, aiming to minimize environmental harm and promote sustainability within Sharjah Asset Management.",
      criteriaTitle: "Assessment Criteria",
      criteriaItems: [
        {
          name: "Organizational Resource Sustainability",
          points: "140 Points",
          description:
            "Evaluates the sustainability of organizational resource usage including energy, water, and materials.",
        },
        {
          name: "Waste Management & Environmental Impact Reduction",
          points: "130 Points",
          description:
            "Evaluates waste management practices and efforts to reduce environmental impact.",
        },
        {
          name: "Environmental Innovation",
          points: "130 Points",
          description:
            "Evaluates applied environmental initiatives and innovations.",
        },
        {
          name: "Supply Chain Sustainability",
          points: "100 Points",
          description:
            "Evaluates the application of sustainability standards in the supply chain.",
        },
        {
          name: "Awareness & Community Engagement",
          points: "100 Points",
          description:
            "Evaluates environmental awareness efforts and community engagement.",
        },
        {
          name: "Green Service Design Results & Impact",
          points: "150 Points",
          description:
            "Evaluates the results and impact of designing and delivering green services.",
        },
        {
          name: "Actual Environmental Performance",
          points: "150 Points",
          description:
            "Evaluates actual environmental performance and measurable results.",
        },
        {
          name: "Environmental Innovation Impact",
          points: "100 Points",
          description:
            "Evaluates the actual impact of applied environmental innovations.",
        },
      ],
      rewards: [
        "Certificate of Appreciation and Trophy for the department.",
        "Appreciation medal and Financial Reward for each employee in the department.",
      ],
    },
    ar: {
      title: "فئة الممارسات الخضراء",
      overview:
        "تكرّم هذه الجائزة الأقسام التي تطبق ممارسات صديقة للبيئة، بهدف تقليل الأضرار البيئية وتعزيز الاستدامة في الشارقة لإدارة الأصول.",
      criteriaTitle: "معايير التقييم",
      criteriaItems: [
        {
          name: "استدامة الموارد المؤسسية",
          points: "140 نقطة",
          description:
            "يقيّم مدى استدامة استخدام الموارد المؤسسية بما في ذلك الطاقة والمياه والمواد.",
        },
        {
          name: "إدارة النفايات وتقليل الأثر البيئي",
          points: "130 نقطة",
          description:
            "يقيّم ممارسات إدارة النفايات والجهود المبذولة لتقليل الأثر البيئي.",
        },
        {
          name: "الابتكار البيئي",
          points: "130 نقطة",
          description:
            "يقيّم المبادرات والابتكارات البيئية المطبقة.",
        },
        {
          name: "استدامة سلسلة التوريد",
          points: "100 نقطة",
          description:
            "يقيّم مدى تطبيق معايير الاستدامة في سلسلة التوريد.",
        },
        {
          name: "التوعية والمشاركة المجتمعية",
          points: "100 نقطة",
          description:
            "يقيّم جهود التوعية البيئية والمشاركة المجتمعية.",
        },
        {
          name: "نتائج وأثر تصميم الخدمات الخضراء",
          points: "150 نقطة",
          description:
            "يقيّم نتائج وأثر تصميم وتقديم الخدمات الخضراء.",
        },
        {
          name: "الأداء البيئي الفعلي",
          points: "150 نقطة",
          description:
            "يقيّم الأداء البيئي الفعلي والنتائج القابلة للقياس.",
        },
        {
          name: "أثر الابتكار البيئي",
          points: "100 نقطة",
          description:
            "يقيّم الأثر الفعلي للابتكارات البيئية المطبقة.",
        },
      ],
      rewards: [
        "شهادة تقدير وكأس للقسم.",
        "ميدالية تقدير ومكافأة مالية لكل موظف في القسم.",
      ],
    },
  },

  knowledge: {
    en: {
      title: "The Knowledge Management Category",
      overview:
        "This category encourages organizational units in SAM and its subsidiaries to apply best practices in Knowledge Management (KM), fostering a culture of sharing and continuous learning.",
      criteriaTitle: "Assessment Criteria",
      criteriaItems: [
        {
          name: "Knowledge Management Strategy",
          points: "150 Points",
          description: "Evaluates the existence of a clear knowledge management strategy aligned with organizational objectives.",
        },
        {
          name: "Knowledge Sharing Culture",
          points: "100 Points",
          description: "Evaluates the adoption of a knowledge sharing and continuous learning culture within the organization.",
        },
        {
          name: "Technologies & Systems Used",
          points: "100 Points",
          description: "Evaluates the systems and technologies used to capture, store, share, and retrieve knowledge.",
        },
        {
          name: "Innovation & Continuous Development",
          points: "120 Points",
          description: "Evaluates the extent to which knowledge is used to support innovation and continuous development.",
        },
        {
          name: "Community Engagement & Partnerships",
          points: "80 Points",
          description: "Evaluates the extent of knowledge sharing with the community and external partners.",
        },
        {
          name: "Transparency & Communication",
          points: "50 Points",
          description: "Evaluates the transparency and effectiveness of knowledge communication channels within the organization.",
        },
        {
          name: "Practical Application & Leading Models",
          points: "120 Points",
          description: "Evaluates successful practical models and applications of knowledge management.",
        },
        {
          name: "Measurement & Evaluation",
          points: "80 Points",
          description: "Evaluates the mechanisms for measuring and evaluating KM effectiveness.",
        },
        {
          name: "Continuous Learning & Capacity Building",
          points: "100 Points",
          description: "Evaluates continuous learning and capacity building programs related to knowledge management.",
        },
        {
          name: "Sustainability",
          points: "100 Points",
          description: "Evaluates the long-term sustainability of knowledge management practices.",
        },
      ],
      rewards: [
        "Certificate of Appreciation and Trophy for the department.",
        "Appreciation medal and Financial Reward for each employee in the department.",
      ],
    },
    ar: {
      title: "فئة إدارة المعرفة",
      overview:
        "تشجع هذه الفئة الوحدات التنظيمية في سام وشركاتها التابعة على تطبيق أفضل الممارسات في إدارة المعرفة، وتعزيز ثقافة المشاركة والتعلم المستمر.",
      criteriaTitle: "معايير التقييم",
      criteriaItems: [
        {
          name: "استراتيجية إدارة المعرفة",
          points: "150 نقطة",
          description: "يقيّم مدى وجود استراتيجية واضحة لإدارة المعرفة وتوافقها مع الأهداف المؤسسية.",
        },
        {
          name: "ثقافة مشاركة المعرفة",
          points: "100 نقطة",
          description: "يقيّم مدى تبني ثقافة مشاركة المعرفة والتعلم المستمر داخل المؤسسة.",
        },
        {
          name: "التقنيات والأنظمة المستخدمة",
          points: "100 نقطة",
          description: "يقيّم الأنظمة والتقنيات المستخدمة لالتقاط وتخزين ومشاركة واسترجاع المعرفة.",
        },
        {
          name: "الابتكار والتطوير المستمر",
          points: "120 نقطة",
          description: "يقيّم مدى استخدام المعرفة لدعم الابتكار والتطوير المستمر.",
        },
        {
          name: "المشاركة المجتمعية والشراكات",
          points: "80 نقطة",
          description: "يقيّم مدى مشاركة المعرفة مع المجتمع والشركاء الخارجيين.",
        },
        {
          name: "الشفافية والتواصل",
          points: "50 نقطة",
          description: "يقيّم مدى شفافية وفعالية قنوات التواصل المعرفي داخل المؤسسة.",
        },
        {
          name: "التطبيق العملي والنماذج الرائدة",
          points: "120 نقطة",
          description: "يقيّم النماذج والتطبيقات العملية الناجحة لإدارة المعرفة.",
        },
        {
          name: "القياس والتقييم",
          points: "80 نقطة",
          description: "يقيّم آليات قياس وتقييم فعالية إدارة المعرفة.",
        },
        {
          name: "التعلم المستمر وبناء القدرات",
          points: "100 نقطة",
          description: "يقيّم برامج التعلم المستمر وبناء القدرات المرتبطة بإدارة المعرفة.",
        },
        {
          name: "الاستدامة",
          points: "100 نقطة",
          description: "يقيّم مدى استدامة ممارسات إدارة المعرفة على المدى الطويل.",
        },
      ],
      rewards: [
        "شهادة تقدير وكأس للقسم.",
        "ميدالية تقدير ومكافأة مالية لكل موظف في القسم.",
      ],
    },
  },

  "employee-nonsupervisory": {
    en: {
      title: "Distinguished Employee — Non-Supervisory Categories",
      overview: "",
      note: "The following 5 categories utilize a standard set of assessment criteria: Performance & Achievement (40 pts), Initiative & Creativity (15 pts), Collaboration & Job Commitment (15 pts), Participation & Responsibility (15 pts), and Continuous Learning (15 pts).",
      criteriaTitle: "Assessment Criteria",
      criteriaItems: [
        {
          name: "Performance & Achievement",
          points: "40 pts",
          description: "Covers the employee's professional performance and achievements with exceeding targets and completing challenging tasks.",
        },
        {
          name: "Initiative & Creativity",
          points: "15 pts",
          description: "Covers the employee's self-initiative in proposing new ideas and initiatives to improve work performance.",
        },
        {
          name: "Collaboration & Job Commitment",
          points: "15 pts",
          description: "Focuses on employee collaboration with internal and external customers and behavioral commitment.",
        },
        {
          name: "Participation & Responsibility",
          points: "15 pts",
          description: "Focuses on participation in activities, volunteer efforts, and responsibility in non-routine situations.",
        },
        {
          name: "Continuous Learning",
          points: "15 pts",
          description: "Covers the employee's desire to learn job-related skills and efforts to acquire knowledge.",
        },
      ],
      rewards: [
        "Certificate of Appreciation and Trophy.",
        "Appreciation medal and Financial Reward.",
      ],
      subcategories: [
        {
          title: "The Distinguished Administrative Employee",
          eligibility:
            "Open to all employees who have completed three years or more of service, or those nominated by the CEO. Candidates must demonstrate extraordinary performance and achievements over the last three years.",
          note: "Once selected for this category, an employee cannot be nominated for other categories.",
        },
        {
          title: "The Distinguished Specialized Employee",
          eligibility:
            "Open to employees in specialized fields with three years or more of service.",
          requirements: [
            "Role requires professional experience and academic qualification in a specific area.",
            "Examples include investment or corporate support functions such as Accounting, Human Resources, Audit, and Risk Management.",
            "Must be a non-supervisory role.",
          ],
        },
        {
          title: "The Distinguished Technical Field Employee",
          eligibility:
            "Open to skilled technical employees and specialists in field roles with three years or more of service.",
          requirements: [
            "Role requires direct supervision of projects and fieldwork.",
            "Examples include Engineers and Maintenance Technicians.",
            "Position requires an academic qualification in the relevant area of specialization.",
          ],
        },
        {
          title: "The Distinguished Customer Service Employee",
          eligibility:
            "Open to all employees directly engaged in serving external customers of Sharjah Asset Management.",
          requirements: [
            "Roles include, but are not limited to, Receptionists, Front-line Executives, and Customer Service Executives.",
          ],
        },
        {
          title: "The Distinguished Unknown Soldier",
          eligibility:
            "This category is for employees working in base maintenance and logistic jobs.",
          requirements: [
            "Must be nominated by the direct in-charge (Director level or above).",
          ],
        },
      ],
    },
    ar: {
      title: "الموظف المتميز — الفئات غير الإشرافية",
      overview: "",
      note: "تستخدم الفئات الخمس التالية مجموعة معيارية من معايير التقييم: الأداء والإنجاز (40 نقطة)، المبادرة والإبداع (15 نقطة)، التعاون والالتزام الوظيفي (15 نقطة)، المشاركة وتحمل المسؤولية (15 نقطة)، والتعلم المستمر (15 نقطة).",
      criteriaTitle: "معايير التقييم",
      criteriaItems: [
        {
          name: "الأداء والإنجاز",
          points: "40 نقطة",
          description: "يتناول الأداء المهني والإنجازات للموظف مع تجاوز الأهداف وإنجاز مهام صعبة.",
        },
        {
          name: "المبادرة والإبداع",
          points: "15 نقطة",
          description: "يتناول مبادرة الموظف الذاتية لاقتراح أفكار جديدة ومبادرات لتحسين الأداء.",
        },
        {
          name: "التعاون والالتزام الوظيفي",
          points: "15 نقطة",
          description: "يركز على درجة التعاون مع العملاء والالتزام الوظيفي والسلوكي.",
        },
        {
          name: "المشاركة وتحمل المسؤولية",
          points: "15 نقطة",
          description: "يركز على المشاركة في الأنشطة والجهود التطوعية وتحمل المسؤولية.",
        },
        {
          name: "التعلم المستمر",
          points: "15 نقطة",
          description: "يتناول رغبة الموظف في تعلم المهارات والجهود المبذولة لاكتساب المعرفة.",
        },
      ],
      rewards: [
        "شهادة تقدير وكأس.",
        "ميدالية تقدير ومكافأة مالية.",
      ],
      subcategories: [
        {
          title: "الموظف الإداري المتميز",
          eligibility:
            "مفتوح لجميع الموظفين الذين أكملوا ثلاث سنوات أو أكثر من الخدمة، أو المرشحين من قبل الرئيس التنفيذي. يجب أن يُظهر المرشحون أداءً استثنائياً وإنجازات خلال السنوات الثلاث الماضية.",
          note: "بمجرد اختياره لهذه الفئة، لا يمكن ترشيح الموظف لفئات أخرى.",
        },
        {
          title: "الموظف التخصصي المتميز",
          eligibility:
            "مفتوح للموظفين في المجالات التخصصية بخبرة ثلاث سنوات أو أكثر.",
          requirements: [
            "يتطلب الدور خبرة مهنية ومؤهلاً أكاديمياً في مجال محدد.",
            "تشمل الأمثلة وظائف الاستثمار أو الدعم المؤسسي مثل المحاسبة والموارد البشرية والتدقيق وإدارة المخاطر.",
            "يجب أن يكون دوراً غير إشرافي.",
          ],
        },
        {
          title: "الموظف الفني الميداني المتميز",
          eligibility:
            "مفتوح للموظفين الفنيين المهرة والمتخصصين في الأدوار الميدانية بخبرة ثلاث سنوات أو أكثر.",
          requirements: [
            "يتطلب الدور الإشراف المباشر على المشاريع والعمل الميداني.",
            "تشمل الأمثلة المهندسين وفنيي الصيانة.",
            "يتطلب المنصب مؤهلاً أكاديمياً في مجال التخصص المعني.",
          ],
        },
        {
          title: "موظف خدمة المتعاملين المتميز",
          eligibility:
            "مفتوح لجميع الموظفين المشاركين مباشرة في خدمة العملاء الخارجيين للشارقة لإدارة الأصول.",
          requirements: [
            "تشمل الأدوار على سبيل المثال لا الحصر، موظفي الاستقبال والتنفيذيين في الخطوط الأمامية وتنفيذيي خدمة العملاء.",
          ],
        },
        {
          title: "الجندي المجهول المتميز",
          eligibility:
            "هذه الفئة مخصصة للموظفين العاملين في وظائف الصيانة الأساسية واللوجستيات.",
          requirements: [
            "يجب أن يتم ترشيحه من قبل المسؤول المباشر (مستوى مدير فما فوق).",
          ],
        },
      ],
    },
  },

  "employee-supervisory": {
    en: {
      title: "Distinguished Employee — Supervisory Categories",
      overview: "",
      note: "The Distinguished Leader uses 6 criteria: Strategic Performance & Impact (20 pts), Strategic Initiative & Innovation Leadership (15 pts), Stakeholder Collaboration & Leadership Commitment (15 pts), Accountability, Engagement & Community Contribution (15 pts), Strategic Learning & Knowledge Leadership (15 pts), and Visionary Leadership & Competency (20 pts). The Distinguished Future Leader uses: Performance & Achievement (20 pts), Initiative & Creativity (15 pts), Collaboration & Job Commitment (15 pts), Participation & Responsibility (15 pts), Continuous Learning (15 pts), and Vision & Supervisory Skills (20 pts).",
      criteriaTitle: "Assessment Criteria",
      criteriaItems: [
        {
          name: "Strategic Performance & Impact",
          points: "20 pts",
          description: "Evaluates leadership effectiveness in achieving organizational results and delivering measurable outcomes.",
        },
        {
          name: "Strategic Initiative & Innovation Leadership",
          points: "15 pts",
          description: "Evaluates leadership's ability to lead innovative ideas and initiatives that enhance organizational performance.",
        },
        {
          name: "Stakeholder Collaboration & Leadership Commitment",
          points: "15 pts",
          description: "Evaluates effectiveness in building productive stakeholder relationships and demonstrating ethical behavior.",
        },
        {
          name: "Accountability, Engagement & Community Contribution",
          points: "15 pts",
          description: "Evaluates commitment to shared responsibility and active participation in organizational and community initiatives.",
        },
        {
          name: "Strategic Learning & Knowledge Leadership",
          points: "15 pts",
          description: "Evaluates commitment to continuous learning, knowledge sharing, and capability development.",
        },
        {
          name: "Visionary Leadership & Competency",
          points: "20 pts",
          description: "Evaluates effectiveness in setting direction, planning, leading, and ensuring sustainable organizational success.",
        },
      ],
      rewards: [
        "Certificate of Appreciation and Trophy.",
        "Appreciation medal and Financial Reward.",
      ],
      subcategories: [
        {
          title: "The Distinguished Leader",
          eligibility:
            "Open to employees in senior executive positions, such as Executive Directors and above.",
          requirements: [
            "Must have completed at least 24 months of service (excluding probation) from the date of appointment.",
            "Prerequisite: The leader is only eligible to participate if their organizational unit has also participated in the Distinguished Departmental Category.",
          ],
        },
        {
          title: "The Distinguished Future Leader",
          eligibility:
            "Open to employees in leadership positions, starting from the Supervisor level and above.",
          requirements: [
            "Must have direct subordinates.",
            "Must have completed three years of service.",
          ],
        },
      ],
    },
    ar: {
      title: "الموظف المتميز — الفئات الإشرافية",
      overview: "",
      note: "يستخدم القائد المتميز 6 معايير: الأداء الاستراتيجي والأثر (20 نقطة)، المبادرة الاستراتيجية وقيادة الابتكار (15 نقطة)، التعاون مع أصحاب المصلحة والالتزام القيادي (15 نقطة)، المساءلة والمشاركة والمساهمة المجتمعية (15 نقطة)، التعلم الاستراتيجي وقيادة المعرفة (15 نقطة)، والقيادة الرؤيوية والكفاءة (20 نقطة). يستخدم قائد المستقبل المتميز: الأداء والإنجاز (20 نقطة)، المبادرة والإبداع (15 نقطة)، التعاون والالتزام الوظيفي (15 نقطة)، المشاركة وتحمل المسؤولية (15 نقطة)، التعلم المستمر (15 نقطة)، والرؤية والمهارات الإشرافية (20 نقطة).",
      criteriaTitle: "معايير التقييم",
      criteriaItems: [
        {
          name: "الأداء الاستراتيجي والأثر",
          points: "20 نقطة",
          description: "يقيّم فعالية القيادة في تحقيق نتائج مؤسسية وقيادة مبادرات استراتيجية.",
        },
        {
          name: "المبادرة الاستراتيجية وقيادة الابتكار",
          points: "15 نقطة",
          description: "يقيّم قدرة القيادة على المبادرة الاستباقية وقيادة مبادرات مبتكرة.",
        },
        {
          name: "التعاون مع أصحاب المصلحة والالتزام القيادي",
          points: "15 نقطة",
          description: "يقيّم فعالية القيادة في بناء علاقات منتجة والالتزام بالقيم المؤسسية.",
        },
        {
          name: "المساءلة والمشاركة والمساهمة المجتمعية",
          points: "15 نقطة",
          description: "يقيّم التزام القيادة بالمسؤولية المشتركة والمشاركة الفعالة.",
        },
        {
          name: "التعلم الاستراتيجي وقيادة المعرفة",
          points: "15 نقطة",
          description: "يقيّم التزام القيادة بالتعلم المستمر ومشاركة المعرفة.",
        },
        {
          name: "القيادة الرؤيوية والكفاءة",
          points: "20 نقطة",
          description: "يقيّم فعالية القيادة في تحديد التوجه والتخطيط وضمان النجاح المؤسسي المستدام.",
        },
      ],
      rewards: [
        "شهادة تقدير وكأس.",
        "ميدالية تقدير ومكافأة مالية.",
      ],
      subcategories: [
        {
          title: "القائد المتميز",
          eligibility:
            "مفتوح للموظفين في المناصب التنفيذية العليا، مثل المديرين التنفيذيين وما فوق.",
          requirements: [
            "يجب أن يكون قد أكمل 24 شهراً على الأقل من الخدمة (باستثناء فترة الاختبار) من تاريخ التعيين.",
            "شرط مسبق: القائد مؤهل للمشاركة فقط إذا شاركت وحدته التنظيمية أيضاً في فئة الإدارة المتميزة.",
          ],
        },
        {
          title: "قائد المستقبل المتميز",
          eligibility:
            "مفتوح للموظفين في المناصب القيادية، بدءاً من مستوى المشرف وما فوق.",
          requirements: [
            "يجب أن يكون لديه مرؤوسون مباشرون.",
            "يجب أن يكون قد أكمل ثلاث سنوات من الخدمة.",
          ],
        },
      ],
    },
  },
};
