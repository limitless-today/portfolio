export const profile = {
  name: "Pankaj Kumar Pandey",
  email: "pankajpandey.architect@gmail.com",
  phone: "07760839026",
  phoneHref: "tel:+447760839026",
  location: "London, UK",
  linkedin: "https://www.linkedin.com/in/pankajpandey-architect",
  resume: `${import.meta.env.BASE_URL}Pankaj_Kumar_Pandey_CV.pdf`,
};

export const experience = [
  { role: "Enterprise / Solution Architect", company: "Thomson Reuters / Tata Consultancy Services · London", detail: "Leading enterprise architecture across CoCounsel AI, digital commerce, customer success, data platforms and multi-cloud modernisation. Led a global team of 30+ technical architects and a $290M transformation consolidating 245+ platforms." },
  { role: "Integration Architect / Senior IT Engineer", company: "Bloomberg / Tata Consultancy Services · UK, USA & India", detail: "Integration architecture and senior IT engineering across international engagements with Bloomberg and Tata Consultancy Services." },
  { role: "Integration Architect / IT Engineer", company: "CMC Ltd. · India & Japan", detail: "Enterprise engagements across financial services, government, telecom and industry, including Ricoh, Xerox, Bhabha Atomic Research Centre, Indian Railways and ICICI Prudential." },
];

export const projects = [
  { title: "CoCounsel AI Assistant", category: "Thomson Reuters · Enterprise AI", tools: "OpenAI GPT-4 · Vertex AI · RAG · Kubernetes · AWS", metric: "3×", outcome: "faster legal document processing", detail: "Integrated CoCounsel into Westlaw, HighQ and Practical Law workflows, improving information retrieval accuracy by 35% with average responses under two seconds." },
  { title: "Enterprise Data Platform", category: "Thomson Reuters · Data architecture", tools: "BigQuery · Snowflake · Kafka · dbt · Airflow", metric: "50%", outcome: "faster data processing", detail: "Designed a scalable enterprise data lake with 40% better query performance. Self-service ingestion reduced manual intervention by 60%, supporting 100+ data sources." },
  { title: "Digital Commerce Platform", category: "Thomson Reuters · Multi-cloud commerce", tools: "AWS · Azure · GCP · OCI · Enterprise integration", metric: "200+", outcome: "marketing sites consolidated", detail: "Led architecture for a unified customer journey across 200+ marketing sites and 33+ e-commerce platforms, maintaining 99.9% customer uptime." },
  { title: "Customer Success Platform", category: "Thomson Reuters · Customer experience", tools: "S/4HANA · AEM · Serverless · PostgreSQL", metric: "110k", outcome: "additional customers migrated", detail: "Unified 11+ account experience websites. Increased user adoption from 60% to 85% through personalised post-purchase support." },
  { title: "Cloud Migration & Modernisation", category: "Thomson Reuters · Infrastructure", tools: "AWS · Aurora PostgreSQL · DocumentDB · DynamoDB", metric: "40%", outcome: "lower infrastructure costs", detail: "Led the migration strategy for 35 legacy Microsoft applications to AWS, improving scalability by 50% and modernising enterprise databases." },
  { title: "MyAccount & Exam Booking", category: "LSEG / Refinitiv · Trinity College London", tools: "Salesforce · APIs · Solution architecture", metric: "25%", outcome: "less booking processing time", detail: "Designed Trinity College London's unified exam booking platform. At LSEG, custom Salesforce self-service workflows improved sales productivity by 25%." },
];

export const skills = [
  { title: "Cloud & platforms", items: "AWS · Microsoft Azure · Google Cloud · Oracle Cloud Infrastructure · Kubernetes · Docker" },
  { title: "AI & data", items: "RAG · Azure OpenAI · Vertex AI · SageMaker · LlamaIndex · BigQuery · Snowflake · Kafka" },
  { title: "Engineering & delivery", items: "Python · C# · Java · JavaScript · Go · Terraform · Jenkins · GitLab CI/CD · ArgoCD" },
  { title: "Architecture & integration", items: "TOGAF · Apigee · Boomi · Salesforce · AEM · REST · GraphQL · Event-driven architecture" },
];
export const certifications = [
  "TOGAF 10 Enterprise Architecture Practitioner",
  "AWS Solutions Architect — Associate & Professional",
  "Google Cloud — Professional Cloud Architect, Cloud Security Engineer & Data Engineer",
  "Microsoft Azure — Solutions Architect Expert, Cybersecurity Architect Expert & AI Engineer Associate",
  "Oracle Cloud — Architect, Multi-cloud, Generative AI & AI Vector Search",
  "Dell Boomi Professional Architect · Oracle Java EE Enterprise Architect · Solace Event Driven Architecture",
];
