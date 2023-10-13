import Head from 'next/head'
import { Inter } from 'next/font/google'
import Youbike from '@/components/youbike/Youbike'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useRouter } from 'next/router';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    Swal.fire({
      title: '這裡是首頁是否要前往站點資訊?',
      text: "按下要前往就可以前往",
      imageUrl: '/img/logo.png',
      showCancelButton: true,
      confirmButtonColor: '#b5cc22',
      cancelButtonColor: '#899d09',
      confirmButtonText: '要前往',
      cancelButtonText: '再想想',
      
    }).then((result) => {
     if (result.isConfirmed){
      router.push('/youbike')
     }
    })
  
  }, [])
  return (
    <>
    {/* <Youbike /> */}
    </>
  )
}
