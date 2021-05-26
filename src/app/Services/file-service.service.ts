import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { analytics } from 'firebase';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  AllData:Data[] = [];

  dataSet: Data = {
    id:'',
    url:''
  };
  msg:string = 'error';
  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase) { }
  getFileDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  insertFileDetails(id,url) {
    this.dataSet = {
      id : id,
      url: url
    };
    this.imageDetailList.push(this.dataSet);
  }
  getFile(value){
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => {
           return item.payload.val();  
          });
        this.fileList.forEach(element => {
          if(element.id===value)
          this.msg = element.url;
        });
        if(this.msg==='error')
         alert('No record found');
        else{
          window.open(this.msg);
          this.msg = 'error';
        }
      }
    );
  }
  getAllData(){
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => {
           return item.payload.val();  
          });
          this.AllData = [];
        this.fileList.forEach(element => {
          this.AllData.push({
            id:element.id,
            url:element.url
          });
        });
      }
    );
    return this.AllData;
  }
}

export interface Data{
  id:string;
  url: string;
}