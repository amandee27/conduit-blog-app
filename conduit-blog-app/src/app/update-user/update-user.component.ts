import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../user-detail.service';
import { UserInfo } from '../model/userDetail';
import { UserService } from '../user.service';
import { UpdatedUser } from '../model/updatedUser';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  isSubmitting: boolean = false;
  updateForm = new FormGroup({
    email: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
    image: new FormControl(''),
  });
  userDetail?: UserInfo;
  updatedUserDetail: UpdatedUser = { email: '', bio: '', image: '' };
  userImage: string | ArrayBuffer | null = '';
  loaded: boolean = false;

  constructor(
    private userDetailService: UserDetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscription = this.userDetailService.userDetail$.subscribe((data) => {
      if (data) {
        console.log(data);
        this.userDetail = data.user;
        console.log(this.userDetail.bio);
        this.updateForm.setValue({
          email: this.userDetail.email,
          bio: this.userDetail.bio,
          image: this.userDetail.image,
        });
        this.loaded = true;
        console.log(this.userDetail);
      }
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    this.updatedUserDetail.email = this.updateForm.value.email;
    this.updatedUserDetail.bio = this.updateForm.value.bio;
    this.updatedUserDetail.image = this.updateForm.value.image;
    this.userService.updateProfile(this.updatedUserDetail).subscribe((data) => {
      console.log(data);
    });
  }
  get updateFormControl() {
    return this.updateForm.controls;
  }
  updaloadImage() {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
