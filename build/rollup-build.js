const { execSync } = require('child_process');

const availableLanguages = ['css', 'html', 'javascript', 'python'];

let languagesToBuild;
const languageArg = process.argv[2];

if (languageArg === 'all') {
    languagesToBuild = availableLanguages;
} else if (availableLanguages.includes(languageArg)) {
    languagesToBuild = [languageArg];
} else {
    console.error('Invalid language argument. Please specify a valid language or "all".');
    process.exit(1);
}

languagesToBuild.forEach(language => {
    const input = `builds/${language}/index.js`;
    const outputDir = `../django_codemirror/static/codemirror/${language}`;

    try {
        execSync(`node_modules/.bin/rollup ${input} -f iife -o ${outputDir}/cm.js -p @rollup/plugin-node-resolve -p @rollup/plugin-commonjs`, { stdio: 'inherit' });
        execSync(`node_modules/.bin/rollup ${input} -f iife -o ${outputDir}/cm.min.js -p @rollup/plugin-node-resolve -p @rollup/plugin-commonjs -p rollup-plugin-terser`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error occurred while building ${language}:`, error);
        process.exit(1);
    }
});
