import { useState, useEffect, useRef } from 'react';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { logger } from '@/lib/logger';

interface UseFormModalOptions<TFormData extends FieldValues, TSubmitData = TFormData> {
  mode: 'add' | 'edit' | 'action';
  open: boolean;
  initialData?: Partial<TFormData> | null;
  defaultValues: DefaultValues<TFormData>;
  onSubmit: (data: TSubmitData) => Promise<void> | void;
  onOpenChange: (open: boolean) => void;
  transformData?: (formData: TFormData) => TSubmitData;
  errorMessage?: string;
}

interface UseFormModalReturn<TFormData extends FieldValues> {
  form: UseFormReturn<TFormData>;
  onFormSubmit: (data: TFormData) => Promise<void>;
  submitError: string | null;
  setSubmitError: (error: string | null) => void;
}

export function useFormModal<TFormData extends FieldValues, TSubmitData = TFormData>({
  mode,
  open,
  initialData,
  defaultValues,
  onSubmit,
  onOpenChange,
  transformData,
  errorMessage = 'Failed to save. Please try again.',
}: UseFormModalOptions<TFormData, TSubmitData>): UseFormModalReturn<TFormData> {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const defaultValuesRef = useRef(defaultValues);
  defaultValuesRef.current = defaultValues;

  const initialDataRef = useRef(initialData);
  const prevOpenRef = useRef(false);

  const form = useForm<TFormData>({
    defaultValues,
    mode: 'onBlur',
  });

  const { reset } = form;

  const onFormSubmit = async (data: TFormData) => {
    setSubmitError(null);
    try {
      // If transformData is provided, use it; otherwise assume TFormData and TSubmitData are the same type
      const transformedData: TSubmitData = transformData
        ? transformData(data)
        : (data as TSubmitData);
      await Promise.resolve(onSubmit(transformedData));
      reset(defaultValuesRef.current);
      onOpenChange(false);
    } catch (error) {
      logger.error(`Failed to ${mode}`, error);
      setSubmitError(error instanceof Error ? error.message : errorMessage);
    }
  };

  useEffect(() => {
    const prevOpen = prevOpenRef.current;
    prevOpenRef.current = open;

    if (!open) {
      reset(defaultValuesRef.current);
      setSubmitError(null);
      return;
    }

    if (!prevOpen && open) {
      if (initialDataRef.current && mode === 'edit') {
        reset(initialDataRef.current as DefaultValues<TFormData>);
      } else {
        reset(defaultValuesRef.current);
      }
    }
  }, [open, mode, reset]);

  return {
    form,
    onFormSubmit,
    submitError,
    setSubmitError,
  };
}
