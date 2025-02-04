import { Component, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth-service";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormModule } from "ng-zorro-antd/form";
import { StoreModule } from "@ngrx/store";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzInputDirective } from "ng-zorro-antd/input";
import { confirmPasswordValidator } from "../../validator/confirm_password.validator";
import { take } from "rxjs";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',

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
        StoreModule,
        CommonModule,
        RouterLink
      ],

    standalone: true
})
export class SignupComponent implements OnInit {

    form!: FormGroup;

    successfullSignup: boolean = false;

    constructor(
        private readonly formBuilder: NonNullableFormBuilder,
        private authService: AuthService,
      ) { }
    
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            fullName: this.formBuilder.control('', [Validators.required]),
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            password: this.formBuilder.control('', [
                Validators.required, 
                Validators.minLength(6), 
                Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
            ]),
            confirmPassword: this.formBuilder.control('', [Validators.required]) ,
        }, {validators: confirmPasswordValidator});
    }

    onSubmit() {

        const { fullName, email, password } = this.form.value;

        this.authService.signup({
            fullName,
            email,
            password
        }).pipe(
            take(1)
        ).subscribe(() => {
            this.successfullSignup = true;
        });
    }

}