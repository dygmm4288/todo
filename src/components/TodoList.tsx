import React from 'react';
import CreateTodo from './CreateTodo';
import { useRecoilValue } from 'recoil';
import { categoryState, todoSelector } from '../atoms';
import TodoItem from '../components/TodoItem';
import SelectCategory from './SelectCategory';
import CreateCategory from './CreateCategory';
const TodoList = () => {
    const category = useRecoilValue(categoryState);
    const todos = useRecoilValue(todoSelector);

    return (
        <>
            <h1>Todo Application</h1>
            <hr />
            <h2>Add Todo Item</h2>
            <CreateTodo />
            <hr />
            <h2>Add Category</h2>
            <CreateCategory />
            <hr />
            <SelectCategory />
            <h2>{category.name}</h2>
            <ul>
                {todos?.map((todo) => (
                    <li key={todo.id}>
                        <TodoItem {...todo} />
                    </li>
                ))}
            </ul>
        </>
    );
};
export default TodoList;
