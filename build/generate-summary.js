const {
    globp,
    readFile,
    matchSubject,
    matchHeadline,
    snake2pascal,
    categorize,
    writeFile,
} = require('./util');

async function main() {
    const files = await globp('docs/**/*.md');
    const subjects = files.map(matchSubject);
    const headlineAndPaths = (await Promise.all(files.map(readFile))).
        map(matchHeadline).
        map((x, i) => [x, files[i]]);
    const category = categorize(subjects, headlineAndPaths);

    const summary = Object.keys(category).
        reduce((summary, subject) => {
            summary += `## ${subject}\n`;
            summary += category[subject].
                map(headlineAndPath =>
                    `* [${headlineAndPath[0]}](${headlineAndPath[1]})\n`).
                join('');
            return summary;
        }, '# Summary\n');
    writeFile('SUMMARY.md', summary)
}

main()
    .then(
        () => {},
        e => console.log(e.stack)
    )
    .catch(console.err);
