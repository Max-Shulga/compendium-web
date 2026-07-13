const orEmptyArray = <T>(items: T[] | null | undefined): T[] => items ?? [];

export default orEmptyArray;
