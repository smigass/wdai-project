import {useState} from "react";
import Category from "../../../interfaces/Category.ts";
import {CiSearch} from "react-icons/ci";

interface SearchBarProps {
    categories: Category[]
}

const SearchBar = ({categories}: SearchBarProps) => {
    const [category, setCategory] = useState<number>(-1);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const id = categories.filter(category => category.name === value)[0].id;
        setCategory(id);
    }

    const [cat, setCat] = useState<Category[]>([{id: -1, name: 'All categories'}, ...categories]);

    const handleSearch = () => {
        const categoryName = (document.getElementById('searchSelect') as HTMLSelectElement).value;
        const category = cat.filter(category => category.name === categoryName)[0];
        console.log('Searching...');
        console.log('Category:', category);
    }

    return (
        <div className={'w-0 hidden  lg:w-[45%] lg:flex lg:flex-row items-center'}>
            <input
                className={'p-2 bg-gray-300/30 h-10  rounded-l-3xl ml-2 my-3 w-[60%]'}
                type="text" placeholder="What are you looking for..."/>
            <div id={'lookup'} onClick={handleSearch} className={'bg-gray-300/30 h-10 w-[5%] flex justify-center items-center'}>
                <CiSearch size={20}/>
            </div>
            <select name={'categories'} id={'searchSelect'} className={'w-[30%] bg-gray-300/30  pl-2 h-10 rounded-r-3xl'}>
                {cat.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                ))}
            </select>
        </div>
    );
}

export default SearchBar;