export function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  if (lines.length === 0) return [];
  const headers = lines[0].split(',');
  const articles = lines.slice(1).map(line => {
    const values = line.split(',');
    const article = headers.reduce((obj, header, i) => {
      obj[header.trim().toLowerCase()] = values[i] ? values[i].trim() : '';
      return obj;
    }, {});
    return article;
  });
  return articles;
} 