const regex = /<!ENTITY(?:\s+)version(?:\s+)"(.*)">/;

const plg = {
    filename: 'carrot.aquatics.xml',
    updater: {
        readVersion(contents) {
            const line = contents.split('\n').find(line => line.match(regex));
            return line.match(regex)[1];
        },
        writeVersion(contents, version) {
            const lines = contents.split('\n');
            const lineNumber = lines.findIndex(line => line.match(regex));
            lines[lineNumber] = `<!ENTITY version "${version}">`;
            return lines.join('\n');
        }
    }
}

module.exports = {
    bumpFiles: [plg, "package.json", "package-lock.json"],
    packageFiles: [plg, "package.json", "package-lock.json"]
};
