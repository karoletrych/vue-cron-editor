export const range = (from: number, to: number) : number[] => {
    return [...Array(to - from).keys()].map(i => i + from);
};