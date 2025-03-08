import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateLinkService } from '../create-link.service';

/**
 * Interface representing a resource submission from the form.
 */
interface ResourceSubmission {
  type: string;
  content: string;
  resourceIdentifier: string;
  website: string;
}

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent implements OnInit {
  shareForm!: FormGroup;

  submittedValues: WritableSignal<ResourceSubmission | null> = signal(null);
  isSubmitted: WritableSignal<boolean> = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private service: CreateLinkService
  ) {}

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      type: ['text', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(3)]],
      resource: [''],
    });
  }

  onSubmit() {
    if (this.shareForm.valid) {
      let resourceType: string = this.shareForm.get('type')?.value;
      let resourceContent: string = this.shareForm.get('content')?.value;
      let resource: string = this.shareForm.get('resource')?.value;

      console.log(resource);
      // TODO: Replace this with actual submission logic!

      // Store the values for display in the submittedValues Signal

      if (resource === '') {
        resource = makeid(20);
      }

      let cont = null;

      if (resourceType === 'text') {
        cont = this.service.createTextSnippet(resource, resourceContent);
      } else {
        cont = this.service.createShortURL(resource, resourceContent);
      }

      this.submittedValues.set({
        type: resourceType,
        content: resourceContent,
        resourceIdentifier: resource,
        website:
          'https://ex01-comp590-140-25sp-ayushpai.apps.unc.edu/' + resource,
      });
      this.isSubmitted.set(true);
    } else {
      // Mark all fields as touched to trigger validation visuals
      this.shareForm.markAllAsTouched();
    }
  }
}

function makeid(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
