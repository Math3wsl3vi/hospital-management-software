import React from 'react'
import {Form } from "@/components/ui/form"
import CustomFormField from '../CustomFormField'

export enum FormFieldType {
    INPUT ='input',
    TEXTAREA= 'textarea',
    PHONE_INPUT ='phoneInput',
    CHECKBOX= 'checkbox',
    DATE_PICKER='datePciker',
    SELECT= 'select',
    SKELETON= 'skeleton'
}

const PatientForm = () => {
  return (
    <Form {...form}>
        <form>
            <h1>Welcome to Triage</h1>
            <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='when'
            label='when'
            />
        </form>
    </Form>
  )
}

export default PatientForm