import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../services/login.service'
@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  public color1 = "blue";
  public color2 = "blue";
  public color3 = "blue";
  public color4 = "blue";
  public color5 = "blue";
  public color6 = "blue";
  public color7 = "blue";
  public color8 = "blue";
  public color9 = "blue";
  public color10 = "blue";
  vin;
  errormsg;
  selectedImages = [];
  showAlertModal = false;
  damagedParts = {
    Front_end: false,
    Driver_front: false,
    Driver_side: false,
    Driver_rear: false,
    Passenger_front: false,
    passenger_side: false,
    Passenger_rear: false,
    Rear_end: false,
    Roof: false,
    otherDamages: false,
    Other_damages: false
  };

  constructor(public router: Router, public addressService: LoginService) { }

  ngOnInit() {
    var authGuardFlag = sessionStorage.getItem('authGuardFlag');
    if (authGuardFlag === "true") {

    } else {
      window.location.href = "/";
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (position.coords) {
          var loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.addressService.getAddress(loc).subscribe(
            res => {
              if (res.address) {
                sessionStorage.setItem("location", res.address);
              }
            }
          )

        }

      });
    }
  }
  changeColor(index) {

    switch (index) {
      case 1:
        if (this.color1 == "blue") {
          this.color1 = "green";
          this.damagedParts.Front_end = true;
          this.selectedImages.push(
            {
              id: "01",
              desc: "Front End"
            }
          );
        } else {
          this.color1 = "blue";
          this.damagedParts.Front_end = false;
          this.removeSelectedImage("01");

        }
        break;
      case 2:
        if (this.color2 == "blue") {
          this.color2 = "green";
          this.damagedParts.Driver_front = true;
          this.selectedImages.push(
            {
              id: "02",
              desc: "Driver Front"
            }
          );
        } else {
          this.color2 = "blue";
          this.damagedParts.Driver_front = false;
          this.removeSelectedImage("02");
        }
        break;
      case 3:
        if (this.color3 == "blue") {
          this.color3 = "green";
          this.damagedParts.Passenger_front = true;
          this.selectedImages.push(
            {
              id: "03",
              desc: "Passenger Front"
            }
          );
        } else {
          this.color3 = "blue";
          this.damagedParts.Passenger_front = false;
          this.removeSelectedImage("03");
        }
        break;
      case 4:
        if (this.color4 == "blue") {
          this.color4 = "green";
          this.damagedParts.Driver_side = true;
          this.selectedImages.push(
            {
              id: "04",
              desc: "Driver Side"
            }
          );
        } else {
          this.color4 = "blue";
          this.damagedParts.Driver_side = false;
          this.removeSelectedImage("04");
        }
        break;
      case 5:
        if (this.color5 == "blue") {
          this.color5 = "green";
          this.damagedParts.Roof = true;
          this.selectedImages.push(
            {
              id: "05",
              desc: "Roof"
            }
          );
        } else {
          this.color5 = "blue";
          this.damagedParts.Roof = false;
          this.removeSelectedImage("05");
        }
        break;
      case 6:
        if (this.color6 == "blue") {
          this.color6 = "green";
          this.damagedParts.passenger_side = true;
          this.selectedImages.push(
            {
              id: "06",
              desc: "Passenger Side"
            }
          );
        } else {
          this.color6 = "blue";
          this.damagedParts.passenger_side = false;
          this.removeSelectedImage("06");
        }
        break;
      case 7:
        if (this.color7 == "blue") {
          this.color7 = "green";
          this.damagedParts.Driver_rear = true;
          this.selectedImages.push(
            {
              id: "07",
              desc: "Driver Rear"
            }
          );
        } else {
          this.color7 = "blue";
          this.damagedParts.Driver_rear = false;
          this.removeSelectedImage("07");
        }
        break;
      case 8:
        if (this.color8 == "blue") {
          this.color8 = "green";
          this.damagedParts.Passenger_rear = true;
          this.selectedImages.push(
            {
              id: "08",
              desc: "Passenger Rear"
            }
          );
        } else {
          this.color8 = "blue";
          this.damagedParts.Passenger_rear = false;
          this.removeSelectedImage("08");
        }
        break;
      case 9:
        if (this.color9 == "blue") {
          this.color9 = "green";
          this.damagedParts.Rear_end = true;
          this.selectedImages.push(
            {
              id: "09",
              desc: "Rear End"
            }
          );
        } else {
          this.color9 = "blue";
          this.damagedParts.Rear_end = false;
          this.removeSelectedImage("09");
        }
        break;
      case 10:
        if (this.color10 == "blue") {
          this.color10 = "green";
          this.damagedParts.otherDamages = true;
        } else {
          this.color10 = "blue";
          this.damagedParts.otherDamages = false;
        }
        break;
    }
  }
  removeSelectedImage(id) {

    for (var i = 0; i < this.selectedImages.length; i++) {
      if (this.selectedImages[i].id === id) {
        this.selectedImages.splice(i, 1);
        break;
      }
    }
  }
  doTextareaValueChange(e) {
    if (e.target.value) {
      this.damagedParts.Other_damages = e.target.value;
    }
  }


  checkNoneSelected(obj) {
    for (var elt in obj) if (obj[elt] != false) return false;
    return true;

  }
  goTotakephotos() {

    var noneSelected = this.checkNoneSelected(this.damagedParts);

    if (noneSelected) {
      this.showAlertModal = true;
      //this.router.navigate(["carangles/" + "VIN"]);
    }
    else {
      if (this.damagedParts.Other_damages) {
        sessionStorage.setItem("otherDamagesDesc", JSON.stringify(this.damagedParts.Other_damages));
      }

      sessionStorage.setItem("selectedImages", JSON.stringify(this.selectedImages));
      sessionStorage.setItem("authGuardSelectionFlag", "true");
      sessionStorage.setItem("authGuardAngleVIN", "true");
      this.router.navigate(["carangles/" + "VIN"]);

    }

  }

  alertConfirmed(selection) {

    if (selection == 'Y') {
      sessionStorage.setItem("authGuardSelectionFlag", "true");
      sessionStorage.setItem("authGuardAngleVIN", "true");
      this.router.navigate(["carangles/" + "VIN"]);
    } else {
      this.showAlertModal = false;
    }

  }
}
