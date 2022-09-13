import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { todoState, ITodoState, DefaultCategories } from '../atoms';
import { setItem } from '../lib/localStorage';
type IFormInput = {
    todoItem: string;
};

const CreateTodo = () => {
    const { register, handleSubmit, setValue } = useForm<IFormInput>();
    const setTodos = useSetRecoilState(todoState);
    const handleValid = (data: IFormInput) => {
        const item: ITodoState = {
            id: Date.now(),
            text: data.todoItem,
            category: { name: DefaultCategories.TO_DO },
        };
        const append = (prev: ITodoState[]) => [...prev, item];
        setTodos(setItem<ITodoState>('todos')(append));
        setValue('todoItem', '');
    };
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <label>Todo Item</label>
            <input
                {...register('todoItem', { required: true })}
                placeholder="Write your to do"
            />
            <button type="submit">제출</button>
        </form>
    );
};
export default CreateTodo;
