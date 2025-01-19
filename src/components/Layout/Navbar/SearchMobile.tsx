import {IoSearch} from "react-icons/io5";
import {Link} from "react-router";
import Category from "../../../interfaces/Category.ts";


interface props {
    opened: boolean
    categories: Category[]
}

export default function SearchMobile({opened, categories}: props) {

    return (
        <>
            {opened ? <div id={'search-mobile'}
                           className={'fixed top-0 left-0 w-[100vw] h-[100vh] bg-gray-100 opacity-90 z-10'}>
                <div className={'flex flex-col w-full p-2 pt-20'}>
                    <div className={'flex'}>
                        <input type={'text'} className={'rounded-l-2xl w-[80%] p-2 bg-gray-200'}>
                        </input>
                        <div className={'flex bg-gray-400/20 rounded-r-2xl w-[20%] items-center justify-center'}>
                            <IoSearch size={40} className={'p-2 cursor-pointer'}/>
                        </div>


                    </div>
                    <ul>
                        {categories.map((category, i) => (
                           <Link to={'/search?category=' + category.id + '?q'} key={i}>
                               <li className={'text-center text-lg p-2'}>
                                   {category.name}
                               </li>
                            </Link>
                        ))}
                    </ul>
                </div>

            </div> : <></>}</>
    )
}