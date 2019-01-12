import { Injectable } from '@angular/core';

declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, function(e) {
  if (e) { // user clicked on the ok button
    okCallback(); // okcallback is a fn that is provided when we use the confirm method
   } else {} // if user clicks cancel
  });
}

success(message: string) {
  alertify.success(message);
}

error(message: string) {
  alertify.error(message);
}

warning(message: string) {
  alertify.warning(message);
}

message(message: string) {
  alertify.message(message);
}
}
