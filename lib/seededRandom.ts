function hashString(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
}

function seededRandom(seed: number) {
    let state = seed;
    return function () {
        state += 0x6d2b79f5;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function pick<T>(rand: () => number, list: T[]): T {
    return list[Math.floor(rand() * list.length)];
}

export function generateCharacter(name: string) {
    const seed = hashString(name);
    const rand = seededRandom(seed);

    const palettes = [
        ["#f4a261", "#2a9d8f", "#264653"],
        ["#ffafcc", "#bde0fe", "#3a0ca3"],
        ["#e9c46a", "#e76f51", "#1d3557"],
        ["#cdb4db", "#ffc8dd", "#590d22"],
    ];

    const jobs = ["Cartographer", "Mechanic", "Oracle", "Courier", "Botanist", "Smuggler"];
    const moods = ["cheerful", "suspicious", "sleepy", "dramatic", "curious", "haunted"];

    const palette = pick(rand, palettes);
    const job = pick(rand, jobs);
    const mood = pick(rand, moods);

    return {
        name,
        seed,
        job,
        mood,
        faceColor: palette[0],
        hairColor: palette[1],
        clothingColor: palette[2],
        eyeSize: 4 + rand() * 4,
        mouthCurve: mood === "cheerful" ? 1 : mood === "suspicious" ? -1 : 0,
        accessory: pick(rand, ["hat", "glasses", "scar", "none"]),
    };
}
