import { Component } from '@angular/core';
import { getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRM_Portal-LoginPage';
//   ngOnInit(){
//     const db=getFirestore();
//     console.log(db)
//   }
}
