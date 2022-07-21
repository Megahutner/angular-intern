import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/_service/user.service';

import { User } from 'src/app/_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id!: number;
  user!: User;

  constructor(public accountS: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.accountS.getById(this.id).subscribe((data: User)=>{
      this.user=data;
    });
  }

  encode(password:string): string{
    //let encoded:string = btoa('abc')
    //console.log(encoded);
    return btoa(password);
    
  }

}
