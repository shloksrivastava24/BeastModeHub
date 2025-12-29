import { Archetype } from "./archetype-questions";

export function calculateArchetype(
    scores: Record<Archetype, number>
): Archetype {
    return (Object.keys(scores) as Archetype[]).reduce((winner, current) => {
        return scores[current] > scores[winner] ? current : winner;
    });
}