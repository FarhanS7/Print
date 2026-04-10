import { useState } from 'react'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black text-gradient">
          Printify Custom
        </h1>
        <p className="text-zinc-400 text-xl max-w-md mx-auto">
          Building the future of AI-powered Print-on-Demand.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <button className="glass-morphism px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all cursor-pointer">
            Explore Designs
          </button>
          <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-zinc-200 transition-all cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
