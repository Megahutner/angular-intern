import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_service/account.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  form!: FormGroup;

  constructor(public accountS: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }
  get f(){ return this.form.controls};

  onSubmitted(){
    console.log(this.form.value);
    this.accountS.create(this.form.value).subscribe((res:any)=>{
      console.log("Post created successfully!");
      this.router.navigateByUrl('')
    })
  }

}
