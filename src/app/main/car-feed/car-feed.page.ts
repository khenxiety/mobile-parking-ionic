import { Component, OnInit } from '@angular/core';
import {
  collection,
  addDoc,
  Firestore,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { update } from 'firebase/database';


@Component({
  selector: 'app-car-feed',
  templateUrl: './car-feed.page.html',
  styleUrls: ['./car-feed.page.scss'],
})
export class CarFeedPage implements OnInit {

  test:any=[
    

  ]

  carmodel:any;
  cartype:any;
  description:any;
  price:any;

  userData:any;
  currentUser:any=[];
  notifications: any=[];

  imgurl:any;

  
  constructor(private firestore:Firestore,private router:Router,private modal:ModalController, private toast:ToastController,) {
    this.userData=JSON.parse(localStorage.getItem('user'));
    console.log(this.userData.user);



   }

  ngOnInit() {



    this.getPosts()

    this.getdata()


  }



  isModalOpen = false;

  isModalOpen2 = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  getdata(){
    const dbinstance=collection(this.firestore,'users');
    const q=query(dbinstance,where("uid", "==", this.userData.user.uid));



    getDocs(q,).then(res=>{
      this.currentUser = [
        ...res.docs.map((doc: any) => {

          return {  id: doc.id ,...doc.data(),};

        }),

      ];

      this.currentUser=this.currentUser[0]

      this.getNotifications(this.currentUser.role)


    }).catch(err=>{
      console.log(err);
    })

  }



  getPosts(){
    const dbinstance=collection(this.firestore,'posts');

    const q=query(dbinstance,where("status","==","available"));
    getDocs(q).then(res=>{
      this.test = [
        ...res.docs.map((doc: any) => {

          return {  id: doc.id ,...doc.data(),};

        }),

      ];
      this.test=this.test.reverse()
      console.log(this.test);
    }).catch(err=>{
      console.log(err);
    })

  }


  addCar(){
    const date=new Date();
    


    let data={
      location:this.currentUser.location,
      bookerid:"none",
      carmodel:this.carmodel,
      cartype:this.cartype,
      description:this.description,
      price:this.price,
      status:"available",
      date:date.toDateString(),
      ownerid:this.currentUser.uid,
      username:this.currentUser.username,
      img:this.imgurl

      
    }

    const dbinstance=collection(this.firestore,'posts');
    addDoc(dbinstance,data).then(res=>{
      this.presentToast('Car Added Successfully');
      this.modal.dismiss()
      console.log(data, res);

      this.ngOnInit()

    }).catch(err=>{
      console.log(err);
      this.presentToast('Error Adding Car');

    })

    
  }



  getNotifications(role){
    const dbinstance=collection(this.firestore,'transaction');

    if(role=='owner'){
      const q=query(dbinstance,where("ownerid", "==", this.userData.user.uid),where("status", "==", "pending"));
      getDocs(q).then(res=>{
        this.notifications = [
          ...res.docs.map((doc: any) => {

            return {  id: doc.id ,...doc.data(),};

          }),

        ];
        console.log(this.notifications);
      }).catch(err=>{
        console.log(err);
      })

    }else{

      const q=query(dbinstance,where("bookerid", "==", this.userData.user.uid));
      getDocs(q).then(res=>{
        this.notifications = [
          ...res.docs.map((doc: any) => {

            return {  id: doc.id ,...doc.data(),};

          }),

        ];
        console.log(this.notifications);
      }).catch(err=>{
        console.log(err);
      })

    }





    
  }


  transactionAction(transaction,status){
    console.log(transaction,status);
    let data={
      status:status
    }
    const dbinstance=doc(this.firestore,'transaction/'+transaction.id);
    updateDoc(dbinstance,data).then(res=>{

      if(status=='accepted'){
        this.updatePost(transaction)
        this.presentToast('Transaction Updated Successfully');
       this.ngOnInit()


      }else if(status=='rejected'){
        this.presentToast('Transaction Rejected');
        this.ngOnInit()

      }


      


      
      


      




    }).catch(err=>{
      console.log(err);
      this.presentToast('Error Updating Transaction');

    })



  }

  updatePost(post){
    

    let data2={
      status:'booked'
    }
    const db=doc(this.firestore,'posts/'+post.postid);
      updateDoc(db,data2).then(res=>{
        console.log(res)  


      }).catch(err=>{
        console.log(err);
      })

  }




  toRent(postid){
    console.log(postid);
    this.router.navigate(['/car-rent',postid])

  }


  cancel(postid){
    // delete doc
    const dbinstance=doc(this.firestore,'transaction/'+postid);
    deleteDoc(dbinstance).then(res=>{
      this.presentToast('Request Cancelled Successfully');
      this.ngOnInit()

    }
    ).catch(err=>{
      console.log(err);
      this.presentToast('Error Cancelling Request');

    }
    )

  }
}
