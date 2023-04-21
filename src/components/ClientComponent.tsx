"use client"

import { useState } from "react";
import ServerComponent from "./ServerComponent";

const ClientComponent = () => {
  const [count, setCount] = useState(0);


  // return <div>
  //   <p>Count: {count}</p>
  //   <ServerComponent baseUrl={'/api/rsc'} componentRoute="@/components/serverCounter" componentProps={{count}} />
  //   <button onClick={() => setCount(count + 1)}>Increment</button>
  // </div>
  
  return <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Client {count} </h2>
      <ServerComponent baseUrl={'/api/rsc'} componentRoute="@/components/serverCounter" componentProps={{count}} />
      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
}

export default ClientComponent