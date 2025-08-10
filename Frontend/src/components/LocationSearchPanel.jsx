import React from 'react'

const LocationSearchPanel=(props)=> {

    const locations= ['24B, Near Kapoor\'s Cafe, Sheriyans Coding School', '25A, Opposite City Mall, Sheriyans Coding School', '26C, Next to Tech Park, Sheriyans Coding School', '27D, Behind Central Library, Sheriyans Coding School', '28E, Near Main Gate, Sheriyans Coding School'];      
  return (
    <div>
        {
            locations.map(function(elem,idx){
                return <div key={idx} onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                }
                } className='flex  border-2 p-3 border-gray-50 active:border-black rounded-xl gap-4 items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-line"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
        </div>
            })
        }
    </div>
  )
}

export default LocationSearchPanel