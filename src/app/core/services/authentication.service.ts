import { Injectable,NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  UserData : any;
  constructor(private auth: Auth,private router : Router, public ngZone: NgZone, private toaster: ToastrService){
    onAuthStateChanged(this.auth,(user: any)=>{
      if(user){
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
   }

  //get User
    //get Authenticated user from firebase
    getAuthFire(){
      return this.auth.currentUser;
    }


    //get Authenticated user from Local Storage
    getAuthLocal(){
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user;
    }


    //Check wither User Is looged in or not
    get isLoggedIn(): boolean {
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user !== null ? true : false;
    }


    //Register Method
    Register(userName : string, phone : string, email : string, password : string) {
      debugger
      return createUserWithEmailAndPassword(this.auth, userName, phone, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.router.navigate(['/auth/dashboard']);
        // this.ngZone.run(() => {
           /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
          // this.sendEmailVerification()
          
        // });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }

    //reset Password
      async ResetPassword(email: string) {
      return sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.toaster.success('Password reset email sent successfully')
      })
      .catch((error) => {
        this.toaster.error('email is not valid')
        throw error;
        
      })
    }


    //Login Method
    async Login(email : string, password : string){
      debugger
      try {
        const result = await signInWithEmailAndPassword(this.auth, email, password);
        this.UserData = result.user;
          this.toaster.success('Login Successfully')
          this.router.navigate(['/auth/dashboard']);

      
      } catch (error) {
        this.toaster.error('Invalid Credential')
        // window.alert('error.message');
      }
    }

 
   //Logout
    Logout() {
      debugger
      signOut(this.auth).then(()=>this.router.navigate(['/login']))
      this.toaster.success('Logout Successfully')


    }


  //login with Email or Facebook
    //Login with Google
    GoogleAuth() {
      debugger
      return this.loginWithPopup(new GoogleAuthProvider())
      .then(() => {
        this.router.navigate(['/auth/dashboard']);
        this.toaster.success('OAuth Login Successfully');

      })
      .catch((error) => {
        console.error('Google authentication failed', error);
        // this.toaster.error('Google authentication failed');

         // Check if the error has a message property
         const errorMessage = error?.message || 'Google authentication failed';
         this.toaster.error(errorMessage);
      });
      
    }



    //Login with Facebook
    //FacebookAuth() {
    //  return this.loginWithPopup(new FacebookAuthProvider());
    //}



    //Pop Up Provider
    loginWithPopup(provider :any) {
      return signInWithPopup(this.auth,provider).then(() => {
        this.router.navigate(['/auth/dashboard']);
      });
    }


    //Send Password Reset Email
    async sendPasswordResetEmails(email : string){
       sendPasswordResetEmail(this.auth,email)
       .then(() => {
          window.alert('Password reset email sent, check your inbox.');
       })
       .catch((error) => {
        window.alert(error.message);
      });
    }

    //Send Email Verification
    sendEmailVerification(){
      return sendEmailVerification(this.auth.currentUser as User );
    }
} 