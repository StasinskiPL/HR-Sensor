import {updateChart} from "./chart.js";
import "./style.css";


const connect= document.getElementById("connect");
const disconect = document.getElementById("disconect");
const hr = document.getElementById("hr");

connect.addEventListener("click", async () => {
  navigator.bluetooth
    .requestDevice({ filters: [{ services: ["heart_rate"] }] })
    .then((device) => device.gatt.connect())
    .then((server) => server.getPrimaryService("heart_rate"))
    .then((service) => service.getCharacteristic("heart_rate_measurement"))
    .then((characteristic) => {
      characteristic.startNotifications().then((data) => {
        data.addEventListener("characteristicvaluechanged", getHr);

        disconect.addEventListener("click",()=>{
        data.removeEventListener("characteristicvaluechanged", getHr);
        })
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

function getHr(event) {
  const value = event.target.value;
  const parsedValue = parseHeartRate(value);
  hr.textContent = parsedValue;
  updateChart(parsedValue);
}

function parseHeartRate(value) {
  value = value.buffer ? value : new DataView(value);
  let flags = value.getUint8(0);
  let rate16Bits = flags & 0x1;
  if (rate16Bits) {
    return value.getUint16(1, true);
  } else {
    return value.getUint8(1);
  }
}
