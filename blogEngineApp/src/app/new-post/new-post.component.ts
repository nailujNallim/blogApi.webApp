import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../post-service.service';
import { Post } from '../model/Post';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  newPostForm = new FormGroup({
    titleFormControl: new FormControl(null, [
      Validators.required, Validators.pattern('\\w*') ]),
    contentFormControl: new FormControl(null, [
      Validators.required, Validators.pattern('\\w*') ]),
  });

  constructor(private postService: PostServiceService) { }

  SavePost(): void {
    console.log('save post');
    this.postService.CreatePost(this.titleNewPost.value, this.contentNewPost.value)  .subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

  get titleNewPost(){
    return this.newPostForm.get('titleFormControl');
  }

  get contentNewPost(){
    return this.newPostForm.get('contentFormControl');
  }
}
