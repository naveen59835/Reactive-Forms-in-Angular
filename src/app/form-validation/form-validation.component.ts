import { notes } from '../models/notes';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { notes } from '../models/notes';
import { NotesService } from '../notes.service';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  profileForm:FormGroup;
  note :notes = {};
  // profileForm:any;

  constructor (private fb: FormBuilder,private _snackBar: MatSnackBar,private notes: NotesService){
    this.profileForm = this.fb.group({
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required,Validators.minLength(2)]),
      email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      confirm_password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      
      age:new FormControl('',[Validators.required,Validators.min(18)]),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern(/^[7-9]\d{9}$/)]),
      street:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      zipcode:new FormControl('',[Validators.required,Validators.pattern(/^\d{5}$/)])
    
    
    },{Validators:[this.checkIfEmailsAreValid,this.checkPassword]});
   }



  openSnack() {
 
    this._snackBar.open('Feedback submitted successfully', 'success', {​
      duration: 5000,​
      panelClass: ['mat-toolbar', 'mat-primary']​
      })
  
  }
  get firstName(){
    return this.profileForm.get("firstName");
  }
  get lastName(){
    return this.profileForm.get("lastName");
  }
  get email(){
    return this.profileForm.get("email");
  }
  get password(){
    return this.profileForm.get("password");
  }
  get confirm_password(){
    return this.profileForm.get("confirm_password");
  }
 
  get age(){
    return this.profileForm.get("age");
  }
  get phoneNumber(){
    return this.profileForm.get("phoneNumber");
  }
  get street(){
    return this.profileForm.get("street");
  }
  get city(){
    return this.profileForm.get("city");
  }
  get state(){
    return this.profileForm.get("state");
  }
  get zipcode(){
    return this.profileForm.get("zipcode");
  }

  @Output()
  addNote:EventEmitter<notes>=new EventEmitter<notes>();

  user={

  }

  onSubmit(){
   
    alert("Registration completed successfully")

    this.notes.saveNotes(this.profileForm.value).subscribe({
      next:data=>{
        this.addNote.emit(this.note);
      
        this.note={};
      },
      error:e=>{
        alert("Unable to load the Blog due to Network Error");
      }
     
    });
    this.profileForm.reset();
  

  }





  checkIfEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (!anyInvalidEmail) {
        return { checkIfGuestEmailsAreValid: false }
      }
    }
    return null;
  }
  checkPassword(c:AbstractControl){
    const password1=c.get('password')?.value;
    const password2=c.get('confirm_password')?.value;
    if(!password1 || !password2) {
      return null;
    }
  if(password1 != password2){
    return {passwordMatch:false};

  }
  return null;
  }


  




}
