import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Post } from './model/Post';
import { environment } from 'src/environments/environment';
import { Observable, of, from } from 'rxjs';
import { UserType } from './model/enum/UserType';
import { User } from './model/User';
import { NewPost } from './model/NewPost';
import { NewStatus } from './model/NewStatus';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private posts: Post[];
  private currentUser: User;

  baseUrl = environment.baseUrl;
  private postsUrl = this.baseUrl + '/BlogV1';
  private pendingPostUrl = this.postsUrl + '/pending';
  private publishedPostUrl = this.postsUrl + '/published';
  private newPostUrl = this.postsUrl + '/create';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    console.log('obteniendo posts para ' + this.currentUser.userName);

    var postUrl = this.publishedPostUrl;
    if (UserType.Writer == this.currentUser.userType) {
      postUrl = this.postsUrl + '/posts/' + this.currentUser.userName;
    }
    if (UserType.Editor == this.currentUser.userType) {
      postUrl = this.pendingPostUrl;
    }

    return this.http.get<Post[]>(postUrl).pipe(
      tap((posts) => {
        this.posts = posts;
      })
    );
  }

  Check(id: string, newStatus: number) {
    console.log('submitting post: ' + this.newPostUrl);

    let postUpdate = new NewStatus();
    postUpdate.newStatus = newStatus;
    postUpdate.username = this.currentUser.userName;

    return this.http.put<string>(this.postsUrl + '/' + id, postUpdate).pipe(
      tap((postId: string) => {
        console.log(`Added post w/ id=${postId}`);
      })
    );
  }

  CreatePost(titleNewPost: string, contentNewPost: string): Observable<string> {
    var postSend = new NewPost();
    postSend.title = titleNewPost;
    postSend.content = contentNewPost;
    postSend.username = this.currentUser.userName;
    console.log('submitting post: ' + this.newPostUrl);

    return this.http.post<string>(this.newPostUrl, postSend).pipe(
      tap((postId: string) => {
        console.log(`Added post w/ id=${postId}`);
      })
    );
  }

  SetUserType(cu: User) {
    console.log(cu);
    this.currentUser = cu;
    this.getPosts();
  }

  get CurrentUser() {
    return this.currentUser;
  }
}
