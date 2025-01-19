import {useSearchParams} from "react-router";

export default function Search() {
    const [params] = useSearchParams()

    return (
        <div className={'main-container'}>
            <div>
                <h1 className={'font-bold text-lg md:text-2xl'}>{params.get('search') !== null ? 'Wyniki wyszukiwania dla: '+ params.get('search') : 'Kategoria: ' + params.get('category')} </h1>
                <p>{params.get('q')}</p>
            </div>
        </div>
    )
}