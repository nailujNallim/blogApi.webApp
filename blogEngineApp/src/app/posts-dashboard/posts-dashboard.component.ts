import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PostServiceService } from '../post-service.service';
import { Post } from '../model/Post';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.css']
})
export class PostsDashboardComponent implements OnInit {

  public posts: Post[];

  constructor(private postService: PostServiceService) {

  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() : void {
    this.postService.getPosts()
      .subscribe(
        p=> {
          this.posts = p;
        }
      );
  }

}
