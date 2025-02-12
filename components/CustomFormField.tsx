import React from 'react'
import { FormFieldType } from './forms/PatientForm'
import { Control } from 'react-hook-form'
import Image from 'next/image'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import PhoneInput from 'react-phone-number-input'

interface customProps{
    control:Control<any>,
    fieldType:FormFieldType,
    name: string,
    label? : string,
    placeholder? : string,
    iconSrc?: string,
    iconAlt? : string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect? :boolean,
    children?: React.ReactNode,
    renderSkeleton?:(field: any) => React.ReactNode
  }

  const RenderField = ({field, props}:{field:any, props:customProps}) =>{
    const {fieldType, iconSrc, iconAlt,placeholder, renderSkeleton, showTimeSelect, dateFormat } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return(
                <div className='flex rounded-md border border-gray-400'>
                    {props.iconSrc && (
                        <Image
                        src={iconSrc || ''}
                        alt={iconAlt || ''}
                        height={24}
                        width={24}
                        />
                    )}
                    <FormControl>
                        <Input
                        placeholder={placeholder}
                        {...field}
                        className='border-0'
                        />
                    </FormControl>

                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput
                    defaultCountry='KE'
                    international
                    withCountryCallingCode
                    value={field.value}
                    onChange={field.onChange}
                    className='bg-white px-3 h-11 rounded-md border'
                    placeholder={placeholder}
                    />
                </FormControl>
            )
    
        default:
            break;
    }
  }

const CustomFormField = (props:customProps) => {
    const { control, fieldType, name, label } = props;
  return (
    <FormField
    control={control}
    name={name}
    render={({ field })=>(
        <FormItem className='flex-1'>
            {fieldType ! ==  FormFieldType.CHECKBOX && label && (
                <FormLabel className='text-black'>{label}</FormLabel>
            )}
            <RenderField field={field} props={props}/>
            <FormMessage/>
        </FormItem>
    )}

    >

    </FormField>
  )
}

export default CustomFormField