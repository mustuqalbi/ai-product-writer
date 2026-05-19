# ✍️ AI Product Description Writer — Shopify Optimized

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4o--mini-412991?style=for-the-badge&logo=openai&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### Live Demo: [ai-product-writer.vercel.app](#) &nbsp;|&nbsp; Built by [ghulammustafa.dev](https://ghulammustafa.dev)

> Stop spending 30 minutes writing product descriptions. Enter your product details, pick a tone, and get a conversion-ready Shopify description in under 10 seconds.

---

## Features

- AI Copywriting — GPT-4o-mini writes SEO-optimized descriptions instantly
- 4 Tone Options — Professional, Casual, Luxury, Playful
- Rate Limited — 5 free demo generations per visitor
- One-click Copy — Copy to clipboard with one button
- Word Count — Live counter to match Shopify best practices
- Fully Responsive — Works on mobile, tablet and desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI Model | OpenAI GPT-4o-mini |
| Rate Limiting | IP-based (10 req/min) + localStorage (5/visitor) |
| Deployment | Vercel |

---

## Run Locally

\\\ash
git clone https://github.com/mustuqalbi/ai-product-writer.git
cd ai-product-writer
npm install
echo "OPENAI_API_KEY=your_key_here" > .env.local
npm run dev
\\\

Open http://localhost:3000 and start generating descriptions.

---

## How It Works

1. Enter your product name, category and key features
2. Select a tone that matches your brand voice
3. Click Generate — AI writes a 120-180 word description
4. Copy and paste directly into your Shopify product page

---

## Project Structure

\\\
src/
├── app/
│   ├── api/generate/route.ts   # OpenAI API endpoint + rate limiter
│   └── page.tsx                # Generator UI
\\\

---

## Built by

**Ghulam Mustafa** — AI Automation Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-ghulammustafa.dev-00D9FF?style=for-the-badge)](https://ghulammustafa.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-gmustafa--dev-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/gmustafa-dev)

> Want this tool custom-built for your Shopify store? [Book a free call](https://cal.com/ghulammustafa/20min)
