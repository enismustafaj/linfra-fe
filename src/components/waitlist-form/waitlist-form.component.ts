import { Component, OnInit, output, Output } from '@angular/core';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-waitlist-form',
    standalone: true,
    imports: [
        NzFormItemComponent,
        NzFormControlComponent,
        NzFormLabelComponent,
        NzColDirective,
        NzInputDirective,
        NzButtonComponent,
        NzFormDirective,
        ReactiveFormsModule,
        NzSpaceComponent
    ],
    templateUrl: './waitlist-form.component.html',
    styleUrl: './waitlist-form.component.scss'
})
export class WaitlistFormComponent implements OnInit {
    submit = output<{
        name: string, email: string
    }>();


    form!: FormGroup;

    constructor(private readonly fb: NonNullableFormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            email: this.fb.control('', [Validators.required, Validators.email]),
        });
    }

    onSubmit(): void {

        if (this.form.invalid) {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            console.log('form invalid', this.form.value!)
            return;
        }

        console.log('form valid', this.form.value!);
        this.submit.emit(this.form.value);
    }

}
