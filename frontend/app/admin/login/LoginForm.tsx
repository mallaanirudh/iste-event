"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { api, errorMessage } from "../_lib/api";
import type { User } from "../_lib/types";
import Button from "../_ui/Button";
import { Field, Input } from "../_ui/Field";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [formError, setFormError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const next = params.get("next");
  const target = next && next.startsWith("/admin") && !next.startsWith("/admin/login") ? next : "/admin";

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = {
      username: username.trim() ? undefined : "Enter your username.",
      password: password ? undefined : "Enter your password.",
    };
    setErrors(errs);
    if (errs.username || errs.password) return;

    setBusy(true);
    setFormError(undefined);
    try {
      const { user } = await api<{ user: User }>("/auth/login", { method: "POST", body: { username: username.trim(), password } });
      if (user.role !== "admin") {
        await api("/auth/logout", { method: "POST" }).catch(() => {});
        setFormError("This account isn't an admin. Ask an organiser to grant admin access.");
        return;
      }
      router.replace(target);
    } catch (err) {
      setFormError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Field id="username" label="Username" error={errors.username}>
        <Input
          id="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={errors.username ? true : undefined}
          aria-describedby={errors.username ? "username-error" : undefined}
          maxLength={50}
        />
      </Field>
      <Field id="password" label="Password" error={errors.password}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
      </Field>
      {formError && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/60 dark:text-red-100" role="alert">
          {formError}
        </p>
      )}
      <Button type="submit" loading={busy} className="mt-2 w-full">Sign in</Button>
    </form>
  );
}
