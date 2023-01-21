import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

const HOST_CORS_PROXY = "https://bond-cors-proxy.up.railway.app/v1";
const HOST_NAME = "https://raw.githubusercontent.com/PetroIvaniuk/2022-Ukraine-Russia-War-Dataset/main/data/"
const HTTP_PERSONNEL_DATA = HOST_NAME + "russia_losses_personnel.json";
const HTTP_EQUIPMENT_DATA = HOST_NAME + "russia_losses_equipment.json";

export interface Personnel {
  date: string;
  day: number;
  personnel: number;
  newPersonnel: number;
}

export interface Equipment {
  date: string;
  day: number;

  newAircraft: number;
  newHelicopter: number;
  newtank: number;
  newApc: number;
  newArtillery: number;
  newMrl: number;
  newDrone: number;
  newShip: number;
  newAntiAircraft: number;
  newSpecialEquipment: number;
  newVehicles: number;
  newCruiseMissiles: number;

  aircraft: string;
  helicopter: string;
  tank: string;
  apc: string;
  artillery: string;
  mrl: string;
  drone: string;
  ship: string;
  antiAircraft: string;
  specialEquipment: string;
  vehicles: string;
  cruiseMissiles: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private httpClient: HttpClient) { }
  personnel = {} as Personnel
  equipment = {} as Equipment

  ngOnInit(): void {
    if (!isOlder()) {
      this.personnel = JSON.parse(String(localStorage.getItem("personnel")))
      this.equipment = JSON.parse(String(localStorage.getItem("equipment")))
      return
    }

    this.httpClient.get(HOST_CORS_PROXY,
      {
        headers: new HttpHeaders({ url: HTTP_PERSONNEL_DATA })
      })
      .subscribe({
        error: (error: HttpErrorResponse) => { console.error(error) },
        complete: () => console.log("success!"),
        next: (data: any) => {
          if (data.length > 0) {
            this.personnel.date = data[data.length - 1].date;
            this.personnel.day = Number(data[data.length - 1].day);
            this.personnel.personnel = Number(data[data.length - 1].personnel);
            this.personnel.newPersonnel = Number(data[data.length - 1].personnel) - Number(data[data.length - 2].personnel);
            localStorage.setItem("date", this.personnel.date)
            localStorage.setItem("personnel", JSON.stringify(this.personnel))
          }
        }
      });

    this.httpClient.get(HOST_CORS_PROXY,
      {
        headers: new HttpHeaders({ url: HTTP_EQUIPMENT_DATA })
      })
      .subscribe({
        error: (error: HttpErrorResponse) => { console.error(error) },
        complete: () => console.log("success!"),
        next: (data: any) => {
          if (data.length > 0) {
            this.equipment.date = data[data.length - 1].date;
            this.equipment.day = Number(data[data.length - 1].day);
            this.equipment.aircraft = data[data.length - 1].aircraft;
            this.equipment.newAircraft = Number(data[data.length - 1].aircraft) - Number(data[data.length - 2].aircraft);
            this.equipment.helicopter = data[data.length - 1].helicopter;
            this.equipment.newHelicopter = Number(data[data.length - 1].helicopter) - Number(data[data.length - 2].helicopter);
            this.equipment.tank = data[data.length - 1].tank;
            this.equipment.newtank = Number(data[data.length - 1].tank) - Number(data[data.length - 2].tank);
            this.equipment.apc = data[data.length - 1].APC;
            this.equipment.newApc = Number(data[data.length - 1].APC) - Number(data[data.length - 2].APC);
            this.equipment.artillery = data[data.length - 1]["field artillery"];
            this.equipment.newArtillery = Number(data[data.length - 1]["field artillery"]) - Number(data[data.length - 2]["field artillery"]);
            this.equipment.mrl = data[data.length - 1].MRL;
            this.equipment.newMrl = Number(data[data.length - 1].MRL) - Number(data[data.length - 2].MRL);
            this.equipment.drone = data[data.length - 1].drone;
            this.equipment.newDrone = Number(data[data.length - 1].drone) - Number(data[data.length - 2].drone);
            this.equipment.ship = data[data.length - 1]["naval ship"];
            this.equipment.newShip = Number(data[data.length - 1]["naval ship"]) - Number(data[data.length - 2]["naval ship"]);
            this.equipment.antiAircraft = data[data.length - 1]["anti-aircraft warfare"];
            this.equipment.newAntiAircraft = Number(data[data.length - 1]["anti-aircraft warfare"]) - Number(data[data.length - 2]["anti-aircraft warfare"]);
            this.equipment.specialEquipment = data[data.length - 1]["special equipment"];
            this.equipment.newSpecialEquipment = Number(data[data.length - 1]["special equipment"]) - Number(data[data.length - 2]["special equipment"]);
            this.equipment.vehicles = data[data.length - 1]["vehicles and fuel tanks"];
            this.equipment.newVehicles = Number(data[data.length - 1]["vehicles and fuel tanks"]) - Number(data[data.length - 2]["vehicles and fuel tanks"]);
            this.equipment.cruiseMissiles = data[data.length - 1].cruiseMissiles;
            this.equipment.newCruiseMissiles = Number(data[data.length - 1].cruiseMissiles) - Number(data[data.length - 2].cruiseMissiles);
            localStorage.setItem("equipment", JSON.stringify(this.equipment))
          }
        }
      });
  }
}

function isOlder() {
  if (localStorage.getItem("date") == null || (new Date()).getDate() > (new Date(String(localStorage.getItem("date"))).getDate())) {
    return true
  }
  return false
}