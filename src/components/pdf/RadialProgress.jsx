import React from 'react'

function RadialProgress(props) {

    const circumference = 50 * 2 * Math.PI

    return (
        // <div><CircularProgressWithLabel variant="determinate" value={90} /></div>
          <div class="flex items-center justify-center w-full bg-white rounded-full">
            <svg class="w-32 h-32 transform rotate-[-90deg] translate-x-[2px] -translate-y-1" x-cloak aria-hidden="true">
              <circle
                class="text-gray-300"
                stroke-width="10"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
                />
              <circle
                className="text-purple-600"
                stroke-width="10"
                stroke-dasharray={circumference}
                stroke-dashoffset={circumference - props.percent / 100 * circumference}
                stroke-linecap="round"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
               />
            </svg>
            <span class="absolute text-[23px] text-purple-600">{props.percent}%</span>
          </div>
    )
}

export default RadialProgress