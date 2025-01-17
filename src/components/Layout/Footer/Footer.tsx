import Logo from "../Navbar/Logo.tsx";
import {BsFillHouseFill, BsFillPhoneFill} from "react-icons/bs";
import {SiMaildotru} from "react-icons/si";
import {FaFacebookF} from "react-icons/fa";
import {AiOutlineSafetyCertificate} from "react-icons/ai";

export default function Footer() {
    return (
        <footer className={'w-full border-t border-t-d-text-secondary flex flex-col sm:flex-row'}>
            {/*Left side of the footer*/}

            <div className={'w-full border-r border-r-d-text-secondary md:w-[50%] px-6 my-6 flex flex-col'}>
                <Logo/>
                <div className={'flex m-2 gap-x-2'}>
                    <BsFillPhoneFill size={20} color={'currentColor'} id={'phoneFoot'}/>
                    <p>+48 123 456 789</p>
                </div>
                <div className={'flex m-2 gap-x-2'}>
                    <SiMaildotru size={20} color={'currentColor'} id={'phoneFoot'}/>
                    <p>kontakt@mpick.com</p>
                </div>
                <div className={'flex m-2 gap-x-2'}>
                    <BsFillHouseFill size={20} color={'currentColor'} id={'phoneFoot'}/>
                    <p>ul. Abecadła 12/2 30-203 Łapanów</p>
                </div>
                <div className={'flex m-2 gap-x-2'}>
                    <FaFacebookF size={20} color={'currentColor'} id={'phoneFoot'}/>
                    <p>mpick</p>
                </div>


            </div>

            {/*Right side of the footer*/}


            <div className={'w-full border-r border-r-d-text-secondary md:w-[50%] px-6 my-6 flex flex-col justify-end'}>
                Zaufane oznaczenia zwiększające naszą wiarygodność:
                <div className={'flex m-2 gap-x-2'}>
                    <AiOutlineSafetyCertificate size={20} color={'currentColor'} id={'phoneFoot'}/>
                    <p>Certyfikat Trusted Shops</p>
                </div>
                <div className={'flex m-2 gap-x-2'}>
                    <AiOutlineSafetyCertificate size={20} color={'currentColor'} id={'phoneFoot'}/>
                    <p>Partner Programu “Bezpieczne zakupy online”</p>
                </div>
                <div className={'flex m-2 gap-x-2'}>
                    <AiOutlineSafetyCertificate size={20} color={'currentColor'} id={'phoneFoot'}/>
                    <p>Wyróżnienie “E-commerce Polska”</p>
                </div>
            </div>
        </footer>
    )
}
