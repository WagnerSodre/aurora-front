import { Component, OnInit } from '@angular/core';
import {ChatComponent} from '../chat/chat.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pacient = 'Wagner Sodré';
  profile = {
    'musicStyle': 'Hard Rock',
    'movieStyle': 'Comédia',
    'goOut': 'Raramente',
    'relationship': 'Namora',
    'study': 'Yes',
    'work': 'Yes',
    'mood': 'Estressado',
    'phq9q': '3/9',
    'phq9a': '60%',
    'waiq': '5/15',
    'waia': '50%'
  };
  constructor() { }

  ngOnInit() {
  }

}
