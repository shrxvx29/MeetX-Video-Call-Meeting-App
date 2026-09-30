import React from 'react'
import {PricingTable} from '@clerk/react'

const Pricing = () => {
  return (
    <main className='mx-auto flex w-full min-w-0 max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:px-8'>
      <header className='w-full max-w-3xl text-center'>
        <h1 className='text-2xl font-semibold text-primary-hover sm:text-3xl'>
          Upgrade Your Plan.
        </h1>
        <p className='mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base'>
          Choose the plan that's right for you and unlock all the features of MeetX.
        </p>
      </header>
      <div className='w-full min-w-0 max-w-4xl'>
        <PricingTable />
      </div>
    </main>
  )
}

export default Pricing