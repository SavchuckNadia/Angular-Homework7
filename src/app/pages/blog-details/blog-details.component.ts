import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBlogResponse } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  public currentBlog!: IBlogResponse;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.loadCurrentBlog()
  }

  loadCurrentBlog(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.blogService.getOne(id).subscribe(data => {
      this.currentBlog = data;
    });
  }
}