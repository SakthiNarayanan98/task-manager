import { Component,OnInit,ChangeDetectorRef,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @ViewChild('fileInput')
  el!: ElementRef;
  imageUrl: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;
  registrationForm!: FormGroup
  submitted!: boolean;

  profileName = 'Sakthi Narayanan'
  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    console.log('sample');
    
     this.register(); 
  }

  register() {
    this.registrationForm = this.fb.group({
      file: [''],
      userId: ['',Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      birth:['']
    });
  }

  

  uploadFile(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
  
    if (file) {
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const uploadedValue = reader.result as string;
        console.log(uploadedValue);
        
  debugger
        this.registrationForm.patchValue({
          // file: uploadedValue,
          // userId: uploadedValue,
          // name: uploadedValue,
          // email: uploadedValue,
          // number: uploadedValue
        });
  
        this.editFile = false;
        this.removeUpload = true;
  
        this.imageUrl = uploadedValue;
  
        this.cd.markForCheck();
      };
    }
  }
  
  

    // Function to remove uploaded file
    removeUploadedFile() {
      let newFileList = Array.from(this.el.nativeElement.files);
      this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
      this.editFile = true;
      this.removeUpload = false;
      this.registrationForm.patchValue({
        file: [''],
        userId: [''],
        firstname: [''],
        lastname: [''],
        email: [''],
        number: [''],
        birth:['']

      });
    }

      // Submit Registration Form
  onSubmit(): void {
    debugger
    this.submitted = true;
    if(this.registrationForm.valid === false ) {
      alert('Please fill all the required fields to create a super hero!')
      return;
    } else {
      console.log(this.registrationForm.value)
    }
  }


}
