"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { errorMessage } from "../_lib/api";
import Button from "./Button";
import { Field, Input, Select, Textarea } from "./Field";
import Modal from "./Modal";

export type Option = { value: string; label: string; group?: string };

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "datetime" | "select";
  required?: boolean;
  maxLength?: number;
  min?: number;
  integer?: boolean;
  options?: Option[];
  hint?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
};

export type Values = Record<string, string>;
type Errors = Partial<Record<string, string>>;

function validateField(f: FieldDef, raw: string): string | undefined {
  const v = raw.trim();
  if (!v) return f.required ? "Required." : undefined;
  if (f.maxLength && v.length > f.maxLength) return `Must be at most ${f.maxLength} characters.`;
  if (f.type === "number") {
    const n = Number(v);
    if (!Number.isFinite(n)) return "Enter a number.";
    if (f.integer && !Number.isInteger(n)) return "Enter a whole number.";
    if (f.min !== undefined && n < f.min) return `Must be ${f.min} or more.`;
  }
  if (f.type === "datetime" && Number.isNaN(new Date(v).getTime())) return "Enter a valid date and time.";
  return undefined;
}

function groupOptions(options: Option[]) {
  const groups = new Map<string, Option[]>();
  for (const o of options) {
    const g = o.group ?? "";
    groups.set(g, [...(groups.get(g) ?? []), o]);
  }
  return [...groups.entries()];
}

function FormBody({
  fields, initial, submitLabel, onSubmit, validate, onCancel, editing,
}: {
  fields: FieldDef[];
  initial: Values;
  submitLabel: string;
  onSubmit: (values: Values, changed: Values) => Promise<void>;
  validate?: (values: Values) => Errors;
  onCancel: () => void;
  editing: boolean;
}) {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    for (const f of fields) {
      const err = validateField(f, values[f.name] ?? "");
      if (err) next[f.name] = err;
    }
    Object.assign(next, Object.fromEntries(Object.entries(validate?.(values) ?? {}).filter(([k]) => !next[k])));
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    const changed = Object.fromEntries(
      Object.entries(values).filter(([k, v]) => v.trim() !== (initial[k] ?? "").trim()),
    );
    if (editing && Object.keys(changed).length === 0) {
      setFormError("Nothing has changed yet.");
      return;
    }
    setBusy(true);
    setFormError(undefined);
    try {
      await onSubmit(values, changed);
    } catch (err) {
      setFormError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const common = {
          id,
          name: f.name,
          value: values[f.name] ?? "",
          disabled: f.disabled || busy,
          "aria-invalid": errors[f.name] ? true : undefined,
          "aria-describedby": errors[f.name] ? `${id}-error` : f.hint ? `${id}-hint` : undefined,
          onChange: (e: { target: { value: string } }) => {
            setValues((v) => ({ ...v, [f.name]: e.target.value }));
            if (errors[f.name]) setErrors((x) => ({ ...x, [f.name]: undefined }));
          },
        };
        return (
          <Field key={f.name} id={id} label={f.label} hint={f.hint} error={errors[f.name]} required={f.required}>
            {f.type === "textarea" ? (
              <Textarea {...common} placeholder={f.placeholder} maxLength={f.maxLength} />
            ) : f.type === "select" ? (
              <Select {...common}>
                <option value="">Choose…</option>
                {groupOptions(f.options ?? []).map(([group, opts]) =>
                  group ? (
                    <optgroup key={group} label={group}>
                      {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </optgroup>
                  ) : (
                    opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)
                  ),
                )}
              </Select>
            ) : (
              <Input
                {...common}
                type={f.type === "datetime" ? "datetime-local" : f.type === "number" ? "number" : "text"}
                inputMode={f.type === "number" ? "numeric" : undefined}
                min={f.min}
                step={f.integer ? 1 : undefined}
                placeholder={f.placeholder}
                maxLength={f.maxLength}
              />
            )}
          </Field>
        );
      })}

      {formError && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/60 dark:text-red-100" role="alert">
          {formError}
        </p>
      )}

      <div className="mt-1 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={busy}>Cancel</Button>
        <Button type="submit" loading={busy}>{submitLabel}</Button>
      </div>
    </form>
  );
}

/** Config-driven create/edit form in a modal. On edit, `changed` holds only the edited fields. */
export default function FormModal({
  open, onClose, title, description, ...body
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  fields: FieldDef[];
  initial: Values;
  submitLabel: string;
  editing?: boolean;
  onSubmit: (values: Values, changed: Values) => Promise<void>;
  validate?: (values: Values) => Errors;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} description={description}>
      <FormBody {...body} editing={!!body.editing} onCancel={onClose} />
    </Modal>
  );
}
