export const isPromise = <T>(p: any): p is PromiseLike<T> => {
    if (p !== null && typeof p === 'object' && typeof p.then === 'function' && typeof p.catch === 'function') {
        return true;
    }

    return false;
};
