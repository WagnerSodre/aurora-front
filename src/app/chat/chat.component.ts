import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  userId: string;
  name: string;
  chat: object[];
  numberoOfMessages: number;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        this.name = user.displayName;
        this.itemRef = db.object(this.userId+'/chat');
        this.item = this.itemRef.valueChanges();
        this.item.subscribe((data) => {
          this.chat = data; 
          this.numberoOfMessages = this.chat.length;
        });
      }  else{
        this.router.navigate(['/login']);
      }
      console.log(user);
    })
  }
  reply(userMessage){
    if(this.chat == null)
      this.chat = [];
    this.chat.push({sender: this.name, message: userMessage, date: this.getDateTime().date, time: this.getDateTime().time});
    this.getObject(userMessage).then((answer) => {
      console.log(answer);
      this.chat.push({sender: 'Aurora', message: answer, date: this.getDateTime().date, time: this.getDateTime().time});
      this.itemRef.set(this.chat);
      console.log(this.chat);
    })
    
  }
  ngOnInit() {
  }

  getDateTime(){
    let currentdate = new Date(); 
    let date = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();
    let time = currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
    return {date: date, time: time};
  }

  requestHeader() {
    let myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '*');
    return myHeaders;
}


  getObject(message) {
    return new Promise((resolve, reject) => {
        const API_URL = 'https://backend.au-ro-ra.xyz/answer';
        let uri = encodeURI(
            `${API_URL}/${message}`
        );
        window.fetch(uri, {
                method: 'GET',
                headers: this.requestHeader()
            })
            .then((response) => {
                if (response.ok) {
                  //console.log(response.text())
                    resolve(response.text());
                } else {
                    reject(new Error('Could not fetch the Object informations.'));
                }
            })
            .catch((error) => {
                console.error(JSON.stringify(error));
                reject(error);
            });
    });
}
}
