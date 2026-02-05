const fs = require('fs');

function log(msg) {
  fs.appendFileSync('api_check_log.txt', msg + '\n');
}

http.get('http://127.0.0.1:3000/api/product-details', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.success && json.data.platforms && json.data.platforms.length > 0) {
        const platform = json.data.platforms[0];
        log(`Keys in first platform object: ${JSON.stringify(Object.keys(platform))}`);
        
        const hasNestedData = 'sections' in platform && 'achievements' in platform;
        log(`Has nested data (sections, achievements)? ${hasNestedData}`);
        
        // Also check if data root has them (which would be the OLD way)
        const rootKeys = Object.keys(json.data);
        const hasRootData = rootKeys.includes('sections') || rootKeys.includes('achievements');
        log(`Does root data have sections/achievements (OLD WAY)? ${hasRootData}`);
        
      } else {
        log('Invalid response structure or no platforms found');
        log(JSON.stringify(json, null, 2));
      }
    } catch (e) {
      log(`Error parsing JSON: ${e.message}`);
      log(`Raw data: ${data}`);
    }
    process.exit();
  });
}).on('error', (err) => {
  log(`Error connecting to API: ${err.message}`);
  process.exit(1);
});
