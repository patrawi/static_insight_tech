import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Cpu,
  Globe,
  CheckCircle2,
  Speech,
  Landmark,
  FileChartColumn,
  Construction,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

/* --- COMPONENT ARCHITECTURE ---
  This application uses a modular component structure within a single file.
  Each section (Hero, Services, Insights, etc.) is broken down for maintainability.
  Tailwind CSS is used for utility-first styling, ensuring a "clean code" approach.
*/
// --- DATA CONSTANTS ---
const SERVICES = [
  {
    title: "Digital Transformation Consulting",
    subtitle: "วางโครงสร้างธุรกิจใหม่ให้ขับเคลื่อนด้วยข้อมูล",
    desc: "เราเข้าไปช่วยวิเคราะห์กระบวนการทำงาน (Workflow) ของธุรกิจ ตั้งแต่การทำงานของคน → ระบบ → ข้อมูล → การตัดสินใจ",
    icon: <Speech className="w-8 h-8 text-blue-500" />,
    outcomes: [
      "วิเคราะห์ปัญหาและ bottleneck ใน process ปัจจุบัน",
      "ออกแบบ workflow ใหม่ให้ทำงานเร็วขึ้นและตรวจสอบได้",
      "วาง roadmap การใช้ระบบและข้อมูลในระยะยาว",
    ],
  },
  {
    title: "Custom Internal System Development",
    subtitle: 'พัฒนาระบบที่ "ออกแบบมาเพื่อธุรกิจคุณโดยเฉพาะ"',
    desc: "สร้าง Internal Tools ที่ตรงกับกระบวนการจริงขององค์กร",
    icon: <Cpu className="w-8 h-8 text-teal-400" />,
    examples: [
      "ระบบเก็บข้อมูลภายในองค์กร",
      "ระบบจัดการงาน / เอกสาร / นโยบาย / workflow อนุมัติ",
      "ระบบ Monitoring, Tracking, Audit Trail",
    ],
  },
  {
    title: "Data Architecture & Data Flow Design",
    subtitle: "ข้อมูลไหลเป็นระบบ และพร้อมใช้งานจริง",
    desc: 'เราออกแบบโครงสร้างข้อมูลตั้งแต่ต้น เพื่อให้ข้อมูล "ไม่กระจัดกระจาย" และ "นำไปใช้ต่อได้"',
    icon: <Landmark className="w-8 h-8 text-purple-500" />,
    outcomes: [
      "ออกแบบ Data Schema & Database",
      "วาง Data Flow ระหว่างระบบต่าง ๆ",
      "สร้าง Single Source of Truth สำหรับองค์กร",
    ],
  },
  {
    title: "Data Analytics & Business Intelligence",
    subtitle: "เปลี่ยนข้อมูลดิบ → Insight ที่ใช้ตัดสินใจได้",
    desc: 'เราออกแบบ Dashboard และรายงานที่ตอบโจทย์ธุรกิจจริง ไม่ใช่แค่สวย แต่ต้อง "ใช้ตัดสินใจได้"',
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    outcomes: [
      "Business Dashboard แบบ Real-time",
      "KPI / Metric ที่เหมาะกับธุรกิจ",
      "Insight เพื่อมองแนวโน้ม ความเสี่ยง และโอกาส",
    ],
  },
  {
    title: "Data Science & Predictive Modeling",
    subtitle: "ใช้ข้อมูลคาดการณ์อนาคต ไม่ใช่แค่ดูอดีต",
    desc: 'เราใช้ Data Science เพื่อช่วยให้ธุรกิจ "ตัดสินใจก่อนปัญหาเกิด"',
    icon: <FileChartColumn className="w-8 h-8 text-teal-400" />,
    outcomes: [
      "Forecast ยอดขาย / Demand",
      "Churn Prediction / Customer Segmentation",
      "Recommendation & Optimization Model",
    ],
  },
  {
    title: "Ongoing Support & Improvement",
    subtitle: "ไม่ใช่แค่ทำเสร็จแล้วจบ แต่พัฒนาไปพร้อมธุรกิจ",
    desc: "ปรับปรุงระบบและ dashboard ตามการเติบโตของธุรกิจ",
    icon: <Construction className="w-8 h-8 text-purple-500" />,
    outcomes: [
      "เพิ่ม feature ใหม่เมื่อธุรกิจเปลี่ยน",
      "ให้คำปรึกษาเชิงกลยุทธ์ด้านข้อมูลอย่างต่อเนื่อง",
    ],
  },
];

const TEAM = [
  {
    name: "Pirawat Wareetanyarat",
    role: "Tech Lead",
    focus: "ผู้รับผิดชอบด้านสถาปัตยกรรมระบบและการพัฒนาโซลูชันเชิงเทคนิค",
    desc: "มีความเชี่ยวชาญในการออกแบบ Internal Systems, Workflow Automation และ Data Flow โดยเน้นระบบที่มีเสถียรภาพ ปลอดภัย และสามารถขยายต่อได้ในอนาคต",
    expertise: [
      "Machine Learning",
      "Workflow Automation",
      "Secure Infrastructure",
      "Web Applications",
    ],
    icon: <Cpu className="w-12 h-12 text-blue-500" />,
    image: "/profiles/p.avif",
  },
  {
    name: "Kanyawee Chomming",
    role: "Business & Data Lead",
    focus:
      "ดูแลด้านการวิเคราะห์ข้อมูลและการแปลงข้อมูลให้เป็น Insight ทางธุรกิจ",
    desc: "มีประสบการณ์ในการออกแบบ Data Model, Dashboard และ Business Metrics เพื่อช่วยให้ผู้บริหารและทีมงานตัดสินใจได้จากข้อมูลจริง",
    expertise: ["Business Intelligence", "KPI Tracking", "Market Analysis"],
    icon: <BarChart3 className="w-12 h-12 text-teal-400" />,
    image: "/profiles/v.jpg",
  },
];

const EXPERIENCES = [
  {
    name: "Wisesight",
    image: "/experiences/wisesight.png",
  },
  {
    name: "Fintech",
    image: "/experiences/Fintech.jpeg",
  },
  {
    name: "Motorhub",
    image: "/experiences/motorhub.jpeg",
  },
  {
    name: "ART",
    image: "/experiences/ART.png",
  },
];

const PROJECTS = [
  {
    category: "fintech",
    categoryLabel: "FinTech",
    categoryColor: "bg-red-500",
    title: "Sale Detail Comparator",
    description:
      "เปรียบเทียบ Snapshot ของ Sale Detail เพื่อค้นหาความเปลี่ยนแปลงของข้อมูล และ ตรวจสอบความสอดคล้องของรายการขายในแต่ละช่วงเวลา สรุปและวิเคราะห์ข้อมูล PO Approval รายปี เพื่อใช้ในการควบคุมงบประมาณ",
    image: "/works/snapshot_comparator.png",
  },
  {
    category: "ai",
    categoryLabel: "AI",
    categoryColor: "bg-blue-500",
    title: "Policy Intelligence Platform",
    description:
      "ร่างนโยบาย พร้อมวิเคราะห์ความเหมาะสมและผลกระทบด้วย AI \
      ส่งนโยบายให้ผู้มีอำนาจพิจารณาและตัดสินใจอย่างเป็นระบบ\
      ประกาศนโยบายอย่างเป็นทางการ และสื่อสารถึงพนักงานทุกคน",
    image: "/works/policy_management_sys.png",
  },
  {
    category: "businessIntelligence",
    categoryLabel: "Business Intelligence",
    categoryColor: "bg-teal-500",
    title: "Inventory & Sales Analytics Platform (Pet Business)",
    description:
      "ระบบวิเคราะห์ข้อมูลยอดขายและสต๊อกสินค้าแบบครบวงจร สำหรับธุรกิจสัตว์เลี้ยง ช่วยให้เจ้าของธุรกิจมองเห็นภาพรวมยอดขาย สต๊อก และโอกาสสูญเสียรายได้ในที่เดียว รองรับการเลือกช่วงเวลา วิเคราะห์ตามหมวดสินค้า คำนวณยอดขาย กำไร ต้นทุน พร้อมระบบ \
      Reorder & Inventory Risk (RU Score) เพื่อช่วยตัดสินใจเติมสินค้าได้อย่างแม่นยำ ลดของขาด-ของค้าง และเพิ่มประสิทธิภาพการบริหารธุรกิจด้วยข้อมูลจริง \
      ช่วยให้ผู้บริหารและเจ้าของธุรกิจตัดสินใจจากข้อมูลจริง (Data-driven Decision)",
    image: "/works/inventory.png",
  },
  {
    category: "dataEng",
    categoryLabel: "Data Engineering",
    categoryColor: "bg-indigo-500",
    title: "Dremio Job Scheduler",
    description:
      "ตั้ง Schedule Run สำหรับ Query ที่มีความซับซ้อนใน Dremio \
      Export ผลลัพธ์เป็นตารางหรือไฟล์อัตโนมัติ \
      ส่งข้อมูลขึ้น S3 เพื่อเชื่อมต่อกับระบบ BI เช่น Superset ได้อย่างราบรื่น",
    image: "/works/dremio.png",
  },
  {
    category: "ai",
    categoryLabel: "AI",
    categoryColor: "bg-blue-500",
    title: "PDF To CSV OCR",
    description:
      "ระบบ AI OCR อัจฉริยะสำหรับแปลงข้อมูลจากเอกสาร PDF ที่มีความซับซ้อนสูงให้เป็นไฟล์ CSV แบบมีโครงสร้าง สำหรับจัดการเอกสารทางธุรกิจ เช่น รายงานประจำปี  หรือตารางหลายคอลัมน์ ช่วยลดเวลาและภาระงานป้อนข้อมูลด้วยมือ (Manual Entry)  พร้อมเพิ่มความแม่นยำในการดึงข้อมูลด้วยเทคโนโลยี Machine Learning",
    image: "/works/ai_automation.png",
  },
];

// --- SUB-COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-sm transform group-hover:rotate-45 transition-transform duration-300"></div>
          <span className="text-2xl font-bold text-white tracking-tighter">
            Insight
            <span className="text-blue-400">Tech</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "services", link: "services" },
            { label: "work", link: "work" },
            { label: "team", link: "team" },
            { label: "experience", link: "experience" },
            { label: "contact", link: "contact" },
          ].map((item) => (
            <a
              key={item.link}
              href={`#${item.link}`}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
          {[
            { label: "บริการ", link: "services" },
            { label: "ผลงาน", link: "work" },
            { label: "ทีมงาน", link: "team" },
            { label: "ประสบการณ์", link: "experience" },
            { label: "ติดต่อเรา", link: "contact" },
          ].map((item) => (
            <a
              key={item.link}
              href={`#${item.link}`}
              className="text-lg font-medium text-slate-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]"></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Digital Transformation Partner
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
            Data & AI-Driven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Enterprise Transformation
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            พาร์ตเนอร์ด้าน{" "}
            <strong className="text-white"> Digital Transformation </strong>{" "}
            ที่ขับเคลื่อนองค์กรด้วย AI
            <br />
            และข้อมูล ตั้งแต่ระบบ งาน ไปจนถึง Insight เพื่อการตัดสินใจทางธุรกิจ
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-900/20"
            >
              Our Services
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            บริการของเรา
          </h2>
          <p className="text-slate-600 text-lg">
            โซลูชันครบวงจรที่ออกแบบมาเพื่อธุรกิจของคุณ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-slate-50 hover:bg-slate-900 transition-all duration-500 rounded-xl border border-slate-100 hover:border-slate-800 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/0 to-blue-500/10 rounded-bl-full transition-all group-hover:scale-150"></div>

              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm font-medium text-blue-600 group-hover:text-blue-400 mb-4 transition-colors">
                {service.subtitle}
              </p>
              <p className="text-slate-600 group-hover:text-slate-400 text-sm leading-relaxed mb-6 transition-colors">
                {service.desc}
              </p>
              <div className="pt-6 border-t border-slate-200 group-hover:border-slate-700">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 group-hover:text-slate-400">
                  {service.examples ? "ตัวอย่างระบบ" : "สิ่งที่ได้"}
                </p>
                <ul className="space-y-2">
                  {(service.outcomes || service.examples).map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-700 group-hover:text-slate-300 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section id="team" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6">
            Our Teams
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Bridging Technical <br />& Business
          </h2>
          <p className="text-slate-600 text-lg">
            เราทำงานเป็นทีมที่ผสานจุดแข็งระหว่าง "ระบบที่เสถียร" และ
            "ข้อมูลที่ตอบโจทย์ธุรกิจ"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TEAM.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-40 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm">
                    {member.role}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  ด้านที่เชี่ยวชาญ
                </p>
                <p className="text-slate-700 font-medium">{member.focus}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  บทบาท
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.desc}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  ความเชี่ยวชาญ
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-6">
            Our Experience
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            ประสบการณ์ของเรา
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className="aspect-square rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={exp.image}
                alt={exp.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { label: "All Projects", value: "all" },
    { label: "FinTech", value: "fintech" },
    { label: "Business Intelligence", value: "businessIntelligence" },
    { label: "Data Engineering", value: "dataEng" },
    { label: "AI", value: "ai" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <section id="work" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            Case Studies
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Transforming Visions into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Digital Reality
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We build software and data solutions that help organizations work
            smarter, move faster, and make better decisions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all shadow-lg ${
                activeFilter === filter.value
                  ? "bg-slate-900 text-white shadow-slate-500/30"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <article
              key={index}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Background with image */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-bold text-white ${project.categoryColor} rounded-full bg-opacity-90`}
                  >
                    {project.categoryLabel}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  View Case Study
                  <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to start your transformation?
          </h3>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition-all shadow-lg hover:shadow-blue-500/40"
          >
            Get a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800"></section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    company: "",
    employeeCount: "",
    country: "",
    industry: "",
    budget: "",
    projectStart: "",
    details: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;

    try {
      await emailjs.send(serviceId, templateId, {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        company: formData.company,
        employee_count: formData.employeeCount,
        country: formData.country,
        industry: formData.industry,
        budget: formData.budget,
        project_start: formData.projectStart,
        details: formData.details,
      });
      setStatus("success");
      setStatusMessage(
        "ข้อความของคุณถูกส่งเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็ว",
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        company: "",
        employeeCount: "",
        country: "",
        industry: "",
        budget: "",
        projectStart: "",
        details: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
      setStatusMessage("เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองอีกครั้ง");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              Contact Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              ติดต่อเรา
            </h2>
            <p className="text-slate-600 text-lg">
              แบบฟอร์มติดต่อเรามีอยู่ 11 ช่อง
              โปรดตอบคำถามให้ครบทุกช่องที่มีเครื่องหมาย *
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Grid - Two Columns */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    ชื่อ นามสกุล <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="ชื่อ นามสกุลของคุณ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    อีเมล <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    เบอร์โทรศัพท์ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="เช่น 081-234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    ตำแหน่งงาน
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="เช่น CEO, Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    บริษัท
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="ชื่อบริษัทของคุณ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    จำนวนพนักงาน
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employeeCount: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                  >
                    <option value="">เลือกจำนวนพนักงาน</option>
                    <option value="1-10">1-10 คน</option>
                    <option value="11-50">11-50 คน</option>
                    <option value="51-200">51-200 คน</option>
                    <option value="201-500">201-500 คน</option>
                    <option value="501+">มากกว่า 500 คน</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    ประเทศ
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="เช่น ประเทศไทย"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    อุตสาหกรรม
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                  >
                    <option value="">เลือกอุตสาหกรรม</option>
                    <option value="banking">ธนาคารและการเงิน</option>
                    <option value="insurance">ประกันภัย</option>
                    <option value="retail">ค้าปลีก</option>
                    <option value="consumer">สินค้าอุปโภคบริโภค</option>
                    <option value="manufacturing">การผลิต</option>
                    <option value="energy">พลังงาน</option>
                    <option value="healthcare">บริการสุขภาพ</option>
                    <option value="government">ภาครัฐ</option>
                    <option value="food">อาหารและเครื่องดื่ม</option>
                    <option value="other">และอื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    งบประมาณโครงการ (THB/USD){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="เช่น 500,000 THB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    เวลาเริ่มโครงการ (เดือน/ปี){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="month"
                    required
                    value={formData.projectStart}
                    onChange={(e) =>
                      setFormData({ ...formData, projectStart: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    รายละเอียด <span className="text-red-600">*</span>
                  </label>
                  <p className="text-xs text-slate-500 mb-2">
                    โปรดระบุขอบเขตของโครงการหรือบริการที่คุณสนใจ เช่น AI,
                    Security, Strategy หรือ เรื่องอื่นๆ ที่คุณต้องการติดต่อเรา
                  </p>
                  <textarea
                    required
                    rows={5}
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                    placeholder="ระบุรายละเอียดเพิ่มเติม..."
                  />
                </div>
              </div>
            </div>

            {statusMessage && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  status === "success"
                    ? "bg-green-100 text-green-700"
                    : status === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {statusMessage}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    กำลังส่ง...
                  </>
                ) : (
                  <>
                    ส่งข้อความ
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-white tracking-tighter block mb-6">
              INSIGHT<span className="text-blue-400">TECH</span>
            </span>
            <p className="max-w-xs text-sm leading-relaxed mb-6">
              พาร์ทเนอร์การแปลงแบบครบวงจร จากกระบวนการสู่การตัดสินใจ —
              เราเปลี่ยนข้อมูลที่กระจัดกระจายให้เป็นข้อมูลเชิงลึกทางธุรกิจผ่านระบบตามความต้องการ
            </p>

            <div className="flex gap-4">
              <a
                href="mailto:patrawi.dev@gmail.com"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-xs font-bold"
              >
                อีเมล
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <div>© 2026 InsightTech. สงวนลิขสิทธิ์</div>
          <div className="flex gap-6 mt-4 md:mt-0"></div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white selection:bg-blue-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <WorkSection />
        <TeamSection />
        <ExperienceSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
