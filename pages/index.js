import Page from "../components/Page"
import React, { useState, useEffect } from 'react';
import Card from "../components/Card";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home(){

    const [message, setMessage] = useState(null);
    const [house1, setHouse1] = useState(0);
    const [house2, setHouse2] = useState(0);
    const [house3, setHouse3] = useState(0);
    const [excess_power, setExcessPower] = useState(0);
    
    const createMQTTConnection = () => {
      
      const { createEvent, connect, nameForServiceSpecificTopic, nameForSharedTopic, smartHomeEventBuilder, platformEventsEventBuilder } = require('enstadtpfaff-platform-mock-api')

      const DEFAULT_MQTT_ADDRESS = "wss://broker.platform.pfaffhack.de:443"
      const DEFAULT_MQTT_USERNAME = "pfaffhack"
      const DEFAULT_MQTT_PASSWORD = "kaiserslautern"
      const DEFAULT_SENDER_NAME = 'nodejs-starter';

      const platformMockApi = connect(
          DEFAULT_MQTT_ADDRESS,
          DEFAULT_MQTT_USERNAME,
          DEFAULT_MQTT_PASSWORD,
          DEFAULT_SENDER_NAME,

          function (event) {
            
            const house_name = event.topic.match(/linapfaff\d+/g)
            const generated_power = JSON.parse(event.payload)
            const new_generated_power = Number(generated_power.currentPower)
            if (house_name == "linapfaff1"){
              if (house1 + new_generated_power > 60){
                setHouse1(60)
                setExcessPower(new_generated_power+(new_generated_power)%60)
              }
              else
                setHouse1(house1 + new_generated_power)
            }
            else if (house_name == "linapfaff2"){
              if ((house2 + new_generated_power) > 60){
                setHouse2(60)
                setExcessPower(new_generated_power+(new_generated_power)%60)
              }

              else
                setHouse2(house2 + new_generated_power)
            }
            else if (house_name == "linapfaff3"){
              if (house3 + new_generated_power > 60){
                setHouse3(60)
                setExcessPower(new_generated_power+(new_generated_power)%60)
              }
              else
                setHouse3(house3 + new_generated_power)
            }

            setMessage({"Apartment": event.topic, "payload": event.payload});
            console.log(`message arrived on topic ${event.topic}: ${event.payload}`);
          }
      );
      platformMockApi.eventBroker.subscribe('platform-mock/shared/smart-home/+/0/0/main/misc/pv');

    }

    useEffect(() => {
      createMQTTConnection(),
    [message]});

    return (
          <Page>
            <p style={{fontSize: "2.5rem", fontWeight: "bold", }}>Enegry Contribution Dashboard</p>
            <p style={{fontSize: "2rem"}}></p>
            <div style={{display: "flex"}}>
              {/*message && <p style={{fontSize: "1.5rem"}}>Message: {message.Apartment}</p>*/}
              

              <Card>
                <div>
                  <h3>House 1</h3>
                  <ProgressBar animated now={house1? house1: 0} label={house1? house1: 0+"%"} style={{margin: "20px", textAlign:"center"}}/>
                  
                  <p>Contribution</p>
                  <p>{house1} kWh</p>
                </div>
              </Card>

              <Card>
                <div>
                  <h3>House 2</h3>
                  <ProgressBar animated now={house2? house2: 0} label={house2? house2: 0+"%"} style={{margin: "20px", textAlign:"center"}}/>
                  <p>Contribution</p>
                  <p>{house2} kWh</p>
                </div>
              </Card>

              <Card>
                <div>
                  <h3>House 3</h3>
                  <ProgressBar animated now={house3? house3: 0} label={house3? house3: 0+"%"} style={{margin: "20px", textAlign:"center"}}/>
                  <p>Contribution</p>
                  <p>{house3} kWh</p>
                </div>
              </Card>
            
            </div>
            <div style={{display: "flex"}}>
            <Card>
                <div>
                  <h3>Total Contribution to Electricty Dept.</h3>
                  <ProgressBar animated now={excess_power/1000} style={{margin: "20px", textAlign:"center"}}/>
                  <p>Contribution</p>
                  <p>{excess_power} kWh</p>
                </div>
              </Card>
            </div>
          </Page>
    );
};
