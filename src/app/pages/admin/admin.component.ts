import { Component, OnInit } from '@angular/core';
import { IBlogResponse } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog/blog.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public userBlogs: Array<IBlogResponse> = [];
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs()
  }
  loadBlogs(): void {
    this.blogService.getAll().subscribe(data => {
      this.userBlogs = data;
    }, err => {
      console.log('load blog error', err);
    })
  }

}
