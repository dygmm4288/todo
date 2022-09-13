import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { ICategory, categoriesState } from '../atoms';
import { setItem } from '../lib/localStorage';

type IFormInput = {
    category: string;
};
const CreateCategory = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormInput>();

    const [categories, setCategories] = useRecoilState(categoriesState);
    const isInclude = (value: string) => {
        const finding = categories.findIndex((c) => c.name === value);
        if (finding === -1) return true;
        else return false;
    };

    const errorMessage = 'That is already exsists';
    const handleValid = (data: IFormInput) => {
        const item = {
            name: data.category,
        };
        const append = (prev: ICategory[]) => [...prev, item];
        setCategories(setItem<ICategory>('category')(append));
        setValue('category', '');
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <label>Add Category</label>
            <input
                type="text"
                {...register('category', {
                    validate: isInclude,
                })}
                placeholder="Write New Category"
            />
            {<p>{errors?.category && errorMessage}</p>}
            <button type="submit">제출</button>
        </form>
    );
};

export default CreateCategory;
