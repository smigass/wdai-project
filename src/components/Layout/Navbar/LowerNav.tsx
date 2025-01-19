import {Link} from "react-router";
import Category from "../../../interfaces/Category.ts";


interface LowerNavProps {
    categories: Category[]
}

export default function LowerNav({categories}: LowerNavProps) {
    console.log(categories)
    return (
        <div
            className={'px-8 py-6 sm:px-10 md:px-20 lg:px-36 hidden w-full h-10 border-b border-gray-500 items-center  md:flex'}>
            <div className={'flex justify-between w-full px-10'}>
                {categories.map((category, index) => (
                    <Link to={`/search?category=${category.CategoryID}`} key={index}
                          className={'text-sm text-gray-800 dark:text-d-text-secondary'}>
                        {category.Name}
                    </Link>
                ))}
            </div>
        </div>
    )
}