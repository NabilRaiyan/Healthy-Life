import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-50 text-black/50 dark:bg-white dark:text-black">
                
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className='inline-flex w-28 p-2 font-bold text-center text-2xl rounded-sm'>
                                <h1 className='text-orange-700 font-raleway'>My<span className='text-cyan-800 font-roboto'>Health</span></h1>
                            </div>
                            <nav className="-mx-3 justify-end col-span-2 inline-flex text-gray-800 font-serif font-semibold">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-gray-400 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-gray-700 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-gray-700 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className='flex flex-row gap-2'>
                                <div className='w-1/2'>
                                    <h1 className='text-gray-800 font-serif text-[5rem] ml-2'>
                                        PERFECT SITE FOR YOUR HEALTHY LIFE
                                    </h1>
                                </div>
                                <div className='w-1/2'>
                                    <div className='w-[500px] mt-8'>
                                        <img src='https://img.freepik.com/free-vector/flat-health-infographics-athletes_23-2148203381.jpg?t=st=1725890664~exp=1725894264~hmac=15b376b2473dbbe762b99772351b9e146391d8fbedacffaca144a0b8eeb0252d&w=1060' />
                                    </div>
                                </div>
                            </div>

                                           
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-black">
                                Copyright by Raiyan AL Sutan 2024
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
