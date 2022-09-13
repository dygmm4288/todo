import { atom, selector } from 'recoil';

const getItem = <T,>(item: string): T[] | null => {
    const value = localStorage.getItem(item);
    if (typeof value === 'string') {
        return JSON.parse(value);
    }
    return null;
};

export interface ITodoState {
    id: number;
    text: string;
    category: ICategory;
}
export const todoState = atom<ITodoState[]>({
    key: 'todoState',
    default: getItem('todos') || [],
});
export const todoSelector = selector({
    key: 'todoSelector',
    get: ({ get }) => {
        const todos = get(todoState);
        const category = get(categoryState);
        console.log(todos);
        return todos.filter((todo) => todo.category.name === category.name);
    },
});

export enum DefaultCategories {
    'TO_DO' = 'TO_DO',
    'DOING' = 'DOING',
    'DONE' = 'DONE',
}
export interface ICategory {
    name: string;
}
export const categoryState = atom<ICategory>({
    key: 'category',
    default: { name: DefaultCategories.TO_DO },
});
const enumToArr = (value: any) => Object.keys(value).map((v) => ({ name: v }));
export const categoriesState = atom<ICategory[]>({
    key: 'categories',
    default: getItem('category') || [...enumToArr(DefaultCategories)],
});
