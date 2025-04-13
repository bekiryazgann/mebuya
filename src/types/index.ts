export interface SeasonIT{
    title: string;
    emoji: string;
    episodes: EpisodeIT[];
}

export interface EpisodeIT{
    word: string;
    length: number;
    burnRight: number;
    isIncluded: boolean;
    guessSentence: string; // The user will use this sentence when guessing the relevant word and it will make finding the word a little easier.
}
