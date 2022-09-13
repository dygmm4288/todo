import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoriesState, categoryState } from '../atoms';
export default function SelectCategory() {
    const categories = useRecoilValue(categoriesState);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        setCategory({ name: value });
    };
    return (
        <div>
            <select value={category.name} onInput={onInput}>
                {categories.map((c) => (
                    <option key={c.name} value={c.name}>
                        {c.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
