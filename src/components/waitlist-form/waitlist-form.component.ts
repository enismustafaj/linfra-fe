import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WaitlistResponse } from '../../data/waitlist.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { first, map, Observable, take } from 'rxjs';
import { WaitlistService } from '../../services/waitlist.service';

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
        NgIf,
        NzIconDirective,
        NzCardComponent,
        AsyncPipe
    ],
    templateUrl: './waitlist-form.component.html',
    styleUrl: './waitlist-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitlistFormComponent implements OnInit {

    submission$?: Observable<WaitlistResponse | undefined>;
    firstName$?: Observable<string | undefined>;
    form!: FormGroup;

    constructor(private readonly fb: NonNullableFormBuilder, private readonly waitlistService: WaitlistService) {
    }

    ngOnInit(): void {
        this.submission$ = this.waitlistService.get();
        this.firstName$ = this.submission$.pipe(map(submission => submission?.name.split(' ')[0]));

        this.form = this.fb.group({
            name: this.fb.control({value: '', disabled: true}, [Validators.required]),
            email: this.fb.control({value: '', disabled: true}, [Validators.required, Validators.email]),
        });

        this.submission$.pipe(first()).subscribe((submission) => {
            console.log(submission);
            if (submission) {
                this.form.patchValue({
                    name: submission.name ?? '',
                    email: submission.email ?? ''
                });
            }
            if (!submission) {
                this.form.controls['name'].enable();
                this.form.controls['email'].enable();
            }
        });
    }

    onSubmit():
        void {

        if (this.form.invalid
        ) {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
            return;
        }

        this.waitlistService.create(this.form.value).pipe(take(1)).subscribe();
    }
}
