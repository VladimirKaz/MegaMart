// scripts/figma-read.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const NODE_ID = '1:2'; // ID фрейма "Landing Page"

async function fetchNode() {
  // Запрашиваем конкретный узел. Убираем depth, чтобы получить все вложенные слои
  const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(NODE_ID)}`;
  
  const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  
  const data = await res.json();
  
  mkdirSync('figma-data', { recursive: true });
  writeFileSync('figma-data/landing-page.json', JSON.stringify(data, null, 2));
  
  // Выведем в консоль список главных секций (первый уровень вложенности)
  const node = data.nodes[NODE_ID].document;
  console.log('✅ Фрейм:', node.name);
  console.log('Секции на странице:');
  node.children.forEach(child => {
    console.log(` - [${child.id}] ${child.name} (${child.type})`);
  });
}

fetchNode().catch(console.error);