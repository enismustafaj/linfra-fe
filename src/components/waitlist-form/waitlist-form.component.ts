import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WaitlistResponse } from '../../data/waitlist.interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { map, Observable, shareReplay, Subject, take, takeUntil, tap } from 'rxjs';
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
export class WaitlistFormComponent implements OnInit, OnDestroy {

    submission$?: Observable<WaitlistResponse | undefined>;
    firstName$?: Observable<string | undefined>;
    form!: FormGroup;

    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly fb: NonNullableFormBuilder,
        private readonly waitlistService: WaitlistService
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();

        this.submission$ = this.waitlistService.get().pipe(
            take(1),
            shareReplay(1)
        );

        this.firstName$ = this.submission$.pipe(
            map(submission => submission?.name.split(' ')[0])
        );

        this.submission$.pipe(
            tap(submission => this.updateFormWithSubmission(submission))
        ).subscribe();
    }

    initializeForm(): void {
        this.form = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            email: this.fb.control('', [Validators.required, Validators.email]),
        });

        this.toggleFormControls(true);
    }

    updateFormWithSubmission(submission?: WaitlistResponse): void {
        if (submission) {
            this.form.patchValue({
                name: submission.name ?? '',
                email: submission.email ?? ''
            });
            this.toggleFormControls(false);  // Disable the form controls
        } else {
            this.toggleFormControls(true);   // Enable the form controls
        }
    }

    toggleFormControls(enable: boolean): void {
        if (enable) {
            this.form.controls['name'].enable();
            this.form.controls['email'].enable();
        } else {
            this.form.controls['name'].disable();
            this.form.controls['email'].disable();
        }
    }

    onSubmit(): void {
        if (this.form.invalid) {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
            return;
        }

        this.submission$ = this.waitlistService.create(this.form.value).pipe(
            take(1),
            shareReplay(1),
            tap(submission => this.updateFormWithSubmission(submission)),
            takeUntil(this.destroy$)
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next(); // Emit value to complete all subscriptions with takeUntil
        this.destroy$.complete(); // Complete the subject
    }
}
