import React, { useEffect } from 'react'
import "./Filter.css"
const giaBan = [
    {
        id:1,
        name:'Dưới 100.000Đ',
        value:'lt1000'

    },
    {
        id:2,
        name:'Từ 100.000 - 500.000Đ',
        value:'btw10001500'

    },
    {
        id:3,
        name:'Trên 500.000Đ',
        value:'gt1500'
    },
    {
        id:4,
        name:'Bỏ lọc',
        value:'clear'

    }
]
const Filters = ({activePrices,setActivePrices,products,setFilters}) => {
    useEffect(()=>{
        if(activePrices ==='')
        {
            setFilters(products);
            return;
        }
       
        const filterPrice = products.filter((item)=>
            activePrices ===''
            ? item
            :activePrices === 'lt1000' 
            ? item.giaBan<100000
            : activePrices === 'btw10001500' 
            ? item.giaBan >= 100000&& item.giaBan <= 500000
            : item.giaBan > 500000
        )
        setFilters(filterPrice);

    },[activePrices,products,setFilters])
  return (
    <div className='Bg-Filter'>
        <div className='Loc'>
            <h4>Lọc theo giá</h4>
        </div>
        {
            giaBan.map((item)=>{
                return(
                    <button key={item.id}
                    onClick={()=>
                        item.value!=='clear'
                        ?setActivePrices(item.value)
                        : setActivePrices('')}
                    >
                        {item.name}
                    </button>
                )
            })
        }
    </div>
  )
}

export default Filters