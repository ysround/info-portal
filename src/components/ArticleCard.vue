<template>
  <div 
    class="article-card"
    @click="openArticle"
  >
    <div class="card-content">
      <h2 class="article-title">{{ article.title }}</h2>
      <p class="article-date">{{ formatDate(article.date) }}</p>
      <div class="summary-container">
        <p class="article-summary">{{ article.summary }}</p>
      </div>
      <div class="card-footer">
        <span class="article-source">{{ article.source }}</span>
        <span class="read-more">詳細を見る</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.article-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.card-content {
  padding: 24px;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.article-date {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 16px;
}

.summary-container {
  margin-bottom: 16px;
}

.article-summary {
  color: #333;
  font-size: 0.875rem;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-source {
  font-size: 0.75rem;
  color: #666;
}

.read-more {
  font-size: 0.75rem;
  color: #3b82f6;
}
</style>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    openArticle() {
      window.open(this.article.link, '_blank', 'noopener,noreferrer')
    },
    formatDate(dateString) {
      // "2025/04/13 13:54:35" 形式を処理
      const [datePart, timePart] = dateString.split(' ')
      const [year, month, day] = datePart.split('/')
      const [hours, minutes, seconds] = timePart.split(':')
      
      const date = new Date(year, month - 1, day, hours, minutes, seconds)
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>
