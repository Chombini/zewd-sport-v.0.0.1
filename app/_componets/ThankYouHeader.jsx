import supabase from '@/supabaseConfig';
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button';
import { CircleCheck, LoaderCircle } from 'lucide-react';

function thankYouHeader() {
    const [loading2, setIsLoading2] = useState(false);
    const router = useRouter();
    const { user,isLoaded } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const handleDelete = async () => {
        setIsLoading2(true);
        try {
          const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('userEmail', userEmail)
    
          if (error) {
            toast('Error deleting data');
          } else {
            toast("You can buy More Items👍",
              {action: {
              label: <CircleCheck className="text-primary"/>,
            }})
          }
        } catch (error) {
          console.error('Error deleting data:', error);
        } finally {
          setIsLoading2(false);
          router.push('/')
        }
      };


  return (
    <div>
        <header className="bg-neutral-900 w-full sticky top-0 z-[20]">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <a className="block" href="/">
                        <Image src='/logo.png' alt="logo" width={70} height={70}/>
                        </a>
                    </div>         

                    <div className="flex items-center gap-9">
                        <nav aria-label="Global">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                               <Button onClick={handleDelete} disabled={loading2}>
                                 {loading2 ? <LoaderCircle className="animate-spin"/>: "Go to home"}  
                               </Button>
                            </li>
                        </ul>
                        </nav>

                    <div className="flex items-center gap-2">
                        <div className="flex sm:flex sm:gap-2">
                            {/* <div className='flex justify-center items-center p-2'>
                            {isLoaded&&user?<UserButton afterSignOutUrl='/'/>:""} 
                            </div>  */}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default thankYouHeader