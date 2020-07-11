import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Post } from "./model/Post";
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private posts: Post[];

  baseUrl = environment.baseUrl;
  private postsUrl = this.baseUrl + '/BlogV1';
  private pendingPostUrl = this.postsUrl + '/pending';

  constructor(private http: HttpClient) {

  }

  getPosts(): Observable<Post[]> {
    console.log('obteniendo posts');
    return this.http.get<Post[]>(this.pendingPostUrl)
      .pipe(
        tap(posts => {
          this.posts = posts;
        }
      ));
  }
}
