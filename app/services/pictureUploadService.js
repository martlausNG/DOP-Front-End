define([
        'angularAMD',
        'ng-file-upload',
        'services/serverCallService'
], function (angularAMD) {
    var instance;

    angularAMD.factory('pictureUploadService', ['serverCallService', 'Upload',
        function (serverCallService, Upload) {

            instance = {
                upload: function (file, successCallback, errorCallback, finallyCallback) {

                	Upload.dataUrl(file, true).then(function () {
                		var dataBase64 = file.$ngfDataUrl.substring('data:image/png;base64,'.length);

                		var picture = {
                				picture: dataBase64
                		};

                		serverCallService.upload('rest/picture', picture, function(response) {
                			successCallback(response.data);
                		}, errorCallback, finallyCallback);
                    });
                }
            };

            return instance;
        }
    ]);
});
