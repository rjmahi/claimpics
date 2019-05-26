export class util {

    static getPhotoTips() {
        var photoTips = [
            {

                "VIN": {
                    "title": "VIN",
                    "tip": "Please take a clear, close-up picture of the Vehicle Identification Number (VIN). The VIN is located under the driver’s side windshield near the dashboard, or inside the driver’s-side door jamb.",
                    "image": "vin",
                    "nextPage": "OdoMeter"
                },

                "OdoMeter": {
                    "title": "Odometer",
                    "tip": "Please sit in the driver’s seat, start the engine, and take a clear, close-up, and glare-free photo of your vehicle’s current mileage.",
                    "image": "odometer",
                    "nextPage": "FrontDriverSide"
                },

                "FrontDriverSide": {
                    "title": "Front Driver Side",
                    "tip": "Please take a clear picture of your vehicle from the angle displayed above.",
                    "image": "frontangle",
                    "nextPage": "RearDriverSide"
                },
                "RearDriverSide": {
                    "title": "Rear Driver Side",
                    "tip": "Please take a clear picture of your vehicle from the angle displayed above.",
                    "image": "backangle",
                    "nextPage": "RearPassengerSide"
                },

                "RearPassengerSide": {
                    "title": "Rear Passenger Side",
                    "tip": "Please take a clear picture of your vehicle from the angle displayed above.",
                    "image": "rearopangle",
                    "nextPage": "FrontPassengerSide"

                },
                "FrontPassengerSide": {
                    "title": "Front Passenger Side",
                    "tip": "Please take a clear picture of your vehicle from the angle displayed above.",
                    "image": "opfrontangle",
                    "nextPage": "submit"

                }
            }
        ]
        return photoTips;
    }


    static getOrientation(file, callback) {

        var reader: any;
        //var target:EventTarget;
        reader = new FileReader();
        reader.onload = (event) => {

            var view = new DataView(event.target.result);

            if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

            var length = view.byteLength,
                offset = 2;

            while (offset < length) {
                var marker = view.getUint16(offset, false);
                offset += 2;

                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) {
                        return callback(-1);
                    }
                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;

                    for (var i = 0; i < tags; i++)
                        if (view.getUint16(offset + (i * 12), little) == 0x0112)
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                }
                else if ((marker & 0xFF00) != 0xFF00) break;
                else offset += view.getUint16(offset, false);
            }
            return callback(-1);
        };

        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    };
    static resetOrientation(srcBase64, srcOrientation, callback) {
        var img = new Image();

        img.onload = () => {
            var width = img.width,
                height = img.height,
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext("2d");

            // set proper canvas dimensions before transform & export
            if (4 < srcOrientation && srcOrientation < 9) {
                canvas.width = height;
                canvas.height = width;
            } else {
                canvas.width = width;
                canvas.height = height;
            }

            // transform context before drawing image
            switch (srcOrientation) {
                case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
                case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
                case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
                case 7: ctx.transform(0, -1, -1, 0, height, width); break;
                case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                default: break;
            }

            // draw image
            ctx.drawImage(img, 0, 0);

            // export base64
            callback(canvas.toDataURL("image/jpeg"));
        };

        img.src = srcBase64;
    }
}

