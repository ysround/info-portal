<template>
  <div class="weather-widget" v-if="weatherData">
    <div class="weather-info">
      <img :src="weatherIconUrl" :alt="weatherDescription">
      <span>{{ temperature }}°C</span>
      <span>{{ weatherDescription }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weatherData: null
    }
  },
  computed: {
    weatherIconUrl() {
      if (!this.weatherData?.current) return '';
      const code = this.weatherData.current.weathercode;
      // 天気コードに基づいてアイコンを決定
      if (code === 0) return 'https://open-meteo.com/images/weather/clear-day.svg';
      if (code < 3) return 'https://open-meteo.com/images/weather/partly-cloudy-day.svg';
      if (code < 50) return 'https://open-meteo.com/images/weather/cloudy.svg';
      if (code < 70) return 'https://open-meteo.com/images/weather/rain.svg';
      return 'https://open-meteo.com/images/weather/snow.svg';
    },
    weatherDescription() {
      if (!this.weatherData?.current) return '';
      const code = this.weatherData.current.weathercode;
      // 天気コードを日本語の説明に変換
      const descriptions = {
        0: '晴れ',
        1: 'おおむね晴れ',
        2: '部分的に曇り',
        3: '曇り',
        45: '霧',
        48: '霧氷',
        51: '霧雨',
        53: '霧雨',
        55: '霧雨',
        56: '着氷性の霧雨',
        57: '着氷性の霧雨',
        61: '小雨',
        63: '雨',
        65: '大雨',
        66: '着氷性の雨',
        67: '着氷性の大雨',
        71: '小雪',
        73: '雪',
        75: '大雪',
        77: '雪粒',
        80: 'にわか雨',
        81: 'にわか雨',
        82: '激しいにわか雨',
        85: 'にわか雪',
        86: '激しいにわか雪',
        95: '雷雨',
        96: '雷雨',
        99: '激しい雷雨'
      };
      return descriptions[code] || '';
    },
    temperature() {
      return this.weatherData?.current?.temperature || '';
    },
    location() {
      return ''; // Open-meteoは位置名を返さないため空文字
    }
  },
  methods: {
    async fetchWeather(lat, lon) {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&timezone=auto&forecast_days=1`
      );
      const data = await response.json();
      this.weatherData = {
        current: data.current_weather,
        hourly: data.hourly
      };
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          () => {
            // デフォルト位置(東京)を設定
            this.fetchWeather(35.68, 139.76);
          }
        );
      } else {
        // 位置情報非対応の場合は東京の天気を表示
        this.fetchWeather(35.68, 139.76);
      }
    }
  },
  mounted() {
    this.getLocation();
  }
}
</script>

<style scoped>
.weather-widget {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 20px;
  margin: 0 auto 16px;
  width: fit-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.weather-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.weather-info img {
  width: 30px;
  height: 30px;
}
</style>
