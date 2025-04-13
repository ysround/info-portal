<template>
  <div class="app-container">
    <h1 class="page-title">最新記事</h1>
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
  margin-bottom: 32px;
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
      this.articles = this.parseCSV(csvData)
      console.log('パース後データ:', this.articles)
  },
  methods: {
    parseCSV(csv) {
      const lines = csv.split('\n')
      const headers = lines[0].split(',')
      const articles = lines.slice(1).map(line => {
        const values = line.split(',')
        const article = headers.reduce((obj, header, i) => {
          // ヘッダー名を正確にマッチさせる
          obj[header.trim().toLowerCase()] = values[i]?.trim() || ''
          return obj
        }, {})
        console.log('Parsed article:', article) // デバッグ用
        return article
      })
      console.log('All articles:', articles) // デバッグ用
      return articles
    }
  }
}
</script>
