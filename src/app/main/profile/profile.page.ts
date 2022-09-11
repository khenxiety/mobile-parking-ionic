import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs,query,where } from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut
} from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  data:any=[]

  profile:any=[]
  constructor(private firestore:Firestore,private auth:Auth,private toast:ToastController,private router:Router) { 

    this.data=JSON.parse(localStorage.getItem('user')) 

    console.log(this.data.user)
  }

  ngOnInit() {
    this.getUser()
  }


  getUser(){
    const dbinstance=collection(this.firestore,'users')
    const q=query(dbinstance,where('uid','==',this.data.user.uid))

    getDocs(q).then(res=>{
      this.profile = [
        ...res.docs.map((doc: any) => {

          return {  id: doc.id ,...doc.data(),};

        }),

      ];

      this.profile=this.profile[0]
      console.log(this.profile)

    })
  }


  async presentToast(message) {
  const toast = await this.toast.create({
    message: message,
    duration: 2000
  });
  toast.present();
}




  updatePassword(){

    sendPasswordResetEmail(this.auth,this.profile.email).then(res=>{
      this.presentToast('Password reset link has been sent to your email')
    }
    ).catch(err=>{
      this.presentToast(err.message)
    }
    )

  }

  signOut(){
    signOut(this.auth).then(res=>{
      localStorage.clear()
      this.router.navigate(['/'])

      this.presentToast('User Signed Out')

    }
    ).catch(err=>{
      this.presentToast(err.message)
    }
    )
  }

}
