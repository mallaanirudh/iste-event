"use client";

import { useState, type ReactNode } from "react";
import { errorMessage } from "../_lib/api";
import Button from "./Button";
import Modal from "./Modal";

/** Confirmation for destructive actions. Shows the API error inline if the action fails. */
export default function ConfirmDialog({
  open, onClose, title, message, confirmLabel = "Delete", onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  const close = () => { setError(undefined); onClose(); };

  return (
    <Modal open={open} onClose={close} title={title}>
      <div className="text-sm text-zinc-700 dark:text-zinc-300">{message}</div>
      {error && <p className="mt-3 text-sm text-red-700 dark:text-red-400" role="alert">{error}</p>}
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="secondary" onClick={close} disabled={busy}>Cancel</Button>
        <Button
          variant="danger"
          loading={busy}
          onClick={async () => {
            setBusy(true);
            setError(undefined);
            try { await onConfirm(); close(); } catch (e) { setError(errorMessage(e)); } finally { setBusy(false); }
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
