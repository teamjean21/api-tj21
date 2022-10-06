export interface Player {
    name: string;
    summonerLevel: number;
    profileIcon: string;
    rankSoloDuo?: {
        tier: string;
        rank: string;
        leaguePoints: string;
        wins: number;
        losses: number;
    };
    rankFlex?: {
        tier: string;
        rank: string;
        leaguePoints: string;
        wins: number;
        losses: number;
    };
}