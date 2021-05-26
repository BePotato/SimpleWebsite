import { Component, Inject, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { FileService } from '../Services/file-service.service';

@Component({
  selector: 'app-firebase-excel',
  templateUrl: './firebase-excel.component.html',
  styleUrls: ['./firebase-excel.component.css']
})
export class FirebaseExcelComponent  {

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService, private router : Router) { }
  ngOnInit() {
    this.fileService.getFileDetailList();
  }
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  URL: any[];
  AllData:Data[];
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  save() {
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          if (this.id == null) {
            this.fileService.insertFileDetails(this.selectedImage.name,this.url);
          }else{
            this.fileService.insertFileDetails(this.id,this.url);
          }
          alert('Upload Successful');
        })
      })
    ).subscribe();
  }

  view(){
    this.fileService.getFile(this.file);
  }
  showall(){
    this.AllData = this.fileService.getAllData();
  }
}
