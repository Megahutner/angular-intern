import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post';
import { AccountService } from 'src/app/_service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!:number;
  post!:Post;
form!: FormGroup;
  constructor(public accountS: AccountService, private route: ActivatedRoute,private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['postID'];
    console.log(this.id);
    this.accountS.find(this.id).subscribe((data:Post)=>{
      this.post = data;
    });
  
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    })
  }

  get f(){return this.form.controls;}

  onSubmitted(){
    console.log(this.form.value);
    this.accountS.update(this.id,this.form.value).subscribe((res:any)=>{
      console.log("Post updated successfully!");
      this.router.navigateByUrl('')
    })

  }

}
