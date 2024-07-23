import { useState,useEffect, useRef } from "react";
import axios from "axios";
import Styles from "./pagination.module.css"; 
export default function Pagination(){
    const data=useRef([])
    const[disablePrev,setdisp]=useState(false);
    const[disableNext,setdisn]=useState(false);
    const[prevValue,setPrev]=useState(0);
    const[nextValue,setNext]=useState(0);
    const[currentValue,setCurrent]=useState(1);
    const[filterData,setFilter]=useState([]);
    useEffect(()=>{
        async function GetDatefromAPI(){
            const url="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
            try{
                const APIdata=await axios.get(url);
            console.log(APIdata.data);
            data.current=APIdata.data;
            ShowInitialData(data.current);
            }
            catch(err){
                window.alert("fetching data error"+err);
                console.error("fetching data error"+err);
                console.log("failed to fetch data");
            }
            function ShowInitialData(data1){
                setFilter(()=>{
                    if(data1.length>10){
                        setPrev(0);
                        setdisp(true);
                        setNext(10);
                        return data1.slice(0,10);
                        

                    }
                    else{
                        setdisp(true);
                        setdisn(true);
                        return data1;
                    }
                })
            }

         }
        GetDatefromAPI()
    },[])
   
    function ShowData({ ele }) { 
        const { id, name, email, role } = ele;
        return (
            <tr key={id} className={Styles.tbody}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
            </tr>
        );
    }
  function HandlePrev() {
    if (prevValue > 0) {
    setdisp(false);
     setdisn(false);
      const newPrevValue = prevValue - 10;
      const newNextValue = nextValue - 10;
      setPrev(newPrevValue);
      setNext(newNextValue);
      setCurrent((prev) => prev - 1);
      setFilter(data.current.slice(newPrevValue, newNextValue));
    } else {
        setdisp(true);
    }
  }

  function HandleNext() {
    if (nextValue < data.current.length) {
     setdisp(false);
     setdisn(false);
      const newPrevValue = prevValue + 10;
      const newNextValue = nextValue + 10;
      setPrev(newPrevValue);
      setNext(newNextValue);
      setCurrent((prev) => prev + 1);
      setFilter(data.current.slice(newPrevValue, newNextValue));
    } else {
        setdisn(true);
    }
  }
    return (
        <div className={Styles.Table}>
            <div className={Styles.Main}>Employee Data Table</div>
             <div className={Styles.Mainn}>
            <table className={Styles.tableMain}>
                <thead className={Styles.GreenMain}>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                    </tr>
                </thead>
                <tbody >
                    {filterData.map((ele) => <ShowData key={ele.id} ele={ele} />)}
                </tbody>
            </table>
        </div>
        <div>
            <ul className={Styles.list}>
                <li><button onClick={HandlePrev} disabled={disablePrev} className={Styles.list1}>Previous</button></li>
                <li className={Styles.list2}>{currentValue}</li>
                <li><button onClick={HandleNext} disabled={disableNext} className={Styles.list1}>Next</button></li>
            </ul>
        </div>
        </div>
       
    );
}
