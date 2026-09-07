const fs = require('fs');

const games = {
    'Arena of Valor': 'Arena_of_Valor',
    'Wuthering Waves': 'Wuthering_Waves',
    'Free Fire': 'Free_Fire_(video_game)',
    'PUBG Mobile': 'PUBG_Mobile'
};

async function main() {
    const results = {};
    for (const [name, title] of Object.entries(games)) {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                if (data.originalimage && data.originalimage.source) {
                    results[name] = data.originalimage.source;
                } else {
                    results[name] = null;
                }
            } else {
                results[name] = null;
            }
        } catch (e) {
            results[name] = null;
        }
    }
    fs.writeFileSync('game_urls.json', JSON.stringify(results, null, 2));
    console.log("Done!");
}

main();
