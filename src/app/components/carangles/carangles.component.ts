import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { util } from '../../utils/util';
import { config } from '../../utils/config';
import { ImageCompressService } from 'ng2-image-compress';
import { SubmitphotosService } from '../../services/submitphotos.service';

@Component({
  selector: 'app-carangles',
  templateUrl: './carangles.component.html',
  styleUrls: ['./carangles.component.scss']
})
export class CaranglesComponent implements OnInit {
  photoId = null;
  title_text = "";
  tip_text = "";
  next_page;
  bgc_image;
  image: any;
  uploadErrorMsg;
  BUCKET_NAME = config.BUCKET_NAME;
  showSpinner = false;

  constructor(public router: Router, public activeRoute: ActivatedRoute, public photoService: SubmitphotosService) {

  }

  ngOnInit() {
    this.photoId = this.activeRoute.snapshot.params['photoId'];
    var authGuardFlag = sessionStorage.getItem('authGuardSelectionFlag');
    var guard = sessionStorage.getItem("authGuardAngle" + this.photoId);
    if (authGuardFlag === "true" && guard === "true") {


    } else {
      window.location.href = "/";
    }

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      // do your task for before route

      return false;
    }


    var tips = JSON.stringify(util.getPhotoTips());
    var tipsJson = JSON.parse(tips);

    tipsJson.forEach(data => {
      var id = this.photoId;
      if (id) {
        this.title_text = data[id].title;
        this.tip_text = data[id].tip;
        this.bgc_image = data[id].image;
        this.next_page = data[id].nextPage;
      }
    });
  }

  onAngleChange($event): void {
    var id = sessionStorage.getItem('id');
    var ts = sessionStorage.getItem('ts');
    var claimNumber = sessionStorage.getItem('claimNumber');
    this.showSpinner = true;
    var file = $event.target.files[0];
    if (file && claimNumber && id && ts) {
      var ResizeOptions = (function() {
        function ResizeOptions() {
          this.Resize_Max_Height = 650;
          this.Resize_Max_Width = 650;
          this.Resize_Quality = 99;
          this.Resize_Type = 'image/jpeg';
        }
        return ResizeOptions;
      }());
      var option = new ResizeOptions();
      ImageCompressService.filesToCompressedImageSourceEx($event.target.files, option).then(observableImages => {
        observableImages.subscribe((image) => {
          util.getOrientation(file, (orientation) => {
            util.resetOrientation(image.compressedImage.imageDataUrl, orientation, (resetBase64Image) => {
              this.photoService.submitSinglePhoto(id, claimNumber, ts, this.photoId, resetBase64Image).subscribe(
                result => {
                  if (result == "Uploaded the file Successfully") {
                    if (this.next_page == 'submit') {
                      this.showSpinner = false;
                      sessionStorage.setItem("authGuardAnglesFlag", "true");
                      this.router.navigate(["takeaphoto"]);
                    } else {
                      this.showSpinner = false;
                      sessionStorage.setItem("authGuardAngle" + this.next_page, "true");
                      this.router.navigate(["carangles/" + this.next_page]);
                    }
                  } else {
                    this.showSpinner = false;
                    this.uploadErrorMsg = 'Oops! Something went wrong. Please try again later.';
                  }
                },
                (error) => {
                  this.showSpinner = false;
                  this.uploadErrorMsg = 'Oops! Something went wrong. Please try again later.';
                  console.log(error);
                }
              )
            })
          })
        })
      })

    } else {
      this.showSpinner = false;
      this.uploadErrorMsg = 'Oops! Something went wrong. Please try again later.';
    }
  }
}
