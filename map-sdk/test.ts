import liteAPIMapInit from "./src/index";

liteAPIMapInit({
  selector: "map",
  placeId: "ChIJ8ewYqugJxkcR7jzBgRb-hvc",
  mapboxToken:
    "pk.eyJ1IjoiaG5hamktZWwiLCJhIjoiY21oN3Z1dDg4MG96dTJpczYwN2wzZGFsOSJ9.TD_bFVB2gtSRhxfYO8ppZg",
});

/*
https://whitelabel.nuitee.link/hotels/lp1ed9f?
- source=liteapi-sdk
+ checkin=2025-10-31
+ checkout=2025-11-01
+ adults=2
children=
rooms=1
+ occupancies=W3siYWR1bHRzIjoyLCJjaGlsZHJlbiI6W10sInJvb21zIjoxfV0%3D
language=en
currency=EUR

https://wl-domain/hotels/lp4aa75?
+ placeId=ChIJgUbEo8cfqokR5lP9_Wh_DaM
checkin=2024-09-15
checkout=2024-09-20
occupancies=eyJhZHVsdHMiOjIsImNoaWxkcmVuIjpbOCw2XX0=


https://whitelabel.nuitee.link/hotels/${hotelId}?placeId=${}&checkin=${}&checkout=${}&adults=${}&occupancies=${}

*/
