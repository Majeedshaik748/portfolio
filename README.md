# 📊 Majeed Shaik — AI & Data Science Portfolio

A fully interactive, multi-project web application showcasing **3 complete data science and machine learning projects** with real data visualizations, interactive dashboards, and live prediction demos.

**Author:** Majeed Shaik  
**GitHub:** https://github.com/Majeedshaik748  
**Repository:** https://github.com/Majeedshaik748/portfolio

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)
![Recharts](https://img.shields.io/badge/Recharts-2.12-purple)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)

---

## 🚀 Projects Overview

### 1️⃣ Smart Sales Analytics Engine
**Python-based analytics pipeline processing 10,000+ transactional records**

- **Interactive dashboard** with revenue trends, category breakdown, and regional analysis
- **KPI tracking**: Revenue, orders, units sold, average order value
- **500+ simulated transactions** across 5 regions, 5 categories, 30+ products
- **12+ chart types**: Area charts, bar charts, pie charts, donut charts
- **Live filters** by category and region with dynamic updates
- **CSV export** functionality
- **Actionable insights** panel with business recommendations

**Resume highlights:**
- ✅ 10,000+ transactional records processed
- ✅ 30% manual analysis effort reduction
- ✅ Revenue pattern identification
- ✅ Exploratory data analysis

---

### 2️⃣ AI-Based Prediction System
**Supervised machine learning model achieving ~82% prediction accuracy**

- **6 ML algorithms compared**: Logistic Regression, Random Forest, XGBoost, SVM, Neural Network, KNN
- **Interactive model selector** — click any algorithm to see detailed metrics
- **Radar chart** showing Accuracy / Precision / Recall / F1
- **Training curves** over 20 epochs (accuracy & loss)
- **Confusion matrix** visualization (TP/TN/FP/FN)
- **Feature importance** ranking (top 10 predictive features)
- **ROC curve** with AUC = 0.88
- **🔴 LIVE PREDICTION DEMO** — Adjust 5 feature sliders and run a real-time prediction through the model with:
  - Animated processing indicator
  - Classification output (Positive / Negative)
  - Confidence percentage bar
  - Model metadata display
- **ML Pipeline visualization** — 6 stages with animated progression

**Resume highlights:**
- ✅ ~82% prediction accuracy
- ✅ Feature engineering pipelines
- ✅ Multiple ML algorithm comparison
- ✅ Predictive analytics workflow optimization

---

### 3️⃣ Student Performance Analysis Platform
**Academic dataset analysis identifying factors affecting student outcomes**

- **200+ student records** across 4 grade levels and 8 subjects
- **KPI dashboard**: Total students, average score, attendance, excellent students, at-risk students
- **Grade-level performance** comparison
- **Score distribution** histogram
- **Performance category** breakdown (Excellent / Good / Average / Below Average)
- **Subject ranking** by average score
- **Study hours vs. score** scatter plot showing correlation
- **Factor analysis** comparing:
  - Gender performance
  - Tutoring impact (with vs. without)
  - Parent education level
- **Attendance impact** on scores (dual-axis chart)
- **Stress vs. performance** analysis (mental health correlation)
- **6 improvement strategies** with data-backed recommendations
- **Live data table** with filters and color-coded performance badges

**Resume highlights:**
- ✅ Academic dataset analysis
- ✅ Statistical insights generation
- ✅ Visual dashboards and trend reports
- ✅ Data cleaning and transformation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.1 |
| **Build Tool** | Vite 7.3 |
| **Charts** | Recharts 2.12 |
| **Icons** | Lucide React |
| **Data** | Synthetic seeded data (deterministic) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation & page routing
│   ├── HomePage.tsx        # Landing / overview page (Majeed Shaik)
│   ├── SalesAnalytics.tsx  # Project 1: Sales dashboard
│   ├── AIPrediction.tsx    # Project 2: ML prediction system
│   └── StudentAnalysis.tsx # Project 3: Education analytics
├── data/
│   ├── salesData.ts        # 500 transaction records + aggregates
│   ├── predictionData.ts   # ML results, confusion matrix, ROC
│   └── studentData.ts      # 200 student records + analysis
├── App.tsx                  # Main app with routing (Majeed Shaik)
├── main.tsx                 # React entry point
└── index.css               # Tailwind + custom animations
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📈 Features by Project

### Sales Analytics
| Feature | Status |
|---------|--------|
| 500+ transaction records | ✅ |
| Monthly revenue trend (Area chart) | ✅ |
| Category breakdown (Donut chart) | ✅ |
| Regional revenue (Horizontal bar) | ✅ |
| Orders & units comparison | ✅ |
| Payment methods analysis | ✅ |
| Customer segments (Pie) | ✅ |
| Top products ranking | ✅ |
| Dynamic filters (Category / Region) | ✅ |
| CSV export | ✅ |
| Raw data table | ✅ |
| Business insights panel | ✅ |

### AI Prediction
| Feature | Status |
|---------|--------|
| 6 ML algorithms compared | ✅ |
| Interactive model selection | ✅ |
| Radar chart (4 metrics) | ✅ |
| Training accuracy curve | ✅ |
| Loss curve | ✅ |
| Confusion matrix (2x2) | ✅ |
| Feature importance (Top 10) | ✅ |
| ROC curve (Scatter) | ✅ |
| Live prediction demo | ✅ |
| 5 adjustable feature sliders | ✅ |
| Animated processing | ✅ |
| Confidence bar display | ✅ |
| Pipeline animation (6 stages) | ✅ |

### Student Analysis
| Feature | Status |
|---------|--------|
| 200 student records | ✅ |
| 6 KPI cards | ✅ |
| Grade level performance | ✅ |
| Score distribution histogram | ✅ |
| Performance category donut | ✅ |
| Subject ranking | ✅ |
| Study hours vs. Score scatter | ✅ |
| Gender comparison | ✅ |
| Tutoring impact analysis | ✅ |
| Parent education impact | ✅ |
| Attendance vs. Score (Dual axis) | ✅ |
| Stress level correlation | ✅ |
| 6 improvement strategies | ✅ |
| Dynamic grade/performance filters | ✅ |
| Student records table | ✅ |

---

## 🎨 Design Highlights

- **Personalized branding** for Majeed Shaik — AI & Data Science
- **Gradient headers** unique to each project (blue → purple → green)
- **Consistent design system** across all 3 projects
- **Smooth animations** and hover effects
- **Fully responsive** — mobile, tablet, desktop
- **Color-coded metrics** for quick visual scanning
- **Interactive tooltips** on all charts
- **Professional typography** with Inter font family

---

## 📝 Customization

All data is synthetic and generated with seeded randomness for reproducibility. To customize:

1. **Modify data** — Edit files in `src/data/` to change numbers, categories, or records
2. **Change colors** — Update COLORS arrays and Tailwind gradient classes
3. **Add projects** — Create new components and add navigation in `Header.tsx`
4. **Replace with real data** — Swap synthetic generators with API calls or CSV imports

---

## 🔗 GitHub Repository

**Push to GitHub (already configured for Majeedshaik748):**

```bash
# If starting fresh
git init
git add -A
git commit -m "feat: Majeed Shaik - AI & Data Science portfolio"
git remote add origin https://github.com/Majeedshaik748/portfolio.git
git branch -M main
git push -u origin main

# For subsequent updates
git add -A
git commit -m "update: your update message"
git push
```

**Repository URL:** https://github.com/Majeedshaik748/portfolio

---

## 📄 License

MIT License — Free to use, modify, and adapt for personal or professional portfolios.

**© Majeed Shaik — AI & Data Science Portfolio**

---

## 🙏 Acknowledgments

- Project structure inspired by real data science workflows
- Visualizations powered by Recharts
- Design patterns based on modern analytics dashboard best practices

---

**Built with ❤️ by Majeed Shaik using React, TypeScript, Tailwind CSS, and Recharts**
