import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoriesState, ITodoState, todoState } from '../atoms';
import { setItem } from '../lib/localStorage';
const TodoItem = ({ text, category, id }: ITodoState) => {
    const setTodos = useSetRecoilState(todoState);
    const categories = useRecoilValue(categoriesState);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { name: next_category } = event.currentTarget;
        const map = (prev: ITodoState[]) =>
            prev.map((todo) => {
                const next_ = { ...todo };

                if (todo.id === id) {
                    next_.category = { name: next_category };
                }
                return next_;
            });
        setTodos(setItem<ITodoState>('todos')(map));
    };
    const onRemove = () => {
        const filter = (prev: ITodoState[]) =>
            prev.filter((todo) => todo.id !== id);
        setTodos(setItem<ITodoState>('todos')(filter));
    };
    return (
        <div>
            <span>{text}</span>
            {categories
                .filter((c) => c.name !== category.name)
                .map((v) => (
                    <button key={id + v.name} onClick={onClick} name={v.name}>
                        {v.name}
                    </button>
                ))}
            <button onClick={onRemove} name="delete">
                Delete
            </button>
        </div>
    );
};

export default TodoItem;
