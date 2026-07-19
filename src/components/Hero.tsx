"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Hero() {
   const { data: session } = authClient.useSession();

const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
    const heroImages = [
"/plant-hero.jpg",
"/hero2.jpg",
"/hero3.jpg",
"/hero4.jpg",
];
const [currentImage,setCurrentImage]=useState(0);
useEffect(()=>{

const interval=setInterval(()=>{

setCurrentImage(prev=>
(prev+1)%heroImages.length
);

},3000);

return ()=>clearInterval(interval);

},[]);
  return (
   <section className="relative min-h-[70vh] lg:h-[77vh] overflow-hidden bg-gradient-to-br from-[#F9F6EE] via-white to-green-50">

      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-green-200 blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-green-100 blur-3xl opacity-50" />

    <div className="max-w-7xl mx-auto min-h-[70vh] grid lg:grid-cols-2 gap-10 items-center px-6 py-12 lg:py-0">

      <motion.div
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.8 }}
className="text-center lg:text-left"
>

          <span className="text-primary-green font-semibold">
            🌿 AI Powered Plant Platform
          </span>

          <h1 className="
text-4xl
sm:text-5xl
lg:text-6xl
font-black
leading-tight
text-primary-dark
mt-4
">
            Grow Better.
            <br />
            Not Harder.
          </h1>

          <p className="
mt-6
text-base
sm:text-lg
text-gray-600
max-w-xl
">
            Discover beautiful plants, learn expert care tips,
            manage your own collection, and chat with PlantPal AI
            whenever you need gardening advice.
          </p>

         <div className="mt-8 flex flex-col sm:flex-row gap-4">
<Link href="/plants">
  <Button
   
    className="bg-primary-green rounded-full text-white px-8 hover:scale-105 transition-transform"
  >
    Explore Plants
  </Button>
</Link>

          {mounted && session && (
  <Link href="/plants/add">
    <Button
      variant="outline"
      className="hover:scale-105 transition-transform rounded-full"
    >
      Add Plant
    </Button>
  </Link>
)}
          </div>

        </motion.div>

        <motion.div
          animate={{
            y:[0,-15,0]
          }}
          transition={{
            repeat:Infinity,
            duration:5
          }}
         className="
relative
h-70
sm:h-87.5
md:h-125
order-first
lg:order-last
"
        >

         <AnimatePresence mode="wait">

<motion.div

key={heroImages[currentImage]}

initial={{opacity:0,x:80}}

animate={{opacity:1,x:0}}

exit={{opacity:0,x:-80}}

transition={{duration:.7}}

className="absolute inset-0"
>

<Image
fill
src={heroImages[currentImage]}
alt=""
className="object-contain"
/>

</motion.div>

</AnimatePresence>

        </motion.div>

      </div>

      <motion.div
        animate={{
          y:[0,12,0]
        }}
        transition={{
          repeat:Infinity,
          duration:2
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-green text-4xl"
      >
        ↓
      </motion.div>

    </section>
  );
}