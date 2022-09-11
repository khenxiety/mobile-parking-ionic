import { Component, OnInit } from '@angular/core';
import { Firestore,getDocs,where,query,collection,getDoc,addDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnySrvRecord } from 'dns';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.page.html',
  styleUrls: ['./car-rent.page.scss'],
})
export class CarRentPage implements OnInit {

  public price:any
  count:any=1;

  total:number;

  postId:any;


  user:any=JSON.parse(localStorage.getItem('user')).user

  public data:any=[]
  constructor(private activatedRoute:ActivatedRoute,private firestore:Firestore , private toast:ToastController ) { 
    this.postId=this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.postId)


    console.log(this.user)
  }

  ngOnInit() {


   
    this.getData()
  }
  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  


  getData(){

    const dbinstance=collection(this.firestore,'posts')

    getDocs(dbinstance).then(res=>{
      this.data = [
        ...res.docs.map((doc: any) => {
          return {  id: doc.id ,...doc.data(),};
        }),
      ];
      this.data=this.data.filter(post=>post.id==this.postId)
      this.total= Number(this.data[0].price)
    
      
      
 

      


    }).catch(err=>{
      console.log(err)
    }
    )


  }


  increment(price){
    this.count++;
    this.total=this.total+ Number(price) ;

    
  }

  decrement(price){
    if(this.count<1){
      this.count=1;

      this.ngOnInit()
    }else{
      this.count--;
      this.total=this.total- Number(price) ;

    }


    
    

    
  }
  bookCar(ownerid){
    const date = new Date();
    let data={
      bookerid:this.user.uid,
      ownerid:ownerid,
      postid:this.postId,
      bookername:this.user.displayName,
      status:'pending',
      price:this.total,
      hours:this.count,
      date:date.toDateString()

    }


    const dbinstance=collection(this.firestore,'transaction')
    addDoc(dbinstance,data).then(res=>{
      console.log(res)
      this.presentToast('Booking Successful')
    }).catch(err=>{
      console.log(err)
      this.presentToast('Booking Failed')

    }
    )
  


    console.log(data)


  }





  

}
