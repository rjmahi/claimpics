import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var authGuardFlag = sessionStorage.getItem('authGuardSubmitFlag');
    if (authGuardFlag === "true") {

    } else {
      window.location.href = "/";
    }
  }
  closeBrowser() {

    window.location.href = "https://www.plymouthrock.com/claims/auto-claims";
  }
}
