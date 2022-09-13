export function setItem<T>(key: string) {
    return (func: Function) => (prev: T[]) => {
        const next_ = func(prev) as T[];
        localStorage.setItem(key, JSON.stringify(next_));
        return next_;
    };
}
