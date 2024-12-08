import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormModule } from "ng-zorro-antd/form";
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzSpaceComponent, NzSpaceItemDirective } from "ng-zorro-antd/space";

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
    ReactiveFormsModule,
    NzSpaceComponent,
    NzSpaceItemDirective
  ],
  styleUrl: "./login.component.scss",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

  form!: FormGroup

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required]),
    })
  }

  onSubmit() {

  }
}
