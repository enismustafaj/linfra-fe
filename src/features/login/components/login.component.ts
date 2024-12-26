import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormModule } from "ng-zorro-antd/form";
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { AuthService } from "../../../core/services/auth-service";
import { UserState } from "../../../core/store/user.store";
import { Store, StoreModule } from "@ngrx/store";
import { userloggedInAction } from "../../../core/store/actions/user.actions";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    NzLayoutModule,
    NzFormModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzFormLabelComponent,
    NzColDirective,
    NzInputDirective,
    NzButtonComponent,
    NzFormDirective,
    ReactiveFormsModule
  ],
  styleUrl: "./login.component.scss",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

  form!: FormGroup

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private userStore: Store<UserState>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required]),
    })
  }

  onSubmit() {
    this.authService.loginWithEmailPassword(
      "",
      ""
    ).subscribe(
      user => {
        this.userStore.dispatch(userloggedInAction({user: user.user}))
      }
    )
  }
}
