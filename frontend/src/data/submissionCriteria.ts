// ═══ Type Definitions ═══

export interface CriterionDefinition {
    id: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    points: string;
    evidenceListAr: string[];
    evidenceListEn: string[];
    examplesListAr?: string[];
    examplesListEn?: string[];
    group?: "enablers" | "results";
    ratingScale?: {
        min: number;
        max: number;
        minLabelAr: string;
        minLabelEn: string;
        maxLabelAr: string;
        maxLabelEn: string;
    };
    justificationLabelAr?: string;
    justificationLabelEn?: string;
    subCriteria?: {
        id: string;
        titleAr: string;
        titleEn: string;
        evidenceAr?: string;
        evidenceEn?: string;
    }[];
}

export interface ExtraInfoField {
    id: string;
    type: "text" | "number" | "date" | "textarea" | "select";
    labelAr: string;
    labelEn: string;
    required: boolean;
    options?: { value: string; labelAr: string; labelEn: string }[];
}

export interface CategorySubmissionConfig {
    slugs: string[];
    steps: string[];
    maxWordsPerCriterion: number;
    maxFilesPerCriterion: number;
    extraInfoFields: ExtraInfoField[];
    criteria: CriterionDefinition[];
    totalPoints: number;
}

export interface SimulatedFile {
    id: string;
    name: string;
    size: number;
    type: string;
}

export interface SubmissionFormData {
    employeeSubcategory: string;
    fullName: string;
    employeeId: string;
    email: string;
    phone: string;
    nominationReason: string;
    extraFields: Record<string, string>;
    criteriaResponses: Record<string, { text: string; files: SimulatedFile[]; rating?: number }>;
}

export const initialFormData: SubmissionFormData = {
    employeeSubcategory: "",
    fullName: "",
    employeeId: "",
    email: "",
    phone: "",
    nominationReason: "",
    extraFields: {},
    criteriaResponses: {},
};

// ═══ Employee Subcategories ═══

export const employeeSubcategories: Record<string, { value: string; labelAr: string; labelEn: string }[]> = {
    nonsupervisory: [
        { value: "administrative", labelAr: "الموظف الإداري المتميز", labelEn: "Distinguished Administrative Employee" },
        { value: "specialist", labelAr: "الموظف التخصصي المتميز", labelEn: "Distinguished Specialized Employee" },
        { value: "technical", labelAr: "الموظف الفني الميداني المتميز", labelEn: "Distinguished Technical Field Employee" },
        { value: "customerservice", labelAr: "موظف خدمة المتعاملين المتميز", labelEn: "Distinguished Customer Service Employee" },
        { value: "unsung", labelAr: "الجندي المجهول المتميز", labelEn: "Distinguished Unknown Soldier" },
    ],
    supervisory: [
        { value: "leader", labelAr: "القائد المتميز", labelEn: "Distinguished Leader" },
        { value: "futureleader", labelAr: "قائد المستقبل المتميز", labelEn: "Distinguished Future Leader" },
    ],
};

// ═══ Shared Employee Extra Fields ═══

const sharedEmployeeExtraFields: ExtraInfoField[] = [
    { id: "department", type: "text", labelAr: "القسم / الإدارة", labelEn: "Department / Division", required: true },
    { id: "yearsOfService", type: "number", labelAr: "سنوات الخدمة", labelEn: "Years of Service", required: true },
    { id: "position", type: "text", labelAr: "المسمى الوظيفي", labelEn: "Job Title / Position", required: true },
];

// ═══ Non-Supervisory Employee Criteria ═══

const patternACriteria: CriterionDefinition[] = [
    {
        id: "emp-perf",
        titleAr: "الأداء والإنجاز",
        titleEn: "Performance & Achievement",
        descriptionAr: "يركز على أداء الموظف وإنجازاته الوظيفية والمهنية، ويتضمن ذلك حجم ونوعية الأداء وطبيعة الإنجازات، بما في ذلك تحقيق أهداف تزيد عن المتوقع أو تتفوق على متطلبات عمله الوظيفي. ويتضمن كذلك إنجاز مهام صعبة تتطلب وقتًا وجهدًا وعملًا دؤوبًا.",
        descriptionEn: "Focuses on the employee's job and professional performance and achievements, including the volume and quality of performance and the nature of accomplishments, including achieving goals that exceed expectations or surpass job requirements. Also includes completing difficult tasks requiring time, effort, and diligent work.",
        points: "40",
        evidenceListAr: [
            "أدلة/أمثلة على الجهود المبذولة لتحقيق أهداف محددة وإنجازات فردية",
            "أدلة/أمثلة على التغلب على المعوقات والصعوبات",
            "أدلة/أمثلة على سرعة ودقة الإنجازات مقارنة بالمواعيد المحددة لها",
            "أدلة/أمثلة على مدى تجاوز التوقعات ومهام الوظيفة",
            "أدلة/أمثلة على العمل ضمن خطة واضحة بمؤشرات أداء محددة وأطر زمنية",
        ],
        evidenceListEn: [
            "Evidence/examples of doing efforts to achieve specific objectives and individual achievements.",
            "Evidence/examples of overcoming obstacles and difficulties.",
            "Evidence/examples on speed and accuracy of achievements in comparison with the deadlines.",
            "Evidence/examples of exceeding expectations and functions.",
            "Evidence/examples of working within a clear plan with a specific performance indicators and timeframes.",
        ],
    },
    {
        id: "emp-init",
        titleAr: "المبادرة والإبداع",
        titleEn: "Initiative & Creativity",
        descriptionAr: "يركز هذا المعيار على مدى مبادرة الموظف في تقديم أفكار أو اقتراحات أو دراسات أو مبادرات أو أساليب عمل متميزة ومبدعة تساهم في تطوير الأداء أو تحسين الإنتاجية أو الارتقاء بمستوى الخدمات المقدمة للمتعاملين أو تبسيط الإجراءات.",
        descriptionEn: "Focuses on the employee's initiative in presenting ideas, suggestions, studies, initiatives, or distinguished and creative work methods that contribute to developing performance, improving productivity, enhancing services provided to customers, or simplifying procedures.",
        points: "15",
        evidenceListAr: [
            "اقتراح أفكار ومنهجيات وعمليات عمل فعالة بشكل منهجي",
            "أمثلة تُظهر مدى حرص الموظف على تحسين مهارات الحاسوب والإنترنت واللغات ومهارات التواصل أو المهارات التخصصية المرتبطة بالوظيفة",
            "أدلة/أمثلة على التحسين المستمر لإجراءات العمل والخدمات",
            "أدلة/أمثلة على طبيعة الإبداع ونتائجه وتأثيراته",
        ],
        evidenceListEn: [
            "Systematically suggesting effective ideas and work methodologies and processes.",
            "Examples to demonstrate the employee attention to improve the computer skills, internet skills, languages, communication skills, or specialized skills related to the job.",
            "Evidence/examples of continuous improvement of work procedures and services.",
            "Evidence/examples of nature of creativity and its results and impacts.",
        ],
    },
    {
        id: "emp-collab",
        titleAr: "التعاون والالتزام الوظيفي",
        titleEn: "Collaboration & Job Commitment",
        descriptionAr: "يركز هذا المعيار على درجة تعاون الموظف مع المتعاملين من خارج الشركة ومن داخلها، ومدى الإيجابية في التعامل معهم. كما يركز على درجة الالتزام الوظيفي والسلوكي للموظف من خلال التزامه بالأنظمة المؤسسية واحترامه لها، مدعمًا بسجل وظيفي خالٍ من المخالفات بأنواعها.",
        descriptionEn: "Focuses on the degree of employee collaboration with internal and external customers, and the positivity in dealing with them. Also focuses on the employee's job and behavioral commitment through adherence to and respect for organizational systems, supported by a professional record free of violations.",
        points: "15",
        evidenceListAr: [
            "أمثلة/أدلة توضح درجة تعاون وأسلوب تعامل الموظف مع المتعاملين من داخل وخارج المؤسسة",
            "أمثلة/أدلة تؤكد حرص الموظف واستعداده لبذل جهود/وقت إضافي",
            "أمثلة/أدلة عملية تُظهر قدرة وحرص الموظف على العمل ضمن فرق العمل",
            "أمثلة/أدلة عملية توضح احترام الموظف لأنظمة وقوانين المؤسسة ومدى التزامه وتطبيقه لمبادئها وقواعدها",
        ],
        evidenceListEn: [
            "Examples/evidence showing the degree of cooperation and the employee's dealings with clients from inside and outside SAM.",
            "Examples/evidence confirming the employee's eagerness to put in extra efforts/time.",
            "Examples/practical evidence that demonstrate the employee's ability and eagerness to work within work teams.",
            "Practical examples/evidence that illustrate the employee's respect for the SAM's regulations and laws, and the extent of his adherence and commitment to implementing the principles and rules they contain.",
        ],
    },
    {
        id: "emp-resp",
        titleAr: "المشاركة وتحمل المسؤولية",
        titleEn: "Participation & Responsibility",
        descriptionAr: "يركز هذا المعيار على مدى حرص الموظف على المشاركة في النشاطات والفعاليات الرسمية وغير الرسمية التي تنظمها/تشارك بها المؤسسة، ومدى مساهمته في الجهود التطوعية التي ترعاها. كما يركز هذا المعيار على درجة تحمل الموظف لمسؤولياته الوظيفية خاصة في الحالات غير الروتينية.",
        descriptionEn: "Focuses on the employee's keenness to participate in official and unofficial activities organized by the organization, contribution to volunteer efforts, and degree of responsibility especially in non-routine situations.",
        points: "15",
        evidenceListAr: [
            "الأعمال التطوعية التي قام بها الموظف، ومدى علاقتها بمتطلبات عمله الوظيفي",
            "المشاركة في النشاطات والفعاليات الرسمية وغير الرسمية التي تنظمها المؤسسة",
            "درجة تحمل الموظف لمسؤولية ما يكلف به من مهام خاصة في الحالات غير الروتينية",
            "درجة تحمل الموظف لضغوط العمل ومتطلباته، ومدى تجاوب الموظف وهدوءه وحسن تصرفه في تلك المواقف",
        ],
        evidenceListEn: [
            "The volunteer work carried out by the employee, and the extent of its relationship to the requirements of his job.",
            "Participating in official and informal activities and events organized by SAM, whether financially or morally.",
            "The degree to which the employee bears responsibility for the tasks assigned to him, especially in unusual/routine cases.",
            "The employee's degree of tolerance for work pressures and requirements and the extent of the employee's responsiveness, calmness, and good behavior in those situations.",
        ],
    },
    {
        id: "emp-learn",
        titleAr: "التعلم المستمر",
        titleEn: "Continuous Learning",
        descriptionAr: "يركز هذا المعيار على مدى رغبة وقدرة الموظف على تعلم المهارات المتعلقة بمهام عمله، ومدى استفادته من خبرات زملائه، والجهود التي يبذلها الموظف للاطلاع على أية معارف أو معلومات حديثة تتعلق بعمله وتساهم في تطوير أدائه.",
        descriptionEn: "Focuses on the employee's desire and ability to learn skills related to work tasks, benefiting from colleagues' experiences, and efforts to acquire new knowledge or information that contributes to developing performance.",
        points: "15",
        evidenceListAr: [
            "أدلة/أمثلة على تبادل المعرفة مع الآخرين",
            "أدلة/أمثلة على اكتساب المعرفة والمهارات بسرعة",
            "أدلة/أمثلة على المشاركة في مجموعات/هيئات مهنية متخصصة",
            "حجم التبادل المعرفي بين الموظف وبين زملائه والمتعاملين والشركاء، وأساليب التبادل ومدى الاستفادة من هذه المعرفة في العمل",
            "الجهود المبذولة من الموظف لتحسين تحصيله العلمي وضمان التطوير الذاتي لقدراته ومهاراته",
        ],
        evidenceListEn: [
            "Evidence/examples of exchanging knowledge with others.",
            "Evidence/examples of acquiring knowledge and skills quickly.",
            "Evidence/examples of participating in professional specialized groups/bodies.",
            "The volume of knowledge exchange between the employee and his colleagues, customers, and partners, the methods of exchange, and the extent of benefiting from this knowledge at work.",
            "The efforts made by the employee to improve his educational attainment, and to ensure the self-development of his abilities and skills.",
        ],
    },
];

// ═══ Distinguished Leader Criteria ═══

const leaderCriteria: CriterionDefinition[] = [
    {
        id: "ldr-perf",
        titleAr: "الأداء الاستراتيجي والأثر",
        titleEn: "Strategic Performance & Impact",
        descriptionAr: "يقيّم فعالية القيادة في تحقيق نتائج مؤسسية وقيادة مبادرات استراتيجية وتحقيق نتائج قابلة للقياس تخلق قيمة مستدامة لأصحاب المصلحة.",
        descriptionEn: "Evaluates leadership effectiveness in achieving organizational results, leading strategic initiatives, and delivering measurable outcomes that create sustainable value for stakeholders.",
        points: "20",
        evidenceListAr: [
            "أدلة/أمثلة على قيادة مبادرات تحقق أو تتجاوز الأهداف والغايات الاستراتيجية المؤسسية",
            "أدلة/أمثلة على التغلب بنجاح على تحديات مؤسسية معقدة والتعامل مع العقبات",
            "أدلة/أمثلة على تحقيق نتائج بكفاءة وجودة وفي الوقت المحدد على المستوى الاستراتيجي",
            "أدلة/أمثلة على تجاوز التوقعات في القيادة والابتكار والتأثير عبر الوظائف",
            "أدلة/أمثلة على تطوير وتنفيذ استراتيجيات واضحة وخطط عمل بمؤشرات أداء ومقاييس وجداول زمنية محددة",
            "أدلة/أمثلة على دفع خلق قيمة مستدامة تشمل الأثر المالي والتشغيلي والاجتماعي والبيئي",
        ],
        evidenceListEn: [
            "Evidence / examples of Leading initiatives that achieve or exceed strategic objectives and organizational goals.",
            "Evidence / examples of Successfully overcoming complex organizational challenges and navigating obstacles.",
            "Evidence / examples of Delivering results with efficiency, quality, and timeliness at a strategic level.",
            "Evidence / examples of Exceeding expectations in leadership, innovation, and cross-functional influence.",
            "Evidence / examples of Developing and executing clear strategies and action plans with defined KPIs, performance metrics, and timelines.",
            "Evidence / examples of Driving sustainable value creation, including financial, operational, social, and environmental impact.",
        ],
    },
    {
        id: "ldr-innov",
        titleAr: "المبادرة الاستراتيجية وقيادة الابتكار",
        titleEn: "Strategic Initiative & Innovation Leadership",
        descriptionAr: "يقيّم قدرة القيادة على المبادرة الاستباقية ورعاية وقيادة أفكار ودراسات ومبادرات مبتكرة تعزز الأداء المؤسسي والإنتاجية وتجربة العملاء وكفاءة العمليات.",
        descriptionEn: "Evaluates leadership's ability to proactively initiate, sponsor, and lead innovative ideas, studies, and initiatives that enhance organizational performance, productivity, customer experience, and process efficiency.",
        points: "15",
        evidenceListAr: [
            "المبادرة وتبني أفكار ومنهجيات ونماذج تشغيلية مبتكرة تدفع التحسين المؤسسي",
            "إنشاء مناهج منظمة للابتكار والتحسين المستمر وتبسيط العمليات عبر المؤسسة",
            "قيادة واستدامة التحسين المستمر لإجراءات العمل والخدمات ونماذج الأعمال",
            "إظهار الالتزام بتطوير القدرات الشخصية والمؤسسية بما في ذلك القيادة الرقمية واتخاذ القرارات المبنية على البيانات",
            "إظهار الإبداع في التفكير الاستراتيجي وحل المشكلات مدعوماً بنتائج قابلة للقياس وأثر مؤسسي إيجابي",
        ],
        evidenceListEn: [
            "Evidence / examples of Proactively initiating and championing innovative ideas, methodologies, and operating models that drive organizational improvement.",
            "Evidence / examples of Establishing systematic approaches for innovation, continuous improvement, and process simplification across the organization.",
            "Evidence/examples of Leading and sustaining continuous improvement of work procedures, services, and business models.",
            "Evidence/examples Demonstrated commitment to personal and organizational capability development, including digital leadership, data-driven decision-making, communication, languages, or specialized executive competencies.",
            "Evidence / examples Demonstrating creativity in strategic thinking and problem-solving, supported by measurable results and positive organizational impact (financial, operational, customer, or societal).",
        ],
    },
    {
        id: "ldr-stake",
        titleAr: "التعاون مع أصحاب المصلحة والالتزام القيادي",
        titleEn: "Stakeholder Collaboration & Leadership Commitment",
        descriptionAr: "يقيّم فعالية القيادة في بناء علاقات منتجة مع أصحاب المصلحة الداخليين والخارجيين وإظهار المشاركة الإيجابية والتعاون والالتزام القوي بالقيم المؤسسية والحوكمة والسلوك الأخلاقي.",
        descriptionEn: "Evaluates leadership effectiveness in building productive relationships with internal and external stakeholders and demonstrating positive engagement, collaboration, and strong commitment to organizational values, governance, and ethical behavior.",
        points: "15",
        evidenceListAr: [
            "إظهار القيادة في تعزيز التعاون الفعال والمشاركة البناءة مع الفرق الداخلية والشركاء والعملاء وأصحاب المصلحة الخارجيين",
            "الالتزام الشخصي والمساءلة بما في ذلك الاستعداد لاستثمار جهد ووقت إضافي لتحقيق الأولويات الاستراتيجية المؤسسية",
            "قيادة وتمكين والمشاركة في فرق عمل عالية الأداء وتعزيز التعاون عبر الوظائف والمستويات التنظيمية",
            "احترام أنظمة وسياسات وأطر SAM القانونية وسلوك قدوة متسق في تطبيق مبادئ الحوكمة",
            "سجل مهني يعكس النزاهة والامتثال والالتزام بالمعايير الأخلاقية خالٍ من المخالفات",
        ],
        evidenceListEn: [
            "Evidence / examples Demonstrated leadership in fostering effective cooperation and constructive engagement with internal teams and external partners, clients, and stakeholders.",
            "Evidence / examples of personal commitment and accountability, including willingness to invest additional effort and time to achieve organizational priorities and strategic objectives.",
            "Evidence/examples of leading, empowering, and participating in high-performing teams, promoting collaboration across functions and organizational levels.",
            "Evidence/examples of respect for SAM's regulations, policies, and legal frameworks, and consistent role-model behavior in applying governance principles.",
            "Evidence/examples of A professional conduct record reflecting integrity, compliance, and adherence to ethical standards, free from violations or misconduct.",
        ],
    },
    {
        id: "ldr-account",
        titleAr: "المساءلة والمشاركة والمساهمة المجتمعية",
        titleEn: "Accountability, Engagement & Community Contribution",
        descriptionAr: "يقيّم التزام القيادة بالمسؤولية المشتركة والمشاركة الفعالة في المبادرات المؤسسية والمجتمعية والمساءلة الشخصية في قيادة المؤسسة عبر المواقف الروتينية وغير الروتينية بمرونة واحترافية.",
        descriptionEn: "Evaluates leadership commitment to shared responsibility, active participation in organizational and community initiatives, and personal accountability in leading through routine and non-routine situations with flexibility and professionalism.",
        points: "15",
        evidenceListAr: [
            "المشاركة الفعالة والقيادة في أنشطة وفعاليات SAM الرسمية وغير الرسمية",
            "مساهمة ذات معنى في مبادرات التطوع والمسؤولية الاجتماعية المتوافقة مع القيم والأهداف الاستراتيجية المؤسسية",
            "إظهار الملكية والمساءلة عن المسؤوليات المسندة خاصة في المواقف المعقدة وغير الروتينية أو عالية المخاطر",
            "المرونة والهدوء تحت الضغط بما في ذلك اتخاذ القرارات بهدوء والاستجابة والسلوك البنّاء",
            "كونه قدوة في تقاسم المسؤولية ودعم الآخرين وتعزيز ثقافة الالتزام والثقة والتعاون",
        ],
        evidenceListEn: [
            "Evidence / examples of Active participation and leadership in official and informal activities and events organized or supported by SAM, through personal involvement, sponsorship, or advocacy.",
            "Evidence/examples of Meaningful contribution to volunteer and social responsibility initiatives aligned with organizational values and strategic objectives.",
            "Evidence/examples Demonstrated ownership and accountability for assigned responsibilities, particularly in complex, non-routine, or high-risk situations.",
            "Evidence/examples of resilience and composure under pressure, including calm decision-making, responsiveness, and constructive behavior.",
            "Evidence / examples of Acting as a role model in sharing responsibility, supporting others, and fostering a culture of commitment, trust, and collaboration.",
        ],
    },
    {
        id: "ldr-learn",
        titleAr: "التعلم الاستراتيجي وقيادة المعرفة",
        titleEn: "Strategic Learning & Knowledge Leadership",
        descriptionAr: "يقيّم التزام القيادة بالتعلم المستمر ومشاركة المعرفة وتطوير القدرات ومدى الاستفادة من التعلم لتعزيز الفعالية الشخصية والأداء المؤسسي.",
        descriptionEn: "Evaluates leadership commitment to continuous learning, knowledge sharing, capability development, and leveraging learning to enhance personal effectiveness and organizational performance.",
        points: "15",
        evidenceListAr: [
            "التبادل الفعال للمعرفة والرؤى وأفضل الممارسات مع الزملاء والعملاء والشركاء وأصحاب المصلحة",
            "القدرة المُثبتة على اكتساب وتطبيق معرفة ومهارات وكفاءات جديدة بسرعة",
            "المشاركة والقيادة في هيئات مهنية ومتخصصة وقطاعية والمساهمة في الريادة الفكرية",
            "آليات تبادل معرفة منظمة مثل التوجيه ومجتمعات الممارسة والمنصات التعاونية",
            "الاستثمار المستمر في التطوير الذاتي من خلال التعليم والتعلم التنفيذي والشهادات",
        ],
        evidenceListEn: [
            "Evidence / examples of Actively exchanging knowledge, insights, and best practices with colleagues, customers, partners, and stakeholders to support informed decision-making and innovation.",
            "Evidence / examples Demonstrated ability to rapidly acquire and apply new knowledge, skills, and competencies relevant to executive and organizational needs.",
            "Evidence / examples of Participation and leadership in professional, specialized, or industry bodies, contributing to thought leadership and organizational learning.",
            "Evidence / examples of structured knowledge exchange mechanisms (formal and informal), such as mentoring, communities of practice, or collaborative platforms, and effective application of shared knowledge in work outcomes.",
            "Evidence/examples of Continuous investment in self-development through education, executive learning, certifications, or strategic skill enhancement to build current and future leadership capabilities.",
        ],
    },
    {
        id: "ldr-vision",
        titleAr: "القيادة الرؤيوية والكفاءة",
        titleEn: "Visionary Leadership & Competency",
        descriptionAr: "يقيّم فعالية القيادة في تحديد التوجه والتخطيط والقيادة والتفويض والتحفيز وتطوير الكوادر مع ضمان التنفيذ الكفء وحوكمة الأداء والنجاح المؤسسي المستدام.",
        descriptionEn: "Evaluates leadership effectiveness in setting direction, planning, leading, delegating, motivating, and developing talent while ensuring efficient execution, performance governance, and sustainable organizational success.",
        points: "20",
        evidenceListAr: [
            "القدرة المُثبتة على تطوير خطط عمل استراتيجية وتشغيلية واضحة للوحدات التنظيمية والفرق متعددة الوظائف وتنفيذها بفعالية",
            "القدرة على اكتساب وتطبيق المعرفة القيادية والإدارية والتقنية بسرعة لتلبية الاحتياجات المؤسسية المتطورة",
            "تطبيق أنظمة قياس أداء قوية لتقييم الأداء الشخصي والفريقي والمؤسسي مقابل أهداف ومؤشرات أداء محددة",
            "بناء وتعزيز رأس المال البشري وقدرات العمل الجماعي وتعزيز الحافز والمبادرة والإبداع والمساءلة",
            "كونه قدوة في النزاهة والاحترافية والأداء العالي والتأثير الإيجابي على المواقف والسلوكيات عبر المؤسسة",
            "تقديم المصالح المؤسسية لـ SAM على المصالح الشخصية في اتخاذ القرارات والإجراءات القيادية",
            "الاستخدام الفعال للموارد المتاحة وتعظيم العائد على الاستثمار وضمان الإدارة المسؤولة",
            "القيادة المُثبتة في إدارة التغيير ودفع التحسين المستمر وتمكين التحول نحو أداء مؤسسي أفضل",
        ],
        evidenceListEn: [
            "Evidence/examples Demonstrated ability to develop clear strategic and operational action plans for organizational units and cross-functional teams, and to execute them effectively.",
            "Evidence / examples of Ability to rapidly acquire and apply leadership, managerial, and technical knowledge to address evolving organizational needs.",
            "Evidence / examples of Application of robust performance measurement systems to assess personal, team, and organizational performance against defined goals and KPIs.",
            "Evidence / examples of Building and strengthening human capital and teamwork capabilities, fostering motivation, initiative, creativity, and accountability.",
            "Evidence / examples of Acting as a role model for integrity, professionalism, and high performance, positively influencing attitudes and behaviors across the organization.",
            "Evidence/examples of prioritizing SAM's institutional interests over personal interests in decision-making and leadership actions.",
            "Evidence / examples of Effective utilization of available resources, maximizing return on investment and ensuring responsible stewardship.",
            "Evidence/examples Demonstrated leadership in managing change, driving continuous improvement, and enabling transformation toward enhanced organizational performance.",
        ],
    },
];

// ═══ Distinguished Future Leader Criteria ═══

const futureLeaderCriteria: CriterionDefinition[] = [
    {
        id: "fl-perf",
        titleAr: "الأداء والإنجاز",
        titleEn: "Performance & Achievement",
        descriptionAr: "يتناول الأداء المهني والإنجازات للموظف. يشمل نوع وجودة الأداء والإنجازات مع تجاوز الأهداف وإنجاز مهام صعبة تتطلب وقتاً وجهداً وصبراً.",
        descriptionEn: "Covers the employee's professional performance and achievements. Includes the type and quality of performance with exceeding targets and completing challenging tasks requiring time, effort, and patience.",
        points: "20",
        evidenceListAr: [
            "أدلة/أمثلة على بذل جهود لتحقيق أهداف محددة وإنجازات فردية",
            "أدلة/أمثلة على التغلب على العقبات والصعوبات",
            "أدلة/أمثلة على سرعة ودقة الإنجازات مقارنة بالمواعيد النهائية",
            "أدلة/أمثلة على تجاوز التوقعات والمهام المحددة",
            "أدلة/أمثلة على العمل ضمن خطة واضحة بمؤشرات أداء محددة وأطر زمنية",
        ],
        evidenceListEn: [
            "Evidence/examples of doing efforts to achieve specific objectives and individual achievements.",
            "Evidence/examples of overcoming obstacles and difficulties.",
            "Evidence/examples on speed and accuracy of achievements in comparison with the deadlines.",
            "Evidence/examples of exceeding expectations and functions.",
            "Evidence/examples of working within a clear plan with a specific performance indicators and timeframes.",
        ],
    },
    {
        id: "fl-init",
        titleAr: "المبادرة والإبداع",
        titleEn: "Initiative & Creativity",
        descriptionAr: "يتناول مبادرة الموظف الذاتية لاقتراح أفكار جديدة ودراسات وأبحاث أو مبادرات لتحسين أداء العمل أو الإنتاجية أو خدمة العملاء أو تبسيط العمليات.",
        descriptionEn: "Covers the employee's self-initiative in proposing new ideas, studies, research, or initiatives to improve work performance, productivity, customer service, or simplify processes.",
        points: "15",
        evidenceListAr: [
            "اقتراح أفكار ومنهجيات وعمليات عمل فعالة بشكل منهجي",
            "أمثلة تُظهر اهتمام الموظف بتحسين مهارات الحاسوب والإنترنت واللغات ومهارات التواصل أو المهارات التخصصية المرتبطة بالوظيفة",
            "أدلة/أمثلة على التحسين المستمر لإجراءات العمل والخدمات",
            "أدلة/أمثلة على طبيعة الإبداع ونتائجه وتأثيراته",
        ],
        evidenceListEn: [
            "Evidence/examples of Systematically suggesting effective ideas and work methodologies and processes.",
            "Evidence / examples demonstrate the employee attention to improve the computer skills, internet skills, languages, communication skills, or specialized skills related to the job.",
            "Evidence/examples of continuous improvement of work procedures and services.",
            "Evidence/examples of nature of creativity and its results and impacts.",
        ],
    },
    {
        id: "fl-collab",
        titleAr: "التعاون والالتزام الوظيفي",
        titleEn: "Collaboration & Job Commitment",
        descriptionAr: "يركز على درجة تعاون الموظف مع العملاء من داخل وخارج SAM ومدى إيجابيته في التعامل معهم. كما يركز على درجة الالتزام الوظيفي والسلوكي من خلال احترام الأنظمة المؤسسية.",
        descriptionEn: "Focuses on the degree of employee collaboration with internal and external SAM customers and their positive attitude. Also focuses on job and behavioral commitment through respect for organizational systems.",
        points: "15",
        evidenceListAr: [
            "أمثلة/أدلة على درجة التعاون وتعامل الموظف مع العملاء من داخل وخارج SAM",
            "أمثلة/أدلة على حرص الموظف على بذل جهد/وقت إضافي",
            "أمثلة/أدلة عملية على قدرة وحرص الموظف على العمل ضمن فرق عمل",
            "أمثلة/أدلة عملية على احترام الموظف لأنظمة وقوانين SAM ومدى التزامه وتطبيقه لمبادئها وقواعدها",
        ],
        evidenceListEn: [
            "Evidence / examples of showing the degree of cooperation and the employee's dealings with clients from inside and outside SAM.",
            "Evidence/examples of confirming the employee's eagerness to put in extra efforts/time.",
            "Evidence/examples demonstrate the employee's ability and eagerness to work within work teams.",
            "Evidence/examples illustrate the employee's respect for the SAM's regulations and laws, and the extent of his adherence and commitment to implementing the principles and rules they contain.",
        ],
    },
    {
        id: "fl-resp",
        titleAr: "المشاركة وتحمل المسؤولية",
        titleEn: "Participation & Responsibility",
        descriptionAr: "يركز على مدى حرص الموظف على المشاركة في الأنشطة والفعاليات الرسمية وغير الرسمية التي تنظمها/تشارك فيها SAM، ومدى مساهمته في الجهود التطوعية. كما يركز على درجة تحمل الموظف لمسؤولياته الوظيفية خاصة في الحالات غير الروتينية.",
        descriptionEn: "Focuses on the employee's participation in official and unofficial SAM activities, volunteer efforts, and the degree of responsibility especially in non-routine situations.",
        points: "15",
        evidenceListAr: [
            "العمل التطوعي الذي قام به الموظف ومدى علاقته بمتطلبات عمله",
            "المشاركة في الأنشطة والفعاليات الرسمية وغير الرسمية التي تنظمها SAM سواء مادياً أو معنوياً",
            "درجة تحمل الموظف للمسؤولية عن المهام الموكلة إليه خاصة في الحالات غير الروتينية",
            "درجة تحمل الموظف لضغوط ومتطلبات العمل ومدى استجابته وهدوئه وحسن تصرفه في تلك المواقف",
        ],
        evidenceListEn: [
            "Evidence / examples of The volunteer work carried out by the employee, and the extent of its relationship to the requirements of his job.",
            "Evidence / examples of Participating in official and informal activities and events organized by SAM, whether financially or morally.",
            "Evidence / examples of The degree to which the employee bears responsibility for the tasks assigned to him, especially in unusual / routine cases.",
            "Evidence / examples of The employee's degree of tolerance for work pressures and requirements and the extent of the employee's responsiveness, calmness, and good behavior in those situations.",
        ],
    },
    {
        id: "fl-learn",
        titleAr: "التعلم المستمر",
        titleEn: "Continuous Learning",
        descriptionAr: "يتناول رغبة الموظف في تعلم المهارات المتعلقة بعمله ومستوى استفادته من خبرات زملائه والجهود المبذولة لاكتساب المعرفة التي يمكن أن تحسن أداءه.",
        descriptionEn: "Covers the employee's desire to learn job-related skills, benefiting from colleagues' experiences, and efforts to acquire knowledge that can improve performance.",
        points: "15",
        evidenceListAr: [
            "أدلة/أمثلة على تبادل المعرفة مع الآخرين",
            "أدلة/أمثلة على اكتساب المعرفة والمهارات بسرعة",
            "أدلة/أمثلة على المشاركة في مجموعات/هيئات مهنية متخصصة",
            "حجم تبادل المعرفة بين الموظف وزملائه وعملائه وشركائه وأساليب التبادل ومدى الاستفادة من هذه المعرفة في العمل",
            "الجهود المبذولة من الموظف لتحسين تحصيله العلمي وضمان التطوير الذاتي لقدراته ومهاراته",
        ],
        evidenceListEn: [
            "Evidence/examples of exchanging knowledge with others.",
            "Evidence/examples of acquiring knowledge and skills quickly.",
            "Evidence/examples of participating in professional specialized groups/ bodies.",
            "Evidence / examples of The volume of knowledge exchange between the employee and his colleagues, customers, and partners, the methods of exchange, and the extent of benefiting from this knowledge at work.",
            "Evidence / examples of The efforts made by the employee to improve his educational attainment, and to ensure the self-development of his abilities and skills.",
        ],
    },
    {
        id: "fl-vision",
        titleAr: "الرؤية والمهارات الإشرافية",
        titleEn: "Vision & Supervisory Skills",
        descriptionAr: "يتناول المهارات القيادية والإشرافية المتعلقة بالتخطيط والتنظيم والقيادة والتفويض والتحفيز والتدريب.",
        descriptionEn: "Covers leadership and supervisory skills related to planning, organizing, leading, delegating, motivating, and training.",
        points: "20",
        evidenceListAr: [
            "أدلة/أمثلة على القدرة على تطوير خطط عمل للوحدة التنظيمية/فريق العمل وتنفيذها بكفاءة",
            "أدلة/أمثلة على اكتساب المعرفة والمهارات بسرعة",
            "أدلة/أمثلة على مدى تطبيق أساليب موثوقة لقياس مستوى أدائه وأداء فريق عمله من حيث مدى تحقيق الأهداف",
            "أدلة/أمثلة على بناء قدرات الموارد البشرية وفريق العمل وتحفيزهم على المبادرة والإبداع",
            "أدلة/أمثلة على كونه قدوة للمرؤوسين في السلوك والأداء",
            "أدلة/أمثلة على تقديم مصلحة SAM على المصلحة الشخصية",
            "أدلة/أمثلة على الاستفادة من الموارد المتاحة وتعظيم العائد من هذه الموارد",
            "أدلة/أمثلة على القدرة على إدارة التغيير والتطوير نحو الأفضل",
        ],
        evidenceListEn: [
            "Evidence/examples of the ability to develop action plans for the organizational unit / team work and executing them efficiently.",
            "Evidence/examples of acquiring knowledge and skills quickly.",
            "Evidence / examples of The extent to which he applies reliable methods to measure his level of performance and the performance of his work team in terms of the extent to which goals are achieved.",
            "Evidence / examples of building human resources and teamwork capacity and motivating them to take the initiative and be creative.",
            "Evidence/examples of being a role model for subordinates in attitude and performance.",
            "Evidence/examples of prioritizing SAM interest over personal interest.",
            "Evidence/examples of benefiting from available resources and maximizing the return on these resources.",
            "Evidence/examples of the ability to manage change and develop for the better.",
        ],
    },
];

// ═══ Department Criteria ═══

const departmentCriteria: CriterionDefinition[] = [
    {
        id: "dept-plan",
        titleAr: "التخطيط",
        titleEn: "Planning",
        descriptionAr: "هل تقوم الوحدة التنظيمية بتطوير وتنفيذ ومراجعة خطتها التشغيلية بما يتوافق مع احتياجات وتوقعات أصحاب المصلحة وبما يضمن توافق عملياتها وهيكلها مع الخطة الاستراتيجية لـ SAM؟",
        descriptionEn: "Does the organizational unit develop, implement, and review its operational plan in line with stakeholder needs and expectations, ensuring alignment of its operations and structure with SAM's strategic plan?",
        points: "200",
        evidenceListAr: [
            "نشر وتعزيز رسالة ورؤية وقيم الشارقة لإدارة الأصول وربطها بالخطة وأعمال الوحدة التنظيمية وترابطها مع العمل اليومي",
            "كيفية تحديد قياس أداء الوحدة التنظيمية ووسائل المتابعة والمراجعة وتحسين الأداء بالترابط والارتباط مع نظام إدارة الأداء المؤسسي",
            "التفاعل المباشر والمستمر مع المعنيين (أصحاب المصلحة) مثل: العملاء، الشركاء، المجتمع بحسب طبيعة أعمال الوحدة التنظيمية",
            "تشجيع ودعم ثقافة التميز بين الموظفين في الوحدة التنظيمية",
            "التكيف والمرونة في عمليات إدارة التغيير بما يتوافق مع الثقافة المؤسسية للشارقة لإدارة الأصول",
            "تحويل الخطة الاستراتيجية لشركة الشارقة لإدارة الأصول إلى خطة تشغيلية واضحة تعتمد على فهم احتياجات وتوقعات المعنيين (أصحاب المصلحة)",
            "الاستفادة من الخطة الاستراتيجية لشركة الشارقة لإدارة الأصول بتطوير خطة تشغيلية واضحة تحقق متطلبات نظام إدارة الأداء وأهداف الوحدة التنظيمية",
            "التحسين المستمر للخطة التشغيلية وتحديثها مع السياسات والإجراءات المؤسسية",
            "التطبيق الشامل لنظام إدارة الأداء والسياسات والإجراءات والعمليات الخاصة بالوحدة التنظيمية بالتوافق مع الخطة الاستراتيجية لشركة الشارقة لإدارة الأصول",
        ],
        evidenceListEn: [
            "Examples of the department's role in spreading and promoting SAM's mission, vision, and values and linking them to the unit's plan and daily operations",
            "How to define organizational unit performance measurement, monitoring, review, and improvement methods linked to the institutional performance management system",
            "Direct and continuous interaction with stakeholders such as customers, partners, and community according to the organizational unit's nature of work",
            "Encouraging and supporting a culture of excellence among employees in the organizational unit",
            "Adaptability and flexibility in change management processes aligned with SAM's corporate culture",
            "Converting SAM's strategic plan into a clear operational plan based on understanding stakeholder needs and expectations",
            "Leveraging SAM's strategic plan to develop a clear operational plan that meets performance management system requirements and organizational unit objectives",
            "Continuous improvement and updating of the operational plan with corporate policies and procedures",
            "Comprehensive implementation of the performance management system, policies, procedures, and processes of the organizational unit aligned with SAM's strategic plan",
        ],
    },
    {
        id: "dept-resources",
        titleAr: "الموارد والممتلكات",
        titleEn: "Resources & Assets",
        descriptionAr: "كيف تلبي الوحدة التنظيمية تصورات ومواقف أصحاب المصلحة من خلال الإدارة الفعالة لعمليات الأعمال وعلاقات أصحاب المصلحة على المدى الطويل وتخلق قيمة مستدامة؟",
        descriptionEn: "How does the organizational unit meet stakeholder perceptions and attitudes through effective management of business processes and long-term stakeholder relationships to create sustainable value?",
        points: "300",
        evidenceListAr: [
            "الإدارة الفعّالة للموارد المالية، بما في ذلك وضع خطة تشغيلية واضحة، وفهم التكاليف اليومية، وتحسين الكفاءة، والتحكم في النفقات العامة، وتأمين التمويل المناسب للمشاريع والمبادرات",
            "الإدارة الفعّالة لأصول تقنية المعلومات لدعم الكفاءة التشغيلية، والتمكين الرقمي، والتميز في تقديم الخدمات",
            "الإدارة الفعّالة للمعرفة، بما في ذلك ضمان جمع المعرفة ومشاركتها واستخدامها لدعم اتخاذ القرارات والتعلم والتحسين المستمر",
            "التصميم والإدارة الفعّالة للعمليات والإجراءات لتقديم خدمات ذات قيمة مضافة وتحقيق نتائج إيجابية لجميع أصحاب المصلحة",
            "الإدارة الفعّالة للشراكات، بما في ذلك الاتفاقيات الداخلية والخارجية مثل اتفاقيات مستوى الخدمة (SLAs) أو مذكرات التفاهم (MOUs)، لتعزيز الأداء وخلق القيمة",
            "التحسين المستمر لعمليات وإجراءات الأعمال من خلال تطبيق أساليب الإبداع والابتكار لتلبية احتياجات وتوقعات أصحاب المصلحة وتجاوزها",
            "تطوير خدمات جديدة وتحسين الخدمات الحالية باستمرار لإضافة قيمة لأصحاب المصلحة وتعزيز النتائج",
            "تطبيق أساليب تسويقية واتصالات فعّالة لضمان الوعي الكامل بنطاق عمل الوحدة التنظيمية، بما في ذلك تسليط الضوء بوضوح على المبادرات والمشاريع الرئيسية",
            "استخدام قياس الأداء الفعّال ومؤشرات الأداء الرئيسية لرصد التقدم ودعم الوحدة التنظيمية في تحقيق أهدافها",
            "وضع أهداف وغايات واضحة وقابلة للقياس لنتائج أصحاب المصلحة، بناءً على احتياجاتهم وتوقعاتهم",
            "إدارة العلاقات مع جميع أصحاب المصلحة وتحسينها باستمرار لتعزيز الثقة والمشاركة طويلة الأمد",
            "جمع ملاحظات أصحاب المصلحة وتحليلها واستخدامها بشكل منهجي لتحسين الخدمات، وتطوير العروض الحالية، أو ابتكار حلول جديدة، بما في ذلك تصنيف أصحاب المصلحة لدعم خلق قيمة مستدامة",
        ],
        evidenceListEn: [
            "Effective management of financial resources, including developing a clear operational plan, understanding daily costs, improving efficiency, controlling overhead expenses, and securing appropriate funding for projects and initiatives",
            "Effective management of IT assets to support operational efficiency, digital enablement, and service delivery excellence",
            "Effective knowledge management, including ensuring knowledge is captured, shared, and used to support decision-making, learning, and continuous improvement",
            "Effective design and management of processes and procedures to deliver value-added services and achieve positive results for all stakeholders",
            "Effective management of partnerships, including internal and external agreements such as SLAs or MOUs, to enhance performance and create value",
            "Continuous improvement of business processes and procedures through applying creativity and innovation methods to meet and exceed stakeholder needs and expectations",
            "Developing new services and continuously improving existing ones to add value for stakeholders and enhance results",
            "Applying effective marketing and communication methods to ensure full awareness of the organizational unit's scope, including clearly highlighting key initiatives and projects",
            "Using effective performance measurement and KPIs to monitor progress and support the organizational unit in achieving its objectives",
            "Setting clear and measurable objectives and goals for stakeholder outcomes, based on their needs and expectations",
            "Managing and continuously improving relationships with all stakeholders to enhance trust and long-term engagement",
            "Systematically collecting, analyzing, and using stakeholder feedback to improve services, develop existing offerings, or innovate new solutions, including stakeholder classification to support sustainable value creation",
        ],
    },
    {
        id: "dept-people",
        titleAr: "الموارد البشرية",
        titleEn: "Human Resources",
        descriptionAr: "ما الذي تحققه الوحدة التنظيمية فيما يتعلق بموظفيها؟",
        descriptionEn: "What does the organizational unit achieve regarding its employees?",
        points: "200",
        evidenceListAr: [
            "تخطيط وإدارة الموارد البشرية بشكل فعال",
            "تحديد وتحسين مهارات وكفاءات الموارد البشرية",
            "التمكين والمشاركة الفعّالة لجميع الموظفين داخل نفس الوحدة التنظيمية",
            "التواصل الفعّال مع جميع الموظفين",
            "تقدير ومكافأة جهود جميع الموظفين داخل الوحدة التنظيمية بطريقة عادلة",
            "استخدام مقاييس ومؤشرات أداء ذات مغزى لقياس جهد الموظفين ووضع أهداف واقعية لهم",
            "فهم وتصنيف نتائج أداء الموظفين لفهم احتياجات وتوقعات شركة الشارقة لإدارة الأصول",
            "العمل على استدامة نتائج الموظفين بطرق إيجابية (مثال: كيفية العمل على تحقيق نتائج إيجابية لمدة 3 سنوات)",
        ],
        evidenceListEn: [
            "Effectively planning and managing human resources",
            "Identifying and improving human resources skills and competencies",
            "Effective empowerment and engagement of all employees within the same organizational unit",
            "Effective communication with all employees",
            "Fairly recognizing and rewarding the efforts of all employees within the organizational unit",
            "Using meaningful performance measures and indicators to measure employee efforts and set realistic goals",
            "Understanding and classifying employee performance results to understand SAM's needs and expectations",
            "Working on sustaining employee results in positive ways (e.g., how to achieve positive results for 3 years)",
        ],
    },
    {
        id: "dept-results",
        titleAr: "النتائج",
        titleEn: "Results",
        descriptionAr: "ما الذي تحققه الوحدة التنظيمية من نتائج — دفع الأداء والتحول؟",
        descriptionEn: "What does the organizational unit achieve in terms of results — driving performance and transformation?",
        points: "300",
        evidenceListAr: [
            "تحقيق نتائج أداء فوق العادة بما يضمن استدامة الأعمال للوحدة التنظيمية ويلبي أيضًا توقعات المعنيين",
            "تطوير وتحقيق مجموعة من النتائج المالية والنتائج غير المالية لقياس التنفيذ الدقيق لخطط الوحدة التنظيمية التي تدعم استراتيجيات عملها وعملياتها والعمل اليومي",
            "وضع ومستوى تحقيق أهداف واضحة للوحدة التنظيمية لقياس نتائج الأداء الرئيسية بناءً على توقعات الإدارة العليا",
            "تصنيف وتبويب نتائج الوحدة التنظيمية بما يناسب فهم وتحقيق احتياجات وتوقعات الإدارة العليا",
            "توفير نتائج الأداء للوحدة التنظيمية بحيث يكون هناك رسوم بيانية توضح اتجاهات الأداء لمدة 3 سنوات (نتائج 4 سنوات) لإظهار استدامة الممارسات المتميزة",
            "فهم الأسباب وراء الاتجاهات والنتائج واستعراض نتائج الوحدة والأثر على نتائج الوحدات التنظيمية الأخرى ونتائج أعمال الشارقة لإدارة الأصول",
            "إظهار مستوى الاعتمادية لنتائج الأداء للوحدة التنظيمية لضمان الاستدامة المستقبلية للنتائج بالاستفادة من المسببات",
            "إظهار مقارنة لنتائج الأعمال الرئيسية للوحدة التنظيمية ومقارنتها مع الإدارات المماثلة والوحدات التنظيمية المماثلة في الشارقة لإدارة الأصول واستخدام هذه البيانات/المعلومات متى أمكن لتحديد أهداف الوحدة التنظيمية",
        ],
        evidenceListEn: [
            "Achieving extraordinary performance results ensuring business sustainability for the organizational unit and meeting stakeholder expectations",
            "Developing and achieving a set of financial and non-financial results to measure precise implementation of organizational unit plans supporting business strategies, operations, and daily work",
            "Setting and level of achieving clear organizational unit objectives to measure key performance results based on senior management expectations",
            "Classifying and categorizing organizational unit results appropriately to understand and meet senior management needs and expectations",
            "Providing organizational unit performance results with charts showing 3-year performance trends (4 years of results) to demonstrate sustainability of distinguished practices",
            "Understanding reasons behind trends and results, reviewing unit results and impact on other organizational units' results and SAM business results",
            "Demonstrating the reliability level of organizational unit performance results to ensure future sustainability of results by leveraging causes",
            "Demonstrating comparison of key business results of the organizational unit with similar departments and organizational units in SAM and using this data/information when possible to set unit objectives",
        ],
    },
];

// ═══ Project Criteria ═══

const projectCriteria: CriterionDefinition[] = [
    {
        id: "proj-design",
        titleAr: "تصميم وتطوير المشروع / المبادرة",
        titleEn: "Project / Initiative Design & Development",
        descriptionAr: "يقيّم مرحلة تصميم وتطوير المشروع/المبادرة من حيث المفهوم والأهداف والتخطيط والمواءمة الاستراتيجية.",
        descriptionEn: "Evaluates the design and development phase of the project/initiative in terms of concept, objectives, planning, and strategic alignment.",
        points: "20",
        evidenceListAr: [
            "المشروع: ميثاق المشروع مع الأهداف. المبادرة: مقترح المبادرة / موجز المبادرة مع الأهداف",
            "وثيقة مواءمة استراتيجية. مذكرة موافقة من القيادة",
            "وثيقة قائمة أصحاب المصلحة. تقرير موجز لتقييم الابتكار",
            "تقرير دراسة الجدوى. جدول تحليل البدائل مع تبرير القرار",
            "وثيقة خطة الموارد. مذكرة تعيين الموظفين والموافقة على الميزانية",
            "خطة تخصيص الموارد. تقرير إنجاز المهام",
            "جدول بيانات أو لوحة معلومات لتتبع التقدم. تقارير أداء دورية (أسبوعية / شهرية)",
        ],
        evidenceListEn: [
            "Project: Project Charter with objectives. Initiative: Initiative Proposal / Initiative Brief with objectives.",
            "Strategic alignment mapping document. Approval memo from leadership.",
            "Stakeholder list document. Brief innovation assessment report.",
            "Feasibility study report. Alternatives analysis table with decision justification.",
            "Resource plan document. Staff assignment memo and budget approval.",
            "Resource allocation plan. Task completion report.",
            "Progress tracking spreadsheet or dashboard. Periodic (weekly / monthly) performance reports.",
        ],
        examplesListAr: [
            "تقديم نظام رقمي لتقليل الأخطاء اليدوية خلال إطار زمني محدد. تنفيذ حملة توعية للموظفين لزيادة المشاركة في أنشطة الاستدامة بنسب محددة خلال إطار زمني معين",
            "النظام الرقمي يحسن الكفاءة التشغيلية والشفافية. حملة التوعية تدعم أهداف الاستدامة والثقافة المؤسسية",
            "النظام الرقمي يستخدم التقارير الآلية بدلاً من التتبع اليدوي؛ أصحاب المصلحة الرئيسيون: الموظفون وتكنولوجيا المعلومات والإدارة. حملة التوعية تستخدم أدوات الاتصال الرقمي؛ أصحاب المصلحة: جميع الموظفين",
            "دراسة الجدوى تؤكد فعالية تكلفة النظام الرقمي؛ مقارنة الحلول الجاهزة مع التطوير الداخلي. مراجعة مستويات مشاركة الموظفين الحالية؛ مقارنة الحملة الشخصية مع الرقمية للوصول الأوسع",
            "تعيين الموظفين وتخصيص الميزانية والحصول على تراخيص البرمجيات اللازمة للنظام الرقمي. تعيين المنسقين واستخدام قنوات الاتصال الداخلية وتخصيص الميزانية لجلسات التوعية",
            "استخدام الموظفين والأدوات الرقمية المتاحة لإنجاز المهام في الوقت المحدد دون تكاليف إضافية. توزيع المسؤوليات بوضوح لتجنب ازدواجية الجهد",
            "تتبع أسبوعي لإنجاز المهام لمشروع النظام الرقمي. تحديث شهري للمشاركة في مبادرات التوعية أو التحسين",
        ],
        examplesListEn: [
            "Introduce a digital system to reduce manual errors within a certain time. Run a staff awareness campaign to increase participation in sustainability activities with specific percentages within certain timeframe.",
            "Digital system improves operational efficiency and transparency. Awareness campaign supports organizational sustainability and culture goals.",
            "Digital system uses automated reporting instead of manual tracking; key stakeholders: staff, IT, management. Awareness campaign uses digital communication tools; key stakeholders: all employees.",
            "Feasibility study confirms cost-effectiveness of digital system; compare off-the-shelf vs internal development. Review current staff engagement levels; compare in-person vs digital campaign for wider reach.",
            "Assign staff, allocate budget, and obtain necessary software licenses for a digital system. Assign coordinators, use internal communication channels, and allocate budget for awareness sessions.",
            "Use available staff and digital tools to complete tasks on time without extra costs. Assign responsibilities clearly to avoid duplication of effort.",
            "Weekly tracking of task completion for a digital system project. Monthly update of participation in awareness or improvement initiatives.",
        ],
    },
    {
        id: "proj-exec",
        titleAr: "تنفيذ المشروع / المبادرة",
        titleEn: "Project / Initiative Execution",
        descriptionAr: "يقيّم مرحلة تنفيذ المشروع/المبادرة من حيث الكفاءة والمتابعة والتحكم المالي وإدارة التغيير.",
        descriptionEn: "Evaluates the execution phase of the project/initiative in terms of efficiency, monitoring, financial control, and change management.",
        points: "30",
        evidenceListAr: [
            "ورقة تتبع الميزانية. تقرير مقارنة المصروفات (المخطط مقابل الفعلي)",
            "توثيق الأساليب المبتكرة المستخدمة. مقاييس تُظهر تحسن الكفاءة أو المشاركة",
            "مخططات جانت أو جداول تتبع المهام. سجل المخاطر أو سجل المشكلات",
            "سجلات حضور التدريب. رسائل الاتصال الداخلي أو الإشعارات",
            "سجل التغييرات أو تقرير تتبع المشكلات. الجدول المحدث الذي يُظهر التعديلات",
            "محاضر أو ملاحظات الاجتماعات. رسائل التقدير أو المذكرات الداخلية",
        ],
        evidenceListEn: [
            "Budget tracking sheet. Expense comparison report (planned vs actual).",
            "Documentation of innovative approaches used. Metrics showing improved efficiency or engagement.",
            "Gantt charts or task tracking sheets. Risk register or issue log.",
            "Training attendance sheets. Internal communication emails or notifications.",
            "Change log or issue tracking report. Updated schedule showing adjustments.",
            "Meetings minutes or notes. Internal recognition emails or memos.",
        ],
        examplesListAr: [
            "مقارنة الميزانية المخططة مع التكاليف الفعلية لأنشطة المشروع/المبادرة. تعديل تخصيص الموارد إذا تجاوزت التكاليف الخطة",
            "استخدام منصات رقمية مشتركة للتعاون بدلاً من الاستعانة بمستشارين خارجيين. تحويل المشاركة في المبادرات إلى لعبة لزيادة التفاعل دون تكاليف إضافية",
            "استخدام مخططات جانت وقوائم المراجعة وسجلات المخاطر لتتبع تقدم المشروع/المبادرة. تطبيق لوحات المعلومات لتصوير مقاييس المشروع الرئيسية",
            "إجراء جلسات تدريب قصيرة للموظفين على الأنظمة أو العمليات الجديدة. إرسال تحديثات في الوقت المناسب حول التغييرات في نطاق أو إجراءات المشروع/المبادرة",
            "تعديل الجدول الزمني في حالة تأخير تسليم البرمجيات. إعادة تخصيص المهام أو الموارد إذا واجهت الخطط الأولية تحديات",
            "عقد اجتماعات فريق أسبوعية قصيرة للاحتفال بالإنجازات وحل المشكلات. تقدير مساهمات أعضاء الفريق المشاركين في المبادرات",
        ],
        examplesListEn: [
            "Compare planned budget vs actual costs for project / initiative activities. Adjust resource allocation if costs exceed plan.",
            "Use shared digital platforms to collaborate instead of hiring external consultants. Gamify participation in initiatives to increase engagement without extra costs.",
            "Use Gantt charts, checklists, and risk registers to track project / initiative progress. Apply dashboards to visualize key project metrics.",
            "Conduct short training sessions for staff on new systems or processes. Send timely updates on changes in project/initiative scope or procedures.",
            "Adjust timeline if software delivery is delayed. Reallocate tasks or resources if initial plans face challenges.",
            "Hold short weekly team meetings to celebrate achievements and resolve issues. Recognize contributions of team members participating in initiatives.",
        ],
    },
    {
        id: "proj-results",
        titleAr: "نتائج وأثر المشروع / المبادرة",
        titleEn: "Project / Initiative Results & Impact",
        descriptionAr: "يقيّم نتائج المشروع/المبادرة من حيث تحقيق الأهداف والعائد على الاستثمار والأثر المستدام.",
        descriptionEn: "Evaluates the project/initiative results in terms of achieving objectives, return on investment, and sustainable impact.",
        points: "50",
        evidenceListAr: [
            "تقرير مؤشرات الأداء بعد المشروع. لوحة معلومات تُظهر النتائج الفعلية مقابل المستهدفات",
            "نماذج أو استبيانات تغذية راجعة من أصحاب المصلحة. تقرير تقييم الأثر",
            "آلية تتبع الاستدامة. خطة مراقبة طويلة الأجل",
            "تقرير تقييم ما بعد المشروع/المبادرة. جدول مقارنة: النتائج المخططة مقابل الفعلية",
            "وثيقة الدروس المستفادة. سجل إجراءات التحسين المستمر",
            "منصة مشاركة الدروس المستفادة. نشرة داخلية أو عرض تقديمي أو وثيقة مشاركة المعرفة",
        ],
        evidenceListEn: [
            "Post-project KPI report. Dashboard showing actual results vs targets.",
            "Stakeholder feedback forms or surveys. Impact assessment report.",
            "Sustainability tracking mechanism. Long-term monitoring plan.",
            "Post-project / initiative evaluation report. Comparison table: planned vs actual outcomes.",
            "Lessons learned document. Continuous improvement action log.",
            "Lessons learned sharing platform. Internal newsletter, presentation, or knowledge-sharing document.",
        ],
        examplesListAr: [
            "النظام الرقمي يقلل الأخطاء اليدوية بنسب محددة خلال إطار زمني معين. حملة التوعية تزيد المشاركة بنسب محددة خلال إطار زمني معين",
            "يوفر الموظفون الوقت بفضل التقارير الآلية. يُظهر الموظفون مشاركة ورضا أعلى مع المبادرات",
            "يستمر سير العمل بدون ورق في تقليل استخدام الورق. يصبح برنامج التوعية جزءاً من أنشطة مشاركة الموظفين المستمرة",
            "تقرير المشروع/المبادرة يُظهر إنجاز المراحل واستخدام الميزانية مقارنة بالخطة الأولية. تقرير المبادرة يُظهر نسبة تحقيق الأهداف مقابل المستهدفات",
            "تحديد الدروس المستفادة من تأخيرات أو نجاحات المشروع/المبادرة. تطبيق أفضل الممارسات من المشاريع/المبادرات السابقة على الجديدة",
            "تلخيص التحديات والحلول في تقرير بسيط. مشاركة قصص النجاح مع الفرق الأخرى لتكرار الممارسات الإيجابية",
        ],
        examplesListEn: [
            "Digital system reduces manual errors with specific percentages within certain timeframe. Awareness campaign increases participation with specific percentages within certain timeframe.",
            "Staff save time due to automated reporting. Employees show higher engagement and satisfaction with initiatives.",
            "Paperless workflow continues to reduce paper usage. Awareness program becomes part of ongoing staff engagement activities.",
            "Project / initiative report shows milestone completion and budget use compared to initial plan. Initiative report shows percentage achievement of objectives vs targets.",
            "Identify lessons learned from project / initiative delays or successes. Apply best practices from previous projects/initiatives to new ones.",
            "Summarize challenges and solutions in a simple report. Share success stories with other teams to replicate positive practices.",
        ],
    },
];

// ═══ Unsung Hero Criteria (Rating-based) ═══

const unsungCriteria: CriterionDefinition[] = [
    {
        id: "unsung-achievements",
        titleAr: "إنجازات تفوق التوقعات (استثنائية / غير اعتيادية)",
        titleEn: "Achievements Beyond Expectations (Exceptional / Extraordinary)",
        descriptionAr: "يجب أن يكون المرشح قد قام باستمرار بأعمال استثنائية وحقق نتائج تتجاوز التوقعات. قيم المرشح على المقياس التالي:",
        descriptionEn: "The nominee must have consistently performed exceptional work and achieved results that exceed expectations. Rate the nominee on the following scale:",
        points: "20",
        ratingScale: { min: 1, max: 10, minLabelAr: "غير مقبول", minLabelEn: "Unacceptable", maxLabelAr: "استثنائي", maxLabelEn: "Exceptional" },
        evidenceListAr: [
            "الموظفون الذين اعتادوا بشكل دائم ومستمر على أن يتجاوزوا دورهم في أداء مهامهم وواجباتهم الوظيفية اليومية، ويجدون حلولًا إبداعية لحل المشاكل، ويحصلون على نتائج رائعة تستفيد منها الشركة",
        ],
        evidenceListEn: [
            "Employees who consistently go beyond their role in performing daily tasks and duties, find creative solutions to problems, and achieve outstanding results that benefit the company",
        ],
        justificationLabelAr: "مبررات المسؤول المباشر للإنجازات غير العادية",
        justificationLabelEn: "Direct supervisor's justification for extraordinary achievements",
    },
    {
        id: "unsung-rules",
        titleAr: "اتباع قواعد الشركة وقيمها",
        titleEn: "Following Company Rules & Values",
        descriptionAr: "يتبع دائمًا قواعد الشركة ويتصرف بأمانة واحترام. قيم المرشح على المقياس التالي:",
        descriptionEn: "Always follows company rules and acts with honesty and respect. Rate the nominee on the following scale:",
        points: "20",
        ratingScale: { min: 1, max: 10, minLabelAr: "غير مقبول", minLabelEn: "Unacceptable", maxLabelAr: "استثنائي", maxLabelEn: "Exceptional" },
        evidenceListAr: [
            "عدم وجود إنذارات أو إجراءات تأديبية تتعلق بمخاطر العمل وقضايا الصحة والسلامة",
            "يرتدي دائمًا بطاقة التعريف ويلتزم بجميع سياسات الشركة، بما في ذلك لوائح الصحة والسلامة",
            "يتبع بروتوكولات السلامة باستمرار عند استخدام المعدات والأجهزة والأدوات والآلات لضمان سلامة وأمن نفسه والآخرين",
            "يقوم بالإبلاغ بشكل استباقي عن أي مشاكل فنية أو مخاطر لفريق الصيانة أو المشرف، خاصة في البيئات عالية المخاطر",
        ],
        evidenceListEn: [
            "No warnings or disciplinary actions related to work risks and health and safety issues",
            "Always wears ID badge and complies with all company policies, including health and safety regulations",
            "Consistently follows safety protocols when using equipment, devices, tools, and machines to ensure safety and security of themselves and others",
            "Proactively reports any technical problems or risks to the maintenance team or supervisor, especially in high-risk environments",
        ],
        justificationLabelAr: "مبررات المسؤول المباشر لاتباع قواعد الشركة وقيمها",
        justificationLabelEn: "Direct supervisor's justification for following company rules and values",
    },
    {
        id: "unsung-appearance",
        titleAr: "المظهر واللباس الاحترافي",
        titleEn: "Professional Appearance & Dress",
        descriptionAr: "يبدو دائمًا أنيقًا ويرتدي ملابس مناسبة للوظيفة. قيم المرشح على المقياس التالي:",
        descriptionEn: "Always looks neat and wears appropriate clothing for the job. Rate the nominee on the following scale:",
        points: "20",
        ratingScale: { min: 1, max: 10, minLabelAr: "غير مقبول", minLabelEn: "Unacceptable", maxLabelAr: "استثنائي", maxLabelEn: "Exceptional" },
        evidenceListAr: [
            "يرتدي الملابس المناسبة للعمل، ويبدو نظيفًا ومرتبًا، ويحصل على ردود فعل جيدة حول مظهره",
        ],
        evidenceListEn: [
            "Wears appropriate work clothing, looks clean and tidy, and receives good feedback about appearance",
        ],
        justificationLabelAr: "مبررات المسؤول المباشر للمظهر المهني",
        justificationLabelEn: "Direct supervisor's justification for professional appearance",
    },
    {
        id: "unsung-attendance",
        titleAr: "الحضور الجيد والالتزام بالمواعيد",
        titleEn: "Good Attendance & Punctuality",
        descriptionAr: "يأتي للعمل في الوقت المحدد ونادرًا ما يغيب عن اليوم. قيم المرشح على المقياس التالي:",
        descriptionEn: "Comes to work on time and rarely misses a day. Rate the nominee on the following scale:",
        points: "20",
        ratingScale: { min: 1, max: 10, minLabelAr: "غير مقبول", minLabelEn: "Unacceptable", maxLabelAr: "استثنائي", maxLabelEn: "Exceptional" },
        evidenceListAr: [
            "نادرًا ما يأخذ أيام إجازة غير مخططة، ويصل في الوقت المحدد، ويلتزم بجدول عمله",
        ],
        evidenceListEn: [
            "Rarely takes unplanned leave days, arrives on time, and adheres to work schedule",
        ],
        justificationLabelAr: "مبررات المسؤول المباشر للحضور الجيد والالتزام بالمواعيد",
        justificationLabelEn: "Direct supervisor's justification for good attendance and punctuality",
    },
    {
        id: "unsung-teamwork",
        titleAr: "يساعد الآخرين ويعمل بشكل جيد مع الفريق",
        titleEn: "Helps Others & Works Well with the Team",
        descriptionAr: "يعمل بشكل جيد مع الآخرين، ويساعد زملاءه، ويتمتع بسلوك إيجابي. قيم المرشح على المقياس التالي:",
        descriptionEn: "Works well with others, helps colleagues, and has a positive attitude. Rate the nominee on the following scale:",
        points: "20",
        ratingScale: { min: 1, max: 10, minLabelAr: "غير مقبول", minLabelEn: "Unacceptable", maxLabelAr: "استثنائي", maxLabelEn: "Exceptional" },
        evidenceListAr: [
            "يتلقى ردود فعل إيجابية من زملاء العمل والمتعاملين، يساعد على حل المشاكل، وعلى استعداد دائم لتقديم المساعدة",
        ],
        evidenceListEn: [
            "Receives positive feedback from coworkers and customers, helps solve problems, and is always ready to provide assistance",
        ],
        justificationLabelAr: "مبررات المسؤول المباشر لمساعدة الآخرين والعمل بشكل جيد مع الفريق",
        justificationLabelEn: "Direct supervisor's justification for helping others and working well with the team",
    },
];

// ═══ Non-Supervisory Criteria Map ═══

export const nonSupervisoryCriteriaMap: Record<string, CriterionDefinition[]> = {
    unsung: unsungCriteria,
};

// ═══ Knowledge Management Criteria ═══

const knowledgeCriteria: CriterionDefinition[] = [
    {
        id: "km-strategy",
        titleAr: "استراتيجية إدارة المعرفة",
        titleEn: "Knowledge Management Strategy",
        group: "enablers",
        descriptionAr: "يقيّم مدى وجود استراتيجية واضحة لإدارة المعرفة وتوافقها مع الأهداف المؤسسية.",
        descriptionEn: "Evaluates the existence of a clear knowledge management strategy aligned with organizational objectives.",
        points: "150",
        evidenceListAr: [
            "وجود استراتيجية موثقة لإدارة المعرفة",
            "تحديد الأهداف والنتائج المتوقعة ومؤشرات الأداء الرئيسية (KPIs) بوضوح",
            "مراقبة ومراجعة التقدم مقابل مؤشرات الأداء بشكل دوري",
        ],
        evidenceListEn: [
            "A documented knowledge management strategy is in place.",
            "Objectives, expected outcomes, and key performance indicators (KPIs) are clearly defined.",
            "Progress against KPIs is regularly monitored and reviewed.",
        ],
        examplesListAr: [
            "استراتيجية موثقة لإدارة المعرفة",
            "مؤشرات أداء محددة مثل عدد جلسات مشاركة المعرفة ومعدلات استخدام النظام أو مستويات إكمال التدريب",
            "تقارير الأداء التي تُظهر مساهمة إدارة المعرفة في مؤشرات الأداء المؤسسية",
        ],
        examplesListEn: [
            "A documented knowledge management strategy.",
            "Defined KPIs such as number of knowledge-sharing sessions, system usage rates, or training completion levels.",
            "Performance reports showing contribution of KM to organizational KPIs.",
        ],
    },
    {
        id: "km-culture",
        titleAr: "ثقافة مشاركة المعرفة",
        titleEn: "Knowledge Sharing Culture",
        group: "enablers",
        descriptionAr: "يقيّم مدى تبني ثقافة مشاركة المعرفة والتعلم المستمر داخل المؤسسة.",
        descriptionEn: "Evaluates the adoption of a knowledge sharing and continuous learning culture within the organization.",
        points: "100",
        evidenceListAr: [
            "اجتماعات دورية للفرق متعددة الوظائف لمشاركة أفضل الممارسات والدروس المستفادة",
            "استخدام أدوات التعاون (مثل المحركات المشتركة وقواعد المعرفة الداخلية وقنوات Teams/Slack) أدى إلى زيادة إمكانية الوصول إلى المعلومات وتقليل تكرار العمل",
            "أظهرت نتائج استبيانات مشاركة الموظفين تحسناً في درجات التواصل والعمل الجماعي",
            "زيادة المشاركة في برامج التدريب وورش العمل وأنشطة مشاركة المعرفة",
            "تحسن نتائج الأداء المرتبطة بالتعلم المشترك وتبني أفضل الممارسات",
        ],
        evidenceListEn: [
            "Cross-functional teams meet regularly to share best practices and lessons learned.",
            "Use of collaboration tools (e.g., shared drives, internal knowledge bases, Teams/Slack channels) has increased information accessibility and reduced duplicated work.",
            "Employee engagement or survey results show improved communication and teamwork scores.",
            "Increased participation in training programs, workshops, and knowledge-sharing activities.",
            "Improved performance outcomes linked to shared learning and best-practice adoption.",
        ],
        examplesListAr: [
            "جلسات دورية لمشاركة المعرفة حيث يقدم الموظفون مشاريع ناجحة أو مهارات جديدة لزملائهم",
            "المحركات المشتركة وقواعد المعرفة الداخلية وقنوات Teams/Slack",
            "نتائج استبيانات مشاركة الموظفين",
            "برامج التوجيه أو الزمالة التي تربط الموظفين ذوي الخبرة بالموظفين الجدد لنقل المعرفة المؤسسية",
            "تقديم حوافز مثل الشهادات وفرص التطوير المهني أو التقدير العلني لمساهمات التعلم",
        ],
        examplesListEn: [
            "Periodic knowledge-sharing sessions where staff present successful projects or new skills to colleagues.",
            "Shared drives, internal knowledge bases, Teams / Slack channels.",
            "Employee engagement or survey results.",
            "Mentoring or buddy programs that pair experienced staff with newer employees to transfer institutional knowledge.",
            "Providing incentives such as certificates, professional development opportunities, or public acknowledgment for learning contributions.",
        ],
    },
    {
        id: "km-tech",
        titleAr: "التقنيات والأنظمة المستخدمة",
        titleEn: "Technologies & Systems Used",
        group: "enablers",
        descriptionAr: "يقيّم الأنظمة والتقنيات المستخدمة لالتقاط وتخزين ومشاركة واسترجاع المعرفة.",
        descriptionEn: "Evaluates the systems and technologies used to capture, store, share, and retrieve knowledge.",
        points: "100",
        evidenceListAr: [
            "منصات رقمية مركزية مع سياسات وصول واضحة",
            "سجلات الاستخدام المنتظم للنظام بما في ذلك تسجيلات الدخول والتحميلات والمساهمات",
            "تغذية راجعة من الموظفين تُظهر سهولة الوصول وسهولة استخدام منصات المعرفة",
        ],
        evidenceListEn: [
            "Centralized digital platforms with clear access policies.",
            "Records of regular system usage, including logins, downloads, and contributions.",
            "Feedback from employees showing ease of access and usability of knowledge platforms.",
        ],
        examplesListAr: [
            "مواقع Teams أو SharePoint للتعاون بين الأقسام في المشاريع",
            "مكتبات رقمية تحتوي على مستندات وأدلة وقوالب قابلة للبحث ومتاحة لجميع الموظفين",
            "جلسات مشاركة المعرفة المدعومة بمنصات إلكترونية تتيح المشاركة عن بُعد",
        ],
        examplesListEn: [
            "Teams or SharePoint sites for cross-department collaboration on projects.",
            "Digital libraries with searchable documents, guides, and templates accessible to all staff.",
            "Knowledge-sharing sessions supported by online platforms, enabling remote participation.",
        ],
    },
    {
        id: "km-innov",
        titleAr: "الابتكار والتطوير المستمر",
        titleEn: "Innovation & Continuous Development",
        group: "enablers",
        descriptionAr: "يقيّم مدى استخدام المعرفة لدعم الابتكار والتطوير المستمر.",
        descriptionEn: "Evaluates the extent to which knowledge is used to support innovation and continuous development.",
        points: "120",
        evidenceListAr: [
            "تطبيق أنظمة لالتقاط الدروس المستفادة وأفضل الممارسات واقتراحات الموظفين",
            "تحسينات موثقة في العمليات أو الخدمات الناتجة عن مشاركة المعرفة",
            "مشاركة الموظفين في برامج الابتكار أو المبادرات المدفوعة بالمعرفة",
            "مراجعات وتحديثات دورية لسياسات وسير عمل ومنصات إدارة المعرفة",
            "برامج تدريب الموظفين الهادفة إلى تحسين مهارات إدارة المعرفة",
        ],
        evidenceListEn: [
            "Implementation of systems to capture lessons learned, best practices, and staff suggestions.",
            "Documented improvements in processes or services resulting from knowledge sharing.",
            "Employee participation in innovation programs or knowledge-driven initiatives.",
            "Regular reviews and updates of knowledge management policies, workflows, and platforms.",
            "Staff training programs aimed at improving knowledge management skills.",
        ],
        examplesListAr: [
            "تقديم بوابة اقتراحات حيث يقدم الموظفون أفكاراً تؤدي إلى تحسينات في العمليات",
            "استخدام المعرفة من المشاريع السابقة لتبسيط سير العمل أو تقليل الأخطاء",
            "تنظيم ورش عمل ابتكارية حيث تستفيد الفرق من البيانات والخبرات الداخلية لتطوير حلول جديدة",
            "تحديث المكتبة الرقمية بقوالب وإرشادات جديدة بناءً على تغذية راجعة المستخدمين",
            "تطبيق سير عمل آلي لالتقاط المعرفة ونشرها",
            "إجراء جلسات تدريب دورية لمساعدة الموظفين على استخدام أدوات إدارة المعرفة بشكل أفضل",
        ],
        examplesListEn: [
            "Introducing a suggestion portal where staff submit ideas that lead to process improvements.",
            "Using knowledge from previous projects to streamline workflows or reduce errors.",
            "Organizing innovation workshops where teams leverage internal data and experiences to develop new solutions.",
            "Updating the digital library with new templates and guidelines based on user feedback.",
            "Implementing automated workflows for knowledge capture and dissemination.",
            "Conducting periodic training sessions to help staff better use KM tools and resources.",
        ],
    },
    {
        id: "km-community",
        titleAr: "المشاركة المجتمعية والشراكات",
        titleEn: "Community Engagement & Partnerships",
        group: "enablers",
        descriptionAr: "يقيّم مدى مشاركة المعرفة مع المجتمع والشركاء الخارجيين.",
        descriptionEn: "Evaluates the extent of knowledge sharing with the community and external partners.",
        points: "80",
        evidenceListAr: [
            "سجلات الشراكات والتعاون أو مذكرات التفاهم مع المنظمات الخارجية",
            "تقارير المشاريع المشتركة أو ورش العمل أو برامج التدريب مع الشركاء الخارجيين",
            "تغذية راجعة من أصحاب المصلحة تُظهر فعالية التبادل المعرفي والتعاون",
            "توثيق الموارد المشتركة والمنشورات أو مخرجات البحث",
        ],
        evidenceListEn: [
            "Records of partnerships, collaborations, or MOUs with external organizations.",
            "Reports on joint projects, workshops, or training programs with external partners.",
            "Feedback from stakeholders showing effective knowledge exchange and collaboration.",
            "Documentation of shared resources, publications, or research outputs.",
        ],
        examplesListAr: [
            "تنظيم ورش عمل مشتركة أو ندوات عبر الإنترنت أو مؤتمرات مع منظمات أو مجموعات مجتمعية أخرى",
            "التعاون مع شركاء الصناعة لتطوير أفضل الممارسات أو تجريب مبادرات جديدة",
            "مشاركة الأبحاث والإرشادات أو مجموعات الأدوات مع أصحاب المصلحة الخارجيين لتأثير أوسع",
            "إنشاء بوابات أو منتديات إلكترونية حيث يمكن للشركاء وأعضاء المجتمع الوصول إلى المعرفة والمساهمة فيها",
        ],
        examplesListEn: [
            "Organizing joint workshops, webinars, or conferences with other organizations or community groups.",
            "Collaborating with industry partners to develop best practices or pilot new initiatives.",
            "Sharing research, guidelines, or toolkits with external stakeholders for broader impact.",
            "Establishing online portals or forums where partners and community members can access and contribute knowledge.",
        ],
    },
    {
        id: "km-transparency",
        titleAr: "الشفافية والتواصل",
        titleEn: "Transparency & Communication",
        group: "enablers",
        descriptionAr: "يقيّم مدى شفافية وفعالية قنوات التواصل المعرفي داخل المؤسسة.",
        descriptionEn: "Evaluates the transparency and effectiveness of knowledge communication channels within the organization.",
        points: "50",
        evidenceListAr: [
            "سجلات تُظهر تحديثات دورية للسياسات والمشاريع أو الأداء المؤسسي",
            "توفر منصات مشاركة المعرفة أو لوحات المعلومات المتاحة لجميع الموظفين",
            "تغذية راجعة من الموظفين تُشير إلى فهم وثقة في المعلومات المشتركة",
            "سجلات اجتماعات الفرق وتحديثات المشاريع والاتصالات بين الأقسام",
            "إحصائيات الاستخدام من منصات التعاون (مثل Teams وSharePoint)",
            "استبيانات الموظفين التي تُظهر الرضا عن قنوات الاتصال الداخلي",
        ],
        evidenceListEn: [
            "Records showing regular updates on policies, projects, or organizational performance.",
            "Availability of shared knowledge platforms or dashboards accessible to all staff.",
            "Feedback from employees indicating understanding and trust in shared information.",
            "Records of team meetings, project updates, and inter-departmental communications.",
            "Usage statistics from collaboration platforms (e.g., Teams and SharePoint).",
            "Employee surveys showing satisfaction with internal communication channels.",
        ],
        examplesListAr: [
            "نشر تقارير أو نشرات دورية مع تحديثات حول المشاريع والقرارات والنتائج",
            "الحفاظ على مستودع معرفي مركزي أو شبكة داخلية مع وصول واضح للسياسات والإجراءات وأفضل الممارسات",
            "اجتماعات فريق مفتوحة يتم فيها إبلاغ جميع الموظفين المعنيين بالتقدم والتحديات والقرارات",
            "اجتماعات فريق دورية لمناقشة التقدم ومشاركة الدروس المستفادة وتنسيق المهام",
            "استخدام أدوات التعاون لمشاركة المستندات وتتبع حالة المشروع وتسهيل المناقشات الفورية",
            "تنظيم ورش عمل أو إحاطات لضمان اطلاع جميع الموظفين على القرارات الرئيسية والأولويات المؤسسية",
        ],
        examplesListEn: [
            "Publishing regular reports or newsletters with updates on projects, decisions, and outcomes.",
            "Maintaining a central knowledge repository or intranet with clear access to policies, procedures, and best practices.",
            "Open team meetings where progress, challenges, and decisions are communicated to all relevant staff.",
            "Periodic team meetings to discuss progress, share lessons learned, and coordinate tasks.",
            "Using collaboration tools to share documents, track project status, and facilitate real-time discussions.",
            "Organizing workshops or briefings to ensure all staff are informed about key decisions and organizational priorities.",
        ],
    },
    {
        id: "km-app",
        titleAr: "التطبيق العملي والنماذج الرائدة",
        titleEn: "Practical Application & Leading Models",
        group: "results",
        descriptionAr: "يقيّم النماذج والتطبيقات العملية الناجحة لإدارة المعرفة.",
        descriptionEn: "Evaluates successful practical models and applications of knowledge management.",
        points: "120",
        evidenceListAr: [
            "توثيق مشاريع إدارة المعرفة بأهداف ونتائج محددة",
            "سجلات مشاركة الموظفين في مبادرات إدارة المعرفة والفوائد المؤسسية الناتجة",
            "سجلات توثيق أفضل الممارسات ونشرها داخلياً",
            "تغذية راجعة من الموظفين تُشير إلى استخدام الممارسات المشتركة لتحسين عمليات العمل",
        ],
        evidenceListEn: [
            "Documentation of knowledge management projects with defined objectives and outcomes.",
            "Records of staff participation in KM initiatives and resulting organizational benefits.",
            "Records of best-practice documentation and internal dissemination.",
            "Feedback from staff indicating use of shared practices to improve work processes.",
        ],
        examplesListAr: [
            "تطبيق جلسات الدروس المستفادة بعد المشاريع لتحسين الأداء المستقبلي",
            "إجراء ورش عمل أو جلسات تعلم أثناء الغداء لعرض المشاريع الناجحة",
            "نشر دراسات الحالة أو الأدلة على البوابات الداخلية لمرجع الموظفين",
            "برامج التوجيه حيث يشارك الموظفون الأساليب الفعالة والدروس المستفادة مع الزملاء",
        ],
        examplesListEn: [
            "Implementing lessons-learned sessions after projects to improve future performance.",
            "Conducting workshops or lunch-and-learn sessions to showcase successful projects.",
            "Publishing case studies or guides on internal portals for staff reference.",
            "Mentoring programs where employees share effective methods and lessons learned with colleagues.",
        ],
    },
    {
        id: "km-measure",
        titleAr: "القياس والتقييم",
        titleEn: "Measurement & Evaluation",
        group: "results",
        descriptionAr: "يقيّم آليات قياس وتقييم فعالية إدارة المعرفة.",
        descriptionEn: "Evaluates the mechanisms for measuring and evaluating KM effectiveness.",
        points: "80",
        evidenceListAr: [
            "تقارير تُظهر مقاييس استخدام أنظمة إدارة المعرفة مثل تسجيلات الدخول والتحميلات والمساهمات",
            "استبيانات أو تغذية راجعة من الموظفين لقياس الرضا عن أدوات وعمليات إدارة المعرفة",
            "مؤشرات أداء مرتبطة بمبادرات إدارة المعرفة مثل تقليل الأخطاء أو إنجاز المشاريع بشكل أسرع",
            "تحسينات موثقة في كفاءة العمليات أو جودة الخدمة أو اتخاذ القرارات",
            "تقارير توفير التكاليف أو تقليل تكرار العمل أو حل المشكلات بشكل أسرع",
            "دراسات حالة تُبرز الفوائد المحققة من مبادرات إدارة المعرفة",
        ],
        evidenceListEn: [
            "Reports showing usage metrics of KM systems, such as logins, downloads, and contributions.",
            "Surveys or feedback from staff measuring satisfaction with KM tools and processes.",
            "Performance indicators linked to KM initiatives, such as reduced errors or faster project completion.",
            "Documented improvements in process efficiency, service quality, or decision-making.",
            "Reports of cost savings, reduced duplication of work, or faster problem resolution.",
            "Case studies highlighting benefits realized from KM initiatives.",
        ],
        examplesListAr: [
            "إجراء مراجعات ربع سنوية لمستودعات المعرفة لتتبع الاستخدام والملاءمة",
            "استخدام لوحات المعلومات لمراقبة مشاركة الموظفين مع منصات مشاركة المعرفة",
            "تقييم نجاح جلسات التدريب من خلال تتبع الحضور وتحسينات الأداء بعد التدريب",
            "تطبيق برنامج الدروس المستفادة الذي يمنع تكرار الأخطاء ويحسن نتائج المشاريع",
            "مشاركة أفضل الممارسات التي تقلل وقت معالجة المهام الروتينية",
            "إظهار تحسن رضا العملاء بسبب الوصول الأسرع إلى المعرفة المؤسسية",
        ],
        examplesListEn: [
            "Conducting quarterly reviews of knowledge repositories to track usage and relevance.",
            "Using dashboards to monitor staff engagement with knowledge-sharing platforms.",
            "Evaluating the success of training sessions by tracking attendance and post-training performance improvements.",
            "Implementing a lessons-learned program that prevents repeated mistakes and improves project outcomes.",
            "Sharing best practices that reduce processing time for routine tasks.",
            "Demonstrating improved customer satisfaction due to faster access to organizational knowledge.",
        ],
    },
    {
        id: "km-learn",
        titleAr: "التعلم المستمر وبناء القدرات",
        titleEn: "Continuous Learning & Capacity Building",
        group: "results",
        descriptionAr: "يقيّم برامج التعلم المستمر وبناء القدرات المرتبطة بإدارة المعرفة.",
        descriptionEn: "Evaluates continuous learning and capacity building programs related to knowledge management.",
        points: "100",
        evidenceListAr: [
            "تغذية راجعة من الموظفين حول تنمية المهارات وفعالية التدريب",
            "توثيق الدروس المستفادة من المشاريع أو المبادرات المكتملة",
            "سجلات تُظهر تحسينات في العمليات أو النتائج بناءً على الخبرة السابقة",
        ],
        evidenceListEn: [
            "Feedback from employees on skill development and training effectiveness.",
            "Documentation of lessons-learned from completed projects or initiatives.",
            "Records showing improvements in processes or outcomes based on prior experience.",
        ],
        examplesListAr: [
            "تقديم دورات تطوير مهني دورية أو شهادات ذات صلة بالأدوار الوظيفية",
            "برامج التوجيه والتدريب التي تربط الموظفين ذوي الخبرة بالموظفين الأحدث",
            "استضافة ورش عمل أو ندوات عبر الإنترنت أو جلسات تعلم أثناء الغداء حول الأدوات والعمليات وأفضل الممارسات الجديدة",
            "إجراء مراجعات ما بعد المشروع لالتقاط النجاحات ومجالات التحسين",
            "استخدام التغذية الراجعة من الموظفين وأصحاب المصلحة لتحسين سير العمل وتعزيز تقديم الخدمات",
        ],
        examplesListEn: [
            "Offering regular professional development courses or certifications relevant to roles.",
            "Mentoring and coaching programs pairing experienced staff with newer employees.",
            "Hosting workshops, webinars, or \"lunch-and-learn\" sessions on new tools, processes, or best practices.",
            "Conducting post-project reviews to capture successes and areas for improvement.",
            "Using feedback from staff and stakeholders to refine workflows and enhance service delivery.",
        ],
    },
    {
        id: "km-sustain",
        titleAr: "الاستدامة",
        titleEn: "Sustainability",
        group: "results",
        descriptionAr: "يقيّم مدى استدامة ممارسات إدارة المعرفة على المدى الطويل.",
        descriptionEn: "Evaluates the long-term sustainability of knowledge management practices.",
        points: "100",
        evidenceListAr: [
            "تقارير التدقيق أو المراجعات الداخلية التي تؤكد تطبيق ممارسات المعرفة في العمل اليومي",
            "سجلات مبادرات أو برامج إدارة معرفة جديدة أُنشئت بمرور الوقت",
            "مقاييس تُظهر زيادة الاستخدام والتبني أو المساهمة في منصات المعرفة",
            "تقارير تُظهر تحسينات في الكفاءة والابتكار أو جودة الخدمة مرتبطة بنمو إدارة المعرفة",
        ],
        evidenceListEn: [
            "Audit reports or internal reviews confirming knowledge practices are applied in daily work.",
            "Records of new knowledge management initiatives or programs introduced over time.",
            "Metrics showing increased usage, adoption, or contribution to knowledge platforms.",
            "Reports demonstrating improvements in efficiency, innovation, or service quality linked to KM growth.",
        ],
        examplesListAr: [
            "إنشاء سير عمل خطوة بخطوة وقوائم مراجعة للمهام الروتينية بناءً على أفضل الممارسات",
            "توثيق الدروس المستفادة من المشاريع وجعلها جزءاً من الإجراءات المعتمدة",
            "توسيع منصات إدارة المعرفة لتشمل أقساماً أو فرقاً جديدة مما يزيد من النطاق المؤسسي",
            "تطبيق دورات تحسين مستمر لعمليات المعرفة بناءً على تغذية راجعة الموظفين",
            "تقديم أدوات أو تقنيات متقدمة (مثل البحث بالذكاء الاصطناعي ولوحات المعلومات) لتعزيز قدرات إدارة المعرفة",
        ],
        examplesListEn: [
            "Creating step-by-step workflows and checklists for routine tasks based on best practices.",
            "Documenting lessons learned from projects and making them part of standard procedures.",
            "Expanding KM platforms to include new departments or teams, increasing organizational reach.",
            "Implementing continuous improvement cycles for knowledge processes based on staff feedback.",
            "Introducing advanced tools or technologies (e.g., AI search, dashboards) to enhance KM capabilities.",
        ],
    },
];

// ═══ Green Practices Criteria ═══

const greenCriteria: CriterionDefinition[] = [
    {
        id: "green-resources",
        titleAr: "استدامة الموارد المؤسسية",
        titleEn: "Organizational Resource Sustainability",
        group: "enablers",
        descriptionAr: "يقيّم مدى استدامة استخدام الموارد المؤسسية بما في ذلك الطاقة والمياه والمواد.",
        descriptionEn: "Evaluates the sustainability of organizational resource usage including energy, water, and materials.",
        points: "140",
        evidenceListAr: [
            "فواتير الخدمات وتقارير المراقبة التي تُظهر انخفاضًا في الاستهلاك بمرور الوقت",
            "سجلات تركيب المعدات الموفرة للطاقة (إضاءة LED، العدادات الذكية، أجهزة المياه منخفضة التدفق)",
            "حملات توعية الموظفين أو برامج تدريبية حول ترشيد استهلاك الطاقة والمياه",
            "سجلات انخفاض استخدام الورق والحبر والمواد الخام بمرور الوقت",
            "تقارير إعادة التدوير وإدارة النفايات التي تُظهر التخلص السليم وإعادة استخدام المواد",
            "توثيق تحسينات العمليات التي تقلل من استهلاك المواد",
        ],
        evidenceListEn: [
            "Utility bills and monitoring reports showing reduced consumption over time.",
            "Installation records of energy-efficient equipment (LED lighting, smart meters, low-flow water devices).",
            "Employee awareness campaigns or training programs on energy and water conservation.",
            "Records of reduced paper, ink, and raw material usage over time.",
            "Recycling and waste management reports showing proper disposal and reuse of materials.",
            "Documentation of process improvements that reduce material consumption.",
        ],
        examplesListAr: [
            "تطبيق إضاءة بأجهزة استشعار الحركة وأنظمة تكييف موفرة للطاقة لتقليل استهلاك الكهرباء",
            "استخدام صنابير منخفضة التدفق وأجهزة توفير المياه لتقليل استهلاك المياه",
            "مراقبة منتظمة لاستهلاك الطاقة والمياه مع تقارير شهرية لتحديد فرص التوفير",
            "التحول إلى المستندات الرقمية والتوقيعات الإلكترونية لتقليل استخدام الورق والحبر",
            "إعادة تدوير المواد المتبقية وإعادة استخدام المستلزمات حيثما أمكن",
            "تبسيط عمليات الإنتاج لتقليل هدر المواد الخام",
        ],
        examplesListEn: [
            "Implementing motion-sensor lighting and energy-efficient HVAC systems to reduce electricity use.",
            "Using low-flow faucets and water-saving devices to cut water consumption.",
            "Regular monitoring of energy and water use with monthly reports to identify savings opportunities.",
            "Switching to digital documents and e-signatures to minimize paper and ink use.",
            "Recycling scrap materials and reusing supplies where possible.",
            "Streamlining production processes to reduce raw material waste.",
        ],
    },
    {
        id: "green-waste",
        titleAr: "إدارة النفايات وتقليل الأثر البيئي",
        titleEn: "Waste Management & Environmental Impact Reduction",
        group: "enablers",
        descriptionAr: "يقيّم ممارسات إدارة النفايات والجهود المبذولة لتقليل الأثر البيئي.",
        descriptionEn: "Evaluates waste management practices and efforts to reduce environmental impact.",
        points: "130",
        evidenceListAr: [
            "تقارير تدقيق النفايات في الأقسام التي تُظهر انخفاضًا في التخلص في مقالب النفايات",
            "سجلات برامج ومبادرات إعادة التدوير المطبقة في المكاتب والمرافق",
            "مؤشرات الأداء لتقليل النفايات ومعدلات إعادة الاستخدام",
            "سجلات المشتريات التي تُظهر شراء مواد قابلة للتحلل وغير سامة أو قابلة لإعادة التدوير",
            "السياسات أو الإرشادات التي تحدد استخدام المواد الصديقة للبيئة في العمليات",
            "تقارير تتبع انخفاض استخدام المواد الخطرة أو غير القابلة لإعادة التدوير",
        ],
        evidenceListEn: [
            "Departmental waste audits and reports showing reduction in landfill disposal.",
            "Records of recycling programs and initiatives implemented across offices and facilities.",
            "Performance indicators for waste reduction and reuse rates.",
            "Procurement records showing purchases of biodegradable, non-toxic, or recyclable materials.",
            "Policies or guidelines specifying eco-friendly materials in operations.",
            "Reports tracking reduction in use of hazardous or non-recyclable materials.",
        ],
        examplesListAr: [
            "تقديم حاويات منفصلة للمواد القابلة لإعادة التدوير والسماد والنفايات العامة في جميع الأقسام",
            "تنظيم حملات لتشجيع الموظفين على إعادة استخدام المواد وتقليل التغليف",
            "الشراكة مع شركات إعادة التدوير للورق والبلاستيك والنفايات الإلكترونية",
            "التحول إلى مستلزمات التنظيف القابلة للتحلل والتغليف أو المستلزمات المكتبية",
            "استخدام أحبار ودهانات غير سامة في عمليات الطباعة والإنتاج",
            "دمج المواد المعاد تدويرها أو المستدامة في القرطاسية والأزياء الموحدة والمواد الترويجية",
        ],
        examplesListEn: [
            "Introducing separate bins for recyclables, compostables, and general waste in all departments.",
            "Running campaigns to encourage staff to reuse materials and reduce packaging.",
            "Partnering with recycling companies for paper, plastics, and electronic waste.",
            "Switching to biodegradable cleaning supplies, packaging, or office consumables.",
            "Using non-toxic inks and paints in printing and production processes.",
            "Incorporating recycled or sustainable materials in stationery, uniforms, and promotional items.",
        ],
    },
    {
        id: "green-innov",
        titleAr: "الابتكار البيئي",
        titleEn: "Environmental Innovation",
        group: "enablers",
        descriptionAr: "يقيّم المبادرات والابتكارات البيئية المطبقة.",
        descriptionEn: "Evaluates applied environmental initiatives and innovations.",
        points: "130",
        evidenceListAr: [
            "تقارير استهلاك الطاقة",
            "تدقيقات ISO 14001 البيئية التي تؤكد تقليل توليد النفايات",
            "دراسة حالة: إطلاق خط إنتاج جديد باستخدام مواد معاد تدويرها بنسبة 100%، مما أدى إلى انخفاض قابل للقياس في انبعاثات CO₂",
            "المواد المعاد تدويرها/الصديقة للبيئة: سجلات المشتريات، عينات التغليف، أو تقارير اختبار المواد الداخلية التي تؤكد قابلية إعادة التدوير",
            "تحسينات العمليات لتقليل النفايات: سجلات الإنتاج، تقارير تقليل النفايات",
        ],
        evidenceListEn: [
            "Energy consumption reports.",
            "ISO 14001 environmental audits confirming reduced waste generation.",
            "Case study: Launch of a new product line using 100% recycled materials, resulting in measurable CO₂ reduction.",
            "Recycled/eco-friendly materials: Procurement records, packaging samples, or internal material test reports confirming recyclability.",
            "Process improvements to reduce waste: Production logs, waste reduction reports.",
        ],
        examplesListAr: [
            "تطبيق معدات تصنيع موفرة للطاقة لتقليل استهلاك الكهرباء وقد تشمل أنظمة الطاقة الشمسية",
            "اعتماد أنظمة إعادة تدوير المياه في خطوط الإنتاج",
            "استخدام تغليف قابل للتحلل أو إعادة التدوير للمنتجات",
            "تطوير منتجات موفرة للطاقة من خلال تحسين التصاميم الحالية لتقليل استهلاك الكهرباء أو الوقود",
            "استخدام مواد معاد تدويرها أو صديقة للبيئة في المنتجات أو التغليف",
            "تطبيق تحسينات على العمليات لتقليل هدر المواد في الإنتاج",
        ],
        examplesListEn: [
            "Implementing energy-efficient manufacturing equipment to reduce electricity consumption and this could be solar systems.",
            "Adopting water recycling systems in production lines.",
            "Using biodegradable or recyclable packaging for products.",
            "Developing energy-efficient products by improving existing designs to reduce electricity or fuel consumption.",
            "Using recycled or eco-friendly materials in products or packaging.",
            "Implementing process improvements to minimize material waste in production.",
        ],
    },
    {
        id: "green-supply",
        titleAr: "استدامة سلسلة التوريد",
        titleEn: "Supply Chain Sustainability",
        group: "enablers",
        descriptionAr: "يقيّم مدى تطبيق معايير الاستدامة في سلسلة التوريد.",
        descriptionEn: "Evaluates the application of sustainability standards in the supply chain.",
        points: "100",
        evidenceListAr: [
            "تقارير تقييم الموردين بما في ذلك درجات الاستدامة",
            "عقود المشتريات التي تتضمن متطلبات بيئية",
            "وثائق التدقيق الداخلي أو امتثال الموردين",
            "اتفاقيات شراكة موقعة أو مذكرات تفاهم (MoUs)",
            "تقارير تتبع انخفاض انبعاثات CO₂ أو توفير الموارد",
            "وثائق المشاريع المشتركة، دراسات الحالة، أو نتائج البرامج التجريبية",
        ],
        evidenceListEn: [
            "Supplier evaluation reports including sustainability scores.",
            "Procurement contracts with environmental requirements.",
            "Internal audit or supplier compliance documentation.",
            "Signed partnership agreements or memoranda of understanding (MoUs).",
            "Reports tracking CO₂ reductions or resource savings.",
            "Joint project documentation, case studies, or pilot program results.",
        ],
        examplesListAr: [
            "تقارير تقييم الموردين بما في ذلك درجات الاستدامة",
            "عقود المشتريات التي تتضمن متطلبات بيئية",
            "وثائق التدقيق الداخلي أو امتثال الموردين",
            "اتفاقيات شراكة موقعة أو مذكرات تفاهم (MoUs)",
            "تقارير تتبع انخفاض انبعاثات CO₂ أو توفير الموارد",
            "وثائق المشاريع المشتركة، دراسات الحالة، أو نتائج البرامج التجريبية",
        ],
        examplesListEn: [
            "Supplier evaluation reports including sustainability scores.",
            "Procurement contracts with environmental requirements.",
            "Internal audit or supplier compliance documentation.",
            "Signed partnership agreements or memoranda of understanding (MoUs).",
            "Reports tracking CO₂ reductions or resource savings.",
            "Joint project documentation, case studies, or pilot program results.",
        ],
    },
    {
        id: "green-community",
        titleAr: "التوعية والمشاركة المجتمعية",
        titleEn: "Awareness & Community Engagement",
        group: "enablers",
        descriptionAr: "يقيّم جهود التوعية البيئية والمشاركة المجتمعية.",
        descriptionEn: "Evaluates environmental awareness efforts and community engagement.",
        points: "100",
        evidenceListAr: [
            "جداول ورش العمل وقوائم الحضور أو صور الجلسات",
            "نسخ من الملصقات والنشرات الإخبارية بالبريد الإلكتروني أو منشورات وسائل التواصل الاجتماعي",
            "تقارير الفعاليات والصور أو رسائل من المدارس/المنظمات المجتمعية تؤكد المشاركة",
            "صور الفعاليات وسجلات حضور المتطوعين أو التغطية الإعلامية",
            "اتفاقيات الشراكة وتقارير المشاريع أو جداول تتبع التقدم",
            "الوثائق الداخلية للمساهمات وتقارير المشاريع أو التغذية الراجعة من شركاء المجتمع",
        ],
        evidenceListEn: [
            "Workshop schedules, attendance lists, or photos of sessions.",
            "Copies of posters, email newsletters, or social media posts.",
            "Event reports, photos, or letters from schools/community organizations confirming participation.",
            "Event photos, volunteer sign-in sheets, or media coverage.",
            "Partnership agreements, project reports, or progress tracking sheets.",
            "Internal documentation of contributions, project reports, or feedback from community partners.",
        ],
        examplesListAr: [
            "تنظيم ورش عمل داخلية حول ترشيد الطاقة وتقليل النفايات أو الممارسات المستدامة للموظفين",
            "إجراء حملات توعية باستخدام الملصقات والبريد الإلكتروني أو النشرات حول المسؤولية البيئية",
            "استضافة محادثات مجتمعية أو زيارات مدرسية لتثقيف المجتمع المحلي حول الاستدامة",
            "المشاركة في حملات زراعة الأشجار أو حملات التنظيف المحلية",
            "الشراكة مع المنظمات المجتمعية في برامج إعادة التدوير أو تقليل النفايات",
            "دعم مشروع مجتمعي لترشيد المياه أو الطاقة المتجددة أو التخضير الحضري",
        ],
        examplesListEn: [
            "Organize internal workshops on energy conservation, waste reduction, or sustainable practices for employees.",
            "Conduct awareness campaigns using posters, emails, or newsletters about environmental responsibility.",
            "Host community talks or school visits to educate the local community on sustainability.",
            "Participate in local tree planting or clean-up campaigns.",
            "Partner with community organizations on recycling or waste reduction programs.",
            "Support a community project for water conservation, renewable energy, or urban greening.",
        ],
    },
    {
        id: "green-design",
        titleAr: "نتائج وأثر تصميم الخدمات الخضراء",
        titleEn: "Green Service Design Results & Impact",
        group: "results",
        descriptionAr: "يقيّم نتائج وأثر تصميم وتقديم الخدمات الخضراء.",
        descriptionEn: "Evaluates the results and impact of designing and delivering green services.",
        points: "150",
        evidenceListAr: [
            "وثائق سير العمل الداخلية التي تُظهر عمليات الموافقة الرقمية أو إجراءات توفير الطاقة",
            "تقارير عن انخفاض السفر أو استهلاك الوقود وجداول الاجتماعات أو سجلات تحسين اللوجستيات",
            "سجلات تتبع النفايات وتقارير التدقيق الداخلي أو سجلات المخزون التي تُظهر تقليل المواد ذات الاستخدام الواحد",
            "فواتير المشتريات التي تُظهر شراء ورق معاد تدويره أو مواد أخرى",
            "عينات التغليف أو سجلات المشتريات الداخلية التي تؤكد قابلية إعادة تدوير المواد",
            "تقارير المخزون أو المشتريات التي تُظهر استبدال البلاستيك ذي الاستخدام الواحد بعناصر معاد تدويرها/قابلة لإعادة الاستخدام",
        ],
        evidenceListEn: [
            "Internal workflow documentation showing digital approval processes or energy-saving measures.",
            "Reports on reduced travel or fuel consumption, meeting schedules, or logistics optimization records.",
            "Waste tracking logs, internal audit reports, or inventory records showing reduced single-use materials.",
            "Procurement invoices showing purchase of recycled paper or materials.",
            "Packaging samples or internal procurement records confirming recyclable materials.",
            "Inventory or procurement reports showing the replacement of single-use plastics with recycled / reusable items.",
        ],
        examplesListAr: [
            "إعادة تصميم سير العمل الداخلي لتقليل استهلاك الطاقة، مثل استخدام الموافقات الرقمية بدلاً من العمليات الورقية",
            "تطبيق تقديم خدمات صديقة للبيئة مثل تقليل السفر من خلال الاجتماعات الافتراضية أو تحسين مسارات اللوجستيات",
            "تعديل العمليات التشغيلية لتقليل النفايات مثل إعادة استخدام المواد أو تقليل العناصر ذات الاستخدام الواحد في تقديم الخدمات",
            "دمج الورق المعاد تدويره في العمليات المكتبية أو مواد الخدمة",
            "استخدام تغليف قابل لإعادة التدوير للمنتجات أو مواد تقديم الخدمة",
            "استبدال مكونات البلاستيك ذات الاستخدام الواحد ببدائل معاد تدويرها أو قابلة لإعادة الاستخدام في الخدمات أو العمليات",
        ],
        examplesListEn: [
            "Redesign internal workflows to reduce energy consumption, e.g., using digital approvals instead of paper-based processes.",
            "Implement eco-friendly service delivery, such as reducing travel through virtual meetings or optimizing logistics routes.",
            "Adjust operational processes to minimize waste, e.g., reusing materials or reducing single-use items in service delivery.",
            "Incorporate recycled paper in office operations or service materials.",
            "Use recyclable packaging for products or service delivery materials.",
            "Replace single-use plastic components with recycled or reusable alternatives in services or processes.",
        ],
    },
    {
        id: "green-performance",
        titleAr: "الأداء البيئي الفعلي",
        titleEn: "Actual Environmental Performance",
        group: "results",
        descriptionAr: "يقيّم الأداء البيئي الفعلي والنتائج القابلة للقياس.",
        descriptionEn: "Evaluates actual environmental performance and measurable results.",
        points: "150",
        evidenceListAr: [
            "سجلات المواد المعاد تدويرها (الوزن أو الحجم) وتقارير إعادة التدوير الداخلية",
            "سجلات وقود المركبات التي تُظهر انخفاض الانبعاثات أو اعتماد مركبات كهربائية/هجينة",
            "تقارير تدقيق النفايات أو قوائم المراجعة التي تُظهر ممارسات الفصل والتخلص السليم",
            "فواتير الخدمات التي تُظهر انخفاض استهلاك الطاقة أو المياه",
            "سجلات الأجهزة الموفرة للطاقة المركبة (مثل الفواتير ونماذج الموافقة الداخلية)",
            "سجلات المراقبة الداخلية التي تُظهر اتجاهات استهلاك الطاقة أو المياه بمرور الوقت",
        ],
        evidenceListEn: [
            "Records of recycled materials (weight or volume), internal recycling reports.",
            "Vehicle fuel logs showing lower emissions or adoption of electric / hybrid vehicles.",
            "Waste audit reports or checklists showing proper segregation and disposal practices.",
            "Utility bills showing reduced energy or water usage.",
            "Records of installed energy-efficient devices (e.g., invoices, internal approval forms).",
            "Internal monitoring logs showing energy or water consumption trends over time.",
        ],
        examplesListAr: [
            "تطبيق برامج إعادة تدوير الورق والبلاستيك والنفايات المكتبية الأخرى",
            "التحول إلى وسائل نقل صديقة للبيئة للتوصيل أو مركبات الشركة لتقليل الانبعاثات",
            "تقديم إرشادات فصل النفايات والتخلص منها في مناطق الإنتاج أو المكاتب",
            "تركيب إضاءة أو معدات موفرة للطاقة لتقليل استهلاك الكهرباء",
            "تطبيق إجراءات توفير المياه مثل الصنابير منخفضة التدفق أو أنظمة إعادة تدوير المياه",
            "مراقبة وتحسين أنظمة التدفئة والتهوية والتكييف لتوفير الطاقة",
        ],
        examplesListEn: [
            "Implement recycling programs for paper, plastics, and other office waste.",
            "Switch to eco-friendly transportation for deliveries or company vehicles to reduce emissions.",
            "Introduce waste segregation and disposal guidelines in production or office areas.",
            "Install energy-efficient lighting or equipment to reduce electricity consumption.",
            "Implement water-saving measures like low-flow taps or water recycling systems.",
            "Monitor and optimize heating, ventilation, and cooling systems to save energy.",
        ],
    },
    {
        id: "green-impact",
        titleAr: "أثر الابتكار البيئي",
        titleEn: "Environmental Innovation Impact",
        group: "results",
        descriptionAr: "يقيّم الأثر الفعلي للابتكارات البيئية المطبقة.",
        descriptionEn: "Evaluates the actual impact of applied environmental innovations.",
        points: "100",
        evidenceListAr: [
            "تقارير المشاريع أو الوثائق الداخلية التي تُظهر نتائج تقليل الطاقة/المياه",
            "مواصفات المنتجات ونتائج الاختبارات أو الصور التي تُظهر التغييرات الصديقة للبيئة",
            "التقارير الداخلية أو لوحات المعلومات التي تُظهر تقليل الورق/الطباعة وتحسين الكفاءة",
            "فواتير الخدمات التي تُظهر انخفاض تكاليف الطاقة/المياه قبل وبعد المبادرات",
            "تقارير التكاليف الداخلية التي تُظهر الوفورات من تقليل النفايات أو برامج إعادة التدوير",
            "تقارير المبيعات أو الفواتير التي تُظهر الإيرادات من العروض الصديقة للبيئة",
        ],
        evidenceListEn: [
            "Project reports or internal documentation showing energy/water reduction results.",
            "Product specifications, test results, or photos showing eco-friendly changes.",
            "Internal reports or dashboards showing paper/printing reduction and efficiency improvements.",
            "Utility bills showing lower energy/water costs before and after initiatives.",
            "Internal cost reports showing savings from waste reduction or recycling programs.",
            "Sales reports or invoices demonstrating revenue from environmentally friendly offerings.",
        ],
        examplesListAr: [
            "تطوير عملية جديدة تقلل من استهلاك الطاقة أو المياه في العمليات",
            "تقديم تعديل على منتج أو خدمة يستخدم مواد صديقة للبيئة أو ينتج نفايات أقل",
            "تجريب حل رقمي (مثل سير عمل بدون ورق) يقلل الأثر البيئي مع تحسين الكفاءة",
            "توفير في التكاليف من انخفاض استهلاك الطاقة والمياه بسبب مبادرات الاستدامة أو تقارير العائد على الاستثمار للمشاريع المستدامة",
            "تحقيق تخفيض في التكاليف التشغيلية من خلال إعادة تدوير المواد أو تقليل النفايات",
            "تحقيق إيرادات إضافية من المنتجات أو الخدمات الصديقة للبيئة التي تجذب العملاء المهتمين بالبيئة",
        ],
        examplesListEn: [
            "Develop a new process that reduces energy or water consumption in operations.",
            "Introduce a product or service modification that uses eco-friendly materials or generates less waste.",
            "Pilot a digital solution (e.g., paperless workflows) that reduces environmental impact while improving efficiency.",
            "Cost savings from reduced energy and water usage due to sustainability initiatives or ROI reports for sustainable projects.",
            "Achieve reduced operational costs by recycling materials or reducing waste.",
            "Generate additional revenue from eco-friendly products or services that appeal to environmentally conscious customers.",
        ],
    },
];

// ═══ Submission Configs ═══

export const submissionConfigs: CategorySubmissionConfig[] = [
    {
        slugs: ["employee-nonsupervisory"],
        steps: ["intro", "criteria", "review", "confirmation"],
        maxWordsPerCriterion: 400,
        maxFilesPerCriterion: 0,
        totalPoints: 100,
        extraInfoFields: sharedEmployeeExtraFields,
        criteria: patternACriteria,
    },
    {
        slugs: ["employee-supervisory"],
        steps: ["intro", "criteria", "review", "confirmation"],
        maxWordsPerCriterion: 400,
        maxFilesPerCriterion: 0,
        totalPoints: 100,
        extraInfoFields: sharedEmployeeExtraFields,
        criteria: leaderCriteria,
    },
    {
        slugs: ["department"],
        steps: ["intro", "criteria", "review", "confirmation"],
        maxWordsPerCriterion: 400,
        maxFilesPerCriterion: 0,
        totalPoints: 1000,
        extraInfoFields: [
            { id: "deptName", type: "text", labelAr: "اسم القسم / الإدارة", labelEn: "Department Name", required: true },
            { id: "deptHeadName", type: "text", labelAr: "اسم رئيس القسم", labelEn: "Department Head Name", required: true },
        ],
        criteria: departmentCriteria,
    },
    {
        slugs: ["project"],
        steps: ["intro", "criteria", "review", "confirmation"],
        maxWordsPerCriterion: 400,
        maxFilesPerCriterion: 0,
        totalPoints: 100,
        extraInfoFields: [
            { id: "projectName", type: "text", labelAr: "اسم المشروع / المبادرة", labelEn: "Project / Initiative Name", required: true },
            { id: "projectLead", type: "text", labelAr: "قائد المشروع", labelEn: "Project Lead", required: true },
            { id: "projectDuration", type: "text", labelAr: "مدة المشروع", labelEn: "Project Duration", required: true },
        ],
        criteria: projectCriteria,
    },
    {
        slugs: ["knowledge"],
        steps: ["intro", "criteria", "review", "confirmation"],
        maxWordsPerCriterion: 400,
        maxFilesPerCriterion: 0,
        totalPoints: 1000,
        extraInfoFields: [
            { id: "kmDept", type: "text", labelAr: "القسم / الإدارة", labelEn: "Department / Division", required: true },
        ],
        criteria: knowledgeCriteria,
    },
    {
        slugs: ["green"],
        steps: ["intro", "criteria", "review", "confirmation"],
        maxWordsPerCriterion: 400,
        maxFilesPerCriterion: 0,
        totalPoints: 1000,
        extraInfoFields: [
            { id: "greenDept", type: "text", labelAr: "القسم / الإدارة", labelEn: "Department / Division", required: true },
        ],
        criteria: greenCriteria,
    },
];

// ═══ Supervisory Criteria Map ═══

export const supervisoryCriteriaMap: Record<string, CriterionDefinition[]> = {
    leader: leaderCriteria,
    futureleader: futureLeaderCriteria,
};

// ═══ Helper Functions ═══

export function getSubmissionConfig(slug: string): CategorySubmissionConfig | undefined {
    return submissionConfigs.find((config) => config.slugs.includes(slug));
}

export function getCriteriaForEmployee(
    slug: string,
    subcategory: string
): CriterionDefinition[] {
    if (slug === "employee-supervisory") {
        return supervisoryCriteriaMap[subcategory] ?? leaderCriteria;
    }
    if (slug === "employee-nonsupervisory" && nonSupervisoryCriteriaMap[subcategory]) {
        return nonSupervisoryCriteriaMap[subcategory];
    }
    return patternACriteria;
}
