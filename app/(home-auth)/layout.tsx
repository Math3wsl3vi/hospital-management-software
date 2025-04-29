import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Novamed",
  description: "Hospital Management System and Smart Health Reminder",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return(
      <main className='relative'>
        <div className="print:hidden">
    <Navbar/>
        </div>
    <div className='flex flex-row'>
        <div className="print:hidden">
        <SideBar/>
        </div>
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-10 max-md:pb-14 sm:px-14 bg-white'>
            <div className='w-full'>
                  {children}
            </div>
        </section>
    </div>
</main>
    )
  }
