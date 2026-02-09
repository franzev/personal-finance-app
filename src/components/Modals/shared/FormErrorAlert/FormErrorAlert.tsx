'use client';

interface FormErrorAlertProps {
  error: string | null;
}

export default function FormErrorAlert({ error }: FormErrorAlertProps) {
  if (!error) return null;

  return (
    <div role="alert" className="bg-destructive/10 border-destructive/20 rounded-md border p-3">
      <p className="text-destructive text-sm font-medium">{error}</p>
    </div>
  );
}
