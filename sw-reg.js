//register the service worker

if ("serviceWorker" in navigator) { //check if browser supports service worker or not
 navigator.serviceWorker.register('sw.js') //if supported - register service worker (directory of sw file)
 .then(reg => { //when promise is resolved:
 if(reg.installing) {
     console.log('Service worker status: installing');
    } else if(reg.waiting) {
     console.log('Service worker status: waiting');
   } else if(reg.active) {
     console.log('Service worker status: active');
   }
   console.log('Service worker registration succeeded: ' + reg.scope);

  }).catch(error => { // when promise is rejected
   console.log('Registration failed: ' + error);
  });
}
