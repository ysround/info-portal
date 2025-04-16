<template>
  <div class="app-container">
    <h1 class="page-title">AI・IT情報収集ポータル</h1>
    <p class="page-description">AIやITに関するニュース・知識・トレンドを、コンパクトにまとめて発信する情報ポータルです。日々の情報収集にご活用ください。</p>
    <div class="search-container">
      <form action="https://www.google.com/search" method="get" class="search-form">
        <input type="text" name="q" placeholder="Googleで検索" class="search-input">
        <button type="submit" class="search-button">検索</button>
      </form>
      <div class="ai-buttons">
        <a href="https://claude.ai" target="_blank" class="ai-button claude">Claude</a>
        <a href="https://chat.openai.com" target="_blank" class="ai-button chatgpt">ChatGPT</a>
        <a href="https://www.perplexity.ai" target="_blank" class="ai-button perplexity">Perplexity</a>
        <a href="https://gemini.google.com" target="_blank" class="ai-button gemini">Gemini</a>
        <a href="https://grok.x.com" target="_blank" class="ai-button grok">Grok</a>
      </div>
    </div>
    <div class="articles-grid">
      <ArticleCard 
        v-for="(article, index) in articles" 
        :key="index"
        :article="article"
      />
    </div>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 16px;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
}

.page-description {
  text-align: center;
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.75;
  margin-bottom: 16px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.search-form {
  display: flex;
}

.ai-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.ai-button {
  padding: 8px 16px;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.ai-button:hover {
  opacity: 0.9;
}

.claude {
  background-color: #4a6fa5;
}

.chatgpt {
  background-color: #74aa9c;
}

.perplexity {
  background-color: #6e6ed6;
}

.gemini {
  background-color: #7d4dff;
}

.grok {
  background-color: #000000;
}

.search-input {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  width: 300px;
  font-size: 1rem;
}

.search-button {
  padding: 8px 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 1rem;
}

.search-button:hover {
  background-color: #3367d6;
}

.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .app-container {
    padding: 32px;
  }
  
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

<script>
import ArticleCard from './components/ArticleCard.vue'
import { parseCSV } from './utils/csvParser.js'

export default {
  components: { ArticleCard },
  data() {
    return {
      articles: []
    }
  },
  async mounted() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRaEeOEwXVNIxeNWJTgTlJLH4AAOS3UbfUrd_RYf9qb4Hlj8xxOPwxYu599ZKM0GxPkf7-EwwJNpeBC/pub?gid=1343466925&single=true&output=csv')
    const csvData = await response.text()
    console.log('CSVデータ:', csvData)
    this.articles = parseCSV(csvData)
    console.log('パース後データ:', this.articles)
  }
}
</script>
