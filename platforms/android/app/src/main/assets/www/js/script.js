const FLICKR_API_KEY = '90a6c1eafaad273b123c8d9cbc74409a';

let latitude, longitude;

const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
}

const onSuccess = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getPictures(latitude, longitude);
}

const onError = (error) => {
    navigator.notification.alert(
        'code: ' + error.code + '\n' +
        'message: ' + error.message + '\n'
    );
}

const getPictures = (latitude, longitude) => {
    $('#pictures').empty();

    const queryString = 
        "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
        FLICKR_API_KEY +
        "&lat=" +
        latitude + 
        "&lon=" + 
        longitude + 
        "&format=json&jsoncallback=?";

    $.getJSON(queryString, function (results) {
        $.each(results.photos.photo, function (index, item) {
            const photoURL = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
            $('#pictures').append($("<img />").attr("src", photoURL));
        });
    });
}