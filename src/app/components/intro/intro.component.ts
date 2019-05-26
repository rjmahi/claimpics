import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  showSpinner = false;
  constructor(public activeRoute: ActivatedRoute, public router: Router, public deviceService: DeviceDetectorService, public loginService: LoginService) {

  }

  ngOnInit() {

    if (this.deviceService.isDesktop()) {
      this.router.navigate(['desktopalert']);
    }

    var loggedInUser = sessionStorage.getItem("loggedInUser");
    var claimNumber = sessionStorage.getItem("claimNumber");
    var id = sessionStorage.getItem("id");
    var ts = sessionStorage.getItem("ts");

    let loc = location.href;
    if (loggedInUser === "true" && claimNumber && id && ts) {
      // do nothing
    } else {
      if (loc.indexOf("id=") > 0 && loc.indexOf("c=") > 0) {
        let id = getParamsByName("id");
        let claimNumber = getParamsByName("c");
        this.showSpinner = true;
        this.loginService.login(id, claimNumber).subscribe(
          result => {
            if (result.valid === "true") {
              // do nothing
              this.showSpinner = false;
            } else {
              this.showSpinner = false;
              sessionStorage.clear();
              window.location.href = "https://www.plymouthrock.com/claims/auto-claims";
            }
          },
          (error) => {
            this.showSpinner = false;
            console.log(error);
            sessionStorage.clear();
            window.location.href = "https://www.plymouthrock.com/claims/auto-claims";

          }
        );
      } else {
        sessionStorage.clear();
        window.location.href = "https://www.plymouthrock.com/claims/auto-claims";
      }
    }



  }
  goToNextPage() {
    sessionStorage.setItem("authGuardFlag", "true");
    this.router.navigate(['selection']);
  }
}


function getParamsByName(paramName) {

  var url = location.href;
  var urlObj = new URL(url);
  var param = urlObj.searchParams.get(paramName);
  return param;

}


