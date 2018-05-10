import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileRef: AngularFireObject<any>;
  profileItem: Observable<any>;
  chatRef: AngularFireObject<any>;
  chatItem: Observable<any>;
  userId: string;
  name: string;
  profile: object;
  chat: object[];
  numberoOfMessages: number;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        this.name = user.displayName;
        this.profileRef = db.object(this.userId+'/profile');
        this.profileItem = this.profileRef.valueChanges();
        this.profileItem.subscribe((result) => {this.profile = result});
        this.chatRef = db.object(this.userId+'/chat');
        this.chatItem = this.chatRef.valueChanges();
        this.chatItem.subscribe((data) => {
          this.chat = data; 
          this.numberoOfMessages = this.chat.length;
        });
      }  else{
        this.router.navigate(['/login']);
      }
    })
  }
  ngOnInit() {
  }

}
