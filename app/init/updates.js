async function getLatestReleasePromise(repo) {
    const url = `https://api.github.com/repos/${repo}/releases/latest`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

getLatestReleasePromise("L33dy/Typeflow").then(release => Updates.assignLatestRelease(release.tag_name));

class Updates {
    static latestVersion = ""

    static assignLatestRelease(latestVer) {
        this.latestVersion = latestVer
    }

    static getLatestRelease() {
        return this.latestVersion
    }
}