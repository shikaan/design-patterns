export const shuffle = <T>(a: Array<T>): Array<T> => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const chunk = <T>(a: Array<T>, chunkSize: number): Array<Array<T>> => {
    return a.reduce((accumulator: Array<Array<T>>, item: T, index: number) => {
        const chunkIndex = Math.floor(index / chunkSize)

        if (!accumulator[chunkIndex]) {
            accumulator[chunkIndex] = [] // start a new chunk
        }

        accumulator[chunkIndex].push(item)

        return accumulator
    }, [])
}
