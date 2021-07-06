import React ,{useState, useEffect} from 'react';
import Axios from "axios";
import { Form, FormGroup, Label, Input } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col} from 'reactstrap';

const Main = () => {

    const [name, setName] = useState("");
    const [lname, setLname] = useState("");
    const [number, setNumber] = useState("");
    const  [gender, setGender] = useState("");
    const  [date, setDate] = useState("");
    const  [month, setMonth] = useState("");
    const  [year, setYear] = useState("");
    const  [plan, setPlan] = useState("");
    const  [payment, setPayment] = useState("");
    const [request, setRequest] = useState([]);
    const [calculated, setCalculated]  = useState("cal");
    const [showalert, setShowalert] = useState("");
    var pricebefore = Math.ceil(request/10);
    var lastprice = pricebefore.toLocaleString();
    


    var alldate2 = year + "-" + month + "-" + date; 
  
    
    const savedatabase = () => {
        if(name&&lname&&number){
            setShowalert("");

        Axios.post("http://localhost:3001/database", {
            name: name,
            lname: lname,
            number: number,
            gender: gender,
            alldate: alldate2,
            plan: plan,
            payment: payment,
            lastprice: lastprice
          
        }).then((response) => {
          console.log(response);
        });
        alert("สมัครเรียบร้อย")
    }
    else{
        setShowalert("กรุณากรอกข้อมูลส่วนตัวให้ครบ")
    }
    }
    
    console.log(alldate2);
    
    const getProduct = () => {
        if(gender&&alldate2&&plan&&payment&&date&&month&&year){
            setButtoncal("กำลังโหลด");
        Axios.post("http://localhost:3001/getProduct", {
          gender: gender,
          alldate: alldate2,
          plan: plan,
          payment: payment,
          
        }).then((response) => {
          console.log(response);
        });
        }else{
            setShowalert("กรุณากรอกข้อมูลให้ครบ !");
        }
        setTimeout(() => {
            setCalculated("non-cal");
            setButtoncal("ยืนยันใหม่อีกครั้ง");
            setShowalert("");
        }, 2000);
      };

      const getProductData = () => {
          setCalculated("save")
          Axios.get("http://localhost:3001/getProduct").then((response) => {
            if(response.data){
               
                setRequest(response.data[0].baseAnnualPremium);
                
            }else{
                setRequest("");
            }

          });
      }

    const getYear = () => {
        const year = new Date().getFullYear();
        var year60 = year + 543 - 60; //2504
        var year20 = year +543 -20; //2544
        
        var arr = ["ปี"];
        for(let h = year60; h <= year20; h++){
            arr[h - year60 +1] = h;
            
        }
        
        
         
      return (
          Array.from(arr, (v,i) =>
            <option key={i} value={v}>{v}</option>
        )
        
      );
     
    };

    const getMonth = () => {
        var arr1 = ["เดือน","มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฏาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
        
        
      return (
          Array.from(arr1, (v,i) =>
            <option key={i} value={arr1.indexOf(v)}>{v}</option>
        )
        
      );
     
    };

    const monthmin = (e,value) => {
        
        setMonth( "0" + e.target.value);
       
    }

    const getDay = () => {
        

        var arr2 = ["วัน"];
        for(let h = 1; h <= 31; h++){
            arr2[h] = h;
        }
        
      return (
          Array.from(arr2, (v,i) =>
            <option key={i} value={v}>{v}</option>
        )
        
      );
     
    };
    const getPayment = () => {
        
        var arr2 = ["เบี้ยประกัน","รายปี"," รายครึ่งปี","ราย 3 เดือน"," รายเดือน"];
        var arr4 = ["YEARLY","HALFYEARLY","QUARTERLY" ,"MONTHLY"];
        
        
      return (
          Array.from(arr2, (v,i) =>
            <option key={i} value={arr4[arr2.indexOf(v) - 1]}>{v}</option>
        )
        
      );
     
    };
    
    let female = gender == "FEMALE" ? "gender-wrap cbg" : "gender-wrap";
    let male = gender == "MALE" ? "gender-wrap cbg" : "gender-wrap";
    let benefit2 = plan == "T11A20" ? "premium cbg" : "premium";
    let benefit5 = plan == "T11A50" ? "premium cbg" : "premium";
    let benefit1 = plan == "T11AM1" ? "premium cbg" : "premium";
   
    useEffect(() => {
        setCalculated("cal");
        
        console.log(plan, '- Has changed');
        
    },[plan,gender,date,month,year,payment]) 
    
    return(
            <div className="Main">
                <div className="container">
                <div style={{}}>
                    <h3>คำนวณเบี้ยประกัน</h3>
                </div>
                    <Form inline className="form"> 
                    <FormGroup   className="mb-2 mr-sm-2 mb-sm-0 form-group">
                      <Label  className="mr-sm-2">ชื่อ</Label>
                      <Input type="text" value={name} name="name"  placeholder="ชื่อ"  onChange={(e) => {setName(e.target.value);}}/>
                    </FormGroup>
                   
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 form-group">
                      <Label  className="mr-sm-2">นามสกุล</Label>
                      <Input type="text" value={lname} name="lname"  placeholder="นามสกุล" onChange={(e) => {setLname(e.target.value);}} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 form-group">
                      <Label  className="mr-sm-2">เบอร์โทร</Label>
                      <Input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={number} name="number"  placeholder="090-555-5555" onChange={(e) => {setNumber(e.target.value);}} />
                    </FormGroup>
                   
                  </Form>
                    
                      <div className="select-gender">
                      <h2>เลือกเพศ</h2>
                      <Container style={{maxWidth:"500px"}}>
                          <Row>
                                <Col>
                                    <button className={male} onClick={()=>{setGender("MALE");}}>
                                                <i className="fas fa-male icons"></i>
                                                <p>ผู้ชาย</p>
                                    </button>
                                </Col>
                                <Col>
                                    <button className={female} onClick={()=>{setGender("FEMALE");}}>
                                            <i className="fas fa-female icons" ></i>
                                            <p>ผู้หญิง</p>
                                    </button>
                                </Col>
                          
                          </Row>
                      </Container >
                        
                      </div>  
                      <div className="select-date">
                      <h2>วันเกิด</h2>
                      
                            <div className="date">
                            
                                <select className="form-select " style={{width:"200px"}} onChange={(e)=>{
                                    if(e.target.value < 10){
                                        setDate("0" + e.target.value);
                                    }else{
                                        setDate( e.target.value);
                                    }
                                
                                }}>
                                        {getDay()}
                                </select>
                                <select className="form-select" style={{width:"200px"}} onChange={(e) => {
                                    if(e.target.value < 10){
                                    setMonth( "0" + e.target.value);
                                    }else{
                                        setMonth(e.target.value);
                                    }
                                }}>
                                        {getMonth()}
                                </select>
                                <select className="form-select" style={{width:"200px"}} onChange={(e)=>{setYear( e.target.value-543); }}>
                                        {getYear()}
                                </select>
                                
                            </div>
                            
                    </div>
                    <div className="select-frequency">
                    
                         <h2>เบี้ยประกัน</h2>
                         <div className="frequency">
                            <select className="form-select frequency" style={{width:"200px"}} onChange={(e)=>{setPayment(e.target.value); }}>
                                 {getPayment()}
                            </select>
                            </div>
                    </div>
                    <div className="select-premium">
                        <h2>เลือกทุนประกันที่เหมาะสมกับคุณ</h2>
                        <div className="select-premium-flex">
                            <Container style={{maxWidth:"800px"}}> 
                                <Row>
                                    <Col xs="6" sm="4" style={{marginTop:"10px"}}>
                                        <button className={benefit2} onClick={(e)=>{setPlan("T11A20"); }}>
                                        <p className="premium-price">200,000</p>
                                            
                                        </button>
                                    </Col>
                                    <Col  xs="6" sm="4" style={{marginTop:"10px"}}>
                                        <button className={benefit5} onClick={(e)=>{setPlan("T11A50"); }} >
                                        <p className="premium-price">500,000</p>
                                        </button>
                                    </Col>
                                    <Col  xs="12" sm="4" style={{marginTop:"10px"}}>
                                        <button className={benefit1} onClick={(e)=>{setPlan("T11AM1"); }}>
                                        <p className="premium-price">1,000,000</p>
                                        </button>
                                    </Col>
                                </Row>
                                <div className="button-res">

                                    {lastprice == 0? <p>    </p> :  <div className="lastprice"><p>เบี้ยประกันของคุณคือ<span>{" " + "รายปี" + " "  + lastprice} </span> บาท</p></div>}
                                    <p style={{color:"red"}}>{showalert}</p>
                                    {calculated == "cal" ?  <button className="button-pre" type="" onClick={getProduct}>ยืนยัน</button> : calculated == "save" ? <button className="button-pre" type="" onClick={savedatabase}>สมัคร</button> :  <button className="button-pre" type="" onClick={getProductData}>คำนวน</button>}
                                    
                                   
                                </div>
                                </Container>  
                        </div>
                    </div>
                    
                   
                   
                </div>
                
            </div>
            
    );
}



export default Main ;
