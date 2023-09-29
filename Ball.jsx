import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
const Ball = () => {
    const [data, setData] = useState("")
    let positionValue = {
        x:0,
        y:0,
        z:0
      }
    useEffect(()=>{
        const socket = io("http://localhost:3001/")
       
        socket.on('udpData', (data) => {
            setData(data);
        });
       
      },[])

      if(data)
     {
        let tempValue = data.slice(1)
        tempValue =  tempValue.slice(0, tempValue.length - 1).split(',')
        positionValue.x = 3 -(parseInt(tempValue[0]) / 100) 
        positionValue.y = (parseInt(tempValue[1]) / 100) 
        positionValue.z = 5 - (parseInt(tempValue[2]) / 1000)
    }
     console.log(positionValue); 
  return (
    <>
        <mesh position={ [ positionValue.x, positionValue.y, positionValue.z ] }>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color="red" wireframe/>
        </mesh>
    </>
  )
}

export default Ball