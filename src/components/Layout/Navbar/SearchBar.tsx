import Category from "../../../interfaces/Category.ts";
import {CiSearch} from "react-icons/ci";
import {useNavigate} from "react-router";

interface SearchBarProps {
    categories: Category[]
}

const SearchBar = ({categories}: SearchBarProps) => {
    const navigate = useNavigate()


    const handleSearch = () => {
        const categoryName = (document.getElementById('searchSelect') as HTMLSelectElement).value;
        const category = [{CategoryID: -1, Name: 'All categories'},...categories].filter(category => category.Name === categoryName)[0];
        navigate('/search?category=' + category.CategoryID + '&search=' + (document.getElementById('searchProduct') as HTMLInputElement).value)
    }

    return (
        <div className={'w-0 hidden  lg:w-[45%] lg:flex lg:flex-row items-center'}>
            <input
                className={'p-2 bg-gray-300/30 h-10  rounded-l-3xl ml-2 my-3 w-[60%]'}
                type="text" id={'searchProduct'} placeholder="What are you looking for..."/>
            <div id={'lookup'} onClick={handleSearch} className={'bg-gray-300/30 h-10 w-[5%] flex justify-center items-center'}>
                <CiSearch size={20}/>
            </div>
            <select name={'categories'} id={'searchSelect'} className={'w-[30%] bg-gray-300/30  pl-2 h-10 rounded-r-3xl'}>
                {[{CategoryID: -1, Name: 'All categories'},...categories].map((category, index) => {
                    return <option key={index} value={category.Name}>{category.Name}</option>
                })}
            </select>
        </div>
    );
}

export default SearchBar;