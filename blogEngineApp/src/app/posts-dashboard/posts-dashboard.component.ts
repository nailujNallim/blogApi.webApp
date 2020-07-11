import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PostServiceService } from '../post-service.service';
import { Post } from '../model/Post';
import { UserType } from '../model/enum/UserType';
import { User } from '../model/User';
import { StatusPost } from '../model/enum/StatusPost';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NewPostComponent } from '../new-post/new-post.component';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.css'],
})
export class PostsDashboardComponent implements OnInit {
  public currentUser: User;
  public posts: Post[];
  public userTitle: string;

  constructor(
    private postService: PostServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currentUser = new User();
    this.SetUnregisteredUser();
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((p) => {
      this.posts = p;
    });
  }

  AddPost(): void {
    console.log('open dialog');
    let dialogRef = this.dialog.open(NewPostComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  Edit(id: string): void {

  }


  Delete(id: string): void {

  }


  Comment(id: string): void {

  }

  Check(id: string, approved: boolean): void {
    var newStatus;
    if (approved) {
      newStatus = StatusPost.Approved;
    } else {
      newStatus = StatusPost.Rejected;
    }

    this.postService.Check(id, newStatus).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    );
  }

  SetUnregisteredUser(): void {
    this.userTitle = 'Published Posts!';

    this.currentUser.fullName = 'Unregistered User';
    this.currentUser.userName = 'unreguser';
    this.currentUser.userType = UserType.Unregistered;
    this.postService.SetUserType(this.currentUser);
    this.getPosts();
  }
  SetWriterUser(): void {
    this.userTitle = 'My Posts';

    this.currentUser.fullName = 'Writer User';
    this.currentUser.userName = 'vivipg';
    this.currentUser.userType = UserType.Writer;
    this.postService.SetUserType(this.currentUser);
    this.getPosts();
  }
  SetEditorUser(): void {
    this.userTitle = 'Pending Posts';

    this.currentUser.fullName = 'Editor User';
    this.currentUser.userName = 'juliamg';
    this.currentUser.userType = UserType.Editor;
    this.postService.SetUserType(this.currentUser);
    this.getPosts();
  }

  canEdit(status : StatusPost): boolean {
    return (StatusPost.Pending == status) && (UserType.Writer == this.currentUser.userType);
  }

  canComment(status : StatusPost): boolean {
    return StatusPost.Approved == status;
  }

  canRevise(): boolean {
    return UserType.Editor == this.currentUser.userType;
  }
  canPublish(): boolean {
    return UserType.Writer == this.currentUser.userType;
  }
}
