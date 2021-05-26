import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { FileService } from './Services/file-service.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BouwDataWebApp';
  get IsHome(){
    return this.router.isActive('/Home',true)
  }
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  public isMenuOpen: boolean = false;

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }
  public goToElearner(): void{
    this.router.navigate(['/Elearner']);
  }

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(FileService) private fileService: FileService, private router : Router) 
  { 

  }
  ngOnInit() {
    this.fileService.getFileDetailList();
  }

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
          this.fileService.insertFileDetails(this.id,this.url);
          alert('Upload Successful');
        })
      })
    ).subscribe();
  }

  view(){
    this.fileService.getFile(this.file);
  }
}

