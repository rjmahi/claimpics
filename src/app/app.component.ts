import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'claimpics';
  showAlertModal = false;
  showSessionAlertModal = false;


  constructor(private userIdle: UserIdleService, public router: Router, ptlocation: PlatformLocation) {

    ptlocation.onPopState(() => {

      var submited = sessionStorage.getItem('submited');
      if (submited === "true") {
        this.showAlertModal = true;
      } else {
        this.showAlertModal = false;
      }
      var errorPage = sessionStorage.getItem('errorPage');
      if (errorPage === 'true') {
        this.showSessionAlertModal = true;
      }

    })



  }
  ngOnInit() {

    var errorPage = sessionStorage.getItem('errorPage');
    if (errorPage === 'true') {
      this.showSessionAlertModal = true;
    }

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {
      if (count === 1) {
        sessionStorage.setItem('errorPage', 'true');
        this.showSessionAlertModal = true;

      }

    }
    );


  }

  alertSubmitConfirmed() {
    window.location.href = "https://www.plymouthrock.com/claims/auto-claims";

  }

  alertSessionConfirmed() {
    var claimNumber = sessionStorage.getItem("claimNumber");
    var id = sessionStorage.getItem("id");
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("ts");
    sessionStorage.removeItem("errorPage");

    window.location.href = location.pathname + "?c=" + claimNumber + "&id=" + id
  }

}


