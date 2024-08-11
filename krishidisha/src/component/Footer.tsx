export default function Footer() {

    return (

        <footer className="bg-color2 shadow-sm ">
            <div className="flex justify-between">

                <div className="w-80 max-w-6xl ">

                    <div className="flex flex-wrap max-w-6xl mx-auto p-2">
                        <div className="flex flex-wrap justify-start  items-center max-w-6xl p-1 content-center">
                            <span><img src="../../../public/logo.png" alt="" className="w-16 h-16" /></span>
                            <a className="font-bold text-sm sm:text-xl">
                                <span className="text-cyan-600">Hack</span>
                                <span className="text-cyan-300">Elites</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-start items-justify  max-w-6xl mx-auto p-2 ms-4">
                        <span
                            className="w-32 sm:w-auto sm:mx-auto mx-1 p-1 place-content-start font-semibold sm:text-sm text-xs text-justify">A
                            technical (business) event defines the drivers of the business at the technical level; the things
                            that result in business activity starting or modifying the business process. This guideline explains
                            how to find and define business events.</span>
                    </div>
                    {/* <ul className="list-none flex flex-wrap m-3 p-1 gap-3 justify-center">
                <li><img src="/assets/25231.png" alt="" className="sm:w-8 sm:h-8 w-4 h-4" /></li>
                <li><img src="/assets/Logo_of_Twitter.svg.png" alt="" className="sm:w-8 sm:h-8 w-4 h-4" /></li>
                <li><img src="/assets/702300.png" alt="" className="sm:w-8 sm:h-8 w-4 h-4" /></li>
                <li><img src="/assets/Google_G_logo.svg.png" alt="" className="sm:w-8 sm:h-8 w-4 h-4" /></li>
                </ul> */}
                </div>

                <div className="mt-5 mb-5 me-16">
                    <div className="m-3">
                        <span className="font-bold text-black sm:text-xl text-sm">Collbration : </span>
                    </div>
                    <ul className="list-none m-3 my-8">
                        <li className="text-slate-300 font-semibold sm:text-sm text-xs">hemang9705&#64;gmail.com</li>
                        <li className="text-slate-300 font-semibold sm:text-sm text-xs">hetvideshani&#64;gmail.com</li>
                        <li className="text-slate-300 font-semibold sm:text-sm text-xs">grishadesai78&#64;gmail.com</li>
                        <li className="text-slate-300 font-semibold sm:text-sm text-xs">yagnagangajaliya&#64;gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-wrap justify-center items-center p-2">
                <span className="font-semibold text-black text-md">Copyright &#64; 2023 - All Right Reserved</span>
            </div>
        </footer>
    )

}