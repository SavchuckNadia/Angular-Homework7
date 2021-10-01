import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBlogResponse } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog/blog.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {

  public adminBlogs: Array<IBlogResponse> = [];
  public currentBlog!: IBlogResponse;
  public currentBlogID!: number;
  public editStatus = false;
  public imagePath = 'https://www.askcga.com/wp-content/uploads/2020/09/Untitled-design-7.png';
  public blogForm!: FormGroup
  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initBlogForm();
    this.loadBlogs();
  }
  initBlogForm(): void {
    this.blogForm = this.fb.group({
      title: [null, Validators.required],
      text: [null, Validators.required],
      author: [null, Validators.required],
      imagePath: [this.imagePath],
      date: new Date()
    })
  }
  loadBlogs(): void {
    this.blogService.getAll().subscribe(data => {
      this.adminBlogs = data;
    }, err => {
      console.log('load blog error', err);
    })
  }
  saveBlog(): void {

    if (this.editStatus) {
      this.blogService.update(this.blogForm.value, this.currentBlogID).subscribe(() => {
        this.loadBlogs();
        this.editStatus = false;
        this.initBlogForm();
        this.toastr.success('Post successfully updated!')
      }, err => {
        console.log('update blog error', err);
      })
    }
    else {
      this.blogService.create(this.blogForm.value).subscribe(() => {
        this.loadBlogs();
        this.initBlogForm();
      }, err => {
        console.log('create blog error', err);
      })
    }
  }

  deleteBlog(blog: IBlogResponse): void {
    this.blogService.delete(blog.id).subscribe(() => {
      this.loadBlogs();
      this.toastr.success('Post successfully deleted!')
    }, err => {
      console.log('delete blog error', err);
      this.toastr.error(err.message)
    })
  }

  editBlog(blog: IBlogResponse): void {
    this.blogForm.patchValue({
      title: blog.title,
      text: blog.text,
      author: blog.author,
      date: new Date(),
    })
    this.currentBlogID = blog.id;
    this.editStatus = true;
  }
}
