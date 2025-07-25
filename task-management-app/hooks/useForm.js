import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState( {} );

    useEffect( () => {
        createValidators()
    }, [ formState ] )

    const onInputChange = ( name, value  ) => {        
        setFormState( { ...formState, [ name ]: value } );
    };

    const onResetForm = () => {
        setFormState( initialForm );
    };

    const createValidators = () => {
        const formCheckedValues = {};

        for ( const formField of Object.keys( formValidations ) ) {
            const [ fn, errorMessage ] = formValidations[ formField ];
            formCheckedValues[ `${ formField }Valid` ] = fn( formState[ formField ] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    const isFormValid = useMemo( () => {

        for ( const formValue of Object.keys( formValidation ) ) {
            if ( formValidation[ formValue ] !== null ) return false;
        }
        return true;
    }, [ formState ] );

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}