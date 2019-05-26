import { Component, OnInit } from '@angular/core';
import { SubmitphotosService } from '../../services/submitphotos.service';
import { Router, ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { util } from '../../utils/util';
import { config } from '../../utils/config';
import { ImageCompressService } from 'ng2-image-compress';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-takeaphoto',
  templateUrl: './takeaphoto.component.html',
  styleUrls: ['./takeaphoto.component.scss']
})
export class TakeaphotoComponent implements OnInit {
  showSpinner = false;
  BUCKET_NAME = config.BUCKET_NAME;
  uploadErrorMsg;
  key = 0;
  imagesArray = [];
  imageUrl;
  numberOfPhotostaken = 0;
  imagesObj = [];
  public spinnerText = "Uploading a Photo....";
  showAlertModal = false;
  delKey;

  constructor(public render: Renderer2, public router: Router, public activeRoute: ActivatedRoute, public photoService: SubmitphotosService) {

  }

  ngOnInit() {
    this.key = 0;
    var authGuardFlag = sessionStorage.getItem('authGuardAnglesFlag');
    if (authGuardFlag === "true") {

    } else {
      window.location.href = "/";
    }
  }

  deleteImage(n) {
    this.showAlertModal = true;
    this.delKey = n;
  }

  alertConfirmed(selection) {
    var n = this.delKey;
    this.showAlertModal = false;
    if (selection === 'Y') {
      for (var i = 0; i < this.imagesObj.length; i++) {
        if (this.imagesObj[i].key == n) {
          this.imagesObj.splice(i, 1);
        }
      }
      var index = this.imagesArray.indexOf(n);
      if (index !== -1) {
        this.imagesArray.splice(index, 1);
      }

      this.numberOfPhotostaken = this.numberOfPhotostaken - 1;
    }

  }
  onChange($event): void {
    this.showSpinner = true;
    var file = $event.target.files[0];
    var id = sessionStorage.getItem('id');
    var ts = sessionStorage.getItem('ts');
    this.uploadErrorMsg = "";
    var claimNumber = sessionStorage.getItem('claimNumber');
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

              this.key = ++this.key;
              this.numberOfPhotostaken = ++this.numberOfPhotostaken;
              var key = this.key;

              this.photoService.submitSinglePhoto(id, claimNumber, ts, key.toString(), resetBase64Image).subscribe(
                result => {
                  if (result == "Uploaded the file Successfully") {
                    this.imagesArray.push(this.key.toString());
                    var folderName = claimNumber + "_" + id + "_" + ts;
                    var imgURL = config.API_URL + config.UTILS_CONTEXT + "/downloadimage/" + this.BUCKET_NAME + "/" + folderName + "/" + key.toString();
                    var imgObj = {
                      key: key.toString(),
                      url: imgURL
                    }
                    this.imagesObj.push(imgObj);

                    if (this.numberOfPhotostaken > 3) {
                      var element1 = window.document.getElementById('submit-btn');
                      element1.scrollIntoView(false);
                    } else {
                      var element = window.document.getElementById('scroll');
                      element.scrollIntoView(false);
                    }
                    this.showSpinner = false;

                  } else {
                    this.showSpinner = false;
                    this.uploadErrorMsg = 'Oops! Something went wrong. Please try again later.';
                  }
                },
                (error) => {
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
  goToSubmitphotos() {
    this.spinnerText = "Submiting photos.....";
    this.showSpinner = true;
    var id = sessionStorage.getItem('id');
    var ts = sessionStorage.getItem('ts');
    var claimNumber = sessionStorage.getItem('claimNumber');
    var otherDamagesDesc = sessionStorage.getItem('otherDamagesDesc');
    var selectedImages = sessionStorage.getItem('selectedImages');
    var location = sessionStorage.getItem('location');

    var angles = ["VIN", "OdoMeter", "FrontDriverSide", "RearDriverSide", "RearPassengerSide", "FrontPassengerSide"];
    var finalArray = this.imagesArray.concat(angles);
    var finalImgData = [];
    var folderName = claimNumber + "_" + id + "_" + ts;
    this.imageUrl = config.API_URL + config.UTILS_CONTEXT + "/downloadimage/" + this.BUCKET_NAME + "/" + folderName + "/";
    for (var i in finalArray) {
      var desc = isNaN(finalArray[i]) ? finalArray[i] : "Damage" + finalArray[i];
      var imgObj = {
        imgurl: this.imageUrl + finalArray[i],
        desc: desc
      }
      finalImgData.push(imgObj);
    }

    var finalObj = {
      "claimNumber": claimNumber,
      "ts": ts,
      "id": id,
      "source": "autoClaim",
      "otherDamagesDesc": JSON.parse(otherDamagesDesc),
      "finalAutoClaimPdfData": finalImgData,
      "selectedImages": JSON.parse(selectedImages),
      "location": location
    };
    if (claimNumber && id && ts) {
      this.photoService.submitHomeData(id, claimNumber, ts, finalObj).subscribe(
        result => {
          if (result.status == "success") {
            sessionStorage.clear();
            sessionStorage.setItem("submited", "true");
            this.showSpinner = false;
            sessionStorage.setItem("authGuardSubmitFlag", "true");
            this.router.navigate(["thankyou"]);
          } if (result.errorMessage) {
            // alert("Oops! Something went wrong. Please try again later.");
            this.uploadErrorMsg = "Oops! Something went wrong. Please try again later.";
            this.showSpinner = false;

          }
        },
        (error) => {
          this.uploadErrorMsg = "Oops! Something went wrong. Please try again later.";
          this.showSpinner = false;
          console.log(error);
        }
      );
    } else {
      this.showSpinner = false;
      this.uploadErrorMsg = 'Oops! Something went wrong. Please try again later.';
    }
  }

}
